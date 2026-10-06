import { github, linkedin } from './socials';
import { resume } from './assets';

/**
 * Single source of truth for identity, copy and factual metadata.
 * Every string here is factual. No invented employers, titles, awards,
 * statistics or achievements.
 */

export const profile = {
  name: 'Hariesh V',
  /** Rendered as the shared site wordmark. */
  wordmark: 'V.Hariesh',
  eyebrow: 'B.Tech Information Technology Student',
  greeting: "Hi, I'm HARIESH.V",
  /** Split so each fragment can carry its own colour without string surgery. */
  title: {
    lead: 'Full Stack Developer',
    joiner: '&',
    trail: 'Generative AI Enthusiast',
  },
  tagline: 'Building Intelligent Web Applications',
  description:
    'I am Focused on developing modern, scalable web applications by combining Full Stack Development, cloud technologies, and Generative AI to solve real-world problems and deliver meaningful user experiences.',
  about: {
    badge: 'Who I Am',
    heading: 'ABOUT ME',
    role: 'Full Stack Developer & Generative AI Enthusiast',
    location: 'Erode, Tamil Nadu, India',
    status: 'Open to Opportunities',
    paragraphs: [
      {
        id: 'p1',
        lead: "I'm a passionate ",
        bold: 'Full Stack Developer and Generative AI enthusiast',
        trail:
          ' focused on building modern, scalable, and intelligent web applications. I enjoy turning real-world problems into practical digital solutions by combining strong software engineering with AI technologies.',
      },
      {
        id: 'p2',
        lead: 'My journey started with a curiosity about how websites and applications work behind the scenes. This led me to explore ',
        bold: 'React, JavaScript, TypeScript, Node.js, Express.js, Python, MongoDB, REST APIs, and cloud technologies',
        trail: ' while continuously improving my development skills.',
      },
      {
        id: 'p3',
        lead: "I'm also exploring ",
        bold: 'Generative AI, LLMs, AI Agents, RAG systems, and intelligent automation',
        trail:
          ' to create applications that can understand, reason, and provide useful solutions. I enjoy learning new technologies, solving challenging problems, and building projects that have real-world impact.',
      },
    ],
    stats: [
      { value: '10+', label: 'Projects Completed' },
      { value: '2+', label: 'Years of Learning' },
      { value: '15+', label: 'Technologies Explored' },
      { value: '100%', label: 'Passion & Dedication' },
    ],
    interestsHeading: 'INTERESTS & PASSIONS',
    interests: [
      {
        id: 'fullstack',
        title: 'FULL-STACK DEVELOPMENT',
        description: 'React, JavaScript, TypeScript, Node.js, Express.js, MongoDB',
        icon: 'Code',
        accent: 'amber',
      },
      {
        id: 'genai',
        title: 'GENERATIVE AI',
        description: 'LLMs, AI Applications, AI Agents, RAG & Prompt Engineering',
        icon: 'Sparkles',
        accent: 'orange',
      },
      {
        id: 'backend',
        title: 'BACKEND DEVELOPMENT',
        description: 'REST APIs, Authentication, Databases & Scalable Systems',
        icon: 'Database',
        accent: 'emerald',
      },
      {
        id: 'problem-solving',
        title: 'PROBLEM SOLVING',
        description: 'Data Structures, Algorithms & Real-World Problem Solving',
        icon: 'Target',
        accent: 'rose',
      },
      {
        id: 'ai-web',
        title: 'AI + WEB APPLICATIONS',
        description: 'Combining Full Stack Development with Generative AI',
        icon: 'Workflow',
        accent: 'yellow',
      },
      {
        id: 'continuous-learning',
        title: 'CONTINUOUS LEARNING',
        description: 'Always exploring new technologies and building practical projects',
        icon: 'GraduationCap',
        accent: 'teal',
      },
    ],
  },
  contact: {
    heading: "Let's Build Something Intelligent",
    description:
      "Have an idea, project, or opportunity? Let's connect and build something meaningful.",
    phone: {
      label: 'Phone',
      display: '+91 90255 85083',
      href: 'tel:+919025585083',
    },
    email: {
      label: 'Email',
      display: 'harieshvenkatachalam@gmail.com',
      href: 'mailto:harieshvenkatachalam@gmail.com',
    },
  },
  education: {
    institution: 'Government College of Engineering, Erode',
    degree: 'B.Tech in Information Technology',
    duration: 'September 2024 – May 2028',
    location: 'Erode, Tamil Nadu',
    status: 'Currently Pursuing',
  },
  seo: {
    title: 'Hariesh V | Full Stack Developer & Generative AI Enthusiast',
    description:
      'Portfolio of Hariesh V, a B.Tech Information Technology student focused on Full Stack Development, modern web technologies, and Generative AI.',
  },
};

export { resume, github, linkedin };
