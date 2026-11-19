export type UserRole = 'reader' | 'author' | 'moderator' | 'admin';

export interface User {
  id: string;
  email: string;
  displayName: string;
  avatarUrl: string;
  role: UserRole;
  preferredLanguage: string;
  countryCode: string; // ISO 2-letter
  libraryBookIds: string[];
  favoriteBookIds: string[];
  joinedAt: string;
}

export interface ReadingSettings {
  fontSize: number; // in pixels (e.g. 14 to 28)
  fontFamily: 'literata' | 'sans-serif' | 'arabic' | 'indic';
  theme: 'light' | 'sepia' | 'dark' | 'night';
  lineHeight: number; // 1.4 to 2.2
  marginHorizontal: number; // 16 to 64
  readingMode: 'scroll' | 'paginated';
  distractionFree: boolean;
}
