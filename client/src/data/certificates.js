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

/**
 * Organization-level metadata.
 *
 * A certificate-issuing organization can own several courses. `logo` is the
 * thumbnail shown on the organization card; when absent the card falls back to
 * the first certificate's preview image.
 */
const ORGANIZATION_META = {
  Rinex: {
    id: 'rinex',
    name: 'Rinex',
    logo: '/certificates/rinex.jpg',
    icon: 'Building2',
  },
  'NoviTech R&D Private Limited': {
    id: 'novitech',
    name: 'NoviTech R&D Private Limited',
    logo: null,
    icon: 'Layers',
  },
};

/**
 * Certificates grouped by their issuing organization.
 *
 * Every organization appears exactly once, holding all of its courses so the
 * Certificates section renders one card per organization (not per course).
 */
export const certificateOrganizations = (() => {
  const groups = new Map();

  for (const certificate of certificates) {
    const key = certificate.organization;
    if (!groups.has(key)) {
      const meta = ORGANIZATION_META[key] ?? {
        id: key.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        name: key,
        logo: null,
        icon: 'Award',
      };
      groups.set(key, { ...meta, certificates: [] });
    }
    groups.get(key).certificates.push(certificate);
  }

  return Array.from(groups.values()).map((group) => ({
    ...group,
    thumbnail: group.logo ?? group.certificates[0]?.preview ?? null,
  }));
})();

export default certificates;
