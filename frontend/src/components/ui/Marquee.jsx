import { Sparkle } from './Decor.jsx';
import './Marquee.css';

const REPEAT = 8; // veces que se repite el texto dentro de cada mitad de la cinta

/**
 * Cinta de texto en movimiento continuo, como las franjas de los pósters anime.
 * Son dos cintas cruzadas: la principal (roja, rellena) y una de fondo
 * (solo contorno) que se mueve en sentido contrario.
 *
 * Truco del bucle infinito: el contenido se dibuja dos veces seguidas y la
 * animación lo desplaza exactamente -50%. Al terminar, la segunda copia queda
 * donde empezó la primera, así que el salto de reinicio no se nota.
 */
function Marquee({ text = 'FIRST TO THE KEY' }) {
  const items = Array.from({ length: REPEAT });

  // Las copias son solo decorativas: el lector de pantalla lee el texto una vez (sr-only).
  const renderTrack = () => (
    <div className="marquee__group" aria-hidden="true">
      {items.map((_, index) => (
        <span key={index} className="marquee__item">
          <span className="marquee__text display">{text}</span>
          <Sparkle size={22} className="marquee__sparkle" />
        </span>
      ))}
    </div>
  );

  return (
    <section className="marquee">
      <p className="sr-only">{text}</p>

      <div className="marquee__band marquee__band--back">
        <div className="marquee__track marquee__track--reverse">
          {renderTrack()}
          {renderTrack()}
        </div>
      </div>

      <div className="marquee__band marquee__band--front">
        <div className="marquee__track">
          {renderTrack()}
          {renderTrack()}
        </div>
      </div>
    </section>
  );
}

export default Marquee;
