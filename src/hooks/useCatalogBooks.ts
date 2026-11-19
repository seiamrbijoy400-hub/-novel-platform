import { useEffect, useState } from 'react';
import { Book } from '../types/book';
import { CatalogService } from '../services/catalogService';

/**
 * Books are read from the local catalog immediately, then updated in place when
 * background provider hydration finishes. This keeps every screen populated
 * even when third-party APIs are slow or unreachable.
 */
export function useCatalogBooks(): { books: Book[]; loading: boolean; refreshing: boolean } {
  const [books, setBooks] = useState<Book[]>(() => CatalogService.getSnapshot());
  const [refreshing, setRefreshing] = useState(true);

  useEffect(() => {
    let mounted = true;
    const unsubscribe = CatalogService.subscribe(next => {
      if (mounted) setBooks(next);
    });

    void CatalogService.hydrate()
      .catch(() => undefined)
      .finally(() => {
        if (mounted) setRefreshing(false);
      });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  return { books, loading: false, refreshing };
}

/** Looks up a single book by slug, updating if background hydration finds it. */
export function useCatalogBook(slug?: string): { book: Book | null; loading: boolean } {
  const [book, setBook] = useState<Book | null>(() =>
    slug ? CatalogService.getSnapshot().find(b => b.slug === slug) || null : null
  );

  useEffect(() => {
    let mounted = true;

    if (!slug) {
      setBook(null);
      return;
    }

    const unsubscribe = CatalogService.subscribe(books => {
      if (mounted) setBook(books.find(b => b.slug === slug) || null);
    });
    void CatalogService.hydrate().catch(() => undefined);

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, [slug]);

  return { book, loading: false };
}
