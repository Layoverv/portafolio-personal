// Pruebas del backend con el ejecutor de pruebas que trae Node (node:test).
// La IA se reemplaza por una función falsa: no se gastan tokens ni se necesita API Key.
import { test, describe, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from '../src/app.js';
import { AppError, toGeminiContents } from '../src/services/gemini.service.js';
import { buildSystemPrompt } from '../src/services/prompt.js';

// Enciende la app en un puerto libre y devuelve su URL.
function startServer(options) {
  return new Promise((resolve) => {
    const server = createApp(options).listen(0, () => {
      resolve({ server, url: `http://127.0.0.1:${server.address().port}` });
    });
  });
}

const post = (url, body) =>
  fetch(`${url}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });

describe('POST /api/chat', () => {
  let server;
  let url;
  let lastCall;

  before(async () => {
    const fakeReply = async (message, history) => {
      lastCall = { message, history };
      return `Respuesta a: ${message}`;
    };
    ({ server, url } = await startServer({ generateReply: fakeReply, rateLimit: { windowMs: 60000, maxRequests: 100 } }));
  });
  after(() => server.close());

  test('responde con el texto de la IA', async () => {
    const res = await post(url, { message: '¿Quién es José Luis?' });
    assert.equal(res.status, 200);
    assert.deepEqual(await res.json(), { reply: 'Respuesta a: ¿Quién es José Luis?' });
  });

  test('rechaza mensajes vacíos', async () => {
    const res = await post(url, { message: '   ' });
    assert.equal(res.status, 400);
    assert.match((await res.json()).error, /vacío/);
  });

  test('rechaza mensajes que no son texto', async () => {
    const res = await post(url, { message: 123 });
    assert.equal(res.status, 400);
  });

  test('rechaza mensajes de más de 500 caracteres', async () => {
    const res = await post(url, { message: 'a'.repeat(501) });
    assert.equal(res.status, 400);
  });

  test('rechaza JSON mal formado', async () => {
    const res = await post(url, '{ mal json');
    assert.equal(res.status, 400);
  });

  test('limpia el historial: roles válidos, últimos 10 y empieza por user', async () => {
    const history = [
      { role: 'model', text: 'saludo' },
      { role: 'hacker', text: 'ignorar' },
      ...Array.from({ length: 12 }, (_, i) => ({ role: i % 2 === 0 ? 'user' : 'model', text: `m${i}` })),
    ];
    const res = await post(url, { message: 'hola', history });
    assert.equal(res.status, 200);
    assert.ok(lastCall.history.length <= 10);
    assert.equal(lastCall.history[0].role, 'user');
    assert.ok(lastCall.history.every((item) => ['user', 'model'].includes(item.role)));
  });

  test('GET /api/health indica que el servidor está activo', async () => {
    const res = await fetch(`${url}/api/health`);
    assert.equal(res.status, 200);
    assert.equal((await res.json()).status, 'ok');
  });

  test('rutas desconocidas devuelven 404', async () => {
    const res = await fetch(`${url}/api/no-existe`);
    assert.equal(res.status, 404);
  });
});

describe('errores de la IA', () => {
  test('un AppError llega al visitante con su código y mensaje', async () => {
    const failing = async () => {
      throw new AppError('Falta GEMINI_API_KEY', 503);
    };
    const { server, url } = await startServer({ generateReply: failing });
    const res = await post(url, { message: 'hola' });
    assert.equal(res.status, 503);
    assert.match((await res.json()).error, /GEMINI_API_KEY/);
    server.close();
  });

  test('un error inesperado no revela detalles internos', async () => {
    const failing = async () => {
      throw new Error('detalle secreto');
    };
    const { server, url } = await startServer({ generateReply: failing });
    const res = await post(url, { message: 'hola' });
    assert.equal(res.status, 500);
    assert.equal((await res.json()).error, 'Error interno del servidor.');
    server.close();
  });
});

describe('límite de solicitudes', () => {
  test('responde 429 al superar el máximo', async () => {
    const { server, url } = await startServer({
      generateReply: async () => 'ok',
      rateLimit: { windowMs: 60000, maxRequests: 2 },
    });
    assert.equal((await post(url, { message: 'a' })).status, 200);
    assert.equal((await post(url, { message: 'b' })).status, 200);
    assert.equal((await post(url, { message: 'c' })).status, 429);
    server.close();
  });
});

describe('prompt y formato', () => {
  test('el prompt incluye datos reales y las reglas clave', () => {
    const prompt = buildSystemPrompt();
    assert.match(prompt, /José Luis Oviedo Camacho/);
    assert.match(prompt, /UNIAJC/);
    assert.match(prompt, /No inventes/);
    assert.match(prompt, /formulario/);
  });

  test('el prompt no contiene datos de relleno del frontend', () => {
    const prompt = buildSystemPrompt();
    assert.doesNotMatch(prompt, /Gestor de contraseñas|Base de datos para biblioteca|SCRUM/);
  });

  test('toGeminiContents convierte el historial al formato de Gemini', () => {
    const contents = toGeminiContents([{ role: 'user', text: 'hola' }, { role: 'model', text: 'buenas' }], '¿y tú?');
    assert.deepEqual(contents, [
      { role: 'user', parts: [{ text: 'hola' }] },
      { role: 'model', parts: [{ text: 'buenas' }] },
      { role: 'user', parts: [{ text: '¿y tú?' }] },
    ]);
  });
});
