import { useEffect } from 'react';

/**
 * Scroll suave con inercia para la rueda del ratón (sin librerías).
 *
 * Cómo funciona: en lugar de dejar que la rueda salte de golpe, se guarda
 * un "objetivo" y en cada cuadro de animación la página avanza una fracción
 * de la distancia que falta (interpolación lineal o "lerp"). El resultado es
 * un desplazamiento que acelera y frena con suavidad.
 *
 * No se activa:
 *  - en pantallas táctiles (el scroll nativo del celular ya es suave),
 *  - si el sistema pide menos movimiento (accesibilidad),
 *  - dentro de zonas con scroll propio (chat, panel lateral de proyectos),
 *  - si la página tiene el scroll bloqueado (por ejemplo, con un panel abierto),
 *  - con Ctrl presionado (zoom del navegador).
 */

// Suavidad: fracción de la distancia que se recorre por cuadro a 60 fps (0-1).
// Más bajo = más suave y con más inercia. 0.1 es rápido, 0.06 es muy suave.
const EASE = 0.065;
// Multiplica lo que avanza cada giro de la rueda (1 = lo normal del sistema).
const WHEEL_MULTIPLIER = 1;

let target = 0;
let current = 0;
let frame = null;
let lastTime = 0;

const maxScroll = () => document.documentElement.scrollHeight - window.innerHeight;
const clamp = (value) => Math.max(0, Math.min(value, maxScroll()));

// Ajusta EASE al tiempo real entre cuadros: se ve igual en pantallas de 60, 120 o 144 Hz.
function step(time) {
  const elapsed = lastTime ? Math.min(time - lastTime, 64) : 16.7;
  lastTime = time;
  const factor = 1 - Math.pow(1 - EASE, elapsed / 16.7);

  current += (target - current) * factor;
  if (Math.abs(target - current) < 0.3) {
    current = target;
    frame = null;
    lastTime = 0;
  } else {
    frame = requestAnimationFrame(step);
  }
  window.scrollTo(0, current);
}

/** Lleva la página a una posición. immediate = sin animación. */
export function smoothScrollTo(y, { immediate = false } = {}) {
  target = clamp(y);
  if (immediate) {
    if (frame) cancelAnimationFrame(frame);
    frame = null;
    lastTime = 0;
    current = target;
    window.scrollTo(0, target);
    return;
  }
  current = window.scrollY;
  if (!frame) frame = requestAnimationFrame(step);
}

/** ¿El elemento (o un padre) puede desplazarse por sí mismo en esa dirección? */
function hasOwnScroll(element, deltaY) {
  let node = element;
  while (node && node !== document.body && node !== document.documentElement) {
    const { overflowY } = window.getComputedStyle(node);
    const scrollable = (overflowY === 'auto' || overflowY === 'scroll') && node.scrollHeight > node.clientHeight;
    if (scrollable) {
      const atTop = node.scrollTop <= 0;
      const atBottom = node.scrollTop + node.clientHeight >= node.scrollHeight - 1;
      if ((deltaY < 0 && !atTop) || (deltaY > 0 && !atBottom)) return true;
    }
    node = node.parentElement;
  }
  return false;
}

export function useSmoothScroll() {
  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reducedMotion) return undefined;

    // El CSS "scroll-behavior: smooth" pelearía con esta animación: se apaga mientras el hook está activo.
    const root = document.documentElement;
    const previousBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';

    current = target = window.scrollY;

    const handleWheel = (event) => {
      if (event.ctrlKey || event.defaultPrevented) return;
      if (window.getComputedStyle(document.body).overflow === 'hidden') return;
      if (hasOwnScroll(event.target, event.deltaY)) return;

      event.preventDefault();
      // deltaMode 1 = líneas (Firefox); se convierte a píxeles.
      const delta = (event.deltaMode === 1 ? event.deltaY * 40 : event.deltaY) * WHEEL_MULTIPLIER;
      if (!frame) current = window.scrollY;
      target = clamp(target + delta);
      if (!frame) frame = requestAnimationFrame(step);
    };

    // Si el usuario se mueve con teclado o con la barra, el objetivo se sincroniza.
    const handleScroll = () => {
      if (!frame) current = target = window.scrollY;
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      if (frame) cancelAnimationFrame(frame);
      frame = null;
      lastTime = 0;
      root.style.scrollBehavior = previousBehavior;
    };
  }, []);
}
