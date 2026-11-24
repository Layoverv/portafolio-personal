import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { smoothScrollTo } from '../../hooks/useSmoothScroll.js';
import './PageTransition.css';

const COVER_MS = 480; // tiempo que tarda la cortina en tapar la pantalla
const REVEAL_MS = 560; // tiempo que tarda en descubrir la nueva sección

/**
 * Transición entre secciones con una "cortina" roja.
 *  1. cover:  la cortina sube y tapa la página actual.
 *  2. (con la pantalla tapada) se cambia el contenido y se vuelve arriba.
 *  3. reveal: la cortina sale por arriba y aparece la nueva sección.
 *
 * Recibe una función como hijo (render prop) y le entrega la ubicación que
 * debe mostrarse. Así la página vieja sigue visible mientras la cortina sube.
 */
function PageTransition({ children }) {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [stage, setStage] = useState('idle'); // 'idle' | 'cover' | 'reveal'
  const timers = useRef([]);
  // Ruta que se está mostrando. Va en una ref (no en las dependencias) para que
  // actualizarla a mitad de la animación no cancele el último paso.
  const shownPath = useRef(location.pathname);

  useEffect(() => {
    if (location.pathname === shownPath.current) return;
    shownPath.current = location.pathname;

    // Si se cambia de sección antes de terminar, se cancelan los pasos pendientes.
    timers.current.forEach(clearTimeout);
    timers.current = [];

    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      setDisplayLocation(location);
      smoothScrollTo(0, { immediate: true });
      return;
    }

    setStage('cover');
    timers.current.push(
      setTimeout(() => {
        setDisplayLocation(location);
        smoothScrollTo(0, { immediate: true });
        setStage('reveal');
      }, COVER_MS),
      setTimeout(() => setStage('idle'), COVER_MS + REVEAL_MS)
    );
  }, [location]);

  // Al desmontar, no deja temporizadores vivos.
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  return (
    <>
      {children(displayLocation)}

      <div className={`curtain curtain--${stage}`} aria-hidden="true">
        <span className="curtain__flare" />
        <span className="curtain__panel">
          <span className="curtain__kanji kanji" lang="ja">
            炎
          </span>
        </span>
      </div>
    </>
  );
}

export default PageTransition;
