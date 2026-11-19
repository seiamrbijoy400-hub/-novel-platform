import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LibraryProvider } from './context/LibraryContext';
import { ReaderProvider } from './context/ReaderContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { ExplorePage } from './pages/ExplorePage';
import { LanguageBrowsePage } from './pages/LanguageBrowsePage';
import { GenreBrowsePage } from './pages/GenreBrowsePage';
import { PopularPage } from './pages/PopularPage';
import { RecentlyAddedPage } from './pages/RecentlyAddedPage';
import { FeaturedPage } from './pages/FeaturedPage';
import { BookDetailPage } from './pages/BookDetailPage';
import { ReaderPage } from './pages/ReaderPage';
import { AuthorProfilePage } from './pages/AuthorProfilePage';
import { PublisherInfoPage } from './pages/PublisherInfoPage';
import { SearchResultsPage } from './pages/SearchResultsPage';
import { UserLibraryPage } from './pages/UserLibraryPage';
import { ReadingHistoryPage } from './pages/ReadingHistoryPage';
import { BookmarksPage } from './pages/BookmarksPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { ModerationDashboardPage } from './pages/ModerationDashboardPage';
import { LegalInfoPage } from './pages/LegalInfoPage';

export function App() {
  return (
    <LibraryProvider>
      <ReaderProvider>
        <BrowserRouter>
          <div className="flex flex-col min-h-screen bg-paper dark:bg-night text-ink dark:text-paper font-sans transition-colors duration-200">
            <Navbar />
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
              <Routes>
                {/* Core Public Reading Platform Pages - Completely Open without Auth */}
                <Route path="/" element={<HomePage />} />
                <Route path="/explore" element={<ExplorePage />} />
                <Route path="/languages" element={<LanguageBrowsePage />} />
                <Route path="/genres" element={<GenreBrowsePage />} />
                <Route path="/popular" element={<PopularPage />} />
                <Route path="/recent" element={<RecentlyAddedPage />} />
                <Route path="/featured" element={<FeaturedPage />} />
                <Route path="/book/:slug" element={<BookDetailPage />} />
                <Route path="/read/:slug" element={<ReaderPage />} />
                <Route path="/author/:slug" element={<AuthorProfilePage />} />
                <Route path="/publisher/:code" element={<PublisherInfoPage />} />
                <Route path="/publishers" element={<PublisherInfoPage />} />
                <Route path="/search" element={<SearchResultsPage />} />
                <Route path="/library" element={<UserLibraryPage />} />
                <Route path="/history" element={<ReadingHistoryPage />} />
                <Route path="/bookmarks" element={<BookmarksPage />} />
                <Route path="/admin" element={<AdminDashboardPage />} />
                <Route path="/moderation" element={<ModerationDashboardPage />} />
                <Route path="/legal" element={<LegalInfoPage />} />
                {/* Fallback */}
                <Route path="*" element={<HomePage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </ReaderProvider>
    </LibraryProvider>
  );
}

export default App;
