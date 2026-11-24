import { GraduationCap, Heart, Target } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import SectionTitle from '../components/ui/SectionTitle.jsx';
import Button from '../components/ui/Button.jsx';
import './About.css';

// Un ícono por bloque, relacionado por el id del bloque.
const BLOCK_ICONS = { academico: GraduationCap, intereses: Heart, objetivos: Target };

function About() {
  const { profile } = useApp();
  const { about } = profile;

  return (
    <section className="section">
      <div className="container">
        <SectionTitle eyebrow="Sobre mí" title="Mi perfil y trayectoria" />

        <div className="about__intro">
          <img
            src={profile.photo}
            alt={profile.photoAlt}
            className="about__photo"
            width="140"
            height="140"
            loading="lazy"
          />
          <div>
            <p className="about__lead">{about.intro}</p>
            <ul className="tag-list about__skills" aria-label="Habilidades blandas">
              {about.softSkills.map((skill) => (
                <li key={skill} className="tag">{skill}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="about__grid">
          {about.blocks.map((block, index) => {
            const Icon = BLOCK_ICONS[block.id] || Target;
            return (
              <article key={block.id} className="card about__block reveal" style={{ '--delay': `${index * 100}ms` }}>
                <span className="icon-box"><Icon size={22} aria-hidden="true" /></span>
                <h3>{block.title}</h3>
                <p className="text-muted">{block.text}</p>
              </article>
            );
          })}
        </div>

        <div className="about__actions">
          <Button to="/tecnologias">Ver mi formación y conocimientos</Button>
          <Button to="/proyectos" variant="secondary">Ver mis proyectos</Button>
        </div>
      </div>
    </section>
  );
}

export default About;
