import { describe, expect, test } from 'vitest';
import { ALL, filterProjects, getCategories, getTotalPages, normalize, paginate } from '../utils/projectFilters.js';
import { projects } from '../data/projects.js';
import { visibleItems } from '../data/profile.js';

describe('filtros de proyectos', () => {
  test('sin filtros devuelve todos los proyectos', () => {
    expect(filterProjects(projects, { category: ALL, search: '' })).toHaveLength(projects.length);
  });

  test('filtra por categoría', () => {
    const result = filterProjects(projects, { category: 'Académico', search: '' });
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((p) => p.category === 'Académico')).toBe(true);
  });

  test('busca por nombre sin importar mayúsculas ni tildes', () => {
    const result = filterProjects(projects, { category: ALL, search: 'GESTION' });
    expect(result.map((p) => p.name)).toContain('Sistema de Gestión de Inventario');
  });

  test('combina categoría y búsqueda', () => {
    const result = filterProjects(projects, { category: 'Soporte', search: 'inventario' });
    expect(result).toHaveLength(0);
  });

  test('normalize quita tildes y espacios', () => {
    expect(normalize('  Gestión ')).toBe('gestion');
  });

  test('getCategories no repite categorías', () => {
    const categories = getCategories(projects);
    expect(new Set(categories).size).toBe(categories.length);
  });
});

describe('paginación', () => {
  const items = Array.from({ length: 25 }, (_, i) => i + 1);

  test('10 elementos por página', () => {
    expect(paginate(items, 1)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(paginate(items, 3)).toEqual([21, 22, 23, 24, 25]);
  });

  test('calcula el total de páginas (mínimo 1)', () => {
    expect(getTotalPages(25)).toBe(3);
    expect(getTotalPages(10)).toBe(1);
    expect(getTotalPages(0)).toBe(1);
  });
});

describe('interruptor showDemoData', () => {
  test('en false quita los datos de relleno', () => {
    const real = visibleItems(projects, false);
    expect(real.every((p) => !p.demo)).toBe(true);
    expect(real.length).toBeLessThan(projects.length);
  });

  test('cada proyecto tiene sus 8 atributos', () => {
    const keys = ['id', 'name', 'description', 'category', 'technologies', 'date', 'status', 'link'];
    projects.forEach((project) => keys.forEach((key) => expect(project).toHaveProperty(key)));
  });
});
