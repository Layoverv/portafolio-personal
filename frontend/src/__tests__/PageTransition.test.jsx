import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Link, Routes, Route } from 'react-router-dom';
import PageTransition from '../components/layout/PageTransition.jsx';

// Mini aplicación con dos rutas para probar la cortina.
function TestApp() {
  return (
    <MemoryRouter initialEntries={['/']}>
      <Link to="/">ir a inicio</Link>
      <Link to="/otra">ir a otra</Link>
      <PageTransition>
        {(displayLocation) => (
          <Routes location={displayLocation}>
            <Route path="/" element={<p>pagina inicio</p>} />
            <Route path="/otra" element={<p>pagina otra</p>} />
          </Routes>
        )}
      </PageTransition>
    </MemoryRouter>
  );
}

const curtain = (container) => container.querySelector('.curtain');

beforeEach(() => {
  vi.useFakeTimers();
  window.scrollTo = vi.fn();
  window.matchMedia = vi.fn().mockReturnValue({ matches: false });
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

describe('PageTransition', () => {
  test('tapa, cambia la página y vuelve a quedar en reposo', () => {
    const { container } = render(<TestApp />);
    expect(curtain(container).className).toContain('curtain--idle');

    fireEvent.click(screen.getByText('ir a otra'));
    // Mientras la cortina sube, la página vieja sigue visible.
    expect(curtain(container).className).toContain('curtain--cover');
    expect(screen.getByText('pagina inicio')).toBeTruthy();

    act(() => vi.advanceTimersByTime(500));
    expect(curtain(container).className).toContain('curtain--reveal');
    expect(screen.getByText('pagina otra')).toBeTruthy();

    act(() => vi.advanceTimersByTime(600));
    expect(curtain(container).className).toContain('curtain--idle');
  });

  test('no se queda atascada si se hace clic otra vez durante la animación', () => {
    const { container } = render(<TestApp />);

    fireEvent.click(screen.getByText('ir a otra'));
    act(() => vi.advanceTimersByTime(200));
    fireEvent.click(screen.getByText('ir a otra')); // misma ruta otra vez
    act(() => vi.advanceTimersByTime(1200));

    expect(curtain(container).className).toContain('curtain--idle');
    expect(screen.getByText('pagina otra')).toBeTruthy();
  });

  test('sin animación si el sistema pide menos movimiento', () => {
    window.matchMedia = vi.fn().mockReturnValue({ matches: true });
    const { container } = render(<TestApp />);

    fireEvent.click(screen.getByText('ir a otra'));
    expect(screen.getByText('pagina otra')).toBeTruthy();
    expect(curtain(container).className).toContain('curtain--idle');
  });
});
