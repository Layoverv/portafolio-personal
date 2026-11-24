import { Home as HomeIcon } from 'lucide-react';
import Button from '../components/ui/Button.jsx';

// Se muestra cuando la URL no coincide con ninguna ruta.
function NotFound() {
  return (
    <section className="section">
      <div className="container" style={{ textAlign: 'center' }}>
        <p className="text-gradient" style={{ fontSize: '4rem', fontWeight: 700 }}>404</p>
        <h1 style={{ marginBottom: 'var(--space-4)' }}>Esta página no existe</h1>
        <Button to="/" icon={HomeIcon}>
          Volver al inicio
        </Button>
      </div>
    </section>
  );
}

export default NotFound;
