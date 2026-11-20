// Shared Open Library sourcing helpers.
// Used by the Vite dev/preview middleware and by scripts/sync-real-books.mjs.

const BY_LANGUAGE = [
  { query: 'language:ben', language: 'bn' },
  { query: 'language:ara', language: 'ar' },
  { query: 'language:hin', language: 'hi' },
  { query: 'language:urd', language: 'ur' },
  { query: 'language:spa', language: 'es' },
  { query: 'language:eng AND subject:fiction', language: 'en' },
  { query: 'language:fra AND subject:fiction', language: 'fr' },
];

const FIELDS = [
  'key', 'title', 'author_name', 'first_publish_year', 'language',
  'cover_i', 'subject', 'publisher', 'isbn', 'ebook_access',
].join(',');

const CACHE_TTL_MS = 5 * 60 * 1000;
const REQUEST_TIMEOUT_MS = 12000;

let cache = { savedAt: 0, books: [] };
let inFlight = null;

const LANG_MAP = {
  ben: 'bn', bengali: 'bn',
  ara: 'ar', arabic: 'ar',
  hin: 'hi', hindi: 'hi',
  urd: 'ur', urdu: 'ur',
  spa: 'es', spanish: 'es',
  fra: 'fr', french: 'fr',
  eng: 'en', english: 'en',
  zho: 'zh', chinese: 'zh',
  deu: 'de', german: 'de',
};

function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
    .slice(0, 60);
}

function normalizeDoc(doc, preferredLanguage) {
  if (!doc || !doc.title || !doc.author_name || doc.author_name.length === 0) return null;

  const authorName = doc.author_name[0];
  const year = doc.first_publish_year || 2020;

  // A `language:<code>` search returns works whose *language array* often lists
  // dozens of translations first. Pick the language that matched the query
  // instead of blindly trusting index 0.
  const languages = Array.isArray(doc.language) ? doc.language : [];
  const matchedCode = languages.find(
    code => LANG_MAP[String(code).toLowerCase()] === preferredLanguage
  );
  const rawLang = matchedCode || languages[0] || preferredLanguage || 'en';
  const languageId = LANG_MAP[String(rawLang).toLowerCase()] || preferredLanguage || String(rawLang).slice(0, 2);
  const direction = ['ar', 'ur', 'he', 'fa'].includes(languageId) ? 'rtl' : 'ltr';
  const isPublic = doc.ebook_access === 'public';
  const workId = String(doc.key || '').replace('/works/', '');
  const slug = slugify(`${doc.title}-${year}-${workId}`);

  const coverImageUrl = doc.cover_i
    ? `/api/cover/${doc.cover_i}`
    : `https://picsum.photos/seed/${encodeURIComponent(slug)}/400/600`;

  return {
    id: `ol-${workId}`,
    slug,
    isbn13: doc.isbn ? doc.isbn[0] : undefined,
    title: doc.title,
    languageId,
    direction,
    author: {
      id: `auth-${slugify(authorName)}`,
      slug: slugify(authorName),
      name: authorName,
      biography: `Author indexed on Open Library. Published works include ${doc.title}.`,
      photoUrl: `https://picsum.photos/seed/${encodeURIComponent(authorName)}/300/300`,
      country: 'International',
      verified: true,
      totalNovels: 1,
    },
    publisher: doc.publisher ? {
      id: `pub-${slugify(doc.publisher[0])}`,
      name: doc.publisher[0],
      countryCode: 'GLOBAL',
      partnerSince: '2020',
    } : undefined,
    publicationDate: `${year}-01-01`,
    publicationYear: year,
    genres: doc.subject ? doc.subject.slice(0, 2) : ['Contemporary Fiction'],
    synopsis: `Published in ${year}. Real catalog record retrieved live from Open Library${isPublic ? ' with public digital access' : ''}.`,
    coverImageUrl,
    completionStatus: 'completed',
    // Open Library records are discovery metadata. We never claim full text
    // unless the record explicitly exposes public access, and even then the
    // reader links out rather than pretending to host the book.
    accessType: 'preview_only',
    fullBookAvailable: false,
    contentRating: 'General Audience',
    moderationStatus: 'approved',
    isAdultRestricted: false,
    sourceProviderCode: 'open_library_live',
    sourceProviderName: isPublic ? 'Open Library · Public Access' : 'Open Library · Discovery',
    rightsHolderName: doc.publisher ? doc.publisher[0] : authorName,
    allowedTerritories: ['GLOBAL'],
    ratingAverage: 4.5,
    ratingCount: 0,
    totalChapters: 0,
    estimatedReadingMinutes: 0,
    chapters: [],
    sourceUrl: `https://openlibrary.org${doc.key || `/works/${workId}`}`,
  };
}

async function fetchJson(url, timeoutMs = REQUEST_TIMEOUT_MS) {
  const controller = new AbortController();
  let timer;
  const deadline = new Promise((_, reject) => {
    timer = setTimeout(() => {
      controller.abort();
      reject(new Error(`Timed out: ${url}`));
    }, timeoutMs);
  });

  try {
    const response = await Promise.race([fetch(url, { signal: controller.signal }), deadline]);
    if (!response.ok) throw new Error(`HTTP ${response.status} for ${url}`);
    return await Promise.race([response.json(), deadline]);
  } finally {
    if (timer) clearTimeout(timer);
  }
}

async function fetchQuery({ query, language }, limit) {
  const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&fields=${FIELDS}&limit=${limit}`;
  const data = await fetchJson(url);
  const docs = Array.isArray(data.docs) ? data.docs : [];
  return docs
    .map(doc => normalizeDoc(doc, language))
    .filter(Boolean);
}

/**
 * Returns real books from Open Library. Failures in individual languages are
 * tolerated; the union of whatever succeeds is returned and cached.
 */
export async function fetchRealBooks({ limit = 10, force = false } = {}) {
  if (!force && cache.books.length > 0 && Date.now() - cache.savedAt < CACHE_TTL_MS) {
    return cache.books;
  }
  if (inFlight) return inFlight;

  inFlight = Promise.allSettled(BY_LANGUAGE.map(entry => fetchQuery(entry, limit)))
    .then(results => {
      const seen = new Set();
      const books = [];
      for (const result of results) {
        if (result.status !== 'fulfilled') continue;
        for (const book of result.value) {
          const key = book.slug;
          if (seen.has(key)) continue;
          seen.add(key);
          books.push(book);
        }
      }
      books.sort((a, b) => b.publicationYear - a.publicationYear);
      if (books.length > 0) {
        cache = { savedAt: Date.now(), books };
      }
      return books;
    })
    .finally(() => {
      inFlight = null;
    });

  return inFlight;
}

export async function proxyCover(id) {
  const url = `https://covers.openlibrary.org/b/id/${encodeURIComponent(id)}-M.jpg`;
  const controller = new AbortController();
  let timer;
  const deadline = new Promise((_, reject) => {
    timer = setTimeout(() => {
      controller.abort();
      reject(new Error('Cover request timed out'));
    }, REQUEST_TIMEOUT_MS);
  });

  try {
    const response = await Promise.race([fetch(url, { signal: controller.signal }), deadline]);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const buffer = Buffer.from(await response.arrayBuffer());
    return buffer;
  } finally {
    if (timer) clearTimeout(timer);
  }
}
