import { GoogleGenAI } from '@google/genai';
import { config } from '../config/env.js';
import { buildSystemPrompt } from './prompt.js';

// El prompt del sistema se construye una sola vez.
const SYSTEM_PROMPT = buildSystemPrompt();

// El cliente se crea solo si hay API Key; así el servidor arranca aunque falte.
const ai = config.geminiApiKey ? new GoogleGenAI({ apiKey: config.geminiApiKey }) : null;

/** Error con código HTTP, para que el manejador de errores sepa qué responder. */
export class AppError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.status = status;
  }
}

/**
 * Convierte el historial del frontend al formato que espera Gemini.
 * Frontend: { role: 'user' | 'model', text }  ->  Gemini: { role, parts: [{ text }] }
 */
export function toGeminiContents(history, message) {
  return [
    ...history.map((item) => ({ role: item.role, parts: [{ text: item.text }] })),
    { role: 'user', parts: [{ text: message }] },
  ];
}

/** Rechaza la promesa si tarda más de `ms` milisegundos. */
function withTimeout(promise, ms) {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new AppError('El asistente tardó demasiado en responder.', 504)), ms);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

/**
 * Envía la conversación a Gemini y devuelve el texto de la respuesta.
 * @param {string} message
 * @param {Array<{role: string, text: string}>} history
 */
export async function generateReply(message, history = []) {
  if (!ai) {
    throw new AppError('El asistente no está configurado: falta GEMINI_API_KEY en el archivo .env del backend.', 503);
  }

  try {
    const response = await withTimeout(
      ai.models.generateContent({
        model: config.geminiModel,
        contents: toGeminiContents(history, message),
        config: {
          systemInstruction: SYSTEM_PROMPT,
          maxOutputTokens: config.chat.maxOutputTokens,
          temperature: 0.4, // baja = respuestas más fieles a los datos
        },
      }),
      config.chat.timeoutMs,
    );

    const text = response.text?.trim();
    if (!text) {
      throw new AppError('El asistente no generó una respuesta. Intenta reformular la pregunta.', 502);
    }
    return text;
  } catch (error) {
    if (error instanceof AppError) throw error;

    // Errores del proveedor: se registran en el servidor, pero al visitante
    // solo se le muestra un mensaje general (nunca la clave ni detalles internos).
    console.error('[Gemini]', error.status || '', error.message);
    if (error.status === 429) {
      throw new AppError('El asistente recibió demasiadas preguntas. Espera un momento e intenta de nuevo.', 429);
    }
    if ([400, 401, 403, 404].includes(error.status)) {
      throw new AppError('El asistente no está disponible: revisa la API Key o el modelo configurado.', 502);
    }
    throw new AppError('No se pudo obtener respuesta del asistente. Intenta más tarde.', 502);
  }
}
