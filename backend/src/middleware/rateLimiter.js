/**
 * Limitador de solicitudes sencillo, en memoria.
 * Cuenta cuántas veces pide cada IP dentro de una ventana de tiempo
 * y responde 429 cuando se pasa del máximo.
 * (Para un despliegue con varios servidores convendría Redis, aquí no hace falta.)
 */
export function createRateLimiter({ windowMs, maxRequests }) {
  const hits = new Map(); // ip -> { count, resetAt }

  return function rateLimiter(req, res, next) {
    const now = Date.now();
    const key = req.ip;
    const entry = hits.get(key);

    if (!entry || now > entry.resetAt) {
      hits.set(key, { count: 1, resetAt: now + windowMs });
      return next();
    }

    entry.count += 1;
    if (entry.count > maxRequests) {
      const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
      res.set('Retry-After', String(retryAfter));
      return res.status(429).json({ error: 'Has enviado muchos mensajes seguidos. Espera unos minutos e intenta de nuevo.' });
    }
    return next();
  };
}
