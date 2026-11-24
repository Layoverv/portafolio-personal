import { Bot, Mail } from 'lucide-react';
import SectionTitle from '../components/ui/SectionTitle.jsx';
import DynamicIcon from '../components/ui/DynamicIcon.jsx';
import Carousel from '../components/ui/Carousel.jsx';
import Button from '../components/ui/Button.jsx';
import { carouselSlides, contributions, services } from '../data/services.js';
import './ValueProposition.css';

function ValueProposition() {
  return (
    <section className="section">
      <div className="container">
        {/* ===== Sección 1: ¿Qué puedo aportar? ===== */}
        <SectionTitle
          eyebrow="Propuesta de valor"
          title="¿Qué puedo aportar?"
          subtitle="Lo que puedo ofrecer a un equipo desde mi formación y mi práctica actual."
        />
        <div className="value__list">
          {contributions.map((item, index) => (
            <article key={item.id} className="card value__item reveal" style={{ '--delay': `${index * 80}ms` }}>
              <span className="icon-box"><DynamicIcon name={item.icon} /></span>
              <div>
                <h3 className="value__title">{item.title}</h3>
                <p className="text-muted">{item.text}</p>
              </div>
            </article>
          ))}
        </div>

        {/* ===== Carrusel: cómo trabajo ===== */}
        <div className="subsection">
          <h3 className="subsection__title">Cómo trabajo</h3>
          <Carousel slides={carouselSlides} />
        </div>

        {/* ===== Sección 2: Servicios profesionales ===== */}
        <div className="subsection">
          <h3 className="subsection__title">Servicios profesionales</h3>
          <p className="text-muted value__disclaimer">
            Cada servicio indica desde qué nivel parto. Los de nivel inicial o en aprendizaje son áreas en las que estoy formándome.
          </p>
          <div className="grid-cards">
            {services.map((service) => (
              <article key={service.id} className="card service-card">
                <span className="icon-box"><DynamicIcon name={service.icon} /></span>
                <h4>{service.title}</h4>
                <p className="text-muted">{service.text}</p>
                <span className="service-card__level">{service.level}</span>
              </article>
            ))}
          </div>
        </div>

        {/* ===== Cierre de la sección ===== */}
        <footer className="value__footer card">
          <div>
            <h3>¿Tienes un proyecto o una vacante?</h3>
            <p className="text-muted">Escríbeme por el formulario o pregúntale primero a mi asistente.</p>
          </div>
          <div className="value__footer-actions">
            <Button to="/contacto" icon={Mail}>Contactarme</Button>
            <Button to="/asistente" variant="secondary" icon={Bot}>Hablar con el asistente</Button>
          </div>
        </footer>
      </div>
    </section>
  );
}

export default ValueProposition;
