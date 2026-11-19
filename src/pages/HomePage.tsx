import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Book } from '../types/book';
import { CatalogService } from '../services/catalogService';
import { MOCK_LANGUAGES } from '../data/mockLanguages';
import { BookCard } from '../components/book/BookCard';
import { RightsBadge } from '../components/book/RightsBadge';
import { useLibrary } from '../context/LibraryContext';
import {
  BookOpen,
  ArrowRight,
  Sparkles,
  Globe,
  Clock,
  Compass,
  CheckCircle2,
  Bookmark,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLang, setSelectedLang] = useState<string>('all');
  const { readingProgress } = useLibrary();

  useEffect(() => {
    let isMounted = true;
    CatalogService.getAllBooks()
      .then(fetchedBooks => {
        if (isMounted) {
          setBooks(fetchedBooks);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoading(false);
      });
    return () => { isMounted = false; };
  }, []);

  // Featured Masterwork (100% complete, verified)
  const featuredBook = books.find(b => b.fullBookAvailable && b.slug === 'the-last-tide-of-padma') || books[0];

  // Complete books
  const completeBooks = books.filter(b => b.fullBookAvailable && b.accessType === 'full_book');

  // Filtered by language
  const languageFilteredBooks = selectedLang === 'all'
    ? completeBooks
    : completeBooks.filter(b => b.languageId === selectedLang);

  // Multilingual spotlight (Arabic, Urdu, Bengali, Hindi)
  const vernacularBooks = books.filter(b => ['bn', 'ar', 'ur', 'hi'].includes(b.languageId));

  // Last read book for instant resume
  const lastReadId = Object.keys(readingProgress)[0];
  const lastReadBook = books.find(b => b.id === lastReadId);
  const lastReadData = lastReadBook ? readingProgress[lastReadBook.id] : null;

  return (
    <div className="space-y-16 pb-20">
      {/* 1. LITERARY HERO FEATURE */}
      {featuredBook && (
        <section className="pt-6 sm:pt-10">
          <div className="rounded-2xl border border-stone-200 dark:border-night-border bg-white dark:bg-night-surface p-6 sm:p-10 shadow-card overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Left Column: Book Presentation */}
              <div className="md:col-span-5 flex justify-center">
                <div className="relative w-48 sm:w-64 aspect-[2/3] rounded-lg shadow-2xl overflow-hidden border border-stone-300 dark:border-stone-800">
                  <img
                    src={featuredBook.coverImageUrl}
                    alt={featuredBook.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <RightsBadge
                      accessType={featuredBook.accessType}
                      fullBookAvailable={featuredBook.fullBookAvailable}
                    />
                  </div>
                </div>
              </div>

              {/* Right Column: Editorial Overview */}
              <div className="md:col-span-7 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono tracking-widest uppercase text-stone-500 dark:text-stone-400">
                    Featured Masterwork · {featuredBook.publicationYear}
                  </span>
                  <span className="text-stone-300 dark:text-stone-700">·</span>
                  <span className="text-[11px] font-mono tracking-widest uppercase text-stone-500 dark:text-stone-400">
                    {featuredBook.languageId.toUpperCase()}
                  </span>
                </div>

                <div>
                  <h1 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-stone-950 dark:text-stone-50 leading-tight">
                    {featuredBook.title}
                  </h1>
                  {featuredBook.originalTitle && (
                    <p className="font-indic text-sm sm:text-base text-stone-500 dark:text-stone-400 mt-1">
                      {featuredBook.originalTitle} · {featuredBook.author.name}
                    </p>
                  )}
                </div>

                <p className="text-sm sm:text-base text-stone-600 dark:text-stone-300 leading-relaxed max-w-2xl">
                  {featuredBook.synopsis}
                </p>

                <div className="pt-4 flex flex-wrap items-center gap-3">
                  <Link
                    to={`/read/${featuredBook.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-stone-900 text-white hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white transition-colors shadow-sm"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>Read Complete Novel</span>
                  </Link>

                  <Link
                    to={`/book/${featuredBook.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-night-border transition-colors border border-stone-200 dark:border-night-border"
                  >
                    <span>Book Overview & Chapters</span>
                  </Link>
                </div>

                <div className="pt-2 text-xs font-mono text-stone-400 dark:text-stone-500 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Licensed directly via {featuredBook.sourceProviderName}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 2. RECENT RESUME SHELF (If reader has any active session) */}
      {lastReadBook && lastReadData && (
        <section className="p-4 rounded-xl border border-stone-200 dark:border-night-border bg-stone-50 dark:bg-night-surface flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 flex items-center justify-center flex-shrink-0">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-mono tracking-wider uppercase text-stone-500 dark:text-stone-400 block">
                Continue Reading
              </span>
              <h4 className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100 line-clamp-1">
                {lastReadBook.title}
              </h4>
              <span className="text-xs text-stone-500 dark:text-stone-400">
                Chapter {lastReadData.currentChapterIndex} · {lastReadData.progressionPercentage}% completed
              </span>
            </div>
          </div>

          <Link
            to={`/read/${lastReadBook.slug}?chapter=${lastReadData.currentChapterIndex}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-stone-900 text-white hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 transition-colors whitespace-nowrap"
          >
            <span>Resume Chapter</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </section>
      )}

      {/* 3. MULTILINGUAL SELECTOR BAR */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 dark:border-night-border pb-3">
          <div>
            <h2 className="font-serif font-bold text-xl sm:text-2xl text-stone-950 dark:text-stone-50">
              Verified Complete Novels
            </h2>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              100% full-book reading authorized from chapter one to the end.
            </p>
          </div>

          <Link
            to="/explore"
            className="text-xs font-semibold text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 inline-flex items-center gap-1"
          >
            <span>Explore Entire Catalog</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Language Filter Pills */}
        <div className="flex flex-wrap gap-1.5 pb-2">
          <button
            onClick={() => setSelectedLang('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              selectedLang === 'all'
                ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-semibold shadow-sm'
                : 'bg-stone-100 dark:bg-night-surface text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-night-border'
            }`}
          >
            All Languages ({completeBooks.length})
          </button>
          {MOCK_LANGUAGES.slice(0, 8).map(lang => {
            const count = completeBooks.filter(b => b.languageId === lang.id).length;
            if (count === 0 && selectedLang !== lang.id) return null;
            return (
              <button
                key={lang.id}
                onClick={() => setSelectedLang(lang.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedLang === lang.id
                    ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 font-semibold shadow-sm'
                    : 'bg-stone-100 dark:bg-night-surface text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-night-border'
                }`}
              >
                <span>{lang.nativeName}</span>
                <span className="opacity-60 ml-1 font-mono text-[10px]">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Books Grid with Loading Shimmer */}
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
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {languageFilteredBooks.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        )}
      </section>

      {/* 4. VERNACULAR & RTL HIGHLIGHT ROW */}
      <section className="space-y-4">
        <div className="border-b border-stone-200 dark:border-night-border pb-3">
          <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest uppercase text-stone-500 dark:text-stone-400">
            <Globe className="w-3.5 h-3.5" />
            <span>Linguistic Heritage</span>
          </div>
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-stone-950 dark:text-stone-50 mt-1">
            Right-to-Left & Indic Literature
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Authentic typography with native Right-to-Left (RTL) reading for Arabic and Urdu, and ligature support for Bengali and Hindi.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {vernacularBooks.slice(0, 4).map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* 5. ETHICAL PUBLISHING GUARANTEE */}
      <section className="rounded-2xl border border-stone-200 dark:border-night-border bg-stone-50 dark:bg-night-surface p-6 sm:p-8">
        <div className="max-w-2xl space-y-2">
          <span className="text-[10px] font-mono tracking-widest uppercase text-stone-500 dark:text-stone-400">
            Platform Standard
          </span>
          <h3 className="font-serif font-bold text-lg sm:text-xl text-stone-950 dark:text-stone-50">
            The Zero-Truncation Principle
          </h3>
          <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
            Every work designated as "Full Book" is authorized for complete reading directly inside our reader. We never misrepresent sample chapters, marketing previews, or unverified search snippets as complete novels.
          </p>
        </div>
      </section>
    </div>
  );
};
