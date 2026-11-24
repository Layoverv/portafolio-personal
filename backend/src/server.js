import { createApp } from './app.js';
import { config } from './config/env.js';

// Punto de entrada: crea la app y la pone a escuchar en el puerto configurado.
const app = createApp();

app.listen(config.port, () => {
  console.log(`Backend listo en http://localhost:${config.port}`);
  if (!config.geminiApiKey) {
    console.warn('Aviso: falta GEMINI_API_KEY en backend/.env. El chat responderá con un error hasta que la agregues.');
  }
});
