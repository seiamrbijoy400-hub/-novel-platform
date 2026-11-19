import React from 'react';
import { AccessType } from '../../types/book';

interface RightsBadgeProps {
  accessType: AccessType;
  fullBookAvailable: boolean;
  allowedTerritories?: string[];
  className?: string;
}

export const RightsBadge: React.FC<RightsBadgeProps> = ({
  accessType,
  fullBookAvailable,
  className = '',
}) => {
  if (accessType === 'full_book' && fullBookAvailable) {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold tracking-wide bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60 ${className}`}
        title="Complete authorized novel — 100% readable from first to final page."
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span>100% Complete</span>
      </span>
    );
  }

  if (accessType === 'preview_only') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold tracking-wide bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200 dark:border-amber-800/60 ${className}`}
        title="Authorized publisher preview — Sample chapters available for discovery."
      >
        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
        <span>Preview Sample</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold tracking-wide bg-stone-100 text-stone-700 dark:bg-stone-800 dark:text-stone-300 border border-stone-200 dark:border-stone-700 ${className}`}
      title="Bibliographic catalog record for literary discovery."
    >
      <span className="w-1.5 h-1.5 rounded-full bg-stone-400" />
      <span>Catalog Record</span>
    </span>
  );
};
