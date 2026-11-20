import React, { useState, useMemo } from 'react';
import { MOCK_LANGUAGES } from '../data/mockLanguages';
import { MOCK_GENRES } from '../data/mockGenres';
import { BookCard } from '../components/book/BookCard';
import { useCatalogBooks } from '../hooks/useCatalogBooks';
import { Search, RotateCcw, CheckCircle2 } from 'lucide-react';

export const ExplorePage: React.FC = () => {
  const { books, loading } = useCatalogBooks();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [fullBookOnly, setFullBookOnly] = useState<boolean>(false);
  const [selectedYear, setSelectedYear] = useState<string>('all');

  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      if (fullBookOnly && (!book.fullBookAvailable || book.accessType !== 'full_book')) {
        return false;
      }
      if (selectedLanguage !== 'all' && book.languageId !== selectedLanguage) {
        return false;
      }
      if (selectedGenre !== 'all' && !book.genres.some(g => g.toLowerCase() === selectedGenre.toLowerCase())) {
        return false;
      }
      if (selectedYear === '2020+' && book.publicationYear < 2020) {
        return false;
      }
      if (selectedYear === '2000-2019' && (book.publicationYear < 2000 || book.publicationYear >= 2020)) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = book.title.toLowerCase().includes(q);
        const matchOriginal = book.originalTitle?.toLowerCase().includes(q) || false;
        const matchAuthor = book.author.name.toLowerCase().includes(q);
        if (!matchTitle && !matchOriginal && !matchAuthor) return false;
      }
      return true;
    });
  }, [books, fullBookOnly, selectedLanguage, selectedGenre, selectedYear, searchQuery]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedLanguage('all');
    setSelectedGenre('all');
    setFullBookOnly(false);
    setSelectedYear('all');
  };

  return (
    <div className="space-y-8 pb-20 pt-4">
      {/* Header */}
      <div className="border-b border-stone-200 dark:border-night-border pb-6">
        <h1 className="font-serif font-bold text-3xl sm:text-4xl text-stone-950 dark:text-stone-50 mb-2">
          Explore Literature
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-400 max-w-2xl leading-relaxed">
          Discover complete, legally authorized novels across global languages. Search by title, author, or filter by original script and publication era.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="rounded-xl border border-stone-200 dark:border-night-border bg-white dark:bg-night-surface p-4 sm:p-6 shadow-sm space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, author, or language..."
            className="w-full bg-stone-50 dark:bg-night border border-stone-200 dark:border-night-border rounded-lg pl-10 pr-4 py-2.5 text-xs sm:text-sm font-medium focus:outline-none focus:ring-1 focus:ring-stone-400 dark:focus:ring-stone-600"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-stone-400 hover:text-stone-700"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Controls Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          {/* Language Selector */}
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-stone-500 mb-1">
              Language
            </label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full bg-stone-50 dark:bg-night border border-stone-200 dark:border-night-border rounded-lg p-2 font-medium"
            >
              <option value="all">All Languages</option>
              {MOCK_LANGUAGES.map(lang => (
                <option key={lang.id} value={lang.id}>
                  {lang.name} ({lang.nativeName})
                </option>
              ))}
            </select>
          </div>

          {/* Genre Selector */}
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-stone-500 mb-1">
              Genre
            </label>
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="w-full bg-stone-50 dark:bg-night border border-stone-200 dark:border-night-border rounded-lg p-2 font-medium"
            >
              <option value="all">All Genres</option>
              {MOCK_GENRES.map(g => (
                <option key={g.id} value={g.name}>{g.name}</option>
              ))}
            </select>
          </div>

          {/* Publication Year Range */}
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-stone-500 mb-1">
              Publication Period
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full bg-stone-50 dark:bg-night border border-stone-200 dark:border-night-border rounded-lg p-2 font-medium"
            >
              <option value="all">2000 – Present (All)</option>
              <option value="2020+">2020 – Present (Recent)</option>
              <option value="2000-2019">2000 – 2019 (Contemporary)</option>
            </select>
          </div>

          {/* Full-Book Verification Toggle */}
          <div className="flex flex-col justify-end">
            <button
              type="button"
              onClick={() => setFullBookOnly(!fullBookOnly)}
              className={`flex items-center justify-between p-2 rounded-lg border text-xs font-medium transition-colors ${
                fullBookOnly
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800'
                  : 'bg-stone-50 dark:bg-night border-stone-200 dark:border-night-border text-stone-600 dark:text-stone-400'
              }`}
            >
              <span className="flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Full Books Only</span>
              </span>
              <span className="text-[10px] font-mono uppercase opacity-75">
                {fullBookOnly ? 'Active' : 'Off'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Result Metrics Bar */}
      <div className="flex items-center justify-between text-xs font-mono text-stone-500 dark:text-stone-400 px-1">
        <span>Showing {filteredBooks.length} verified titles</span>
        {(searchQuery || selectedLanguage !== 'all' || selectedGenre !== 'all' || selectedYear !== 'all') && (
          <button
            onClick={resetFilters}
            className="inline-flex items-center gap-1 text-stone-900 dark:text-stone-200 hover:underline font-semibold"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset filters</span>
          </button>
        )}
      </div>

      {/* Book Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(idx => (
            <div key={idx} className="rounded-xl border border-stone-200 dark:border-night-border overflow-hidden animate-pulse">
              <div className="aspect-[2/3] bg-stone-200 dark:bg-stone-850" />
              <div className="p-4 space-y-2">
                <div className="h-4 bg-stone-200 dark:bg-stone-850 rounded w-3/4" />
                <div className="h-3 bg-stone-200 dark:bg-stone-850 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredBooks.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 rounded-xl border border-dashed border-stone-300 dark:border-night-border p-8 space-y-3">
          <p className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
            No novels found for this combination
          </p>
          <p className="text-xs text-stone-500 dark:text-stone-400 max-w-sm mx-auto">
            Try loosening your filters or disabling the "Full Books Only" option to discover preview editions.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 rounded-lg text-xs font-semibold bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 hover:bg-stone-800 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
