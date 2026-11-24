import './SectionTitle.css';

/**
 * Encabezado de sección reutilizable.
 * Props: eyebrow (texto pequeño superior), title, subtitle.
 */
function SectionTitle({ eyebrow, title, subtitle, align = 'left' }) {
  return (
    <header className={`section-title section-title--${align}`}>
      {eyebrow && <span className="section-title__eyebrow">{eyebrow}</span>}
      <h2 className="section-title__title">{title}</h2>
      {subtitle && <p className="section-title__subtitle">{subtitle}</p>}
    </header>
  );
}

export default SectionTitle;
