import { Routes, Route } from 'react-router-dom';
import { Bot, Cpu, FolderKanban, House, Mail, Sparkles, UserRound } from 'lucide-react';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Projects from './pages/Projects.jsx';
import Technologies from './pages/Technologies.jsx';
import ValueProposition from './pages/ValueProposition.jsx';
import Assistant from './pages/Assistant.jsx';
import Contact from './pages/Contact.jsx';
import NotFound from './pages/NotFound.jsx';
import FloatingChat from './components/chat/FloatingChat.jsx';
import { Backdrop } from './components/ui/Decor.jsx';
import PageTransition from './components/layout/PageTransition.jsx';
import Marquee from './components/ui/Marquee.jsx';
import { useSmoothScroll } from './hooks/useSmoothScroll.js';

// Lista de rutas como arreglo de objetos: el Navbar usa la misma lista,
// así agregar una sección nueva es agregar un objeto aquí (icon = ícono de la barra lateral).
export const ROUTES = [
  { path: '/', icon: House, label: 'Inicio', element: <Home /> },
  { path: '/sobre-mi', icon: UserRound, label: 'Sobre mí', element: <About /> },
  { path: '/proyectos', icon: FolderKanban, label: 'Proyectos', element: <Projects /> },
  { path: '/tecnologias', icon: Cpu, label: 'Tecnologías', element: <Technologies /> },
  { path: '/servicios', icon: Sparkles, label: 'Servicios', element: <ValueProposition /> },
  { path: '/asistente', icon: Bot, label: 'Asistente IA', element: <Assistant /> },
  { path: '/contacto', icon: Mail, label: 'Contacto', element: <Contact /> },
];

function App() {
  // Scroll suave con inercia para la rueda del ratón.
  useSmoothScroll();

  return (
    <div className="app">
      <Backdrop />
      <Navbar routes={ROUTES} />

      {/* PageTransition decide qué ruta se ve: la vieja sigue visible mientras la cortina la tapa. */}
      <PageTransition>
        {(displayLocation) => (
          // key cambia con cada ruta: React vuelve a montar el <main> y se repite la animación de entrada
          <main key={displayLocation.pathname} className="page-transition">
            <Routes location={displayLocation}>
              {ROUTES.map((route) => (
                <Route key={route.path} path={route.path} element={route.element} />
              ))}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        )}
      </PageTransition>

      {/* Cinta en movimiento al final de todas las páginas */}
      <Marquee text="FIRST TO THE KEY" />

      <Footer routes={ROUTES} />
      <FloatingChat />
    </div>
  );
}

export default App;
