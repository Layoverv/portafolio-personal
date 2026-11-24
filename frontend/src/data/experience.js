// =============================================================
// TRAYECTORIA / TIMELINE (Módulo 4)
// type: diferencia claramente cada tipo de experiencia.
// Para agregar un empleo formal o una práctica en el futuro,
// usa type: 'laboral' o type: 'practica'.
// =============================================================

// Objeto con la etiqueta visible de cada tipo.
export const EXPERIENCE_TYPES = {
  laboral: 'Experiencia laboral',
  practica: 'Práctica profesional',
  academico: 'Proyecto académico',
  personal: 'Proyecto personal',
  soporte: 'Soporte informal',
  comunidad: 'Actividad práctica',
};

export const experience = [
  {
    id: 1,
    type: 'soporte',
    title: 'Soporte Técnico Informal — Comunidad',
    period: '2022 – Actualidad',
    description:
      'Instalación de sistemas operativos (Windows y Linux), configuración de redes domésticas y solución de fallas de hardware y software para personas de mi entorno cercano. No es un empleo formal.',
  },
  {
    id: 2,
    type: 'academico',
    title: 'Tecnología en Sistemas de Información — UNIAJC',
    period: '2023 – Actualidad',
    description: 'Inicio de mi formación universitaria. Actualmente en 7.º semestre.',
  },
  {
    id: 3,
    type: 'comunidad',
    title: 'Administración de Servidor de Discord — Atención al Cliente',
    period: '2024',
    description:
      'Soporte a usuarios, organización de canales, seguimiento de solicitudes y resolución de problemas en un servidor enfocado en atención al cliente.',
  },
  {
    id: 4,
    type: 'academico',
    title: 'Sistema de Gestión de Inventario (Python) — Proyecto Universitario',
    period: '2024',
    description:
      'Aplicación de consola para registro y consulta de inventarios con manejo de archivos y fundamentos de POO.',
  },
  {
    id: 5,
    type: 'personal',
    title: 'Portafolio personal con asistente IA',
    period: '2026',
    description: 'Desarrollo de este portafolio con React, Express y la API de Gemini.',
  },
];
