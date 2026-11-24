// =============================================================
// DATOS DEL PERFIL — fuente: hoja de vida (HV.pdf)
// Edita este archivo para cambiar lo que muestra el portafolio.
// No hace falta tocar ningún componente.
// =============================================================

export const profile = {
  name: 'José Luis Oviedo Camacho',
  shortName: 'José Luis',
  role: 'Desarrollador de software en formación',
  headline: 'Estudiante de Tecnología en Sistemas de Información',
  location: 'Cali, Valle del Cauca, Colombia',
  // Logo personal (globo de alambre del asset flat-abstract-wireframe-background).
  // Para volver a usar la foto: '/images/perfil.png'
  photo: '/images/theme/logo-globo.png',
  photoAlt: 'Logo personal: globo de alambre',

  // Presentación basada en el perfil profesional del CV.
  summary:
    'Estudiante de 7.º semestre de Tecnología en Sistemas de Información en la UNIAJC, con formación en programación, redes, sistemas operativos, bases de datos y atención al cliente. Me oriento a resolver problemas técnicos y aprendo rápido en entornos dinámicos. Busco mi primera experiencia profesional para aportar en soporte técnico, análisis de sistemas o desarrollo de soluciones tecnológicas.',

  // Indicador de disponibilidad laboral (configurable).
  availability: {
    isAvailable: true,
    availableText: 'Disponible para prácticas y primer empleo',
    unavailableText: 'No disponible por ahora',
  },

  // Áreas destacadas del inicio (todas confirmadas en el CV).
  highlights: [
    { id: 1, label: 'Programación', detail: 'Fundamentos de Python' },
    { id: 2, label: 'Redes', detail: 'LAN, TCP/IP, routing' },
    { id: 3, label: 'Soporte técnico', detail: 'Hardware y software' },
  ],

  // ----- Sección "Sobre mí" (Módulo 2) -----
  about: {
    intro:
      'Soy estudiante de Tecnología en Sistemas de Información y me interesa entender cómo funcionan los sistemas por dentro: desde el computador que no enciende hasta el programa que organiza un inventario. Esa curiosidad me llevó de dar soporte técnico a personas cercanas a escribir mis primeros programas en Python.',
    blocks: [
      {
        id: 'academico',
        title: 'Mi perfil académico',
        text: 'Curso el 7.º semestre de Tecnología en Sistemas de Información en la Institución Universitaria Antonio José Camacho (UNIAJC), en Cali. Antes me gradué como Bachiller Técnico en la Institución Educativa Leonor Lourido de Velasco, en Yumbo.',
      },
      {
        id: 'intereses',
        title: 'Mis intereses profesionales',
        text: 'Me interesan el soporte técnico, las redes, el análisis de sistemas y el desarrollo de soluciones tecnológicas. Disfruto diagnosticar problemas y encontrar la causa real antes de aplicar una solución.',
      },
      {
        id: 'objetivos',
        title: 'Mis objetivos y aspiraciones',
        text: 'Busco mi primera experiencia profesional, ya sea en prácticas o en un primer empleo, para aplicar lo que he aprendido y seguir creciendo como desarrollador de software dentro de un equipo.',
      },
    ],
    // Habilidades blandas confirmadas en el CV.
    softSkills: ['Trabajo en equipo', 'Comunicación efectiva', 'Proactividad', 'Aprendizaje continuo'],
  },

  // ----- Formación académica (Módulo 4) -----
  education: [
    {
      id: 1,
      institution: 'Institución Universitaria Antonio José Camacho (UNIAJC)',
      program: 'Tecnología en Sistemas de Información',
      status: 'En curso · 7.º semestre',
      period: '2023 – Actualidad',
      location: 'Cali, Colombia',
    },
    {
      id: 2,
      institution: 'Institución Educativa Leonor Lourido de Velasco',
      program: 'Bachiller Técnico',
      status: 'Finalizado',
      period: '2022',
      location: 'Yumbo, Valle del Cauca',
    },
  ],

  // Redes sociales: deja url vacía ('') para ocultar el enlace.
  socials: [
    { id: 'github', label: 'GitHub', url: '' },
    { id: 'linkedin', label: 'LinkedIn', url: '' },
  ],

  // Datos de contacto: NO se muestran hasta que pongas visible: true.
  contact: {
    email: { value: '', visible: false },
    phone: { value: '', visible: false },
  },

  // true = se muestran los proyectos y habilidades de relleno (marcados demo: true).
  // Recomendación: ponerlo en false antes de compartir el enlace con reclutadores.
  showDemoData: true,
};

/**
 * Devuelve solo los elementos que deben mostrarse según showDemoData.
 * Si showDemoData es false, se quitan los marcados con demo: true.
 */
export function visibleItems(items, showDemo = profile.showDemoData) {
  return showDemo ? items : items.filter((item) => !item.demo);
}
