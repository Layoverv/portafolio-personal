import { createContext, useContext, useState } from 'react';
import { profile } from '../data/profile.js';

// 1. Se crea el contexto: un "canal" para compartir datos sin pasar props por cada nivel.
const AppContext = createContext(null);

// 2. El Provider envuelve la app y entrega los valores a todos los componentes.
export function AppProvider({ children }) {
  // La disponibilidad se configura en data/profile.js (availability.isAvailable).
  const [isAvailable, setIsAvailable] = useState(profile.availability.isAvailable);
  // Estado del chat flotante: se usará en la Fase 4.
  const [isChatOpen, setIsChatOpen] = useState(false);

  const value = {
    profile,
    isAvailable,
    setIsAvailable,
    isChatOpen,
    setIsChatOpen,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// 3. Hook personalizado para consumir el contexto con una sola línea: useApp().
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp debe usarse dentro de <AppProvider>');
  }
  return context;
}
