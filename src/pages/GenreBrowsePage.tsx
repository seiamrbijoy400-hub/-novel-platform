import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MOCK_GENRES } from '../data/mockGenres';
import { Book } from '../types/book';
import { CatalogService } from '../services/catalogService';
import { BookCard } from '../components/book/BookCard';
import { BookMarked } from 'lucide-react';

export const GenreBrowsePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeGenreName = searchParams.get('genre') || 'all';
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    CatalogService.getAllBooks().then(all => {
      if (isMounted) {
        setBooks(all);
        setLoading(false);
      }
    });
    return () => { isMounted = false; };
  }, []);

  const displayedBooks = activeGenreName === 'all'
    ? books
    : books.filter(b => b.genres.some(g => g.toLowerCase() === activeGenreName.toLowerCase()));

  return (
    <div className="space-y-8 pb-20 pt-4">
      {/* Header */}
      <div className="border-b border-stone-200 dark:border-night-border pb-6">
        <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest uppercase text-stone-500 mb-2">
          <BookMarked className="w-3.5 h-3.5" />
          <span>Genre Taxonomies</span>
        </div>
        <h1 className="font-serif font-bold text-3xl sm:text-4xl text-stone-950 dark:text-stone-50 mb-2">
          Browse by Genre
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-400 max-w-2xl leading-relaxed">
          Curated literature across high-quality fiction categories. In accordance with strict platform policy, explicit pornography and graphic erotica are excluded, while genuine romance, relationships, and drama thrive.
        </p>
      </div>

      {/* Genres Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        <button
          onClick={() => setSearchParams({ genre: 'all' })}
          className={`p-4 rounded-xl border text-left transition-all ${
            activeGenreName === 'all'
              ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 border-stone-900 dark:border-stone-100 shadow-sm'
              : 'bg-white dark:bg-night-surface border-stone-200 dark:border-night-border text-stone-700 dark:text-stone-300 hover:border-stone-400'
          }`}
        >
          <span className="font-serif font-bold text-base block mb-1">All Genres</span>
          <p className="text-xs opacity-75 line-clamp-2">Complete library spanning all fiction categories</p>
        </button>

        {MOCK_GENRES.map((g) => {
          const isSelected = activeGenreName.toLowerCase() === g.name.toLowerCase();
          const count = books.filter(b => b.genres.some(bg => bg.toLowerCase() === g.name.toLowerCase())).length;
          return (
            <button
              key={g.id}
              onClick={() => setSearchParams({ genre: g.name })}
              className={`p-4 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 border-stone-900 dark:border-stone-100 shadow-sm'
                  : 'bg-white dark:bg-night-surface border-stone-200 dark:border-night-border text-stone-700 dark:text-stone-300 hover:border-stone-400'
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-serif font-bold text-base">{g.name}</span>
                <span className="text-[10px] font-mono opacity-60">({count})</span>
              </div>
              <p className="text-xs opacity-75 line-clamp-2 leading-relaxed">{g.description}</p>
            </button>
          );
        })}
      </div>

      {/* Novels In Selected Genre */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 dark:border-night-border pb-2">
          <h2 className="font-serif font-bold text-xl text-stone-950 dark:text-stone-50">
            {activeGenreName === 'all' ? 'All Verified Novels' : `Novels in ${activeGenreName}`}
          </h2>
          <span className="text-xs font-mono text-stone-500">
            {displayedBooks.length} Titles
          </span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(idx => (
              <div key={idx} className="rounded-xl border border-stone-200 dark:border-night-border overflow-hidden animate-pulse">
                <div className="aspect-[2/3] bg-stone-200 dark:bg-stone-850" />
              </div>
            ))}
          </div>
        ) : displayedBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayedBooks.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 rounded-xl border border-dashed border-stone-300 dark:border-night-border p-8 space-y-3">
            <p className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
              No novels found for this genre
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
