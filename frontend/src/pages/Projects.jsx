import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { SearchX } from 'lucide-react';
import SectionTitle from '../components/ui/SectionTitle.jsx';
import ProjectCard from '../components/projects/ProjectCard.jsx';
import ProjectFilters from '../components/projects/ProjectFilters.jsx';
import ProjectSidebar from '../components/projects/ProjectSidebar.jsx';
import Pagination from '../components/projects/Pagination.jsx';
import { projects as allProjects } from '../data/projects.js';
import { visibleItems } from '../data/profile.js';
import { ALL, PAGE_SIZE, filterProjects, getCategories, getTotalPages, paginate } from '../utils/projectFilters.js';
import './Projects.css';

const EMPTY_FILTERS = { category: ALL, search: '' };

/**
 * Página de proyectos.
 * Props opcionales (útiles para las pruebas): projects.
 */
function Projects({ projects = visibleItems(allProjects) }) {
  // draft: lo que el usuario está escribiendo; applied: lo que se aplicó con "Filtrar".
  const [draftFilters, setDraftFilters] = useState(EMPTY_FILTERS);
  const [appliedFilters, setAppliedFilters] = useState(EMPTY_FILTERS);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState(null);

  // useMemo: solo recalcula cuando cambian los datos o los filtros aplicados.
  const categories = useMemo(() => getCategories(projects), [projects]);
  const filtered = useMemo(() => filterProjects(projects, appliedFilters), [projects, appliedFilters]);
  const totalPages = getTotalPages(filtered.length);
  const pageItems = paginate(filtered, currentPage);

  // Al cambiar de página, sube suavemente al inicio del listado.
  // isFirstRender evita que salte al listado apenas se abre la página.
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    document.getElementById('project-list')?.scrollIntoView?.({ behavior: 'smooth', block: 'start' });
  }, [currentPage]);

  const applyFilters = () => {
    setAppliedFilters(draftFilters);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setDraftFilters(EMPTY_FILTERS);
    setAppliedFilters(EMPTY_FILTERS);
    setCurrentPage(1);
  };

  // useCallback mantiene la misma función entre renders (la usa el useEffect del sidebar).
  const closeSidebar = useCallback(() => setSelectedProject(null), []);

  const firstItem = filtered.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const lastItem = Math.min(currentPage * PAGE_SIZE, filtered.length);

  return (
    <section className="section">
      <div className="container">
        <SectionTitle
          eyebrow="Portafolio"
          title="Mis proyectos"
          subtitle="Proyectos académicos, actividades de soporte y experiencias prácticas. Usa los filtros para encontrar uno."
        />

        <ProjectFilters
          categories={categories}
          values={draftFilters}
          onChange={setDraftFilters}
          onApply={applyFilters}
          onClear={clearFilters}
        />

        <p id="project-list" className="projects__count text-muted" aria-live="polite">
          {filtered.length === 0
            ? 'Sin resultados'
            : `Mostrando ${firstItem}–${lastItem} de ${filtered.length} proyectos`}
        </p>

        {filtered.length === 0 ? (
          <div className="card projects__empty">
            <SearchX size={32} aria-hidden="true" />
            <p>No encontré proyectos con esos filtros.</p>
            <button type="button" className="projects__empty-reset" onClick={clearFilters}>
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div className="projects__grid">
            {pageItems.map((project) => (
              <ProjectCard key={project.id} project={project} onSelect={setSelectedProject} />
            ))}
          </div>
        )}

        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      </div>

      <ProjectSidebar project={selectedProject} onClose={closeSidebar} />
    </section>
  );
}

export default Projects;
