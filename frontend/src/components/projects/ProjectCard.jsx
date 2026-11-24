import { ChevronRight, Folder } from 'lucide-react';
import StatusBadge from './StatusBadge.jsx';
import BurnImage from '../ui/BurnImage.jsx';

/**
 * Tarjeta del listado. Muestra 5 atributos: nombre, descripción,
 * categoría, tecnologías y estado.
 * Si el proyecto tiene images (2 o más), muestra la imagen que se quema al hacer clic.
 * Props: project (objeto), onSelect (función que recibe el proyecto).
 */
function ProjectCard({ project, onSelect }) {
  return (
    <article className={`card project-card ${project.images ? 'project-card--media' : ''}`}>
      {project.images?.length > 1 && <BurnImage images={project.images} />}

      <header className="project-card__header">
        <span className="project-card__category">
          <Folder size={14} aria-hidden="true" /> {project.category}
        </span>
        <StatusBadge status={project.status} />
      </header>

      <h3 className="project-card__title">{project.name}</h3>
      <p className="project-card__description">{project.description}</p>

      <ul className="tag-list" aria-label="Tecnologías">
        {project.technologies.map((tech) => (
          <li key={tech} className="tag">
            {tech}
          </li>
        ))}
      </ul>

      <button type="button" className="project-card__button" onClick={() => onSelect(project)}>
        Ver detalles <ChevronRight size={16} aria-hidden="true" />
      </button>
    </article>
  );
}

export default ProjectCard;
