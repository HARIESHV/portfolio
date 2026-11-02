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
  description: {
    lead: 'I build modern web applications and intelligent AI-powered solutions by combining ',
    bold: 'Full Stack Development, Generative AI, and Linux-based technologies',
    trail:
      '. Passionate about open-source, automation, and turning innovative ideas into real-world applications.',
  },
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
          ' who enjoys building modern, scalable, and intelligent applications. I combine frontend and backend development with AI-powered technologies to transform ideas into practical solutions.',
      },
      {
        id: 'p2',
        lead: 'I work with technologies like ',
        bold: 'React.js, JavaScript, TypeScript, Node.js, Express.js, Python, MongoDB, and REST APIs',
        trail: ', focusing on creating responsive user interfaces and reliable backend systems.',
      },
      {
        id: 'p3',
        lead: "Beyond web development, I'm passionate about ",
        bold: 'Generative AI, Large Language Models (LLMs), AI Agents, and Retrieval-Augmented Generation (RAG)',
        trail:
          '. I explore ways to integrate intelligent capabilities into applications and build solutions that make technology more useful.',
      },
      {
        id: 'p4',
        lead: 'As a ',
        bold: 'Linux enthusiast and open-source technology explorer',
        trail:
          ', I enjoy working in Linux environments, exploring command-line tools, managing development environments, and understanding how systems work behind the scenes.',
      },
      {
        id: 'p5',
        lead: "I'm continuously learning, experimenting with emerging technologies, and building projects that combine software engineering and artificial intelligence to solve real-world challenges.",
        bold: '',
        trail: '',
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
