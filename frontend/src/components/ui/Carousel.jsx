import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import './Carousel.css';

/**
 * Carrusel con avance automático y controles manuales.
 * Props: slides (arreglo de { id, title, text }), interval (ms).
 */
function Carousel({ slides, interval = 5000 }) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = (index) => {
    // El operador % hace que después del último vuelva al primero (y al revés).
    setCurrent((index + slides.length) % slides.length);
  };

  // Avance automático: se reinicia cada vez que cambia la diapositiva o la pausa.
  useEffect(() => {
    if (isPaused || slides.length <= 1) return undefined;
    const timer = setTimeout(() => setCurrent((prev) => (prev + 1) % slides.length), interval);
    return () => clearTimeout(timer);
  }, [current, isPaused, interval, slides.length]);

  if (slides.length === 0) return null;

  return (
    <div
      className="carousel card"
      aria-roledescription="carrusel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="carousel__viewport">
        <div className="carousel__track" style={{ transform: `translateX(-${current * 100}%)` }}>
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="carousel__slide"
              role="group"
              aria-roledescription="diapositiva"
              aria-label={`${index + 1} de ${slides.length}`}
              aria-hidden={index !== current}
            >
              <h4 className="carousel__title text-gradient">{slide.title}</h4>
              <p className="text-muted">{slide.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="carousel__controls">
        <button type="button" className="carousel__btn" onClick={() => goTo(current - 1)} aria-label="Anterior">
          <ChevronLeft size={18} />
        </button>
        <div className="carousel__dots">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              className={`carousel__dot ${index === current ? 'carousel__dot--active' : ''}`}
              onClick={() => goTo(index)}
              aria-label={`Ir a la diapositiva ${index + 1}`}
              aria-current={index === current}
            />
          ))}
        </div>
        <button type="button" className="carousel__btn" onClick={() => setIsPaused((prev) => !prev)} aria-label={isPaused ? 'Reanudar' : 'Pausar'}>
          {isPaused ? <Play size={16} /> : <Pause size={16} />}
        </button>
        <button type="button" className="carousel__btn" onClick={() => goTo(current + 1)} aria-label="Siguiente">
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}

export default Carousel;
