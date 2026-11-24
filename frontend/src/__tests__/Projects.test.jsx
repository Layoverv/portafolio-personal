import { afterEach, describe, expect, test } from 'vitest';
import { cleanup, fireEvent, render, screen, within } from '@testing-library/react';
import Projects from '../pages/Projects.jsx';

afterEach(cleanup);

// 23 proyectos de prueba -> 3 páginas (10, 10, 3).
const makeProjects = () =>
  Array.from({ length: 23 }, (_, i) => ({
    id: i + 1,
    name: i === 22 ? 'Sistema de Inventario' : `Proyecto ${i + 1}`,
    description: 'Descripción',
    category: i % 2 === 0 ? 'Web' : 'Redes',
    technologies: ['Python'],
    date: '2024',
    status: 'Finalizado',
    link: '',
  }));

const cards = () => screen.queryAllByRole('button', { name: /ver detalles/i });

describe('página de proyectos', () => {
  test('muestra los primeros 10 proyectos y permite cambiar de página', () => {
    render(<Projects projects={makeProjects()} />);
    expect(cards()).toHaveLength(10);
    expect(screen.getByText('Mostrando 1–10 de 23 proyectos')).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: 'Página 3' }));
    expect(cards()).toHaveLength(3);

    fireEvent.click(screen.getByRole('button', { name: 'Página anterior' }));
    expect(screen.getByText('Mostrando 11–20 de 23 proyectos')).toBeTruthy();
  });

  test('los filtros solo se aplican al pulsar "Filtrar"', () => {
    render(<Projects projects={makeProjects()} />);
    fireEvent.change(screen.getByLabelText('Categoría'), { target: { value: 'Redes' } });
    expect(cards()).toHaveLength(10); // aún no se aplicó

    fireEvent.click(screen.getByRole('button', { name: 'Filtrar' }));
    expect(screen.getByText('Mostrando 1–10 de 11 proyectos')).toBeTruthy();
  });

  test('busca por nombre, muestra "sin resultados" y limpia filtros', () => {
    render(<Projects projects={makeProjects()} />);
    const search = screen.getByLabelText('Buscar por nombre');

    fireEvent.change(search, { target: { value: 'inventario' } });
    fireEvent.click(screen.getByRole('button', { name: 'Filtrar' }));
    expect(cards()).toHaveLength(1);

    fireEvent.change(search, { target: { value: 'no existe' } });
    fireEvent.click(screen.getByRole('button', { name: 'Filtrar' }));
    expect(screen.getByText('No encontré proyectos con esos filtros.')).toBeTruthy();

    fireEvent.click(screen.getAllByRole('button', { name: 'Limpiar filtros' })[0]);
    expect(cards()).toHaveLength(10);
    expect(search.value).toBe('');
  });

  test('el sidebar muestra los 8 atributos y se puede cerrar', () => {
    render(<Projects projects={makeProjects()} />);
    fireEvent.click(cards()[0]);

    const dialog = screen.getByRole('dialog');
    const labels = [...dialog.querySelectorAll('dt')].map((dt) => dt.textContent.trim());
    expect(labels).toEqual(['ID', 'Nombre', 'Descripción', 'Categoría', 'Tecnologías', 'Fecha', 'Estado', 'Enlace']);
    expect(within(dialog).getByText('Enlace no disponible')).toBeTruthy();

    fireEvent.click(screen.getByRole('button', { name: 'Cerrar detalles' }));
    expect(screen.queryByRole('dialog')).toBeNull();

    // También se cierra con la tecla Escape.
    fireEvent.click(cards()[1]);
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).toBeNull();
  });
});
