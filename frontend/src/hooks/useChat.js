import { useState } from 'react';
import { useLocalStorage } from './useLocalStorage.js';
import { sendChatMessage } from '../services/api.js';

export const MAX_MESSAGE_LENGTH = 500;
// Solo se envían los últimos mensajes al backend para ahorrar tokens.
export const HISTORY_LIMIT = 10;
const STORAGE_KEY = 'portfolio-chat-history';

// Identificador único para cada mensaje (React lo usa como key).
const createId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const WELCOME = {
  id: 'welcome',
  role: 'model',
  text: '¡Hola! Soy el asistente virtual de José Luis. Puedo contarte sobre su formación, sus conocimientos y sus proyectos. ¿Qué te gustaría saber?',
};

/**
 * Lógica del chat separada de la interfaz.
 * Maneja: historial (en LocalStorage), estado de carga, errores y envío.
 */
export function useChat() {
  const [messages, setMessages] = useLocalStorage(STORAGE_KEY, [WELCOME]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  async function sendMessage(rawText) {
    const text = rawText.trim();
    // Evita solicitudes vacías, demasiado largas o mientras otra está en curso.
    if (!text || text.length > MAX_MESSAGE_LENGTH || isLoading) return false;

    const userMessage = { id: createId(), role: 'user', text };
    // Historial previo sin el saludo inicial (el modelo no lo necesita).
    const history = messages
      .filter((msg) => msg.id !== 'welcome')
      .slice(-HISTORY_LIMIT)
      .map(({ role, text: msgText }) => ({ role, text: msgText }));

    setMessages((prev) => [...prev, userMessage]);
    setError('');
    setIsLoading(true);

    try {
      const reply = await sendChatMessage(text, history);
      setMessages((prev) => [...prev, { id: createId(), role: 'model', text: reply }]);
      return true;
    } catch (err) {
      // Si falla, se quita el mensaje del visitante para que pueda reenviarlo.
      setMessages((prev) => prev.filter((msg) => msg.id !== userMessage.id));
      setError(err.message);
      return false;
    } finally {
      setIsLoading(false);
    }
  }

  function resetConversation() {
    setMessages([WELCOME]);
    setError('');
  }

  return { messages, isLoading, error, sendMessage, resetConversation };
}
