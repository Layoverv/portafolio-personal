import { Bot, Mail, MapPin, Phone } from 'lucide-react';
import { useApp } from '../context/AppContext.jsx';
import SectionTitle from '../components/ui/SectionTitle.jsx';
import SocialLinks from '../components/ui/SocialLinks.jsx';
import Button from '../components/ui/Button.jsx';
import ContactForm from '../components/contact/ContactForm.jsx';
import './Contact.css';

function Contact() {
  const { profile, isAvailable } = useApp();
  const { email, phone } = profile.contact;
  // Solo se muestran los datos con visible: true y un valor escrito en profile.js.
  const showEmail = email.visible && email.value;
  const showPhone = phone.visible && phone.value;

  return (
    <section className="section">
      <div className="container contact__grid">
        <div>
          <SectionTitle
            eyebrow="Contacto"
            title="Hablemos"
            subtitle="Cuéntame sobre tu proyecto, vacante o práctica. Todos los campos son obligatorios."
          />

          <ul className="contact__info">
            <li>
              <MapPin size={18} aria-hidden="true" /> {profile.location}
            </li>
            {showEmail && (
              <li>
                <Mail size={18} aria-hidden="true" /> <a href={`mailto:${email.value}`}>{email.value}</a>
              </li>
            )}
            {showPhone && (
              <li>
                <Phone size={18} aria-hidden="true" /> {phone.value}
              </li>
            )}
            <li className={isAvailable ? 'contact__available' : 'text-muted'}>
              {isAvailable ? profile.availability.availableText : profile.availability.unavailableText}
            </li>
          </ul>

          <SocialLinks />

          <div className="contact__assistant card">
            <p className="text-muted">¿Prefieres preguntar algo rápido antes de escribir?</p>
            <Button to="/asistente" variant="secondary" icon={Bot}>Preguntar al asistente</Button>
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}

export default Contact;
