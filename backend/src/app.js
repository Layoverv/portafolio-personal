import express from 'express';
import cors from 'cors';
import { config } from './config/env.js';
import { createChatRouter } from './routes/chat.routes.js';
import { createRateLimiter } from './middleware/rateLimiter.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import { generateReply as geminiReply } from './services/gemini.service.js';

/**
 * Crea la aplicación Express (sin encenderla).
 * Separarla de server.js permite probarla sin abrir un puerto fijo.
 */
export function createApp({ generateReply = geminiReply, rateLimit = config.rateLimit } = {}) {
  const app = express();

  app.disable('x-powered-by'); // no revela que el servidor usa Express
  app.use(cors({ origin: config.frontendUrls }));
  app.use(express.json({ limit: '20kb' })); // cuerpos pequeños: evita abusos

  // Ruta de salud: sirve para comprobar que el backend está encendido.
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', aiConfigured: Boolean(config.geminiApiKey), model: config.geminiModel });
  });

  app.use('/api/chat', createChatRouter({ generateReply, rateLimiter: createRateLimiter(rateLimit) }));

  app.use(notFound);
  app.use(errorHandler);
  return app;
}
