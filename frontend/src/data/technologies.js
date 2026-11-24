// =============================================================
// STACK TECNOLÓGICO (Módulo 4)
// level: nivel de conocimiento. Puedes editarlo, pero no subas
// un nivel que no puedas demostrar.
// demo: true -> habilidad de relleno, siempre "En aprendizaje".
//               Se oculta con showDemoData: false en profile.js.
// icon: nombre de un ícono de lucide-react (ver Technologies.jsx).
// =============================================================

export const LEVELS = {
  BASIC: 'Básico',
  FUNDAMENTALS: 'Fundamentos',
  LEARNING: 'En aprendizaje',
};

export const techCategories = [
  {
    id: 'lenguajes',
    title: 'Lenguajes de programación',
    icon: 'Code',
    items: [
      { name: 'Python', level: LEVELS.FUNDAMENTALS, demo: false },
      { name: 'Lógica de programación estructurada', level: LEVELS.FUNDAMENTALS, demo: false },
      { name: 'Java', level: LEVELS.LEARNING, demo: true },
      { name: 'JavaScript', level: LEVELS.LEARNING, demo: true },
    ],
  },
  {
    id: 'frontend',
    title: 'Desarrollo frontend',
    icon: 'Layout',
    items: [
      { name: 'HTML', level: LEVELS.LEARNING, demo: true },
      { name: 'CSS', level: LEVELS.LEARNING, demo: true },
      { name: 'React', level: LEVELS.LEARNING, demo: true },
    ],
  },
  {
    id: 'backend',
    title: 'Desarrollo backend',
    icon: 'Server',
    items: [
      { name: 'Node.js', level: LEVELS.LEARNING, demo: true },
      { name: 'Express', level: LEVELS.LEARNING, demo: true },
    ],
  },
  {
    id: 'bases-datos',
    title: 'Bases de datos',
    icon: 'Database',
    items: [
      { name: 'SQL', level: LEVELS.FUNDAMENTALS, demo: false },
      { name: 'Modelado de datos relacionales', level: LEVELS.FUNDAMENTALS, demo: false },
    ],
  },
  {
    id: 'redes',
    title: 'Redes y soporte técnico',
    icon: 'Network',
    items: [
      { name: 'Configuración de redes LAN', level: LEVELS.FUNDAMENTALS, demo: false },
      { name: 'Protocolo TCP/IP', level: LEVELS.FUNDAMENTALS, demo: false },
      { name: 'Fundamentos de routing', level: LEVELS.FUNDAMENTALS, demo: false },
      { name: 'Diagnóstico de hardware y software', level: LEVELS.FUNDAMENTALS, demo: false },
    ],
  },
  {
    id: 'sistemas-operativos',
    title: 'Sistemas operativos',
    icon: 'Monitor',
    items: [
      { name: 'Windows (administración y configuración)', level: LEVELS.FUNDAMENTALS, demo: false },
      { name: 'Linux', level: LEVELS.BASIC, demo: false },
    ],
  },
  {
    id: 'herramientas',
    title: 'Herramientas de desarrollo y ofimática',
    icon: 'Wrench',
    items: [
      { name: 'GitHub', level: LEVELS.BASIC, demo: false },
      { name: 'Excel, Word y PowerPoint', level: LEVELS.FUNDAMENTALS, demo: false },
      { name: 'Google Workspace y Google Drive', level: LEVELS.FUNDAMENTALS, demo: false },
      { name: 'Git', level: LEVELS.LEARNING, demo: true },
      { name: 'Visual Studio Code', level: LEVELS.LEARNING, demo: true },
    ],
  },
  {
    id: 'metodologias',
    title: 'Metodologías de trabajo',
    icon: 'Users',
    items: [
      { name: 'Trabajo en equipo', level: LEVELS.FUNDAMENTALS, demo: false },
      { name: 'SCRUM', level: LEVELS.LEARNING, demo: true },
    ],
  },
];

// Herramientas de inteligencia artificial (mínimo dos).
// logo: color de marca y letra que se dibujan como logotipo simple.
export const aiTools = [
  {
    id: 'gemini',
    name: 'Google Gemini',
    logo: { letter: 'G', color: '#4f8cff' },
    description: 'Modelo de lenguaje de Google disponible mediante API.',
    usage: 'Es el modelo que impulsa el asistente de este portafolio: el backend en Express le envía la pregunta del visitante junto con mi perfil.',
    demo: false,
  },
  {
    id: 'claude',
    name: 'Claude',
    logo: { letter: 'C', color: '#d97757' },
    description: 'Asistente de IA de Anthropic orientado a redacción y programación.',
    usage: 'Lo usé como apoyo para planificar la arquitectura de este proyecto, revisar código y explicar conceptos de React y Express.',
    demo: false,
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    logo: { letter: 'AI', color: '#10a37f' },
    description: 'Asistente conversacional de OpenAI.',
    usage: 'Apoyo para resolver dudas de programación y generar ejemplos de código para practicar.',
    demo: true,
  },
];
