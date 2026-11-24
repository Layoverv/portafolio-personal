import { Github, Linkedin, Link as LinkIcon } from 'lucide-react';
import { useApp } from '../../context/AppContext.jsx';
import './SocialLinks.css';

// Objeto que relaciona cada red con su ícono.
const ICONS = {
  github: Github,
  linkedin: Linkedin,
};

/**
 * Muestra solo las redes que tienen URL en profile.js.
 * Si ninguna tiene URL, no muestra nada.
 */
function SocialLinks() {
  const { profile } = useApp();

  // filter(): deja solo las redes con URL configurada.
  const activeSocials = profile.socials.filter((social) => social.url.trim() !== '');

  if (activeSocials.length === 0) return null;

  return (
    <ul className="social-links">
      {activeSocials.map((social) => {
        const Icon = ICONS[social.id] || LinkIcon;
        return (
          <li key={social.id}>
            <a href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.label}>
              <Icon size={20} aria-hidden="true" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export default SocialLinks;
