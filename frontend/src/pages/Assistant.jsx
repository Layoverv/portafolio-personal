import { ShieldCheck } from 'lucide-react';
import SectionTitle from '../components/ui/SectionTitle.jsx';
import ChatBot from '../components/chat/ChatBot.jsx';

function Assistant() {
  return (
    <section className="section">
      <div className="container" style={{ maxWidth: '860px' }}>
        <SectionTitle
          eyebrow="Asistente IA"
          title="Conoce mi perfil conversando"
          subtitle="Pregunta lo que quieras sobre mi formación, conocimientos y proyectos. El asistente usa inteligencia artificial real (Gemini) y solo responde con la información de mi hoja de vida."
        />
        <ChatBot />
        <p className="text-muted" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: 'var(--text-xs)', marginTop: 'var(--space-3)' }}>
          <ShieldCheck size={14} aria-hidden="true" />
          La conversación se guarda solo en tu navegador. Puedes borrarla con "Nueva conversación".
        </p>
      </div>
    </section>
  );
}

export default Assistant;
