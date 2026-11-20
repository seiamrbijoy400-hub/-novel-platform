// Generates public/api/books.json from live Open Library data.
// Run with: node scripts/sync-real-books.mjs
import { mkdir, writeFile } from 'node:fs/promises';
import { fetchRealBooks } from './openlibrary.mjs';

const books = await fetchRealBooks({ limit: 12, force: true });

if (books.length === 0) {
  console.error('No books fetched; keeping existing snapshot.');
  process.exit(1);
}

await mkdir('public/api', { recursive: true });
await writeFile(
  'public/api/books.json',
  JSON.stringify({ savedAt: new Date().toISOString(), books }, null, 2)
);

console.log(`Wrote ${books.length} real books to public/api/books.json`);
