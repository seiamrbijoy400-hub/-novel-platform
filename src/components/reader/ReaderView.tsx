import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Book, Chapter } from '../../types/book';
import { useReader } from '../../context/ReaderContext';
import { useLibrary } from '../../context/LibraryContext';
import { RightsEngine } from '../../services/rightsEngine';
import { ReaderSettingsModal } from './ReaderSettingsModal';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Sliders,
  Bookmark as BookmarkIcon,
  List,
  Maximize2,
  Minimize2,
  ShieldAlert,
  CheckCircle,
} from 'lucide-react';

interface ReaderViewProps {
  book: Book;
  initialChapterIndex?: number;
}

export const ReaderView: React.FC<ReaderViewProps> = ({ book, initialChapterIndex = 1 }) => {
  const { settings, updateSettings } = useReader();
  const { readingProgress, updateProgress, addBookmark, bookmarks, currentTerritory } = useLibrary();
  const navigate = useNavigate();

  const savedChapter = readingProgress[book.id]?.currentChapterIndex || initialChapterIndex;
  const [currentChapterIndex, setCurrentChapterIndex] = useState<number>(savedChapter);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isTocOpen, setIsTocOpen] = useState(false);
  const [bookmarkFeedback, setBookmarkFeedback] = useState(false);

  // Verify territorial entitlement
  const entitlement = RightsEngine.verifyEntitlement(book, currentTerritory);

  const chapters = book.chapters || [];
  const currentChapter: Chapter | undefined = chapters.find(
    (c) => c.chapterIndex === currentChapterIndex
  );

  // Sync reading progress whenever chapter changes
  useEffect(() => {
    if (book && chapters.length > 0) {
      updateProgress(book.id, currentChapterIndex, chapters.length);
    }
  }, [currentChapterIndex, book.id, chapters.length]);

  // Reader theme & font classes
  const themeClasses: Record<string, string> = {
    light:  'bg-white text-stone-900',
    sepia:  'bg-amber-50 text-amber-950',
    dark:   'bg-stone-950 text-stone-100',
    night:  'bg-neutral-950 text-neutral-200',
  };

  const fontClasses: Record<string, string> = {
    literata:    'font-serif',
    'sans-serif':'font-sans',
    arabic:      'font-arabic',
    indic:       'font-indic',
  };

  const readerTheme = themeClasses[settings.theme] || themeClasses.light;
  const readerFont  = fontClasses[settings.fontFamily] || fontClasses.literata;

  // Auto-select font based on language
  const getAutoFont = () => {
    if (book.direction === 'rtl') return fontClasses.arabic;
    if (['bn', 'hi', 'ur'].includes(book.languageId)) return fontClasses.indic;
    return readerFont;
  };

  const handleBookmark = () => {
    if (!currentChapter) return;
    addBookmark({
      bookId: book.id,
      bookTitle: book.title,
      chapterIndex: currentChapterIndex,
      chapterTitle: currentChapter.title,
      selectedText: currentChapter.content.slice(0, 120) + '...',
      note: '',
    });
    setBookmarkFeedback(true);
    setTimeout(() => setBookmarkFeedback(false), 2000);
  };

  // ── Block reading if not authorized ──────────────────────────────────────
  if (!entitlement.allowed) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-950 flex items-center justify-center">
          <ShieldAlert className="w-8 h-8 text-amber-600 dark:text-amber-400" />
        </div>
        <div className="space-y-2 max-w-md">
          <h2 className="font-serif font-bold text-2xl text-stone-900 dark:text-stone-100">
            Access Restricted
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
            {entitlement.message}
          </p>
        </div>
        <Link
          to={`/book/${book.slug}`}
          className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-stone-900 text-white hover:bg-stone-800 transition-colors"
        >
          Return to Book Overview
        </Link>
      </div>
    );
  }

  // ── Show preview wall for preview-only books ──────────────────────────────
  if (book.accessType === 'preview_only' && currentChapterIndex > 1) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-stone-100 dark:bg-stone-900 flex items-center justify-center">
          <BookmarkIcon className="w-8 h-8 text-stone-600 dark:text-stone-400" />
        </div>
        <div className="space-y-2 max-w-md">
          <h2 className="font-serif font-bold text-2xl text-stone-900 dark:text-stone-100">
            Publisher Preview Reached End
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
            This authorized publisher excerpt ends here. The complete novel is available via licensed retail partners.
          </p>
        </div>
        <Link
          to={`/book/${book.slug}`}
          className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-stone-900 text-white hover:bg-stone-800 transition-colors"
        >
          Back to Book Details
        </Link>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-200 ${settings.distractionFree ? 'fixed inset-0 z-50 overflow-y-auto' : ''} ${readerTheme}`}
    >
      {/* Reader Header Bar */}
      {!settings.distractionFree && (
        <header className={`sticky top-0 z-30 border-b px-4 py-3 flex items-center justify-between gap-4 ${
          settings.theme === 'dark' || settings.theme === 'night'
            ? 'bg-stone-950 border-stone-800 text-stone-100'
            : settings.theme === 'sepia'
            ? 'bg-amber-50 border-amber-200 text-amber-950'
            : 'bg-white border-stone-200 text-stone-900'
        }`}>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(`/book/${book.slug}`)}
              className="p-1.5 rounded-lg border border-current hover:opacity-70 transition-opacity"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="hidden sm:block">
              <h2 className="font-serif font-bold text-sm leading-tight line-clamp-1">{book.title}</h2>
              <span className="text-[11px] opacity-70 font-mono">{book.author.name} · {book.languageId.toUpperCase()}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsTocOpen(!isTocOpen)}
              className="px-2.5 py-1.5 rounded-lg border border-current text-xs font-semibold flex items-center gap-1.5 hover:opacity-80"
            >
              <List className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Contents</span>
            </button>

            <button
              onClick={handleBookmark}
              className={`p-2 rounded-lg border border-current transition-colors ${
                bookmarkFeedback ? 'bg-lime text-stone-950 border-lime' : 'hover:opacity-80'
              }`}
              title="Bookmark this chapter"
            >
              <BookmarkIcon className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsSettingsOpen(true)}
              className="px-2.5 py-1.5 rounded-lg border border-current text-xs font-semibold flex items-center gap-1.5 hover:opacity-80"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Aa</span>
            </button>

            <button
              onClick={() => updateSettings({ distractionFree: true })}
              className="p-2 rounded-lg border border-current hover:opacity-80"
              title="Focus mode"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </header>
      )}

      {/* Exit Distraction-Free Floating Button */}
      {settings.distractionFree && (
        <button
          onClick={() => updateSettings({ distractionFree: false })}
          className="fixed bottom-4 right-4 z-40 p-3 rounded-full bg-lime text-stone-950 shadow-md hover:scale-105 transition-transform"
        >
          <Minimize2 className="w-5 h-5" />
        </button>
      )}

      {/* Reading Progress Bar */}
      <div className="w-full bg-black/10 dark:bg-white/10 h-0.5">
        <div
          className="bg-lime h-full transition-all duration-300"
          style={{ width: `${((currentChapterIndex) / Math.max(chapters.length, 1)) * 100}%` }}
        />
      </div>

      {/* Table of Contents Drawer */}
      {isTocOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsTocOpen(false)} />
          <div className="relative w-80 max-w-full bg-white dark:bg-stone-950 border-r border-stone-200 dark:border-stone-800 h-full p-6 overflow-y-auto shadow-xl">
            <h3 className="font-serif font-bold text-lg mb-4 text-stone-900 dark:text-stone-100 flex items-center justify-between">
              <span>Chapters</span>
              <span className="text-xs font-mono font-normal opacity-60">{chapters.length} Total</span>
            </h3>
            <div className="space-y-2">
              {chapters.map((ch) => (
                <button
                  key={ch.id}
                  onClick={() => {
                    setCurrentChapterIndex(ch.chapterIndex);
                    setIsTocOpen(false);
                  }}
                  className={`w-full text-left p-3 rounded-lg border text-xs font-semibold transition-all ${
                    ch.chapterIndex === currentChapterIndex
                      ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 border-stone-900'
                      : 'border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-900 text-stone-800 dark:text-stone-200'
                  }`}
                >
                  <span className="block opacity-60 font-mono text-[10px] mb-0.5">Chapter {ch.chapterIndex}</span>
                  <span className="line-clamp-1">{ch.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Chapter Content */}
      <main
        className="flex-1 max-w-3xl mx-auto w-full px-4 py-10 sm:py-16"
        style={{ paddingLeft: `${settings.marginHorizontal}px`, paddingRight: `${settings.marginHorizontal}px` }}
      >
        {currentChapter ? (
          <article
            dir={book.direction}
            className={getAutoFont()}
            style={{ fontSize: `${settings.fontSize}px`, lineHeight: settings.lineHeight }}
          >
            {/* Chapter Header */}
            <div className="mb-10 pb-6 border-b border-current/10 text-center">
              <span className="text-xs font-mono uppercase tracking-widest opacity-50">
                {book.title} · Chapter {currentChapter.chapterIndex} of {chapters.length}
              </span>
              <h1 className="font-serif font-bold text-2xl sm:text-3xl mt-2 tracking-tight leading-tight">
                {currentChapter.title}
              </h1>
            </div>

            {/* Text Body */}
            <div className="space-y-6 whitespace-pre-line leading-relaxed text-justify">
              {currentChapter.content}
            </div>

            {/* Chapter End Marker */}
            <div className="my-16 pt-8 border-t border-current/10 flex flex-col items-center gap-3 text-center">
              <div className="w-2 h-2 rounded-full bg-lime" />
              <span className="text-xs font-mono opacity-50">
                End of Chapter {currentChapter.chapterIndex}
              </span>
            </div>
          </article>
        ) : (
          <div className="text-center py-20">
            <p className="text-sm opacity-60">Chapter content loading...</p>
          </div>
        )}

        {/* Chapter Navigation */}
        <div className="flex items-center justify-between gap-4 pt-8 border-t border-current/10">
          <button
            onClick={() => {
              if (currentChapterIndex > 1) {
                setCurrentChapterIndex(prev => prev - 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            disabled={currentChapterIndex <= 1}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-current/30 text-xs font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-current/5 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <span className="text-xs font-mono opacity-60">
            {currentChapterIndex} / {chapters.length}
          </span>

          <button
            onClick={() => {
              if (currentChapterIndex < chapters.length) {
                setCurrentChapterIndex(prev => prev + 1);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            disabled={currentChapterIndex >= chapters.length}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-current/30 text-xs font-semibold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-current/5 transition-colors"
          >
            <span>Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </main>

      <ReaderSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
};
