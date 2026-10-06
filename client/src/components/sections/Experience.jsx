import { certificates } from '../../data/certificates';

const fullStackProgram = certificates.find((certificate) => certificate.id === 'full-stack-development');
const generativeAiProgram = certificates.find((certificate) => certificate.id === 'generative-ai');

export const experienceItems = [
  {
    id: 'novitech-full-stack',
    navTitle: 'Full Stack Development',
    organization: 'Novitech',
    navMeta: 'Completed · October 09, 2025 – November 19, 2025',
    kind: 'Development program',
    title: 'Full Stack Development Program',
    duration: 'Program dates not listed',
    status: 'Completed',
    icon: 'Code',
    description: fullStackProgram.description,
    listTitle: 'Key contributions',
    points: [
      'Worked across client-side and server-side development.',
      'Structured application components and handled user requests.',
      'Connected services and implemented functional features.',
      'Focused on usability and performance.',
    ],
    tags: ['React.js', 'JavaScript', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB'],
  },
  {
    id: 'rinex-full-stack',
    navTitle: 'Full Stack Development',
    organization: 'Rinex',
    navMeta: 'Completed · January 10, 2026 – March 4, 2026',
    kind: 'Development program',
    title: 'Full Stack Development Program',
    duration: 'Program dates not listed',
    status: 'Completed',
    icon: 'Layers',
    description: fullStackProgram.description,
    listTitle: 'Key contributions',
    points: [
      'Worked across client-side and server-side development.',
      'Structured application components and handled user requests.',
      'Connected services and implemented functional features.',
      'Focused on usability and performance.',
    ],
    tags: ['React.js', 'JavaScript', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB'],
  },
  {
    id: 'rinex-generative-ai',
    navTitle: 'Generative AI',
    organization: 'Rinex',
    navMeta: 'Completed · January 5, 2026 – March 4, 2026',
    kind: 'Technical program',
    title: 'Generative AI Program',
    duration: 'Program dates not listed',
    status: 'Completed',
    icon: 'Sparkles',
    description: generativeAiProgram.description,
    listTitle: 'Key contributions',
    points: [
      'Explored large language models and AI-driven systems.',
      'Practiced prompt design and content generation.',
      'Worked with AI-assisted workflows.',
      'Studied how Generative AI can be incorporated into software solutions.',
    ],
    tags: ['Generative AI', 'Large Language Models', 'Prompt Design', 'AI Workflows'],
  }
];