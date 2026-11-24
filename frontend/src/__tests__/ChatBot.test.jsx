import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import ChatBot from '../components/chat/ChatBot.jsx';

// fetch falso: simula el backend sin llamar a Gemini.
beforeEach(() => {
  window.localStorage.clear();
  globalThis.fetch = vi.fn();
});
afterEach(cleanup);

const mockReply = (body, ok = true, status = 200) =>
  fetch.mockResolvedValueOnce({ ok, status, json: async () => body });

const type = (text) => fireEvent.change(screen.getByLabelText('Escribe tu pregunta'), { target: { value: text } });
const send = () => fireEvent.click(screen.getByRole('button', { name: 'Enviar mensaje' }));

describe('ChatBot', () => {
  test('envía la pregunta al backend y muestra la respuesta', async () => {
    mockReply({ reply: 'José Luis estudia Sistemas de Información.' });
    render(<ChatBot />);
    type('¿Quién es?');
    send();

    expect(screen.getByLabelText('El asistente está escribiendo')).toBeTruthy();
    expect(await screen.findByText('José Luis estudia Sistemas de Información.')).toBeTruthy();

    const [url, options] = fetch.mock.calls[0];
    expect(url).toBe('/api/chat');
    expect(JSON.parse(options.body)).toEqual({ message: '¿Quién es?', history: [] });
  });

  test('no envía mensajes vacíos', () => {
    render(<ChatBot />);
    type('   ');
    expect(screen.getByRole('button', { name: 'Enviar mensaje' }).disabled).toBe(true);
    expect(fetch).not.toHaveBeenCalled();
  });

  test('muestra el error del servidor y devuelve el texto al campo', async () => {
    mockReply({ error: 'Falta GEMINI_API_KEY' }, false, 503);
    render(<ChatBot />);
    type('hola');
    send();
    expect(await screen.findByText(/Falta GEMINI_API_KEY/)).toBeTruthy();
    expect(screen.getByLabelText('Escribe tu pregunta').value).toBe('hola');
  });

  test('guarda el historial y "Nueva conversación" lo reinicia', async () => {
    mockReply({ reply: 'Respuesta guardada' });
    render(<ChatBot />);
    type('hola');
    send();
    await screen.findByText('Respuesta guardada');
    expect(window.localStorage.getItem('portfolio-chat-history')).toContain('Respuesta guardada');

    fireEvent.click(screen.getByTitle('Nueva conversación'));
    expect(screen.queryByText('Respuesta guardada')).toBeNull();
  });
});
