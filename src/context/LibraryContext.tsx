import React, { createContext, useContext, useState, useEffect } from 'react';
import { Bookmark, ReadingProgress } from '../types/book';
import { readStored, writeStored } from '../utils/storage';

interface LibraryContextType {
  libraryIds: string[];
  favoriteIds: string[];
  readingProgress: Record<string, ReadingProgress>;
  bookmarks: Bookmark[];
  currentTerritory: string;
  setTerritory: (countryCode: string) => void;
  toggleLibrary: (bookId: string) => void;
  toggleFavorite: (bookId: string) => void;
  updateProgress: (bookId: string, chapterIndex: number, totalChapters: number) => void;
  addBookmark: (bookmark: Omit<Bookmark, 'id' | 'createdAt'>) => void;
  removeBookmark: (bookmarkId: string) => void;
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

const DEFAULT_PROGRESS: Record<string, ReadingProgress> = {
  'book-1': {
    bookId: 'book-1',
    currentChapterIndex: 1,
    progressionPercentage: 25.0,
    lastReadAt: new Date().toISOString(),
  },
};

/**
 * Progress written by older builds can be missing fields (for example
 * `lastReadAt`), which used to crash the home page into a blank screen.
 * Normalise whatever is in storage instead of trusting its shape.
 */
function loadProgress(): Record<string, ReadingProgress> {
  const stored = readStored<Record<string, unknown>>('novela_progress', DEFAULT_PROGRESS);
  if (!stored || typeof stored !== 'object' || Array.isArray(stored)) return DEFAULT_PROGRESS;

  const clean: Record<string, ReadingProgress> = {};
  for (const [id, value] of Object.entries(stored)) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) continue;
    const entry = value as Partial<ReadingProgress>;
    if (typeof entry.currentChapterIndex !== 'number') continue;
    clean[id] = {
      bookId: typeof entry.bookId === 'string' ? entry.bookId : id,
      currentChapterIndex: entry.currentChapterIndex,
      progressionPercentage:
        typeof entry.progressionPercentage === 'number' ? entry.progressionPercentage : 0,
      lastReadAt: typeof entry.lastReadAt === 'string' ? entry.lastReadAt : new Date().toISOString(),
      cfiLocator: typeof entry.cfiLocator === 'string' ? entry.cfiLocator : undefined,
    };
  }

  return Object.keys(clean).length > 0 ? clean : DEFAULT_PROGRESS;
}

const DEFAULT_BOOKMARKS: Bookmark[] = [
  {
    id: 'bm-1',
    bookId: 'book-1',
    bookTitle: 'The Last Tide of Padma',
    chapterIndex: 1,
    chapterTitle: 'অধ্যায় ১ — কূলভাঙা নদীর গান',
    selectedText: 'পদ্মার ভাঙন কোনোদিন কারও জন্য অপেক্ষা করেনি...',
    note: 'Poetic opening reflection on human endurance.',
    createdAt: '2026-11-18T16:20:00Z',
  },
];

function loadBookmarks(): Bookmark[] {
  const stored = readStored<unknown>('novela_bookmarks', DEFAULT_BOOKMARKS);
  if (!Array.isArray(stored)) return DEFAULT_BOOKMARKS;
  const clean = stored.filter(
    (bm): bm is Bookmark =>
      !!bm && typeof bm === 'object' && typeof (bm as Bookmark).id === 'string'
  );
  return clean;
}

export const LibraryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [libraryIds, setLibraryIds] = useState<string[]>(() =>
    readStored('novela_library', ['book-1', 'book-2', 'book-3'])
  );

  const [favoriteIds, setFavoriteIds] = useState<string[]>(() =>
    readStored('novela_favorites', ['book-1', 'book-4'])
  );

  const [currentTerritory, setCurrentTerritory] = useState<string>(() => {
    try {
      return localStorage.getItem('novela_territory') || 'US';
    } catch {
      return 'US';
    }
  });

  const [readingProgress, setReadingProgress] = useState<Record<string, ReadingProgress>>(
    loadProgress
  );

  const [bookmarks, setBookmarks] = useState<Bookmark[]>(loadBookmarks);

  useEffect(() => writeStored('novela_library', libraryIds), [libraryIds]);
  useEffect(() => writeStored('novela_favorites', favoriteIds), [favoriteIds]);
  useEffect(() => writeStored('novela_progress', readingProgress), [readingProgress]);
  useEffect(() => writeStored('novela_bookmarks', bookmarks), [bookmarks]);

  useEffect(() => {
    try {
      localStorage.setItem('novela_territory', currentTerritory);
    } catch {
      // Ignore storage errors.
    }
  }, [currentTerritory]);

  const setTerritory = (code: string) => {
    setCurrentTerritory(code.toUpperCase());
  };

  const toggleLibrary = (bookId: string) => {
    setLibraryIds(prev =>
      prev.includes(bookId) ? prev.filter(id => id !== bookId) : [...prev, bookId]
    );
  };

  const toggleFavorite = (bookId: string) => {
    setFavoriteIds(prev =>
      prev.includes(bookId) ? prev.filter(id => id !== bookId) : [...prev, bookId]
    );
  };

  const updateProgress = (bookId: string, chapterIndex: number, totalChapters: number) => {
    const pct = Math.min(100, Math.round((chapterIndex / totalChapters) * 100));
    setReadingProgress(prev => ({
      ...prev,
      [bookId]: {
        bookId,
        currentChapterIndex: chapterIndex,
        progressionPercentage: pct,
        lastReadAt: new Date().toISOString(),
      }
    }));
  };

  const addBookmark = (bm: Omit<Bookmark, 'id' | 'createdAt'>) => {
    const newBm: Bookmark = {
      ...bm,
      id: `bm-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setBookmarks(prev => [newBm, ...prev]);
  };

  const removeBookmark = (id: string) => {
    setBookmarks(prev => prev.filter(b => b.id !== id));
  };

  return (
    <LibraryContext.Provider value={{
      libraryIds,
      favoriteIds,
      readingProgress,
      bookmarks,
      currentTerritory,
      setTerritory,
      toggleLibrary,
      toggleFavorite,
      updateProgress,
      addBookmark,
      removeBookmark,
    }}>
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (!context) throw new Error('useLibrary must be used within a LibraryProvider');
  return context;
};
