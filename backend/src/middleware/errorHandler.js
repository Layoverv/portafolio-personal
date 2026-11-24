/** Responde 404 a cualquier ruta que no exista. */
export function notFound(req, res) {
  res.status(404).json({ error: 'Ruta no encontrada.' });
}

/**
 * Manejador central de errores: Express lo reconoce porque recibe 4 parámetros.
 * Cualquier error lanzado en un controlador termina aquí.
 */
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  // JSON mal formado en el cuerpo de la petición.
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'El cuerpo de la solicitud no es un JSON válido.' });
  }
  if (err.type === 'entity.too.large') {
    return res.status(413).json({ error: 'La solicitud es demasiado grande.' });
  }

  const status = err.status || 500;
  if (status >= 500) console.error('[Error]', err.message);
  return res.status(status).json({ error: status >= 500 && !err.status ? 'Error interno del servidor.' : err.message });
}
