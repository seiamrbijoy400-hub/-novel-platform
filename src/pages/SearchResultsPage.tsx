import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BookCard } from '../components/book/BookCard';
import { useCatalogBooks } from '../hooks/useCatalogBooks';
import { Search, CheckCircle2, RotateCcw } from 'lucide-react';

export const SearchResultsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [fullBookOnly, setFullBookOnly] = useState(true);
  const { books, loading } = useCatalogBooks();

  const results = useMemo(() => {
    const q = (searchParams.get('q') || '').toLowerCase().trim();
    return books.filter(book => {
      if (fullBookOnly && (!book.fullBookAvailable || book.accessType !== 'full_book')) {
        return false;
      }
      if (!q) return true;
      const matchTitle = book.title.toLowerCase().includes(q);
      const matchOriginal = book.originalTitle?.toLowerCase().includes(q) || false;
      const matchAuthor = book.author.name.toLowerCase().includes(q);
      const matchLanguage = book.languageId.toLowerCase().includes(q);
      const matchGenre = book.genres.some(g => g.toLowerCase().includes(q));
      const matchSynopsis = book.synopsis.toLowerCase().includes(q);
      return matchTitle || matchOriginal || matchAuthor || matchLanguage || matchGenre || matchSynopsis;
    });
  }, [books, searchParams, fullBookOnly]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query.trim() });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="space-y-8 pb-20 pt-4">
      {/* Search Header */}
      <div className="border-b border-stone-200 dark:border-night-border pb-6">
        <h1 className="font-serif font-bold text-3xl sm:text-4xl text-stone-950 dark:text-stone-50 mb-4">
          Catalog Search
        </h1>

        <form onSubmit={handleSearch} className="flex gap-2 max-w-xl">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, author, original script, or keyword..."
              className="w-full bg-stone-50 dark:bg-night border border-stone-200 dark:border-night-border rounded-lg pl-10 pr-4 py-2.5 text-xs sm:text-sm font-medium focus:outline-none focus:ring-1 focus:ring-stone-400"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 rounded-lg font-semibold text-xs hover:bg-stone-800 transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {/* Filter and Metrics Row */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="text-xs font-mono text-stone-500 dark:text-stone-400">
          Found {results.length} results {searchParams.get('q') ? `for "${searchParams.get('q')}"` : ''}
        </div>

        <button
          type="button"
          onClick={() => setFullBookOnly(!fullBookOnly)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
            fullBookOnly
              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
              : 'bg-stone-50 dark:bg-night border-stone-200 dark:border-night-border text-stone-600'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>Full Books Only</span>
        </button>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(idx => (
            <div key={idx} className="rounded-xl border border-stone-200 dark:border-night-border overflow-hidden animate-pulse">
              <div className="aspect-[2/3] bg-stone-200 dark:bg-stone-850" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-stone-200 dark:bg-stone-850 rounded w-3/4" />
                <div className="h-3 bg-stone-200 dark:bg-stone-850 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {results.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 rounded-xl border border-dashed border-stone-300 dark:border-night-border p-8 space-y-3">
          <p className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">No matching novels found</p>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            Try searching for "Padma", "Alexandria", "Spanish", "Bengali", or disable "Full Books Only".
          </p>
          <button
            onClick={() => {
              setQuery('');
              setSearchParams({});
              setFullBookOnly(false);
            }}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 hover:bg-stone-800 transition-colors inline-flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Search</span>
          </button>
        </div>
      )}
    </div>
  );
};
