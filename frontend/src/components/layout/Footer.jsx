import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext.jsx';
import SocialLinks from '../ui/SocialLinks.jsx';
import './Footer.css';

function Footer({ routes }) {
  const { profile } = useApp();
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <strong>{profile.name}</strong>
          <span className="text-muted">{profile.headline}</span>
        </div>

        <nav aria-label="Enlaces del pie de página">
          <ul className="footer__links">
            {routes.map((route) => (
              <li key={route.path}>
                <Link to={route.path}>{route.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <SocialLinks />
      </div>

      <p className="footer__copy container">
        © {year} {profile.name}. Hecho con React, Vite y Express.
      </p>
    </footer>
  );
}

export default Footer;
