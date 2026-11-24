import { Filter, RotateCcw, Search } from 'lucide-react';
import Button from '../ui/Button.jsx';
import { ALL } from '../../utils/projectFilters.js';

/**
 * Filtros del listado de proyectos.
 * Es un componente "controlado": los valores vienen por props
 * y cada cambio se avisa al padre con onChange.
 */
function ProjectFilters({ categories, values, onChange, onApply, onClear }) {
  // Un solo manejador para los dos campos gracias al atributo name.
  const handleChange = (event) => {
    const { name, value } = event.target;
    onChange({ ...values, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // evita que el navegador recargue la página
    onApply();
  };

  return (
    <form className="filters card" onSubmit={handleSubmit} role="search">
      <div className="field">
        <label htmlFor="filter-category" className="field__label">
          Categoría
        </label>
        <select id="filter-category" name="category" className="field__input" value={values.category} onChange={handleChange}>
          <option value={ALL}>Todas las categorías</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="field filters__search">
        <label htmlFor="filter-search" className="field__label">
          Buscar por nombre
        </label>
        <div className="field__with-icon">
          <Search size={16} aria-hidden="true" />
          <input
            id="filter-search"
            name="search"
            type="search"
            className="field__input"
            placeholder="Ej.: inventario"
            value={values.search}
            onChange={handleChange}
            maxLength={60}
          />
        </div>
      </div>

      <div className="filters__actions">
        <Button type="submit" icon={Filter}>
          Filtrar
        </Button>
        <Button type="button" variant="secondary" icon={RotateCcw} onClick={onClear}>
          Limpiar filtros
        </Button>
      </div>
    </form>
  );
}

export default ProjectFilters;
