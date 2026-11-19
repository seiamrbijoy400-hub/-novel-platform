import React from 'react';
import { Link } from 'react-router-dom';
import { useLibrary } from '../context/LibraryContext';
import { MOCK_BOOKS } from '../data/mockBooks';
import { Bookmark, Trash2, ArrowRight } from 'lucide-react';

export const BookmarksPage: React.FC = () => {
  const { bookmarks, removeBookmark } = useLibrary();

  return (
    <div className="space-y-8 pb-16">
      <div className="border-b-2 border-stone-900 dark:border-stone-200 pb-6 pt-4">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-electric-coral uppercase mb-2">
          <Bookmark className="w-4 h-4" />
          <span>Saved Passages & Highlights</span>
        </div>
        <h1 className="font-sans font-extrabold text-3xl sm:text-4xl text-stone-900 dark:text-stone-100 mb-2">
          Bookmarks & Notes
        </h1>
        <p className="text-sm text-stone-900/70 dark:text-stone-100/70 max-w-2xl">
          Passages, quotes, and reflections marked across your multilingual reading journeys.
        </p>
      </div>

      <div className="space-y-4 max-w-3xl">
        {bookmarks.length > 0 ? (
          bookmarks.map((bm) => {
            const book = MOCK_BOOKS.find(b => b.id === bm.bookId);
            return (
              <div
                key={bm.id}
                className="p-6 rounded-2xl border-2 border-stone-900 dark:border-stone-200 bg-white dark:bg-stone-800 shadow-sm space-y-3"
              >
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-bold text-violet-700">
                    {bm.bookTitle} · Chapter {bm.chapterIndex}
                  </span>
                  <button
                    onClick={() => removeBookmark(bm.id)}
                    className="p-1 rounded text-stone-900/50 hover:text-electric-coral transition-colors"
                    title="Remove Bookmark"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <blockquote className="border-l-4 border-electric-lime pl-4 italic text-sm text-stone-900/90 dark:text-stone-100/90 leading-relaxed">
                  "{bm.selectedText}"
                </blockquote>

                {bm.note && (
                  <p className="text-xs text-stone-900/70 dark:text-stone-100/70 bg-stone-100 dark:bg-stone-100 p-2.5 rounded-lg">
                    <strong>Note:</strong> {bm.note}
                  </p>
                )}

                <div className="flex items-center justify-between pt-2 text-[11px] font-mono text-stone-900/50 dark:text-stone-100/50">
                  <span>Saved on {new Date(bm.createdAt).toLocaleDateString()}</span>
                  {book && (
                    <Link
                      to={`/read/${book.slug}?chapter=${bm.chapterIndex}`}
                      className="text-xs font-bold text-stone-900 dark:text-stone-100 hover:text-lime flex items-center gap-1"
                    >
                      <span>Jump to Page</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-16 bg-white dark:bg-stone-800 border-2 border-dashed border-stone-900 rounded-2xl p-8">
            <p className="text-sm font-bold mb-2">No bookmarks saved yet.</p>
            <p className="text-xs text-stone-900/60 dark:text-stone-100/60 mb-4">
              While reading any novel, tap the bookmark icon on the upper navigation bar to save memorable passages.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
