// =============================================================
// FUNCIÓN SERVERLESS PARA VERCEL
// Vercel no mantiene un servidor encendido: por cada petición a /api/...
// ejecuta esta función. Basta con exportar la app de Express; no se
// llama a app.listen() (eso solo lo hace backend/src/server.js en local).
//
// vercel.json redirige todas las rutas /api/* aquí y Express recibe la
// URL original (/api/chat, /api/health), así que las rutas no cambian.
// =============================================================
import { createApp } from '../backend/src/app.js';

export default createApp();
