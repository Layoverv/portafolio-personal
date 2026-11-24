import { useLocation } from 'react-router-dom';
import { Bot, X } from 'lucide-react';
import { useApp } from '../../context/AppContext.jsx';
import ChatBot from './ChatBot.jsx';
import './FloatingChat.css';

/**
 * Botón flotante que abre el chat desde cualquier página.
 * Usa useContext (useApp) para saber si el chat está abierto.
 * En la página /asistente no se muestra porque el chat ya ocupa la pantalla.
 */
function FloatingChat() {
  const { isChatOpen, setIsChatOpen } = useApp();
  const location = useLocation();

  if (location.pathname === '/asistente') return null;

  return (
    <div className="floating-chat">
      {isChatOpen && (
        <div className="floating-chat__panel" role="dialog" aria-label="Chat con el asistente">
          <ChatBot compact />
        </div>
      )}
      <button
        type="button"
        className="floating-chat__button"
        onClick={() => setIsChatOpen((prev) => !prev)}
        aria-label={isChatOpen ? 'Cerrar chat' : 'Abrir chat con el asistente'}
        aria-expanded={isChatOpen}
      >
        {isChatOpen ? <X size={24} /> : <Bot size={24} />}
      </button>
    </div>
  );
}

export default FloatingChat;
