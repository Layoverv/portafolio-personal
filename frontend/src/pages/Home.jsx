import { ArrowRight, ArrowUpRight, Bot, Code, Mail, MapPin, Network, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { techCategories } from '../data/technologies.js';
import { visibleItems } from '../data/profile.js';
import Button from '../components/ui/Button.jsx';
import SocialLinks from '../components/ui/SocialLinks.jsx';
import { ArcLines, Sparkle } from '../components/ui/Decor.jsx';
import './Home.css';

// Íconos de las áreas destacadas, en el mismo orden que profile.highlights.
const HIGHLIGHT_ICONS = [Code, Network, Wrench];

// Habilidades para el panel de etiquetas: las primeras de cada categoría.
const SKILL_PILLS = techCategories
  .flatMap((category) => visibleItems(category.items))
  .slice(0, 9);

/**
 * Inicio en formato "bento": un marco de vidrio con paneles de
 * distintos tamaños, inspirado en la referencia de interfaz.
 */
function Home() {
  const { profile, isAvailable } = useApp();
  const { availability } = profile;
  const lastName = profile.name.split(' ')[2] || profile.shortName;

  return (
    <section className="home container">
      <div className="bento glass-frame">
        {/* ===== Panel principal (héroe) ===== */}
        <article className="bento__hero reveal">
          <div className="hero__art" aria-hidden="true">
            <img src="/images/theme/sukuna.jpg" alt="" className="hero__image" width="1600" height="1067" />
          </div>
          <ArcLines />
          <Sparkle size={26} style={{ top: '18%', right: '9%' }} />
          <Sparkle size={14} style={{ top: '27%', right: '15%', '--delay': '1500ms' }} />

          <p className="hero__mega display" aria-hidden="true">
            {lastName}
          </p>

          <p className="hero__mono">
            {'// '}
            {profile.summary}
          </p>

          <span className="hero__kanji kanji" lang="ja" aria-hidden="true">
            炎
          </span>

          <div className="hero__body">
            <p className="hero__role">{profile.role}</p>
            <h1 className="hero__title display">
              {profile.shortName}
              <span className="hero__title-rest text-gradient">Oviedo Camacho</span>
            </h1>
            <div className="hero__actions">
              <Button to="/proyectos" icon={ArrowRight}>
                Ver mis proyectos
              </Button>
              <Button to="/contacto" variant="secondary" icon={Mail}>
                Contactarme
              </Button>
            </div>
          </div>

          {/* Muesca circular en el borde, con la foto de perfil */}
          <div className="hero__notch">
            <img src={profile.photo} alt={profile.photoAlt} width="64" height="64" />
          </div>
        </article>

        {/* ===== Columna lateral: estado + tarjetas apiladas ===== */}
        <aside className="bento__side">
          <span
            className={`status-pill reveal ${isAvailable ? 'status-pill--on' : 'status-pill--off'}`}
            role="status"
            style={{ '--delay': '120ms' }}
          >
            <span className="status-pill__dot" aria-hidden="true" />
            {isAvailable ? availability.availableText : availability.unavailableText}
          </span>

          <ul className="stack" aria-label="Áreas destacadas">
            {profile.highlights.map((item, index) => {
              const Icon = HIGHLIGHT_ICONS[index] || Code;
              return (
                <li
                  key={item.id}
                  className={`stack__card reveal stack__card--${index + 1}`}
                  style={{ '--delay': `${200 + index * 100}ms` }}
                >
                  <span className="stack__tab">
                    <Icon size={16} aria-hidden="true" />
                  </span>
                  <div>
                    <h2 className="stack__title">{item.label}</h2>
                    <p className="stack__detail">{item.detail}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </aside>

        {/* ===== Panel inferior: ubicación y formación ===== */}
        <article className="bento__info reveal" style={{ '--delay': '300ms' }}>
          <span className="bento__eyebrow">Perfil</span>
          <p className="bento__headline">{profile.headline}</p>
          <p className="bento__meta">
            <MapPin size={15} aria-hidden="true" /> {profile.location}
          </p>
          <SocialLinks />
          <span className="bento__index display" aria-hidden="true">
            01
          </span>
        </article>

        {/* ===== Panel de habilidades en forma de píldoras ===== */}
        <article className="bento__skills reveal" style={{ '--delay': '380ms' }}>
          <div className="bento__row">
            <span className="bento__eyebrow">Stack</span>
            <Link to="/tecnologias" className="bento__more" aria-label="Ver todas las tecnologías">
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <ul className="pills">
            {SKILL_PILLS.map((skill, index) => (
              <li key={skill.name} className={`pill ${index % 4 === 1 ? 'pill--filled' : ''}`}>
                {skill.name}
              </li>
            ))}
          </ul>
        </article>

        {/* ===== Panel del asistente con tarjetas en abanico ===== */}
        <Link to="/asistente" className="bento__cta reveal" style={{ '--delay': '460ms' }}>
          <div className="bento__row">
            <span className="bento__eyebrow">Asistente IA</span>
            <span className="bento__more" aria-hidden="true">
              <Bot size={16} />
            </span>
          </div>
          <p className="bento__cta-title">Pregúntale a mi asistente por mi perfil</p>
          <div className="fan" aria-hidden="true">
            <span className="fan__card fan__card--1" />
            <span className="fan__card fan__card--2" />
            <span className="fan__card fan__card--3" />
          </div>
        </Link>
      </div>
    </section>
  );
}

export default Home;
