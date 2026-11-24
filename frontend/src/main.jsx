import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { AppProvider } from './context/AppContext.jsx';

// Estilos globales: se cargan una sola vez para toda la aplicación.
import './styles/variables.css';
import './styles/global.css';
import './styles/animations.css';

// Punto de entrada: React "monta" la aplicación dentro de <div id="root">.
// BrowserRouter habilita la navegación y AppProvider comparte el estado global.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);
