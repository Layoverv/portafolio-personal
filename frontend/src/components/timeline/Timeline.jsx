import { Briefcase, GraduationCap, HeartHandshake, Rocket, Users, Wrench } from 'lucide-react';
import { EXPERIENCE_TYPES } from '../../data/experience.js';
import './Timeline.css';

// Cada tipo de experiencia tiene su ícono y su color.
const TYPE_ICONS = {
  laboral: Briefcase,
  practica: Rocket,
  academico: GraduationCap,
  personal: Rocket,
  soporte: Wrench,
  comunidad: Users,
};

/**
 * Línea de tiempo reutilizable.
 * Props: items (arreglo de experiencias de data/experience.js).
 */
function Timeline({ items }) {
  // Solo se muestran en la leyenda los tipos que realmente aparecen.
  const usedTypes = [...new Set(items.map((item) => item.type))];

  return (
    <div>
      <ul className="timeline__legend" aria-label="Tipos de experiencia">
        {usedTypes.map((type) => (
          <li key={type} className={`timeline__type timeline__type--${type}`}>
            {EXPERIENCE_TYPES[type]}
          </li>
        ))}
      </ul>

      <ol className="timeline">
        {items.map((item) => {
          const Icon = TYPE_ICONS[item.type] || HeartHandshake;
          return (
            <li key={item.id} className={`timeline__item timeline__item--${item.type}`}>
              <span className="timeline__marker" aria-hidden="true">
                <Icon size={16} />
              </span>
              <div className="card timeline__content">
                <div className="timeline__meta">
                  <span className={`timeline__type timeline__type--${item.type}`}>{EXPERIENCE_TYPES[item.type]}</span>
                  <time className="timeline__period">{item.period}</time>
                </div>
                <h4 className="timeline__title">{item.title}</h4>
                <p className="text-muted">{item.description}</p>
              </div>
            </li>
          );
        })}
      </ol>

      {!items.some((item) => item.type === 'laboral') && (
        <p className="timeline__note text-muted">
          Aún no tengo experiencia laboral formal: estoy buscando mi primera oportunidad profesional.
        </p>
      )}
    </div>
  );
}

export default Timeline;
