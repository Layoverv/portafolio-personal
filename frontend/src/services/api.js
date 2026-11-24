// =============================================================
// CAPA DE SERVICIOS: todas las llamadas HTTP viven aquí.
// Los componentes no usan fetch directamente; llaman a estas funciones.
// =============================================================

// En desarrollo queda vacío y Vite redirige /api al backend (ver vite.config.js).
// En producción se define VITE_API_URL con la URL del backend publicado.
const API_URL = import.meta.env.VITE_API_URL || '';
const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || '';
const TIMEOUT_MS = 30000;

/** fetch con tiempo límite: si el servidor no responde, se cancela. */
async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Envía un mensaje al asistente IA.
 * @param {string} message  pregunta del visitante
 * @param {Array<{role: 'user'|'model', text: string}>} history  mensajes anteriores
 * @returns {Promise<string>} respuesta del modelo
 */
export async function sendChatMessage(message, history = []) {
  let response;
  try {
    response = await fetchWithTimeout(`${API_URL}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history }),
    });
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error('El asistente tardó demasiado en responder. Intenta de nuevo.');
    }
    throw new Error('No se pudo conectar con el servidor del asistente. ¿Está encendido el backend?');
  }

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error || 'El asistente no pudo responder en este momento.');
  }
  return data.reply;
}

/** true si el formulario tiene un servicio real configurado. */
export function isContactFormConfigured() {
  return FORM_ENDPOINT.trim() !== '';
}

/**
 * Envía el formulario de contacto a un servicio real (por ejemplo Formspree).
 * Solo resuelve si el servicio confirma la recepción.
 */
export async function sendContactForm(values) {
  if (!isContactFormConfigured()) {
    throw new Error('El formulario todavía no está conectado a un servicio de mensajes.');
  }

  let response;
  try {
    response = await fetchWithTimeout(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(values),
    });
  } catch {
    throw new Error('No se pudo enviar el mensaje. Revisa tu conexión e intenta de nuevo.');
  }

  if (!response.ok) {
    throw new Error('El servicio de mensajes rechazó el envío. Intenta más tarde.');
  }
  return true;
}
