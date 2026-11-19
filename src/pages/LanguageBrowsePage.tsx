import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { MOCK_LANGUAGES } from '../data/mockLanguages';
import { BookCard } from '../components/book/BookCard';
import { useCatalogBooks } from '../hooks/useCatalogBooks';
import { Globe, ArrowRight } from 'lucide-react';

export const LanguageBrowsePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeLangId = searchParams.get('lang') || 'all';
  const { books, loading } = useCatalogBooks();

  const displayedBooks = activeLangId === 'all'
    ? books
    : books.filter(b => b.languageId === activeLangId);

  const selectedLangData = MOCK_LANGUAGES.find(l => l.id === activeLangId);

  return (
    <div className="space-y-8 pb-20 pt-4">
      {/* Header */}
      <div className="border-b border-stone-200 dark:border-night-border pb-6">
        <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest uppercase text-stone-500 mb-2">
          <Globe className="w-3.5 h-3.5" />
          <span>Multilingual Corpus</span>
        </div>
        <h1 className="font-serif font-bold text-3xl sm:text-4xl text-stone-950 dark:text-stone-50 mb-2">
          Browse by Language
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-400 max-w-2xl leading-relaxed">
          Complete novels available in authentic native typography. Select an original language to discover authorized complete works.
        </p>
      </div>

      {/* Languages Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
        <button
          onClick={() => setSearchParams({ lang: 'all' })}
          className={`p-3.5 rounded-xl border text-left transition-all ${
            activeLangId === 'all'
              ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 border-stone-900 dark:border-stone-100 shadow-sm font-semibold'
              : 'bg-white dark:bg-night-surface border-stone-200 dark:border-night-border text-stone-700 dark:text-stone-300 hover:border-stone-400'
          }`}
        >
          <span className="block text-[10px] font-mono uppercase opacity-60">All</span>
          <span className="font-serif font-bold text-base block mt-0.5">Universal</span>
          <span className="block text-[10px] font-mono opacity-60 mt-1">{books.length} Titles</span>
        </button>

        {MOCK_LANGUAGES.map((lang) => {
          const isSelected = activeLangId === lang.id;
          const bookCount = books.filter(b => b.languageId === lang.id).length;
          return (
            <button
              key={lang.id}
              onClick={() => setSearchParams({ lang: lang.id })}
              className={`p-3.5 rounded-xl border text-left transition-all relative ${
                isSelected
                  ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 border-stone-900 dark:border-stone-100 shadow-sm font-semibold'
                  : 'bg-white dark:bg-night-surface border-stone-200 dark:border-night-border text-stone-700 dark:text-stone-300 hover:border-stone-400'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase opacity-60">{lang.name}</span>
                {lang.direction === 'rtl' && (
                  <span className="text-[9px] bg-stone-200 dark:bg-stone-800 text-stone-800 dark:text-stone-200 px-1 rounded font-mono font-bold">RTL</span>
                )}
              </div>
              <span className={`font-serif font-bold text-base block mt-0.5 ${lang.direction === 'rtl' ? 'font-arabic' : 'font-indic'}`}>
                {lang.nativeName}
              </span>
              <span className="text-[10px] font-mono opacity-60 mt-1 block">
                {bookCount > 0 ? `${bookCount} Titles` : 'Archived'}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Language Context Banner */}
      {selectedLangData && activeLangId !== 'all' && (
        <div className="p-4 rounded-xl border border-stone-200 dark:border-night-border bg-stone-50 dark:bg-night-surface text-xs flex items-center justify-between">
          <div>
            <span className="font-semibold text-stone-900 dark:text-stone-100">
              Active Filter: {selectedLangData.name} ({selectedLangData.nativeName})
            </span>
            <span className="text-stone-500 block text-[11px] mt-0.5">
              Reading Flow: {selectedLangData.direction === 'rtl' ? 'Right-to-Left (RTL)' : 'Left-to-Right (LTR)'}
            </span>
          </div>
          <button
            onClick={() => setSearchParams({ lang: 'all' })}
            className="text-xs font-semibold text-stone-700 dark:text-stone-300 hover:underline"
          >
            Clear Filter
          </button>
        </div>
      )}

      {/* Novels In Selected Language */}
      <div className="space-y-4">
        <h2 className="font-serif font-bold text-xl text-stone-950 dark:text-stone-50">
          {activeLangId === 'all' ? 'All Multilingual Novels' : `Novels in ${selectedLangData?.name || activeLangId}`}
        </h2>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(idx => (
              <div key={idx} className="rounded-xl border border-stone-200 dark:border-night-border overflow-hidden animate-pulse">
                <div className="aspect-[2/3] bg-stone-200 dark:bg-stone-850" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-stone-200 dark:bg-stone-850 rounded w-3/4" />
                </div>
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
              No complete novels currently cataloged in this language
            </p>
            <p className="text-xs text-stone-500 max-w-sm mx-auto">
              Additional titles are being processed through our verified ingestion feeds.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
