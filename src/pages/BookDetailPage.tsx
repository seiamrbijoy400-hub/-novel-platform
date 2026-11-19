import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCatalogBook } from '../hooks/useCatalogBooks';
import { useLibrary } from '../context/LibraryContext';
import { RightsEngine } from '../services/rightsEngine';
import { RightsBadge } from '../components/book/RightsBadge';
import { BookCover } from '../components/book/BookCover';
import {
  BookOpen,
  Bookmark,
  Share2,
  ShieldCheck,
  Calendar,
  Layers,
  Flag,
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
} from 'lucide-react';

export const BookDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { libraryIds, toggleLibrary, readingProgress, currentTerritory } = useLibrary();
  const { book, loading } = useCatalogBook(slug);
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState('corrupted_formatting');
  const [reportSubmitted, setReportSubmitted] = useState(false);

  if (loading) {
    return (
      <div className="py-20 text-center space-y-4">
        <div className="w-8 h-8 rounded-full border-2 border-stone-900 border-t-transparent animate-spin mx-auto" />
        <p className="text-xs font-mono text-stone-500">Retrieving novel metadata...</p>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="font-serif font-bold text-2xl text-stone-900 dark:text-stone-100">Novel Not Found</h2>
        <p className="text-xs text-stone-500 max-w-sm mx-auto">
          The requested novel could not be located in our active library collection.
        </p>
        <Link
          to="/explore"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-stone-900 text-white hover:bg-stone-800 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Catalog</span>
        </Link>
      </div>
    );
  }

  const isInLibrary = libraryIds.includes(book.id);
  const progress = readingProgress[book.id];
  const entitlement = RightsEngine.verifyEntitlement(book, currentTerritory);
  const isRtl = book.direction === 'rtl';

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReportSubmitted(true);
    setTimeout(() => {
      setReportModalOpen(false);
      setReportSubmitted(false);
    }, 2000);
  };

  return (
    <div className="space-y-12 pb-20 pt-4">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs font-mono text-stone-500 dark:text-stone-400">
        <Link to="/explore" className="hover:underline">Catalog</Link>
        <span>/</span>
        <span className="uppercase">{book.languageId}</span>
        <span>/</span>
        <span className="text-stone-900 dark:text-stone-100 font-semibold truncate max-w-xs">{book.title}</span>
      </nav>

      {/* Main Details Presentation */}
      <div className="rounded-2xl border border-stone-200 dark:border-night-border bg-white dark:bg-night-surface p-6 sm:p-10 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Book Cover & Shelf Action */}
          <div className="md:col-span-4 lg:col-span-4 flex flex-col items-center sm:items-start space-y-4">
            <div className="relative w-48 sm:w-60 aspect-[2/3] rounded-lg shadow-xl overflow-hidden border border-stone-300 dark:border-stone-800 bg-stone-100">
              <BookCover
                src={book.coverImageUrl}
                title={book.title}
                authorName={book.author.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2.5 left-2.5">
                <RightsBadge
                  accessType={book.accessType}
                  fullBookAvailable={book.fullBookAvailable}
                />
              </div>
            </div>

            <button
              onClick={() => toggleLibrary(book.id)}
              className={`w-48 sm:w-60 py-2.5 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors border ${
                isInLibrary
                  ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 border-amber-300 dark:border-amber-800'
                  : 'bg-stone-50 dark:bg-night border-stone-200 dark:border-night-border text-stone-700 dark:text-stone-300 hover:bg-stone-100'
              }`}
            >
              <Bookmark className="w-4 h-4" fill={isInLibrary ? 'currentColor' : 'none'} />
              <span>{isInLibrary ? 'Saved in Your Reading Shelf' : 'Save to Reading Shelf'}</span>
            </button>
          </div>

          {/* Right Column: Bibliographic Data & Reading Actions */}
          <div className="md:col-span-8 lg:col-span-8 space-y-6">
            <div>
              {book.originalTitle && book.originalTitle !== book.title && (
                <p className={`text-sm text-stone-500 dark:text-stone-400 mb-1 font-medium ${isRtl ? 'font-arabic' : 'font-indic'}`}>
                  {book.originalTitle}
                </p>
              )}
              <h1 className="font-serif font-bold text-3xl sm:text-4xl text-stone-950 dark:text-stone-50 leading-tight">
                {book.title}
              </h1>
              <p className="text-sm text-stone-600 dark:text-stone-400 mt-2 font-medium">
                Written by{' '}
                <Link to={`/author/${book.author.slug}`} className="text-stone-950 dark:text-stone-100 font-bold hover:underline">
                  {book.author.name}
                </Link>
              </p>
            </div>

            {/* Metrics Row */}
            <div className="flex flex-wrap items-center gap-4 py-3 border-y border-stone-100 dark:border-night-border text-xs font-mono text-stone-600 dark:text-stone-400">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                <span>Published: {book.publicationYear}</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                <span>{book.totalChapters} Chapters</span>
              </span>
              <span>·</span>
              <span className="uppercase">Language: {book.languageId}</span>
              <span>·</span>
              <span>{book.genres.join(', ')}</span>
            </div>

            {/* Synopsis */}
            <div className="space-y-2">
              <h3 className="text-[11px] font-mono tracking-widest uppercase text-stone-400 dark:text-stone-500">
                Synopsis
              </h3>
              <p className="text-sm sm:text-base text-stone-700 dark:text-stone-300 leading-relaxed">
                {book.synopsis}
              </p>
            </div>

            {/* Verified Rights & Territory Status */}
            <div className="p-4 rounded-xl border border-stone-200 dark:border-night-border bg-stone-50 dark:bg-night space-y-2 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-stone-200 dark:border-night-border">
                <div className="flex items-center gap-1.5 font-semibold text-stone-900 dark:text-stone-100">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Rights & License Verification</span>
                </div>
                <span className="text-[10px] font-mono uppercase bg-stone-200 dark:bg-stone-800 px-2 py-0.5 rounded text-stone-700 dark:text-stone-300">
                  {book.sourceProviderName}
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-stone-600 dark:text-stone-400 font-mono">
                <div>Rights Holder: {book.rightsHolderName}</div>
                <div>Territorial Rights: {book.allowedTerritories.join(', ')}</div>
              </div>
              <div className="pt-1 text-[11px] font-medium flex items-center gap-1.5">
                {entitlement.allowed ? (
                  <span className="text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Authorized for complete reading in your territory</span>
                  </span>
                ) : (
                  <span className="text-amber-700 dark:text-amber-400 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>{entitlement.message}</span>
                  </span>
                )}
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
              <Link
                to={`/read/${book.slug}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold bg-stone-900 text-white hover:bg-stone-800 dark:bg-stone-100 dark:text-stone-900 dark:hover:bg-white transition-colors shadow-sm"
              >
                <BookOpen className="w-4 h-4" />
                <span>
                  {progress
                    ? `Resume from Chapter ${progress.currentChapterIndex}`
                    : (book.accessType === 'full_book' ? 'Read Complete Novel' : 'View Publisher Preview')}
                </span>
              </Link>

              <button
                onClick={() => setReportModalOpen(true)}
                className="text-xs font-mono text-stone-400 hover:text-stone-700 dark:hover:text-stone-300 flex items-center gap-1.5"
              >
                <Flag className="w-3.5 h-3.5" />
                <span>Report Content or Formatting Issue</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chapters Table of Contents */}
      <section className="rounded-2xl border border-stone-200 dark:border-night-border bg-white dark:bg-night-surface p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between border-b border-stone-100 dark:border-night-border pb-3">
          <h2 className="font-serif font-bold text-lg sm:text-xl text-stone-950 dark:text-stone-50">
            Table of Contents
          </h2>
          <span className="text-xs font-mono text-stone-500">
            {book.chapters?.length || 0} Chapters
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {book.chapters?.map((ch) => (
            <Link
              key={ch.id}
              to={`/read/${book.slug}?chapter=${ch.chapterIndex}`}
              className="p-3.5 rounded-lg border border-stone-200/80 dark:border-night-border hover:bg-stone-50 dark:hover:bg-night transition-colors flex items-center justify-between group"
            >
              <div>
                <span className="text-[10px] font-mono text-stone-400 block">Chapter {ch.chapterIndex}</span>
                <span className="text-xs font-semibold text-stone-900 dark:text-stone-100 group-hover:underline line-clamp-1">
                  {ch.title}
                </span>
              </div>
              <span className="text-[10px] font-mono text-stone-400">
                {ch.wordCount} words
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Report Modal */}
      {reportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-night-surface border border-stone-300 dark:border-night-border rounded-xl max-w-md w-full p-6 space-y-4 shadow-xl">
            <h3 className="font-serif font-bold text-lg text-stone-900 dark:text-stone-100">
              Report Content Issue
            </h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              Submissions are audited against our strict zero-erotica and copyright standards.
            </p>
            {reportSubmitted ? (
              <div className="p-4 bg-emerald-50 text-emerald-900 rounded-lg text-xs font-medium text-center">
                ✓ Report logged successfully for editorial review.
              </div>
            ) : (
              <form onSubmit={handleReportSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-medium mb-1">Category</label>
                  <select
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                    className="w-full bg-stone-50 dark:bg-night border border-stone-200 dark:border-night-border rounded-lg p-2"
                  >
                    <option value="explicit_erotica">Sexually Explicit / Erotic Content</option>
                    <option value="copyright_issue">Copyright / Rights Question</option>
                    <option value="corrupted_formatting">Broken Formatting / Typo Glitch</option>
                    <option value="missing_pages">Incomplete or Truncated Chapter</option>
                  </select>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setReportModalOpen(false)}
                    className="px-3 py-1.5 rounded-lg border border-stone-200 text-stone-600 font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-stone-900 text-white font-semibold"
                  >
                    Submit Report
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
