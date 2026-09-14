import fs from 'fs';
import path from 'path';
import { Plugin, defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

/**
 * `vite preview` answers every unknown path with the SPA fallback, so it would
 * serve the home page's HTML at /legal-notice and hand React a document that
 * cannot hydrate. Static hosts (Vercel, Netlify, Cloudflare Pages) instead
 * serve `<path>/index.html` when it exists and `404.html` when it does not.
 *
 * This middleware makes preview match that, so what you check locally is what
 * production serves. Registered directly rather than via the returned callback
 * so it runs before Vite's own SPA fallback.
 */
function staticHostPreview(): Plugin {
  return {
    name: 'static-host-preview',
    configurePreviewServer(server) {
      const dist = path.resolve(__dirname, 'dist');

      server.middlewares.use((req, res, next) => {
        const pathname = (req.url || '/').split('?')[0];

        // Let real files (anything with an extension) and the root through.
        if (pathname === '/' || path.extname(pathname)) return next();

        const candidate = path.join(dist, pathname, 'index.html');
        const notFound = path.join(dist, '404.html');

        let file: string;
        let status: number;
        if (candidate.startsWith(dist) && fs.existsSync(candidate)) {
          file = candidate;
          status = 200;
        } else if (fs.existsSync(notFound)) {
          file = notFound;
          status = 404;
        } else {
          return next();
        }

        res.statusCode = status;
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        res.end(fs.readFileSync(file));
      });
    },
  };
}

export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  plugins: [
    react(),
    // Compiles src/index.css locally. Replaces the cdn.tailwindcss.com script,
    // which ships a browser-side compiler and is not meant for production.
    tailwindcss(),
    staticHostPreview(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
