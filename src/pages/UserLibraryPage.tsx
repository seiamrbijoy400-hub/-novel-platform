import React from 'react';
import { Link } from 'react-router-dom';
import { useLibrary } from '../context/LibraryContext';
import { MOCK_BOOKS } from '../data/mockBooks';
import { BookCard } from '../components/book/BookCard';
import { Bookmark, BookOpen, Clock, ArrowRight } from 'lucide-react';

export const UserLibraryPage: React.FC = () => {
  const { libraryIds, readingProgress } = useLibrary();
  const libraryBooks = MOCK_BOOKS.filter(b => libraryIds.includes(b.id));

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="border-b-2 border-stone-900 dark:border-stone-200 pb-6 pt-4">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-violet-700 uppercase mb-2">
          <Bookmark className="w-4 h-4" />
          <span>Personal Shelf</span>
        </div>
        <h1 className="font-sans font-extrabold text-3xl sm:text-4xl text-stone-900 dark:text-stone-100 mb-2">
          My Reading Library
        </h1>
        <p className="text-sm text-stone-900/70 dark:text-stone-100/70 max-w-2xl">
          Your saved complete novels and synchronized reading sessions across all devices.
        </p>
      </div>

      {/* Quick Resume Active Reading Bar */}
      {Object.keys(readingProgress).length > 0 && (
        <div className="bg-white dark:bg-stone-800 border-2 border-stone-900 dark:border-stone-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet-700">
            <Clock className="w-4 h-4" />
            <span>Currently In Progress</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(readingProgress).map(([bookId, prog]) => {
              const book = MOCK_BOOKS.find(b => b.id === bookId);
              if (!book) return null;
              return (
                <div key={bookId} className="p-4 rounded-xl border-2 border-stone-900 bg-stone-50 dark:bg-stone-950 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono opacity-60 uppercase">{book.languageId.toUpperCase()} Novel</span>
                    <h4 className="font-sans font-bold text-sm line-clamp-1 mb-1">{book.title}</h4>
                    <p className="text-xs opacity-75 mb-2">Chapter {prog.currentChapterIndex} · {prog.progressionPercentage}% read</p>
                    <div className="w-full bg-black/10 dark:bg-white/10 h-1.5 rounded-full overflow-hidden mb-3">
                      <div className="bg-lime h-full" style={{ width: `${prog.progressionPercentage}%` }} />
                    </div>
                  </div>
                  <Link
                    to={`/read/${book.slug}?chapter=${prog.currentChapterIndex}`}
                    className="text-xs font-bold text-violet-700 hover:underline flex items-center gap-1"
                  >
                    <span>Resume from Chapter {prog.currentChapterIndex}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Saved Books Grid */}
      <div className="space-y-4">
        <h2 className="font-sans font-bold text-xl text-stone-900 dark:text-stone-100 flex items-center justify-between">
          <span>Saved Titles ({libraryBooks.length})</span>
          <Link to="/explore" className="text-xs font-bold text-violet-700 hover:underline">
            + Discover More
          </Link>
        </h2>

        {libraryBooks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {libraryBooks.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white dark:bg-stone-800 border-2 border-dashed border-stone-900 rounded-2xl p-8">
            <p className="text-sm font-bold mb-2">Your library is currently empty.</p>
            <p className="text-xs text-stone-900/60 dark:text-stone-100/60 mb-4">
              Explore our global multilingual catalog and save complete novels to your personal collection.
            </p>
            <Link
              to="/explore"
              className="px-4 py-2 text-xs font-bold rounded-lg border-2 border-stone-900 bg-lime shadow-sm inline-block"
            >
              Browse Complete Novels
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
