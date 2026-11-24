import { Link } from 'react-router-dom';
import './Button.css';

/**
 * Botón reutilizable.
 * Props:
 *  - variant: 'primary' | 'secondary' | 'ghost'
 *  - to: ruta interna (usa <Link> de React Router)
 *  - href: enlace externo (usa <a>)
 *  - icon: componente de ícono de lucide-react
 *  - el resto (onClick, type, disabled...) se pasa al <button>
 */
function Button({ children, variant = 'primary', to, href, icon: Icon, className = '', ...rest }) {
  const classes = `btn btn--${variant} ${className}`.trim();
  const content = (
    <>
      <span>{children}</span>
      {Icon && <Icon size={18} aria-hidden="true" />}
    </>
  );

  // Renderizado condicional: el mismo componente produce 3 etiquetas distintas.
  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} {...rest}>
      {content}
    </button>
  );
}

export default Button;
