import { GraduationCap } from 'lucide-react';
import SectionTitle from '../components/ui/SectionTitle.jsx';
import DynamicIcon from '../components/ui/DynamicIcon.jsx';
import Timeline from '../components/timeline/Timeline.jsx';
import { useApp } from '../context/AppContext.jsx';
import { visibleItems } from '../data/profile.js';
import { LEVELS, aiTools, techCategories } from '../data/technologies.js';
import { experience } from '../data/experience.js';
import './Technologies.css';

// Clase CSS según el nivel de conocimiento.
const LEVEL_CLASS = {
  [LEVELS.BASIC]: 'level--basic',
  [LEVELS.FUNDAMENTALS]: 'level--fundamentals',
  [LEVELS.LEARNING]: 'level--learning',
};

function Technologies() {
  const { profile } = useApp();

  // Se filtran los datos de relleno y se quitan las categorías que queden vacías.
  const categories = techCategories
    .map((category) => ({ ...category, items: visibleItems(category.items) }))
    .filter((category) => category.items.length > 0);
  const tools = visibleItems(aiTools);

  return (
    <section className="section">
      <div className="container">
        <SectionTitle
          eyebrow="Stack tecnológico"
          title="Conocimientos y formación"
          subtitle="Cada tecnología indica con honestidad mi nivel actual."
        />

        {/* ===== Stack por categorías ===== */}
        <ul className="levels-legend" aria-label="Niveles de conocimiento">
          {Object.values(LEVELS).map((level) => (
            <li key={level} className={`level ${LEVEL_CLASS[level]}`}>{level}</li>
          ))}
        </ul>

        <div className="grid-cards">
          {categories.map((category, index) => (
            <article key={category.id} className="card tech-card reveal" style={{ '--delay': `${index * 60}ms` }}>
              <header className="tech-card__header">
                <span className="icon-box"><DynamicIcon name={category.icon} /></span>
                <h3 className="tech-card__title">{category.title}</h3>
              </header>
              <ul className="tech-card__list">
                {category.items.map((item) => (
                  <li key={item.name} className="tech-card__item">
                    <span>{item.name}</span>
                    <span className={`level ${LEVEL_CLASS[item.level]}`}>{item.level}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        {/* ===== Formación académica ===== */}
        <div className="subsection">
          <h3 className="subsection__title">Formación académica</h3>
          <div className="grid-cards education-grid">
            {profile.education.map((item) => (
              <article key={item.id} className="card education-card">
                <span className="icon-box"><GraduationCap size={22} aria-hidden="true" /></span>
                <div>
                  <h4>{item.program}</h4>
                  <p className="text-muted">{item.institution}</p>
                  <dl className="education-card__data">
                    <div><dt>Estado</dt><dd>{item.status}</dd></div>
                    <div><dt>Periodo</dt><dd>{item.period}</dd></div>
                    <div><dt>Lugar</dt><dd>{item.location}</dd></div>
                  </dl>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* ===== Herramientas de IA ===== */}
        <div className="subsection">
          <h3 className="subsection__title">Herramientas de inteligencia artificial</h3>
          <div className="grid-cards">
            {tools.map((tool) => (
              <article key={tool.id} className="card ai-card">
                <span className="ai-card__logo" style={{ '--logo-color': tool.logo.color }} aria-hidden="true">
                  {tool.logo.letter}
                </span>
                <h4>{tool.name}</h4>
                <p className="text-muted">{tool.description}</p>
                <p className="ai-card__usage"><strong>Cómo la uso:</strong> {tool.usage}</p>
              </article>
            ))}
          </div>
        </div>

        {/* ===== Experiencia y trayectoria ===== */}
        <div className="subsection">
          <h3 className="subsection__title">Experiencia y trayectoria</h3>
          <Timeline items={experience} />
        </div>
      </div>
    </section>
  );
}

export default Technologies;
