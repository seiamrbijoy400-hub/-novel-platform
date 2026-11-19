import React from 'react';
import { Link } from 'react-router-dom';
import { useLibrary } from '../context/LibraryContext';
import { MOCK_BOOKS } from '../data/mockBooks';
import { History, BookOpen, Clock } from 'lucide-react';

export const ReadingHistoryPage: React.FC = () => {
  const { readingProgress } = useLibrary();

  const historyItems = Object.entries(readingProgress).map(([bookId, prog]) => {
    const book = MOCK_BOOKS.find(b => b.id === bookId);
    return { book, prog };
  }).filter(item => item.book !== undefined);

  return (
    <div className="space-y-8 pb-16">
      <div className="border-b-2 border-stone-900 dark:border-stone-200 pb-6 pt-4">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-violet-700 uppercase mb-2">
          <History className="w-4 h-4" />
          <span>Activity Timeline</span>
        </div>
        <h1 className="font-sans font-extrabold text-3xl sm:text-4xl text-stone-900 dark:text-stone-100 mb-2">
          Reading History
        </h1>
        <p className="text-sm text-stone-900/70 dark:text-stone-100/70 max-w-2xl">
          Track previous reading sessions, chapter milestones, and completion timestamps.
        </p>
      </div>

      <div className="space-y-3 max-w-3xl">
        {historyItems.map(({ book, prog }) => {
          if (!book) return null;
          return (
            <div
              key={book.id}
              className="p-5 rounded-2xl border-2 border-stone-900 dark:border-stone-200 bg-white dark:bg-stone-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={book.coverImageUrl}
                  alt={book.title}
                  className="w-12 h-16 object-cover rounded-lg border border-stone-900 flex-shrink-0"
                />
                <div>
                  <span className="text-[10px] font-mono opacity-60 uppercase">{book.languageId.toUpperCase()}</span>
                  <h3 className="font-sans font-bold text-base line-clamp-1">{book.title}</h3>
                  <p className="text-xs opacity-75">by {book.author.name}</p>
                  <p className="text-[11px] font-mono text-violet-700 mt-1">
                    Reached Chapter {prog.currentChapterIndex} · {prog.progressionPercentage}% Finished
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                <span className="text-[11px] font-mono opacity-60">
                  {new Date(prog.lastReadAt).toLocaleDateString()}
                </span>
                <Link
                  to={`/read/${book.slug}?chapter=${prog.currentChapterIndex}`}
                  className="px-4 py-1.5 rounded-lg border-2 border-stone-900 bg-lime text-xs font-bold shadow-sm hover:scale-105 transition-transform"
                >
                  Resume
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
