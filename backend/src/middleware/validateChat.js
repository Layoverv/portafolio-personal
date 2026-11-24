import { config } from '../config/env.js';

const VALID_ROLES = ['user', 'model'];

/**
 * Valida el cuerpo de POST /api/chat antes de llamar a la IA.
 * Espera: { message: string, history?: [{ role: 'user'|'model', text: string }] }
 * Si es válido, deja los datos limpios en req.chat y continúa.
 */
export function validateChat(req, res, next) {
  const { message, history = [] } = req.body ?? {};

  if (typeof message !== 'string' || message.trim() === '') {
    return res.status(400).json({ error: 'El mensaje no puede estar vacío.' });
  }
  if (message.length > config.chat.maxMessageLength) {
    return res.status(400).json({ error: `El mensaje admite máximo ${config.chat.maxMessageLength} caracteres.` });
  }
  if (!Array.isArray(history)) {
    return res.status(400).json({ error: 'El historial debe ser un arreglo.' });
  }

  // Se descartan entradas mal formadas y se conservan solo los últimos mensajes (ahorro de tokens).
  const cleanHistory = history
    .filter((item) => item && VALID_ROLES.includes(item.role) && typeof item.text === 'string' && item.text.trim() !== '')
    .slice(-config.chat.maxHistoryMessages)
    .map((item) => ({ role: item.role, text: item.text.slice(0, 2000) }));

  // Gemini exige que la conversación empiece con un mensaje del usuario.
  while (cleanHistory.length > 0 && cleanHistory[0].role !== 'user') {
    cleanHistory.shift();
  }

  req.chat = { message: message.trim(), history: cleanHistory };
  return next();
}
