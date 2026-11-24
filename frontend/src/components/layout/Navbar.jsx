import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

/**
 * Navegación responsive.
 *  - Móvil/tablet: barra superior de vidrio con menú desplegable.
 *  - Escritorio: barra lateral vertical (como la referencia tipo "bento").
 * Props: routes (arreglo de { path, label, icon }) definido en App.jsx.
 */
function Navbar({ routes }) {
  const [isOpen, setIsOpen] = useState(false); // menú móvil abierto o cerrado
  const [isScrolled, setIsScrolled] = useState(false); // para el fondo al hacer scroll
  const location = useLocation();

  // Efecto 1: escucha el scroll de la ventana y se limpia al desmontar.
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Efecto 2: al cambiar de página, cierra el menú.
  // (Volver arriba lo hace PageTransition cuando la cortina tapa la pantalla.)
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Efecto 3: con el menú abierto, la tecla Escape lo cierra.
  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKey = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen]);

  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <header className={`navbar ${isScrolled || isOpen ? 'navbar--solid' : ''}`}>
      <nav className="navbar__inner" aria-label="Navegación principal">
        <Link to="/" className="navbar__brand" aria-label="Ir al inicio">
          {/* 炎 = "llama": el único símbolo japonés del sitio */}
          <span className="navbar__logo kanji" lang="ja">
            炎
          </span>
          <span className="navbar__name">José Luis Oviedo</span>
        </Link>

        <button
          className="navbar__toggle"
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-controls="navbar-menu"
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <ul id="navbar-menu" className={`navbar__menu ${isOpen ? 'navbar__menu--open' : ''}`}>
          {routes.map((route) => {
            const Icon = route.icon;
            return (
              <li key={route.path}>
                <NavLink
                  to={route.path}
                  end={route.path === '/'}
                  className={({ isActive }) => `navbar__link ${isActive ? 'navbar__link--active' : ''}`}
                >
                  {Icon && <Icon className="navbar__icon" size={19} aria-hidden="true" />}
                  <span className="navbar__label">{route.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>

        <span className="navbar__year" aria-hidden="true">
          {new Date().getFullYear()}
        </span>
      </nav>
    </header>
  );
}

export default Navbar;
