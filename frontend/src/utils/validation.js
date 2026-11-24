// =============================================================
// VALIDACIONES DEL FORMULARIO DE CONTACTO (Módulo 6)
// Cada función recibe el valor y devuelve un mensaje de error,
// o una cadena vacía ('') si el valor es correcto.
// =============================================================

export const NAME_MAX_LENGTH = 20;
export const DESCRIPTION_MAX_LENGTH = 1000;

// Solo letras (incluye tildes, ñ y ü) y espacios para nombres compuestos.
const LETTERS_REGEX = /^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/;
// Formato usuario@dominio.ext
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Solo dígitos.
const DIGITS_REGEX = /^\d+$/;

function validateName(value, label) {
  const text = value.trim();
  if (text === '') return `${label} es obligatorio.`;
  if (!LETTERS_REGEX.test(text)) return `${label} solo puede contener letras.`;
  if (text.length > NAME_MAX_LENGTH) return `${label} admite máximo ${NAME_MAX_LENGTH} caracteres.`;
  return '';
}

// Objeto de validadores: una función por campo del formulario.
export const validators = {
  firstName: (value) => validateName(value, 'El nombre'),
  lastName: (value) => validateName(value, 'Los apellidos'),
  email: (value) => {
    const text = value.trim();
    if (text === '') return 'El correo electrónico es obligatorio.';
    if (!EMAIL_REGEX.test(text)) return 'Escribe un correo válido, por ejemplo nombre@correo.com.';
    return '';
  },
  phone: (value) => {
    const text = value.trim();
    if (text === '') return 'El teléfono es obligatorio.';
    if (!DIGITS_REGEX.test(text)) return 'El teléfono solo puede contener números.';
    if (text.length < 7 || text.length > 15) return 'El teléfono debe tener entre 7 y 15 dígitos.';
    return '';
  },
  description: (value) => {
    const text = value.trim();
    if (text === '') return 'La descripción del proyecto es obligatoria.';
    if (text.length < 10) return 'Cuéntame un poco más (mínimo 10 caracteres).';
    if (text.length > DESCRIPTION_MAX_LENGTH) return `Máximo ${DESCRIPTION_MAX_LENGTH} caracteres.`;
    return '';
  },
};

/**
 * Valida todo el formulario.
 * @returns {Object} errores por campo; vacío ({}) si todo es correcto.
 */
export function validateContactForm(values) {
  const errors = {};
  Object.keys(validators).forEach((field) => {
    const message = validators[field](values[field] ?? '');
    if (message) errors[field] = message;
  });
  return errors;
}
