import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Configuración de Vite: activa el soporte de React (JSX y recarga rápida).
export default defineConfig({
  plugins: [react()],
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
