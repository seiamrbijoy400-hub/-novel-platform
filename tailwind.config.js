/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // ─── New Design System ───────────────────────────────────────────
        ink: {
          DEFAULT: '#111110',
          light: '#3D3C3A',
          muted: '#6B6866',
        },
        paper: {
          DEFAULT: '#FAF9F7',
          warm: '#F3F1EC',
          border: '#E4E0D8',
        },
        night: {
          DEFAULT: '#0C0C0B',
          surface: '#161614',
          border: '#272523',
          muted: '#8A8784',
        },
        lime: '#B8FF00',

        // ─── Legacy Compatibility Shims (old vellum/electric classes) ─────
        // These ensure un-migrated files still compile correctly.
        // Maps directly to the new design tokens above.
        'vellum': {
          50:  '#FAF9F7',
          100: '#F3F1EC',
          200: '#E4E0D8',
          300: '#CBC5B9',
          400: '#A09890',
          500: '#6B6866',
          600: '#4A4745',
          700: '#3D3C3A',
          800: '#272523',
          900: '#111110',
        },
        'electric-lime':   '#B8FF00',
        'electric-violet': '#6E28D9',
        'electric-coral':  '#FF4D2E',
        'electric-amber':  '#F5A623',
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        body:    ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        sans:    ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif:   ['"Literata"', 'Georgia', 'serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
        arabic:  ['"Amiri"', '"Noto Naskh Arabic"', 'serif'],
        indic:   ['"Noto Serif Bengali"', '"Noto Serif Devanagari"', 'serif'],
      },
      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '1rem' }],
      },
      boxShadow: {
        'card':          '0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.05)',
        'card-hover':    '0 4px 12px rgba(0,0,0,0.12), 0 16px 40px rgba(0,0,0,0.08)',
        // new
        'brutal':        '3px 3px 0 0 #111110',
        'brutal-sm':     '2px 2px 0 0 #111110',
        'brutal-dark':   '3px 3px 0 0 #B8FF00',
        // legacy compat
        'brutal-lg':     '4px 4px 0 0 #111110',
        'brutal-dark-lg':'4px 4px 0 0 #B8FF00',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      animation: {
        'fade-in':  'fadeIn 0.4s ease forwards',
        'slide-up': 'slideUp 0.4s ease forwards',
      },
      keyframes: {
        fadeIn:  { from: { opacity: '0' },                               to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(16px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
}
