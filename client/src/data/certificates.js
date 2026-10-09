/**
 * Professional certification records.
 *
 * Each record represents a verified, completed program backed by a real PDF certificate
 * hosted under `public/certificates/`.
 */
export const certificates = [
  {
    id: 'full-stack-development',
    title: '30 Days MasterClass in Full Stack Development',
    organization: 'NoviTech R&D Private Limited',
    date: 'October 09, 2025 – November 19, 2025',
    certificateId: 'NT_B49FSDT314',
    description:
      'Comprehensive masterclass covering end-to-end full stack architecture, responsive client-side development, server-side REST APIs, database integration, and scalable deployment workflows.',
    file: '/certificates/Novitech-web.pdf',
    preview: '/certificates/previews/full-stack-development.jpg',
    downloadName: 'Hariesh-V-NoviTech-Full-Stack-Development-Certificate.pdf',
    icon: 'Layers',
    skills: ['Full Stack Architecture', 'REST APIs', 'Database Integration', 'React.js & Node.js'],
    // Backward compatibility properties
    provider: 'NoviTech R&D Private Limited',
    pdfUrl: '/certificates/Novitech-web.pdf',
  },
  {
    id: 'generative-ai',
    title: 'Generative Artificial Intelligence Course',
    organization: 'Rinex',
    date: 'January 10, 2026 – March 4, 2026',
    certificateId: 'AI26-RNC0-1807',
    description:
      'In-depth technical course exploring modern Generative AI, Large Language Models (LLMs), prompt engineering, generative multimodal workflows, and AI integration into production software solutions.',
    file: '/certificates/Rinex-Gen AI.pdf',
    preview: '/certificates/previews/generative-ai.jpg',
    downloadName: 'Hariesh-V-Rinex-Generative-AI-Certificate.pdf',
    icon: 'Sparkles',
    skills: ['Generative AI', 'Large Language Models', 'Prompt Engineering', 'AI System Integration'],
    // Backward compatibility properties
    provider: 'Rinex',
    pdfUrl: '/certificates/Rinex-Gen AI.pdf',
  },
  {
    id: 'web-development',
    title: 'Web Development Course',
    organization: 'Rinex',
    date: 'January 5, 2026 – March 4, 2026',
    certificateId: 'WD26-RNC0-1136',
    description:
      'Focused technical curriculum advancing responsive interface engineering, modern JavaScript architecture, component-driven UI design, state management, and web performance optimization.',
    file: '/certificates/Rinex-web.pdf',
    preview: '/certificates/previews/web-development.jpg',
    downloadName: 'Hariesh-V-Rinex-Web-Development-Certificate.pdf',
    icon: 'Code',
    skills: ['Modern JavaScript', 'Responsive UI Design', 'Frontend Architecture', 'Web Performance'],
    // Backward compatibility properties
    provider: 'Rinex',
    pdfUrl: '/certificates/Rinex-web.pdf',
  },
];

export const certificatesWithAvailability = certificates.map((certificate) => ({
  ...certificate,
  available: Boolean(certificate.file || certificate.pdfUrl),
}));

export default certificates;
