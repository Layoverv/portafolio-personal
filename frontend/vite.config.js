import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * URL pública del sitio, para las etiquetas de vista previa (Open Graph) de index.html.
 * Orden de prioridad:
 *  1. SITE_URL: defínela en Vercel si usas un dominio propio (ej. https://joseluis.dev).
 *  2. VERCEL_PROJECT_PRODUCTION_URL: Vercel la crea sola con el dominio de producción
 *     (ej. portafolio-personal.vercel.app). Se usa también en las vistas previas,
 *     para que el enlace compartido siempre apunte al sitio principal.
 *  3. En tu computador: http://localhost:5173.
 * Se lee con process.env solo al compilar: no llega al código del navegador.
 */
function siteUrl() {
  const fromEnv = process.env.SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL || '';
  if (!fromEnv) return 'http://localhost:5173';
  const withProtocol = /^https?:\/\//.test(fromEnv) ? fromEnv : `https://${fromEnv}`;
  return withProtocol.replace(/\/+$/, ''); // sin "/" final
}

/** Reemplaza %SITE_URL% en index.html por la URL pública. */
function siteUrlPlugin() {
  return {
    name: 'site-url',
    transformIndexHtml: {
      order: 'pre',
      handler: (html) => html.replaceAll('%SITE_URL%', siteUrl()),
    },
  };
}

// Configuración de Vite: activa el soporte de React (JSX y recarga rápida).
export default defineConfig({
  plugins: [react(), siteUrlPlugin()],
  server: {
    port: 5173,
    // En desarrollo, las peticiones a /api se reenvían al backend de Express.
    proxy: {
      '/api': 'http://localhost:3001',
    },
  },
  // Configuración de las pruebas (Vitest).
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.js'],
  },
});
