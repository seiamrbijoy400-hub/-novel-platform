import React, { useMemo } from 'react';
import { BookCard } from '../components/book/BookCard';
import { useCatalogBooks } from '../hooks/useCatalogBooks';
import { Award } from 'lucide-react';

export const FeaturedPage: React.FC = () => {
  const { books: allBooks, loading } = useCatalogBooks();
  const books = useMemo(() => allBooks.filter(b => b.ratingAverage >= 4.8), [allBooks]);

  return (
    <div className="space-y-8 pb-20 pt-4">
      <div className="border-b border-stone-200 dark:border-night-border pb-6">
        <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest uppercase text-stone-500 mb-2">
          <Award className="w-3.5 h-3.5" />
          <span>Curator Selections</span>
        </div>
        <h1 className="font-serif font-bold text-3xl sm:text-4xl text-stone-950 dark:text-stone-50 mb-2">
          Featured & Award-Winning Novels
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-400 max-w-2xl leading-relaxed">
          Handpicked literary achievements and acclaimed contemporary fiction with 100% complete in-browser reading clearance.
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(idx => (
            <div key={idx} className="rounded-xl border border-stone-200 dark:border-night-border overflow-hidden animate-pulse">
              <div className="aspect-[2/3] bg-stone-200 dark:bg-stone-850" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {books.map(book => (
            <BookCard key={book.id} book={book} featured={true} />
          ))}
        </div>
      )}
    </div>
  );
};
