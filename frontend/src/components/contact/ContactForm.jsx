import { useState } from 'react';
import { AlertCircle, CheckCircle2, Info, Loader2, Send } from 'lucide-react';
import Button from '../ui/Button.jsx';
import { DESCRIPTION_MAX_LENGTH, NAME_MAX_LENGTH, validateContactForm, validators } from '../../utils/validation.js';
import { isContactFormConfigured, sendContactForm } from '../../services/api.js';
import './ContactForm.css';

const INITIAL_VALUES = { firstName: '', lastName: '', email: '', phone: '', description: '' };

// Configuración de los campos como arreglo: el JSX los recorre con map().
const FIELDS = [
  { name: 'firstName', label: 'Nombre', type: 'text', autoComplete: 'given-name', maxLength: NAME_MAX_LENGTH },
  { name: 'lastName', label: 'Apellidos', type: 'text', autoComplete: 'family-name', maxLength: NAME_MAX_LENGTH },
  { name: 'email', label: 'Correo electrónico', type: 'email', autoComplete: 'email', maxLength: 80 },
  { name: 'phone', label: 'Teléfono', type: 'tel', autoComplete: 'tel', maxLength: 15, inputMode: 'numeric' },
];

/**
 * Formulario de contacto con validación en vivo.
 * Props opcionales (para pruebas): onSubmit y isConfigured.
 */
function ContactForm({ onSubmit = sendContactForm, isConfigured = isContactFormConfigured() }) {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  // status: 'idle' | 'sending' | 'success' | 'error'
  const [status, setStatus] = useState('idle');
  const [serverError, setServerError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // Si el campo ya fue tocado, se revalida mientras se escribe.
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validators[name](value) }));
    }
    if (status === 'success' || status === 'error') setStatus('idle');
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validators[name](value) }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formErrors = validateContactForm(values);
    setErrors(formErrors);
    setTouched({ firstName: true, lastName: true, email: true, phone: true, description: true });

    if (Object.keys(formErrors).length > 0) {
      // Lleva el foco al primer campo con error (accesibilidad).
      document.getElementById(`contact-${Object.keys(formErrors)[0]}`)?.focus();
      return;
    }

    setStatus('sending');
    setServerError('');
    try {
      // Datos limpios (sin espacios sobrantes) para el servicio.
      const cleanValues = Object.fromEntries(Object.entries(values).map(([key, value]) => [key, value.trim()]));
      await onSubmit(cleanValues);
      // Solo se confirma cuando el servicio respondió correctamente.
      setStatus('success');
      setValues(INITIAL_VALUES);
      setTouched({});
      setErrors({});
    } catch (error) {
      setStatus('error');
      setServerError(error.message);
    }
  };

  const fieldError = (name) => (touched[name] ? errors[name] : '');

  return (
    <form className="contact-form card" onSubmit={handleSubmit} noValidate>
      {!isConfigured && (
        <div className="alert alert--info" role="note">
          <Info size={18} aria-hidden="true" />
          <span>
            El formulario aún no está conectado a un servicio de mensajes, así que por ahora no se puede enviar.
          </span>
        </div>
      )}

      <div className="contact-form__grid">
        {FIELDS.map((field) => (
          <div key={field.name} className="field">
            <label htmlFor={`contact-${field.name}`} className="field__label">
              {field.label} <span aria-hidden="true">*</span>
            </label>
            <input
              id={`contact-${field.name}`}
              name={field.name}
              type={field.type}
              className="field__input"
              value={values[field.name]}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete={field.autoComplete}
              inputMode={field.inputMode}
              maxLength={field.maxLength}
              required
              aria-invalid={Boolean(fieldError(field.name))}
              aria-describedby={fieldError(field.name) ? `contact-${field.name}-error` : undefined}
            />
            {fieldError(field.name) && (
              <span id={`contact-${field.name}-error`} className="field__error" role="alert">
                {fieldError(field.name)}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="field">
        <label htmlFor="contact-description" className="field__label">
          Descripción del proyecto <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="contact-description"
          name="description"
          className="field__input"
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur}
          maxLength={DESCRIPTION_MAX_LENGTH}
          required
          aria-invalid={Boolean(fieldError('description'))}
          aria-describedby="contact-description-hint"
        />
        <span id="contact-description-hint" className="field__hint">
          {values.description.length}/{DESCRIPTION_MAX_LENGTH} caracteres
        </span>
        {fieldError('description') && (
          <span className="field__error" role="alert">{fieldError('description')}</span>
        )}
      </div>

      {status === 'success' && (
        <div className="alert alert--success" role="status">
          <CheckCircle2 size={18} aria-hidden="true" />
          <span>¡Gracias! Tu mensaje se envió correctamente. Te responderé pronto.</span>
        </div>
      )}
      {status === 'error' && (
        <div className="alert alert--error" role="alert">
          <AlertCircle size={18} aria-hidden="true" />
          <span>{serverError}</span>
        </div>
      )}

      <Button type="submit" icon={status === 'sending' ? Loader2 : Send} disabled={status === 'sending' || !isConfigured} className={status === 'sending' ? 'is-loading' : ''}>
        {status === 'sending' ? 'Enviando...' : 'Enviar información'}
      </Button>
    </form>
  );
}

export default ContactForm;
