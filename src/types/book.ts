export type CompletionStatus = 'completed' | 'ongoing' | 'hiatus' | 'cancelled';
export type AccessType = 'full_book' | 'preview_only' | 'metadata_only';
export type TextDirection = 'ltr' | 'rtl';
export type ModerationStatus = 'pending_review' | 'approved' | 'rejected' | 'quarantined';

export interface Language {
  id: string; // 'en', 'bn', 'hi', 'ur', 'ar', 'zh', 'es', 'fr', etc.
  name: string;
  nativeName: string;
  direction: TextDirection;
  activeCount?: number;
}

export interface Author {
  id: string;
  slug: string;
  name: string;
  nativeName?: string;
  biography: string;
  photoUrl: string;
  country: string;
  verified: boolean;
  totalNovels: number;
}

export interface Publisher {
  id: string;
  name: string;
  countryCode: string;
  websiteUrl?: string;
  partnerSince: string;
}

export interface Chapter {
  id: string;
  chapterIndex: number;
  title: string;
  wordCount: number;
  content: string; // Full chapter text in HTML / clean paragraphs
}

export interface Book {
  id: string;
  slug: string;
  isbn13?: string;
  title: string;
  originalTitle?: string;
  languageId: string;
  direction: TextDirection;
  author: Author;
  publisher?: Publisher;
  publicationDate: string; // ISO format (>= 2000 prioritized)
  publicationYear: number;
  genres: string[];
  synopsis: string;
  coverImageUrl: string;
  completionStatus: CompletionStatus;
  accessType: AccessType;
  fullBookAvailable: boolean;
  contentRating: 'General Audience' | 'Teen (13+)' | 'Young Adult (16+)' | 'Mature Non-Explicit (18+)';
  moderationStatus: ModerationStatus;
  isAdultRestricted: boolean; // True if rejected/quarantined by explicit filter
  sourceProviderCode: string; // e.g. 'streetlib', 'draft2digital', 'direct_author'
  sourceProviderName: string;
  rightsHolderName: string;
  allowedTerritories: string[]; // ISO 3166-1 alpha-2, e.g. ['GLOBAL'] or ['US', 'IN', 'BD', 'GB']
  ratingAverage: number;
  ratingCount: number;
  totalChapters: number;
  estimatedReadingMinutes: number;
  chapters?: Chapter[];
  /** Original record on the source provider, when this is a real catalog import. */
  sourceUrl?: string;
}

export interface ReadingProgress {
  bookId: string;
  currentChapterIndex: number;
  progressionPercentage: number;
  lastReadAt: string;
  cfiLocator?: string;
}

export interface Bookmark {
  id: string;
  bookId: string;
  bookTitle: string;
  chapterIndex: number;
  chapterTitle: string;
  selectedText: string;
  note?: string;
  createdAt: string;
}
