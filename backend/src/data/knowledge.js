// =============================================================
// BASE DE CONOCIMIENTO DEL ASISTENTE
// SOLO datos reales tomados de la hoja de vida (HV.pdf).
// Los proyectos y habilidades de relleno del frontend NO van aquí,
// para que el asistente nunca le dé información falsa a un reclutador.
// =============================================================

export const knowledge = {
  nombre: 'José Luis Oviedo Camacho',
  ubicacion: 'Cali, Valle del Cauca, Colombia',
  profesion: 'Estudiante de Tecnología en Sistemas de Información (7.º semestre), desarrollador de software en formación',
  perfil:
    'Formación técnica en redes, programación, administración de sistemas operativos y atención al cliente. Orientado a la resolución de problemas técnicos y con capacidad de aprender rápido en entornos dinámicos. Busca su primera experiencia profesional para aportar en soporte técnico, análisis de sistemas o desarrollo de soluciones tecnológicas.',
  disponibilidad: 'Disponible para prácticas profesionales y primer empleo.',

  formacion: [
    'Tecnología en Sistemas de Información, Institución Universitaria Antonio José Camacho (UNIAJC), Cali. 7.º semestre, en curso (2023 – actualidad).',
    'Bachiller Técnico, Institución Educativa Leonor Lourido de Velasco, Yumbo, Valle del Cauca (2022).',
  ],

  conocimientos: {
    programacion: 'Fundamentos de Python y lógica de programación estructurada; fundamentos de programación orientada a objetos.',
    basesDeDatos: 'Fundamentos de SQL y modelado de datos relacionales.',
    sistemasOperativos: 'Windows (administración y configuración) y Linux (básico).',
    redes: 'Configuración de redes LAN, protocolo TCP/IP y fundamentos de routing.',
    soporteTecnico: 'Instalación, configuración y diagnóstico de hardware y software.',
    herramientas: 'Excel, Word, PowerPoint, Google Workspace, Google Drive, herramientas cloud, navegación avanzada y GitHub (básico).',
    habilidadesBlandas: 'Trabajo en equipo, comunicación efectiva, proactividad y aprendizaje continuo.',
  },

  proyectosYExperiencia: [
    {
      nombre: 'Sistema de Gestión de Inventario (Python)',
      tipo: 'Proyecto académico universitario',
      fecha: '2024',
      detalle: 'Aplicación de consola en Python para registro y consulta de inventarios, con lógica estructurada, manejo de archivos y fundamentos de POO.',
    },
    {
      nombre: 'Administración de Servidor de Discord — Atención al Cliente',
      tipo: 'Actividad práctica (no es un empleo formal)',
      fecha: '2024',
      detalle: 'Soporte a usuarios, organización de canales, seguimiento de solicitudes y resolución de problemas.',
    },
    {
      nombre: 'Soporte Técnico Informal — Comunidad',
      tipo: 'Soporte informal a personas cercanas (no es un empleo formal)',
      fecha: '2022 – actualidad',
      detalle: 'Instalación de Windows y Linux, configuración de redes domésticas y solución de fallas de hardware y software.',
    },
    {
      nombre: 'Este portafolio con asistente IA',
      tipo: 'Proyecto personal',
      fecha: '2026',
      detalle: 'Portafolio hecho con React y Vite, con un backend en Node.js y Express que conecta este asistente con la API de Gemini.',
    },
  ],

  experienciaLaboralFormal: 'Ninguna registrada todavía. Busca su primera experiencia profesional.',

  serviciosQuePuedeOfrecer: [
    'Soporte técnico: instalación de sistemas operativos, configuración y diagnóstico de equipos.',
    'Configuración de redes domésticas o de oficinas pequeñas.',
    'Administración de comunidades digitales y atención a usuarios.',
    'Apoyo en bases de datos (nivel de fundamentos) y automatización sencilla con Python u hojas de cálculo.',
    'Desarrollo web: está aprendiendo con este portafolio; nivel inicial.',
  ],

  contacto: 'Por el formulario de la sección "Contacto" del portafolio. No compartas teléfono ni correo personal.',
};
