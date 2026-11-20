import { Book } from '../types/book';
import { MOCK_BOOKS } from '../data/mockBooks';

type CatalogListener = (books: Book[]) => void;

const CACHE_KEY = 'novela_catalog_v2';
const CACHE_TTL_MS = 10 * 60 * 1000;
const PROXY_TIMEOUT_MS = 16000;
const SNAPSHOT_TIMEOUT_MS = 6000;

/**
 * Single source of truth for the book catalog.
 *
 * - The verified local catalog is available synchronously, so the UI is never empty.
 * - Real books are fetched through the local `/api/books` proxy (served by Vite,
 *   which can reach Open Library even when the WebView cannot) with a bundled
 *   snapshot at `/api/books.json` as fallback.
 */
export class CatalogService {
  private static listeners = new Set<CatalogListener>();
  private static catalog: Book[] = CatalogService.loadCachedCatalog();
  private static hydration: Promise<Book[]> | null = null;
  private static hydrated = false;

  /** Returns the currently known books synchronously (never empty). */
  public static getSnapshot(): Book[] {
    if (this.catalog.length === 0) this.catalog = [...MOCK_BOOKS];
    return this.catalog;
  }

  /** Real books only (from Open Library), excluding verified local demo titles. */
  public static getRealBooks(): Book[] {
    return this.getSnapshot().filter(isRealBook);
  }

  /**
   * Kept for backwards compatibility with pages. Resolves immediately with the
   * local catalog; background hydration is started as a side effect.
   */
  public static async getAllBooks(): Promise<Book[]> {
    void this.hydrate();
    return this.getSnapshot();
  }

  /** Subscribe to catalog updates (used by useCatalogBooks). */
  public static subscribe(listener: CatalogListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  /** Hydrate from the local API/snapshot at most once at a time. */
  public static hydrate(force = false): Promise<Book[]> {
    if (this.hydration) return this.hydration;
    if (this.hydrated && !force) return Promise.resolve(this.catalog);

    this.hydration = this.fetchAndMerge()
      .then(books => {
        this.catalog = books;
        this.hydrated = true;
        this.saveCachedCatalog(books);
        this.listeners.forEach(listener => listener(books));
        return books;
      })
      .catch(err => {
        console.warn('Catalog hydration skipped; using cached/local catalog.', err);
        return this.catalog;
      })
      .finally(() => {
        this.hydration = null;
      });

    return this.hydration;
  }

  public static async getBookBySlug(slug: string): Promise<Book | null> {
    void this.hydrate();
    return this.getSnapshot().find(b => b.slug === slug) || null;
  }

  /**
   * Fetch books filtered by language, genre, year, and completion status
   */
  public static async filterBooks(params: {
    language?: string;
    genre?: string;
    fullBookOnly?: boolean;
    yearMin?: number;
    yearMax?: number;
    searchQuery?: string;
  }): Promise<Book[]> {
    const books = await this.getAllBooks();

    return books.filter(book => {
      if (params.fullBookOnly && (!book.fullBookAvailable || book.accessType !== 'full_book')) {
        return false;
      }
      if (params.language && params.language !== 'all' && book.languageId !== params.language) {
        return false;
      }
      if (params.genre && params.genre !== 'all') {
        const matchesGenre = book.genres.some(
          g => g.toLowerCase() === params.genre!.toLowerCase()
        );
        if (!matchesGenre) return false;
      }
      if (params.yearMin && book.publicationYear < params.yearMin) return false;
      if (params.yearMax && book.publicationYear > params.yearMax) return false;

      if (params.searchQuery && params.searchQuery.trim()) {
        const q = params.searchQuery.toLowerCase().trim();
        const matchTitle = book.title.toLowerCase().includes(q);
        const matchOriginal = book.originalTitle?.toLowerCase().includes(q) || false;
        const matchAuthor = book.author.name.toLowerCase().includes(q);
        const matchGenre = book.genres.some(g => g.toLowerCase().includes(q));
        const matchSynopsis = book.synopsis.toLowerCase().includes(q);
        if (!matchTitle && !matchOriginal && !matchAuthor && !matchGenre && !matchSynopsis) {
          return false;
        }
      }

      return true;
    });
  }

  // ── Real-book hydration (local API + bundled snapshot) ────────────────────

  private static async fetchAndMerge(): Promise<Book[]> {
    const [proxy, snapshot] = await Promise.allSettled([
      this.fetchJson<Book[] | { books?: Book[] }>('/api/books', PROXY_TIMEOUT_MS),
      this.fetchJson<Book[] | { books?: Book[] }>('/api/books.json', SNAPSHOT_TIMEOUT_MS),
    ]);

    const liveBooks: Book[] = [];
    collectBooks(proxy, liveBooks);
    collectBooks(snapshot, liveBooks);

    // Local verified books are always kept and take precedence on duplicates.
    return this.deduplicateBooks([...MOCK_BOOKS, ...liveBooks]);
  }

  /** fetch with a hard deadline so a stalled request can never block the UI. */
  private static async fetchJson<T>(url: string, timeoutMs: number): Promise<T> {
    const controller = new AbortController();
    let timer: ReturnType<typeof setTimeout> | undefined;
    const deadline = new Promise<never>((_, reject) => {
      timer = setTimeout(() => {
        controller.abort();
        reject(new Error(`Request timed out: ${url}`));
      }, timeoutMs);
    });

    try {
      const response = await Promise.race([
        fetch(url, { signal: controller.signal, headers: { Accept: 'application/json' } }),
        deadline,
      ]);
      if (!response.ok) throw new Error(`Request failed with HTTP ${response.status}`);
      return await Promise.race([response.json() as Promise<T>, deadline]);
    } finally {
      if (timer) clearTimeout(timer);
    }
  }

  // ── Cache & helpers ───────────────────────────────────────────────────────

  private static loadCachedCatalog(): Book[] {
    try {
      const raw = localStorage.getItem(CACHE_KEY);
      if (!raw) return [...MOCK_BOOKS];
      const parsed = JSON.parse(raw) as { savedAt?: number; books?: Book[] };
      if (
        parsed.savedAt &&
        Date.now() - parsed.savedAt < CACHE_TTL_MS &&
        Array.isArray(parsed.books) &&
        parsed.books.length > 0
      ) {
        return this.deduplicateBooks([...MOCK_BOOKS, ...parsed.books.filter(isRealBook)]);
      }
    } catch {
      // Corrupt or unavailable storage: fall back to the verified local catalog.
    }
    return [...MOCK_BOOKS];
  }

  private static saveCachedCatalog(books: Book[]): void {
    try {
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ savedAt: Date.now(), books: books.filter(isRealBook) })
      );
    } catch {
      // Storage may be full or disabled; the in-memory catalog still works.
    }
  }

  private static deduplicateBooks(books: Book[]): Book[] {
    const seen = new Set<string>();
    return books.filter(b => {
      const key = `${b.title.toLowerCase().trim()}_${b.author.name.toLowerCase().trim()}_${b.languageId}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }
}

function isRealBook(book: Book): boolean {
  return book.sourceProviderCode === 'open_library_live';
}

function collectBooks(
  result: PromiseSettledResult<Book[] | { books?: Book[] }>,
  target: Book[]
): void {
  if (result.status !== 'fulfilled') return;
  const value = result.value;
  if (Array.isArray(value)) {
    target.push(...value);
  } else if (value && Array.isArray(value.books)) {
    target.push(...value.books);
  }
}
