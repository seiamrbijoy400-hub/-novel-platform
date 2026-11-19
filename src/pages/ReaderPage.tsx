import React from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { useCatalogBook } from '../hooks/useCatalogBooks';
import { ReaderView } from '../components/reader/ReaderView';
import { ArrowLeft } from 'lucide-react';

export const ReaderPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const chapterParam = searchParams.get('chapter');
  const initialChapterIndex = chapterParam ? parseInt(chapterParam, 10) : 1;

  const { book, loading } = useCatalogBook(slug);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-3">
        <div className="w-8 h-8 rounded-full border-2 border-stone-900 border-t-transparent animate-spin" />
        <p className="text-xs font-mono text-stone-500">Preparing authorized text stream...</p>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center space-y-3">
        <h2 className="font-serif font-bold text-2xl text-stone-900 dark:text-stone-100">Novel Not Found</h2>
        <p className="text-xs text-stone-500 max-w-sm">The requested novel could not be located in our active catalog.</p>
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

  return (
    <ReaderView
      book={book}
      initialChapterIndex={initialChapterIndex}
    />
  );
};
