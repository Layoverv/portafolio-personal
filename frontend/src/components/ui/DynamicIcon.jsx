import {
  Code, Database, Globe, Layout, Lightbulb, MessagesSquare, Monitor, Network,
  Search, Server, Settings, Users, Wrench, Zap,
} from 'lucide-react';

// Los datos guardan el ícono como texto ('Database'); este objeto lo traduce al componente.
// Importar solo estos íconos (y no todos) mantiene la aplicación liviana.
const ICONS = {
  Code, Database, Globe, Layout, Lightbulb, MessagesSquare, Monitor, Network,
  Search, Server, Settings, Users, Wrench, Zap,
};

function DynamicIcon({ name, size = 22 }) {
  const Icon = ICONS[name] || Code;
  return <Icon size={size} aria-hidden="true" />;
}

export default DynamicIcon;
