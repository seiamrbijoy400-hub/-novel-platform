import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'lime' | 'violet' | 'coral' | 'neutral' | 'outline';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  className = '',
}) => {
  const base = 'inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full';

  const variants = {
    lime:    'bg-lime text-stone-950',
    violet:  'bg-violet-600 text-white',
    coral:   'bg-red-500 text-white',
    neutral: 'bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300',
    outline: 'border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300',
  };

  return (
    <span className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};
