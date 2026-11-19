export interface Genre {
  id: string;
  name: string;
  slug: string;
  description: string;
  bookCount: number;
}

export const MOCK_GENRES: Genre[] = [
  { id: 'lit-fic', name: 'Literary Fiction', slug: 'literary-fiction', description: 'Character-driven artistic storytelling and prose', bookCount: 1250 },
  { id: 'clean-romance', name: 'Romance & Relationships', slug: 'romance', description: 'Heartfelt emotional love stories, family drama, and relationships without explicit content', bookCount: 940 },
  { id: 'mystery', name: 'Mystery & Thriller', slug: 'mystery-thriller', description: 'Intrigue, suspense, detective investigations, and courtroom drama', bookCount: 880 },
  { id: 'sci-fi', name: 'Sci-Fi & Speculative', slug: 'sci-fi-speculative', description: 'Futuristic worlds, technology, space exploration, and cyber-fiction', bookCount: 760 },
  { id: 'fantasy', name: 'Fantasy & Myth', slug: 'fantasy-myth', description: 'Magical realms, folk legends, high fantasy, and urban mythologies', bookCount: 820 },
  { id: 'historical', name: 'Historical Fiction', slug: 'historical-fiction', description: 'Compelling narratives set in defining historical eras', bookCount: 650 },
  { id: 'family-saga', name: 'Family Saga', slug: 'family-saga', description: 'Generational struggles, cultural heritage, and interpersonal bonds', bookCount: 490 },
  { id: 'adventure', name: 'Adventure & Survival', slug: 'adventure', description: 'Daring journeys, wilderness survival, and expeditions', bookCount: 380 },
];
