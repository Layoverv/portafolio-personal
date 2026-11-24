import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Calendar, ExternalLink, Folder, Hash, Layers, X } from 'lucide-react';
import StatusBadge from './StatusBadge.jsx';

/**
 * Panel lateral con los 8 atributos del proyecto seleccionado.
 * Se cierra con el botón X, con la tecla Escape o tocando el fondo oscuro.
 */
function ProjectSidebar({ project, onClose }) {
  const closeButtonRef = useRef(null);

  // Al abrir: foco en el botón cerrar, Escape para cerrar y bloqueo del scroll de fondo.
  useEffect(() => {
    if (!project) return undefined;
    closeButtonRef.current?.focus();
    const handleKey = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  if (!project) return null;

  // createPortal dibuja el panel directamente en <body>, por encima del navbar,
  // aunque el componente viva dentro de la página de proyectos.
  return createPortal(
    <div className="sidebar-overlay" onClick={onClose}>
      <aside
        className="sidebar"
        role="dialog"
        aria-modal="true"
        aria-labelledby="sidebar-title"
        // Evita que un clic dentro del panel llegue al fondo y lo cierre.
        onClick={(event) => event.stopPropagation()}
      >
        <header className="sidebar__header">
          <h2 id="sidebar-title" className="sidebar__title">
            {project.name}
          </h2>
          <button ref={closeButtonRef} type="button" className="sidebar__close" onClick={onClose} aria-label="Cerrar detalles">
            <X size={22} />
          </button>
        </header>

        <dl className="sidebar__list">
          <div className="sidebar__row">
            <dt><Hash size={15} aria-hidden="true" /> ID</dt>
            <dd>{project.id}</dd>
          </div>
          <div className="sidebar__row">
            <dt>Nombre</dt>
            <dd>{project.name}</dd>
          </div>
          <div className="sidebar__row sidebar__row--block">
            <dt>Descripción</dt>
            <dd>{project.description}</dd>
          </div>
          <div className="sidebar__row">
            <dt><Folder size={15} aria-hidden="true" /> Categoría</dt>
            <dd>{project.category}</dd>
          </div>
          <div className="sidebar__row sidebar__row--block">
            <dt><Layers size={15} aria-hidden="true" /> Tecnologías</dt>
            <dd>
              <ul className="tag-list">
                {project.technologies.map((tech) => (
                  <li key={tech} className="tag">{tech}</li>
                ))}
              </ul>
            </dd>
          </div>
          <div className="sidebar__row">
            <dt><Calendar size={15} aria-hidden="true" /> Fecha</dt>
            <dd>{project.date}</dd>
          </div>
          <div className="sidebar__row">
            <dt>Estado</dt>
            <dd><StatusBadge status={project.status} /></dd>
          </div>
          <div className="sidebar__row">
            <dt><ExternalLink size={15} aria-hidden="true" /> Enlace</dt>
            <dd>
              {project.link ? (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="sidebar__link">
                  Ver repositorio o demo
                </a>
              ) : (
                <span className="text-muted">Enlace no disponible</span>
              )}
            </dd>
          </div>
        </dl>
      </aside>
    </div>,
    document.body,
  );
}

export default ProjectSidebar;
