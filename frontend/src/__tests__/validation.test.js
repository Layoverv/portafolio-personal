import { describe, expect, test } from 'vitest';
import { validateContactForm, validators } from '../utils/validation.js';

const VALID = {
  firstName: 'José Luis',
  lastName: 'Oviedo Camacho',
  email: 'jose@correo.com',
  phone: '3001234567',
  description: 'Necesito ayuda con la red de mi oficina.',
};

describe('validaciones del formulario', () => {
  test('un formulario correcto no tiene errores', () => {
    expect(validateContactForm(VALID)).toEqual({});
  });

  test('todos los campos son obligatorios', () => {
    const errors = validateContactForm({ firstName: '', lastName: '', email: '', phone: '', description: '' });
    expect(Object.keys(errors)).toHaveLength(5);
  });

  test('nombre y apellidos solo aceptan letras', () => {
    expect(validators.firstName('Juan123')).toMatch(/letras/);
    expect(validators.lastName('Pérez!')).toMatch(/letras/);
    expect(validators.firstName('Ñandú Ávila')).toBe('');
  });

  test('nombre y apellidos admiten máximo 20 caracteres', () => {
    expect(validators.firstName('a'.repeat(21))).toMatch(/20/);
    expect(validators.firstName('a'.repeat(20))).toBe('');
  });

  test('valida el formato del correo', () => {
    expect(validators.email('jose@')).toMatch(/válido/);
    expect(validators.email('jose@correo')).toMatch(/válido/);
    expect(validators.email('jose@correo.co')).toBe('');
  });

  test('el teléfono solo acepta números', () => {
    expect(validators.phone('300-123')).toMatch(/números/);
    expect(validators.phone('+57300')).toMatch(/números/);
    expect(validators.phone('3001234567')).toBe('');
  });
});
