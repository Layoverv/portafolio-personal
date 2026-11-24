// =============================================================
// FUNCIONES PURAS PARA FILTRAR Y PAGINAR PROYECTOS
// "Puras" = reciben datos y devuelven un resultado nuevo sin
// modificar nada externo. Por eso son fáciles de probar.
// =============================================================

export const PAGE_SIZE = 10;
export const ALL = 'todas';

/** Lista de categorías únicas, ordenadas alfabéticamente. */
export function getCategories(projects) {
  // map() saca la categoría de cada proyecto y Set elimina repetidos.
  return [...new Set(projects.map((project) => project.category))].sort((a, b) => a.localeCompare(b, 'es'));
}

/** Quita tildes y pasa a minúsculas: "Gestión" y "gestion" coinciden. */
export function normalize(text) {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim();
}

/**
 * Filtra por categoría (selector) y por nombre (búsqueda).
 * @param {Array} projects
 * @param {{ category: string, search: string }} filters
 */
export function filterProjects(projects, { category = ALL, search = '' } = {}) {
  const term = normalize(search);
  return projects.filter((project) => {
    const matchesCategory = category === ALL || project.category === category;
    const matchesName = term === '' || normalize(project.name).includes(term);
    return matchesCategory && matchesName;
  });
}

/** Número total de páginas (mínimo 1 para que el paginador no muestre "página 1 de 0"). */
export function getTotalPages(totalItems, pageSize = PAGE_SIZE) {
  return Math.max(1, Math.ceil(totalItems / pageSize));
}

/** Devuelve solo los elementos de la página pedida (las páginas empiezan en 1). */
export function paginate(items, page, pageSize = PAGE_SIZE) {
  const start = (page - 1) * pageSize;
  return items.slice(start, start + pageSize);
}
