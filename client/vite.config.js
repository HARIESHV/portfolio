import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

/**
 * Resolves the canonical site URL for the Open Graph and canonical tags.
 *
 * `__SITE_URL__` in index.html is replaced here rather than with Vite's
 * `%VAR%` syntax, because an unset variable would otherwise leave the literal
 * placeholder in the shipped HTML. This always produces a valid URL.
 */
function siteUrlPlugin(siteUrl) {
  let normalised = (siteUrl || '').trim().replace(/\/+$/, '');
  if (normalised && !normalised.startsWith('http://') && !normalised.startsWith('https://')) {
    normalised = `https://${normalised}`;
  }

  // A malformed value would emit a broken canonical tag, so fail the build
  // rather than shipping it.
  try {
    const parsed = new URL(normalised);
    if (!['http:', 'https:'].includes(parsed.protocol)) throw new Error('wrong protocol');
  } catch {
    throw new Error(
      `VITE_SITE_URL must be an absolute http(s) URL. Received: "${siteUrl}"`,
    );
  }

  return {
    name: 'hariesh-site-url',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return html.replaceAll('__SITE_URL__', normalised);
      },
    },
  };
}

export default defineConfig(({ mode }) => {
  const fileEnv = loadEnv(mode, process.cwd(), '');

  // `loadEnv` only reads .env *files*. Variables configured in a host's
  // dashboard (Vercel, Render, Railway) arrive in process.env instead, so
  // that has to be checked first or a deployed build would silently ignore the
  // configured domain and ship the fallback canonical URL.
  const siteUrl =
    process.env.VITE_SITE_URL || fileEnv.VITE_SITE_URL || 'https://hariesh-v.vercel.app';

  return {
    plugins: [react(), tailwindcss(), siteUrlPlugin(siteUrl)],

    server: {
      port: 5173,
      strictPort: false,
      open: false,
    },

    preview: {
      port: 4173,
    },

    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,

      // Split the heavy, rarely-changing libraries so a content edit does not
      // invalidate the whole vendor bundle in the visitor's cache.
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom'],
            motion: ['framer-motion'],
            icons: ['lucide-react'],
          },
        },
      },

      // Framer Motion pulls in a fair amount of JavaScript. Warn if the
      // initial payload ever grows past a comfortable budget.
      chunkSizeWarningLimit: 400,
    },

    esbuild: {
      // Production output only. Keeps the dev console free of noise.
      legalComments: 'none',
    },
  };
});
