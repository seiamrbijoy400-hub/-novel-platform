import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_AUTHORS } from '../data/mockAuthors';
import { MOCK_BOOKS } from '../data/mockBooks';
import { BookCard } from '../components/book/BookCard';
import { Button } from '../components/ui/Button';
import { CheckCircle2, Globe2, UserPlus, BookOpen } from 'lucide-react';

export const AuthorProfilePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [isFollowing, setIsFollowing] = useState(false);

  const author = MOCK_AUTHORS.find(a => a.slug === slug) || MOCK_AUTHORS[0];
  const authorBooks = MOCK_BOOKS.filter(b => b.author.id === author.id);

  return (
    <div className="space-y-10 pb-16">
      {/* Author Profile Header */}
      <div className="bg-white dark:bg-stone-800 border-2 border-stone-900 dark:border-stone-200 rounded-3xl p-6 sm:p-10 shadow-xl flex flex-col md:flex-row items-start md:items-center gap-6">
        <div className="relative w-28 h-28 rounded-2xl overflow-hidden border-2 border-stone-900 shadow-sm flex-shrink-0">
          <img src={author.photoUrl} alt={author.name} className="w-full h-full object-cover" />
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="font-sans font-extrabold text-3xl text-stone-900 dark:text-stone-100">
              {author.name}
            </h1>
            {author.nativeName && (
              <span className="text-sm font-semibold text-violet-700">
                ({author.nativeName})
              </span>
            )}
            {author.verified && (
              <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-lime text-stone-900 px-2 py-0.5 rounded border border-stone-900">
                <CheckCircle2 className="w-3 h-3" />
                Verified Creator
              </span>
            )}
          </div>

          <p className="text-xs font-mono text-stone-900/60 dark:text-stone-100/60 flex items-center gap-2">
            <Globe2 className="w-3.5 h-3.5" />
            <span>Origin: {author.country}</span>
            <span>·</span>
            <span>{author.totalNovels} Published Novels</span>
          </p>

          <p className="text-xs sm:text-sm text-stone-900/80 dark:text-stone-100/80 leading-relaxed max-w-2xl">
            {author.biography}
          </p>
        </div>

        <div className="flex-shrink-0">
          <Button
            variant={isFollowing ? 'secondary' : 'accent'}
            onClick={() => setIsFollowing(!isFollowing)}
          >
            <UserPlus className="w-4 h-4" />
            <span>{isFollowing ? 'Following' : 'Follow Author'}</span>
          </Button>
        </div>
      </div>

      {/* Author's Books Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b-2 border-stone-900 dark:border-stone-200 pb-2">
          <h2 className="font-sans font-bold text-2xl text-stone-900 dark:text-stone-100 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-violet-700" />
            <span>Authorized Works by {author.name}</span>
          </h2>
          <span className="text-xs font-mono font-bold opacity-60">
            {authorBooks.length} Novels
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {authorBooks.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
};
