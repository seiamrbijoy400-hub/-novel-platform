import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Book } from '../../types/book';
import { RightsBadge } from './RightsBadge';
import { BookOpen, Bookmark } from 'lucide-react';
import { useLibrary } from '../../context/LibraryContext';

interface BookCardProps {
  book: Book;
  featured?: boolean;
}

export const BookCard: React.FC<BookCardProps> = ({ book, featured = false }) => {
  const { libraryIds, toggleLibrary } = useLibrary();
  const [imageError, setImageError] = useState(false);
  const isInLibrary = libraryIds.includes(book.id);

  const isRtl = book.direction === 'rtl';

  return (
    <article
      className={`group relative flex flex-col justify-between rounded-xl bg-white dark:bg-night-surface border border-stone-200/80 dark:border-night-border transition-all duration-200 hover:border-stone-400 dark:hover:border-stone-700 hover:shadow-card-hover overflow-hidden ${
        featured ? 'md:flex-row' : ''
      }`}
    >
      {/* Book Cover Area */}
      <div
        className={`relative overflow-hidden bg-stone-100 dark:bg-stone-900 ${
          featured ? 'md:w-5/12 h-64 md:h-auto' : 'aspect-[2/3] w-full'
        }`}
      >
        {!imageError && book.coverImageUrl ? (
          <img
            src={book.coverImageUrl}
            alt={`Cover of ${book.title}`}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          /* Graceful Typographic Fallback Cover */
          <div className="w-full h-full p-6 flex flex-col justify-between bg-gradient-to-br from-stone-100 via-stone-50 to-stone-200 dark:from-stone-900 dark:via-stone-850 dark:to-stone-950 text-stone-900 dark:text-stone-100 border-r border-stone-200/40">
            <div className="text-[10px] font-mono tracking-widest uppercase opacity-60">
              {book.languageId.toUpperCase()} · {book.publicationYear}
            </div>
            <div>
              <h4 className="font-serif font-bold text-base leading-snug line-clamp-3">
                {book.title}
              </h4>
              <p className="text-xs opacity-75 mt-1 font-medium line-clamp-1">
                {book.author.name}
              </p>
            </div>
            <div className="text-[10px] font-mono tracking-wider opacity-50 uppercase">
              {book.sourceProviderName}
            </div>
          </div>
        )}

        {/* Floating Quick Action */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleLibrary(book.id);
          }}
          className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-all ${
            isInLibrary
              ? 'bg-amber-400 text-stone-950 shadow-sm'
              : 'bg-white/80 dark:bg-stone-900/80 text-stone-700 dark:text-stone-300 hover:bg-white dark:hover:bg-stone-900'
          }`}
          title={isInLibrary ? 'In reading shelf' : 'Add to reading shelf'}
          aria-label="Save to shelf"
        >
          <Bookmark className="w-3.5 h-3.5" fill={isInLibrary ? 'currentColor' : 'none'} />
        </button>

        {/* Language Pill */}
        <div className="absolute bottom-2.5 left-2.5 bg-stone-900/80 dark:bg-black/80 backdrop-blur-md text-white text-[10px] font-mono font-medium px-2 py-0.5 rounded tracking-wider">
          {book.languageId.toUpperCase()}
        </div>
      </div>

      {/* Book Metadata & Reading Actions */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Status & Genre Bar */}
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400 uppercase tracking-wide truncate max-w-[130px]">
              {book.genres[0] || 'Fiction'}
            </span>
            <RightsBadge
              accessType={book.accessType}
              fullBookAvailable={book.fullBookAvailable}
            />
          </div>

          {/* Book Title */}
          <Link to={`/book/${book.slug}`} className="block group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors">
            <h3 className="font-serif font-bold text-base leading-snug line-clamp-2 text-stone-950 dark:text-stone-50">
              {book.title}
            </h3>
            {book.originalTitle && book.originalTitle !== book.title && (
              <p className={`text-xs text-stone-500 dark:text-stone-400 mt-0.5 line-clamp-1 ${isRtl ? 'font-arabic' : 'font-indic'}`}>
                {book.originalTitle}
              </p>
            )}
          </Link>

          {/* Author */}
          <p className="text-xs text-stone-600 dark:text-stone-400 mt-1.5">
            by{' '}
            <Link to={`/author/${book.author.slug}`} className="font-semibold text-stone-900 dark:text-stone-200 hover:underline">
              {book.author.name}
            </Link>
          </p>

          {/* Synopsis Snippet */}
          <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2 mt-2 leading-relaxed">
            {book.synopsis}
          </p>
        </div>

        {/* Footer Actions */}
        <div className="pt-3 border-t border-stone-100 dark:border-night-border flex items-center justify-between text-xs">
          <span className="text-[11px] font-mono text-stone-500 dark:text-stone-400">
            {book.publicationYear} · {book.totalChapters} ch
          </span>

          <Link
            to={book.accessType === 'full_book' ? `/read/${book.slug}` : `/book/${book.slug}`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-stone-900 hover:bg-stone-800 text-white dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{book.accessType === 'full_book' ? 'Read' : 'Preview'}</span>
          </Link>
        </div>
      </div>
    </article>
  );
};
