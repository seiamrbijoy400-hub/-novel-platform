import { Author } from '../types/book';

export const MOCK_AUTHORS: Author[] = [
  {
    id: 'auth-1', slug: 'anisur-rahman', name: 'Anisur Rahman', nativeName: 'আনিসুর রহমান',
    biography: 'Contemporary Bengali novelist and essayist, winner of the Dhaka Literary Prize 2018. His prose maps the living delta — rivers, erosion, and the people who outlast both.',
    photoUrl: 'https://picsum.photos/seed/auth1/300/300',
    country: 'Bangladesh', verified: true, totalNovels: 6,
  },
  {
    id: 'auth-2', slug: 'layla-al-hassan', name: 'Layla Al-Hassan', nativeName: 'ليلى الحسن',
    biography: 'Cairo-born historian and speculative fiction writer whose acclaimed mysteries explore the intellectual salons of Alexandria and the archaeology of modern identity.',
    photoUrl: 'https://picsum.photos/seed/auth2/300/300',
    country: 'Egypt', verified: true, totalNovels: 4,
  },
  {
    id: 'auth-3', slug: 'marcus-vance', name: 'Marcus Vance',
    biography: 'Former aerospace engineer turned full-time science fiction author. His climate-fiction novels have been translated into 12 languages and shortlisted for the Arthur C. Clarke Award.',
    photoUrl: 'https://picsum.photos/seed/auth3/300/300',
    country: 'United Kingdom', verified: true, totalNovels: 8,
  },
  {
    id: 'auth-4', slug: 'priya-sharma', name: 'Priya Sharma', nativeName: 'प्रिया शर्मा',
    biography: 'New Delhi author whose novels chronicle the collision of classical Indian tradition with startup culture, technology, and modern love.',
    photoUrl: 'https://picsum.photos/seed/auth4/300/300',
    country: 'India', verified: true, totalNovels: 5,
  },
  {
    id: 'auth-5', slug: 'carlos-mendez', name: 'Carlos Méndez',
    biography: 'Barcelona-based literary author. His lyrical prose resurrects forgotten family estates across the Valencian coast and the layered histories they hold.',
    photoUrl: 'https://picsum.photos/seed/auth5/300/300',
    country: 'Spain', verified: true, totalNovels: 7,
  },
  {
    id: 'auth-6', slug: 'tariq-qureshi', name: 'Tariq Qureshi', nativeName: 'طارق قریشی',
    biography: 'Lahore-born Urdu fiction writer celebrated for psychological depth, vivid cultural portraiture, and an intimate understanding of generational memory.',
    photoUrl: 'https://picsum.photos/seed/auth6/300/300',
    country: 'Pakistan', verified: true, totalNovels: 5,
  },
];
