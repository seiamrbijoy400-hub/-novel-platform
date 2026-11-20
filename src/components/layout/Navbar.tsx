import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Sun, Moon, BookMarked, Menu, X, ChevronDown } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isDark, setIsDark] = useState(() => {
    const prefersDark =
      typeof window.matchMedia === 'function'
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
        : false;
    if (prefersDark) {
      document.documentElement.classList.add('dark');
      return true;
    }
    return false;
  });
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  const toggleDark = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { label: 'Explore', to: '/explore' },
    { label: 'Languages', to: '/languages' },
    { label: 'Genres', to: '/genres' },
    { label: 'Popular', to: '/popular' },
    { label: 'New', to: '/recent' },
  ];

  const isActive = (to: string) => location.pathname === to;

  return (
    <>
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-paper/95 dark:bg-night/95 backdrop-blur-xl border-b border-paper-border dark:border-night-border shadow-sm'
          : 'bg-paper dark:bg-night border-b border-paper-border dark:border-night-border'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center h-16 gap-4">
            {/* Wordmark */}
            <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
              <div className="w-8 h-8 rounded-lg bg-ink dark:bg-lime flex items-center justify-center">
                <span className="font-sans font-black text-stone-50 dark:text-stone-950 text-sm tracking-tighter">N</span>
              </div>
              <div className="leading-none">
                <div className="font-sans font-black text-[15px] text-stone-950 dark:text-stone-50 tracking-tight">NOVELA</div>
                <div className="font-sans font-semibold text-[10px] text-stone-500 dark:text-stone-500 tracking-widest uppercase">Global</div>
              </div>
            </Link>

            {/* Desktop nav links */}
            <nav className="hidden md:flex items-center gap-1 ml-4">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3 py-1.5 rounded-lg text-[13px] font-semibold transition-colors ${
                    isActive(link.to)
                      ? 'bg-ink text-stone-50 dark:bg-lime dark:text-stone-950'
                      : 'text-stone-950-light dark:text-stone-500 hover:text-stone-950 dark:hover:text-stone-50 hover:bg-paper-warm dark:hover:bg-night-surface'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2 ml-auto">
              {/* Search */}
              {searchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center gap-2 animate-fade-in">
                  <input
                    ref={searchRef}
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search novels, authors, languages…"
                    className="w-56 sm:w-72 h-9 px-3 text-[13px] rounded-lg border border-paper-border dark:border-night-border bg-paper-warm dark:bg-night-surface text-stone-950 dark:text-stone-50 placeholder:text-stone-500 dark:placeholder:text-night-muted focus:outline-none focus:ring-2 focus:ring-lime"
                  />
                  <button type="button" onClick={() => setSearchOpen(false)} className="p-2 rounded-lg hover:bg-paper-warm dark:hover:bg-night-surface">
                    <X className="w-4 h-4 text-stone-500" />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="p-2 rounded-lg text-stone-500 dark:text-stone-500 hover:bg-paper-warm dark:hover:bg-night-surface hover:text-stone-950 dark:hover:text-stone-50 transition-colors"
                  title="Search"
                >
                  <Search className="w-[18px] h-[18px]" />
                </button>
              )}

              {/* Library */}
              <Link
                to="/library"
                className="hidden sm:flex p-2 rounded-lg text-stone-500 dark:text-stone-500 hover:bg-paper-warm dark:hover:bg-night-surface hover:text-stone-950 dark:hover:text-stone-50 transition-colors"
                title="My Reading List"
              >
                <BookMarked className="w-[18px] h-[18px]" />
              </Link>

              {/* Dark mode toggle */}
              <button
                onClick={toggleDark}
                className="p-2 rounded-lg text-stone-500 dark:text-stone-500 hover:bg-paper-warm dark:hover:bg-night-surface hover:text-stone-950 dark:hover:text-stone-50 transition-colors"
                title="Toggle theme"
              >
                {isDark ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-paper-warm dark:hover:bg-night-surface transition-colors"
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-paper-border dark:border-night-border bg-paper dark:bg-night animate-slide-up">
            <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3 py-2.5 rounded-lg text-[14px] font-semibold transition-colors ${
                    isActive(link.to)
                      ? 'bg-ink text-stone-50 dark:bg-lime dark:text-stone-950'
                      : 'text-stone-950-light hover:bg-paper-warm dark:hover:bg-night-surface'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 pt-2 border-t border-paper-border dark:border-night-border flex gap-2">
                <Link to="/library" className="flex-1 text-center py-2 text-[13px] font-semibold rounded-lg border border-paper-border dark:border-night-border hover:bg-paper-warm dark:hover:bg-night-surface transition-colors">
                  My Library
                </Link>
                <Link to="/admin" className="flex-1 text-center py-2 text-[13px] font-semibold rounded-lg border border-paper-border dark:border-night-border hover:bg-paper-warm dark:hover:bg-night-surface transition-colors">
                  Admin
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};
