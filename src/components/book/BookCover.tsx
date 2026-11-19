import React, { useState } from 'react';

interface BookCoverProps {
  src?: string;
  title: string;
  authorName?: string;
  className?: string;
}

/** Renders a cover image, falling back to a typographic cover if it fails. */
export const BookCover: React.FC<BookCoverProps> = ({ src, title, authorName, className = '' }) => {
  const [failed, setFailed] = useState(!src);

  if (failed || !src) {
    return (
      <div className={`${className} flex flex-col justify-between p-6 bg-gradient-to-br from-stone-200 via-stone-100 to-stone-300 dark:from-stone-800 dark:via-stone-900 dark:to-black text-stone-900 dark:text-stone-100`}>
        <span className="text-[10px] font-mono uppercase tracking-widest opacity-60">Novela Global</span>
        <div>
          <h4 className="font-serif font-bold text-lg leading-snug line-clamp-4">{title}</h4>
          {authorName && <p className="text-xs opacity-75 mt-1">{authorName}</p>}
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={`Cover of ${title}`}
      onError={() => setFailed(true)}
      className={className}
      loading="lazy"
    />
  );
};
