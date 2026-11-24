import 'dotenv/config';

// Toda la configuración se lee una sola vez aquí desde el archivo .env.
export const config = {
  port: Number(process.env.PORT) || 3001,
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  geminiModel: process.env.GEMINI_MODEL || 'gemini-flash-latest',
  frontendUrls: (process.env.FRONTEND_URL || 'http://localhost:5173')
    .split(',')
    .map((url) => url.trim())
    .filter(Boolean),

  // Límites para proteger la API y el consumo de tokens.
  chat: {
    maxMessageLength: 500, // caracteres por mensaje
    maxHistoryMessages: 10, // mensajes anteriores que se envían al modelo
    maxOutputTokens: 1024, // tamaño máximo de la respuesta
    timeoutMs: 25000, // tiempo máximo de espera a Gemini
  },
  rateLimit: {
    windowMs: 10 * 60 * 1000, // ventana de 10 minutos
    maxRequests: 30, // solicitudes por IP en esa ventana
  },
};
