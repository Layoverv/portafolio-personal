import { useEffect, useRef, useState } from 'react';
import { AlertCircle, Bot, RotateCcw, SendHorizontal, User } from 'lucide-react';
import { MAX_MESSAGE_LENGTH, useChat } from '../../hooks/useChat.js';
import './ChatBot.css';

// Preguntas sugeridas para empezar la conversación.
const SUGGESTIONS = [
  '¿Quién es José Luis?',
  '¿Qué conocimientos tiene?',
  '¿Qué proyectos ha realizado?',
  '¿Está disponible para trabajar?',
];

/**
 * Ventana de conversación con el asistente IA.
 * Props: compact (true = versión flotante más pequeña).
 */
function ChatBot({ compact = false }) {
  const { messages, isLoading, error, sendMessage, resetConversation } = useChat();
  const [input, setInput] = useState('');
  const listRef = useRef(null);
  const inputRef = useRef(null);

  // Cada vez que llega un mensaje nuevo, baja hasta el final de la conversación.
  useEffect(() => {
    const list = listRef.current;
    if (list) list.scrollTop = list.scrollHeight;
  }, [messages, isLoading]);

  const submit = async (text) => {
    const clean = text.trim();
    if (!clean || isLoading) return;
    setInput('');
    const ok = await sendMessage(clean);
    // Si falló, se devuelve el texto al campo para poder reintentar.
    if (!ok) setInput(clean);
    inputRef.current?.focus();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submit(input);
  };

  // Enter envía; Shift + Enter hace salto de línea.
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      submit(input);
    }
  };

  const isOnlyWelcome = messages.length === 1;
  const remaining = MAX_MESSAGE_LENGTH - input.length;

  return (
    <div className={`chat ${compact ? 'chat--compact' : ''}`}>
      <header className="chat__header">
        <span className="chat__avatar chat__avatar--bot" aria-hidden="true">
          <Bot size={20} />
        </span>
        <div className="chat__heading">
          <strong>Asistente de José Luis</strong>
          <span className="chat__subtitle">Responde con la información de su hoja de vida</span>
        </div>
        <button type="button" className="chat__reset" onClick={resetConversation} disabled={isLoading} title="Nueva conversación">
          <RotateCcw size={16} aria-hidden="true" />
          <span className={compact ? 'sr-only' : ''}>Nueva conversación</span>
        </button>
      </header>

      <div ref={listRef} className="chat__messages" aria-live="polite" aria-label="Conversación">
        {messages.map((msg) => (
          <div key={msg.id} className={`chat__message chat__message--${msg.role}`}>
            <span className={`chat__avatar chat__avatar--${msg.role === 'user' ? 'user' : 'bot'}`} aria-hidden="true">
              {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
            </span>
            <p className="chat__bubble">
              <span className="sr-only">{msg.role === 'user' ? 'Tú: ' : 'Asistente: '}</span>
              {msg.text}
            </p>
          </div>
        ))}

        {isLoading && (
          <div className="chat__message chat__message--model">
            <span className="chat__avatar chat__avatar--bot" aria-hidden="true"><Bot size={16} /></span>
            <p className="chat__bubble chat__typing" aria-label="El asistente está escribiendo">
              <span /><span /><span />
            </p>
          </div>
        )}

        {isOnlyWelcome && !isLoading && (
          <div className="chat__suggestions">
            {SUGGESTIONS.map((question) => (
              <button key={question} type="button" className="chat__suggestion" onClick={() => submit(question)}>
                {question}
              </button>
            ))}
          </div>
        )}
      </div>

      {error && (
        <div className="chat__error" role="alert">
          <AlertCircle size={16} aria-hidden="true" /> {error}
        </div>
      )}

      <form className="chat__form" onSubmit={handleSubmit}>
        <label htmlFor={compact ? 'chat-input-compact' : 'chat-input'} className="sr-only">
          Escribe tu pregunta
        </label>
        <textarea
          id={compact ? 'chat-input-compact' : 'chat-input'}
          ref={inputRef}
          className="chat__input"
          rows={1}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escribe tu pregunta..."
          maxLength={MAX_MESSAGE_LENGTH}
          disabled={isLoading}
        />
        <button type="submit" className="chat__send" disabled={!input.trim() || isLoading} aria-label="Enviar mensaje">
          <SendHorizontal size={18} />
        </button>
      </form>
      {remaining < 100 && <p className="chat__counter">{remaining} caracteres restantes</p>}
    </div>
  );
}

export default ChatBot;
