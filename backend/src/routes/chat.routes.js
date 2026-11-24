import { Router } from 'express';
import { validateChat } from '../middleware/validateChat.js';
import { createChatController } from '../controllers/chat.controller.js';

/** Rutas del chat: POST /api/chat -> validar -> controlador. */
export function createChatRouter({ generateReply, rateLimiter }) {
  const router = Router();
  router.post('/', rateLimiter, validateChat, createChatController(generateReply));
  return router;
}
