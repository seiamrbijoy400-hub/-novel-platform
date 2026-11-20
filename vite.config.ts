import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
// @ts-expect-error - plain ESM helper shared with the sync script
import { fetchRealBooks, proxyCover } from './scripts/openlibrary.mjs';

/**
 * Dev/preview-only API for real catalog data. The browser often cannot reach
 * Open Library directly (CORS, DNS, WebView restrictions), while the Node
 * process running Vite can. These endpoints give the app a working local API.
 */
function realBooksApi(): Plugin {
  const handler = async (req: any, res: any, next: any) => {
    const url = req.url || '';

    if (!url.startsWith('/api/')) {
      next();
      return;
    }

    res.setHeader('Access-Control-Allow-Origin', '*');

    try {
      if (url.startsWith('/api/cover/')) {
        const id = url.slice('/api/cover/'.length).split('?')[0];
        const image = await proxyCover(id);
        res.setHeader('Content-Type', 'image/jpeg');
        res.setHeader('Cache-Control', 'public, max-age=86400');
        res.end(image);
        return;
      }

      if (url.startsWith('/api/books')) {
        const books = await fetchRealBooks({ limit: 12 });
        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Cache-Control', 'public, max-age=300');
        res.end(JSON.stringify(books));
        return;
      }
    } catch (err) {
      res.statusCode = 502;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: err instanceof Error ? err.message : String(err) }));
      return;
    }

    res.statusCode = 404;
    res.end();
  };

  return {
    name: 'real-books-api',
    configureServer(server) {
      server.middlewares.use(handler);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler);
    },
  };
}

export default defineConfig({
  plugins: [react(), realBooksApi()],
  server: {
    host: '0.0.0.0',
    port: 5174,
    strictPort: true,
  },
});
