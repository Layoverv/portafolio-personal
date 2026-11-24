import { afterEach, describe, expect, test, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ContactForm from '../components/contact/ContactForm.jsx';

afterEach(cleanup);

const renderForm = (props) =>
  render(
    <MemoryRouter>
      <ContactForm {...props} />
    </MemoryRouter>,
  );

const fillValidForm = () => {
  fireEvent.change(screen.getByLabelText(/^Nombre/), { target: { value: 'Ana' } });
  fireEvent.change(screen.getByLabelText(/^Apellidos/), { target: { value: 'Gómez' } });
  fireEvent.change(screen.getByLabelText(/^Correo/), { target: { value: 'ana@correo.com' } });
  fireEvent.change(screen.getByLabelText(/^Teléfono/), { target: { value: '3001234567' } });
  fireEvent.change(screen.getByLabelText(/^Descripción/), { target: { value: 'Quiero una página web.' } });
};

const submit = () => fireEvent.click(screen.getByRole('button', { name: /enviar información/i }));

describe('formulario de contacto', () => {
  test('muestra errores y no envía si los datos son incorrectos', () => {
    const onSubmit = vi.fn();
    renderForm({ onSubmit, isConfigured: true });
    fireEvent.change(screen.getByLabelText(/^Nombre/), { target: { value: 'Ana1' } });
    submit();
    expect(screen.getByText('El nombre solo puede contener letras.')).toBeTruthy();
    expect(screen.getByText('El correo electrónico es obligatorio.')).toBeTruthy();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  test('confirma solo cuando el servicio responde bien', async () => {
    const onSubmit = vi.fn().mockResolvedValue(true);
    renderForm({ onSubmit, isConfigured: true });
    fillValidForm();
    submit();
    expect(await screen.findByText(/se envió correctamente/)).toBeTruthy();
    expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({ firstName: 'Ana', phone: '3001234567' }));
  });

  test('si el servicio falla, muestra el error y no una confirmación falsa', async () => {
    const onSubmit = vi.fn().mockRejectedValue(new Error('El servicio rechazó el envío.'));
    renderForm({ onSubmit, isConfigured: true });
    fillValidForm();
    submit();
    expect(await screen.findByText('El servicio rechazó el envío.')).toBeTruthy();
    expect(screen.queryByText(/se envió correctamente/)).toBeNull();
  });

  test('sin servicio configurado, avisa y desactiva el botón', () => {
    renderForm({ onSubmit: vi.fn(), isConfigured: false });
    expect(screen.getByText(/aún no está conectado/)).toBeTruthy();
    expect(screen.getByRole('button', { name: /enviar información/i }).disabled).toBe(true);
  });
});
