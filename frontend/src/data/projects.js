// =============================================================
// PROYECTOS (Módulo 3)
// Cada proyecto tiene 8 atributos: id, name, description, category,
// technologies, date, status y link.
//
// demo: true  -> proyecto de relleno. Se oculta poniendo
//                showDemoData: false en profile.js.
// demo: false -> proyecto real, tomado de la hoja de vida.
// link vacío ('') -> el sidebar muestra "Enlace no disponible".
// images (opcional): fotos de la tarjeta. Con 2 o más, al hacer clic
//                   la foto se quema y aparece la siguiente.
// Los proyectos demo enlazan a repositorios públicos de terceros como
// ejemplo (no son de autoría propia).
// =============================================================

export const PROJECT_STATUS = {
  DONE: 'Finalizado',
  ONGOING: 'En curso',
  IN_PROGRESS: 'En desarrollo',
  PLANNED: 'Planeado',
};

export const projects = [
  // ----- Proyectos reales (CV) -----
  {
    id: 1,
    name: 'Sistema de Gestión de Inventario',
    description:
      'Aplicación de consola en Python para registrar y consultar inventarios. Aplica lógica estructurada, manejo de archivos y fundamentos de programación orientada a objetos.',
    category: 'Académico',
    technologies: ['Python', 'POO', 'Manejo de archivos'],
    date: '2024',
    status: PROJECT_STATUS.DONE,
    link: '',
    demo: false,
  },
  {
    id: 2,
    name: 'Administración de Servidor de Discord',
    description:
      'Gestión de un servidor de Discord enfocado en atención al cliente: soporte a usuarios, organización de canales, seguimiento de solicitudes y resolución de problemas.',
    category: 'Comunidad',
    technologies: ['Discord', 'Atención al cliente', 'Gestión de comunidades'],
    date: '2024',
    status: PROJECT_STATUS.DONE,
    link: '',
    demo: false,
  },
  {
    id: 3,
    name: 'Soporte Técnico Informal',
    description:
      'Instalación de Windows y Linux, configuración de redes domésticas y diagnóstico de fallas de hardware y software para personas de mi entorno cercano.',
    category: 'Soporte',
    technologies: ['Windows', 'Linux', 'Redes LAN', 'TCP/IP'],
    date: '2022 – Actualidad',
    status: PROJECT_STATUS.ONGOING,
    link: '',
    demo: false,
  },
  {
    id: 4,
    name: 'Portafolio personal con asistente IA',
    description:
      'Este mismo sitio: portafolio en React con un asistente que responde preguntas sobre mi perfil usando la API de Gemini a través de un backend en Express.',
    category: 'Personal',
    technologies: ['React', 'JavaScript', 'Node.js', 'Express', 'Gemini'],
    date: '2026',
    status: PROJECT_STATUS.IN_PROGRESS,
    link: '',
    demo: false,
  },

  // ----- Proyecto con imagen (efecto de fuego) -----
  {
    id: 16,
    name: 'Galería anime con efecto de fuego',
    description:
      'Galería interactiva hecha con React y WebGL: al hacer clic, la ilustración se quema desde abajo con un borde de brasa y chispas, y deja ver la siguiente imagen.',
    category: 'Web',
    technologies: ['React', 'JavaScript', 'WebGL', 'CSS'],
    date: '2026',
    status: PROJECT_STATUS.IN_PROGRESS,
    link: '',
    images: [
      { src: '/images/projects/juji.jpg', alt: 'Ilustración anime de un personaje de mirada roja entre sombras' },
      { src: '/images/projects/mirada-helada.jpg', alt: 'Ilustración anime de un personaje de ojos azules brillantes en la oscuridad' },
    ],
    demo: true,
  },

  // ----- Proyectos de relleno (demo: true) -----
  {
    id: 5,
    name: 'Calculadora de notas universitarias',
    description: 'Script en Python que calcula el promedio ponderado del semestre y la nota mínima necesaria para aprobar.',
    category: 'Académico',
    technologies: ['Python'],
    date: '2023',
    status: PROJECT_STATUS.DONE,
    link: 'https://github.com/TheAlgorithms/Python',
    demo: true,
  },
  {
    id: 6,
    name: 'Base de datos para biblioteca',
    description: 'Modelo entidad-relación y consultas SQL para gestionar libros, socios y préstamos de una biblioteca pequeña.',
    category: 'Académico',
    technologies: ['SQL', 'Modelado relacional'],
    date: '2024',
    status: PROJECT_STATUS.DONE,
    link: 'https://github.com/lerocha/chinook-database',
    demo: true,
  },
  {
    id: 7,
    name: 'Red LAN para oficina pequeña',
    description: 'Diseño de una red local con direccionamiento IP, subredes y configuración básica de router para cinco equipos.',
    category: 'Redes',
    technologies: ['Redes LAN', 'TCP/IP', 'Routing'],
    date: '2024',
    status: PROJECT_STATUS.DONE,
    link: 'https://github.com/mininet/mininet',
    demo: true,
  },
  {
    id: 8,
    name: 'Página de aterrizaje para emprendimiento',
    description: 'Sitio estático de una sola página con información de productos y enlace a WhatsApp.',
    category: 'Web',
    technologies: ['HTML', 'CSS'],
    date: '2025',
    status: PROJECT_STATUS.DONE,
    link: 'https://github.com/mdn/beginner-html-site-styled',
    demo: true,
  },
  {
    id: 9,
    name: 'Lista de tareas en JavaScript',
    description: 'Aplicación web para crear, completar y eliminar tareas, guardándolas en LocalStorage.',
    category: 'Web',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    date: '2025',
    status: PROJECT_STATUS.DONE,
    link: 'https://github.com/tastejs/todomvc',
    demo: true,
  },
  {
    id: 10,
    name: 'Script de respaldo de archivos',
    description: 'Script que copia carpetas importantes a una unidad externa y registra la fecha de cada copia.',
    category: 'Automatización',
    technologies: ['Python', 'Manejo de archivos'],
    date: '2025',
    status: PROJECT_STATUS.DONE,
    link: 'https://github.com/borgbackup/borg',
    demo: true,
  },
  {
    id: 11,
    name: 'Checklist de mantenimiento de equipos',
    description: 'Plantilla en Excel para registrar el mantenimiento preventivo de computadores: limpieza, actualizaciones y estado del disco.',
    category: 'Soporte',
    technologies: ['Excel'],
    date: '2023',
    status: PROJECT_STATUS.DONE,
    link: '',
    demo: true,
  },
  {
    id: 12,
    name: 'Bot de bienvenida para Discord',
    description: 'Bot sencillo que saluda a los nuevos miembros del servidor y les asigna un rol inicial.',
    category: 'Comunidad',
    technologies: ['Python', 'Discord'],
    date: '2025',
    status: PROJECT_STATUS.IN_PROGRESS,
    link: 'https://github.com/Rapptz/discord.py',
    demo: true,
  },
  {
    id: 13,
    name: 'API de productos con Node.js',
    description: 'API REST de práctica con rutas para listar, crear y eliminar productos usando Express.',
    category: 'Web',
    technologies: ['JavaScript', 'Node.js', 'Express'],
    date: '2026',
    status: PROJECT_STATUS.IN_PROGRESS,
    link: 'https://github.com/expressjs/express',
    demo: true,
  },
  {
    id: 14,
    name: 'Gestor de contraseñas en consola',
    description: 'Programa en Java para guardar contraseñas cifradas en un archivo local.',
    category: 'Personal',
    technologies: ['Java'],
    date: '2026',
    status: PROJECT_STATUS.PLANNED,
    link: 'https://github.com/TheAlgorithms/Java',
    demo: true,
  },
  {
    id: 15,
    name: 'Tablero de inventario en Google Sheets',
    description: 'Hoja de cálculo compartida con fórmulas y gráficos para controlar entradas y salidas de productos.',
    category: 'Automatización',
    technologies: ['Google Workspace'],
    date: '2024',
    status: PROJECT_STATUS.DONE,
    link: 'https://github.com/googleworkspace/apps-script-samples',
    demo: true,
  },
];
