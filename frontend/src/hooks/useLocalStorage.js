import { useEffect, useState } from 'react';

/**
 * Igual que useState, pero guarda el valor en LocalStorage para que
 * sobreviva al recargar la página.
 * Si LocalStorage no está disponible (modo privado), funciona en memoria.
 */
export function useLocalStorage(key, initialValue) {
  // Inicialización perezosa: la función solo se ejecuta en el primer render.
  const [value, setValue] = useState(() => {
    try {
      const saved = window.localStorage.getItem(key);
      return saved !== null ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // Cada vez que cambia el valor, se guarda.
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Sin almacenamiento disponible: el valor se mantiene solo en memoria.
    }
  }, [key, value]);

  return [value, setValue];
}
