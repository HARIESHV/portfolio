import { motion, useReducedMotion } from 'framer-motion';

import { Icon } from '../ui/Icon';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { RevealGroup, RevealItem } from '../ui/Reveal';
import { EASE_OUT_EXPO } from '../../lib/motion';
import { cn } from '../../lib/cn';

const services = [
  {
    number: '01',
    title: 'Frontend Development',
    icon: 'Layout',
    theme: 'yellow',
    description:
      'Build modern, responsive, high-performance web interfaces with clean UI, reusable component architecture, and smooth motion.',
    technologies: [
      'React.js', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS',
      'GSAP', 'Framer Motion', 'HTML5 / CSS3',
    ],
    features: [
      'Responsive Web Design', 'Component-Based Architecture',
      'Interactive Micro-Animations', 'Performance Optimization',
      'Accessibility & Cross-Browser Support', 'Modern Design Systems',
    ],
  },
  {
    number: '02',
    title: 'Backend Development',
    icon: 'Workflow',
    theme: 'green',
    description:
      'Develop secure, scalable backend systems, server architectures, and databases built for resilience and data integrity.',
    technologies: [
      'Node.js', 'Express.js', 'Python', 'Java',
      'MongoDB', 'Mongoose', 'PostgreSQL', 'Neon',
    ],
    features: [
      'Scalable Server Architecture', 'Robust Database Modeling',
      'Authentication & Role Security', 'Background Jobs & Data Flow',
      'CRUD Applications', 'Server-Side Business Logic',
    ],
  },
  {
    number: '03',
    title: 'Full Stack Development',
    icon: 'Blocks',
    theme: 'yellow',
    description:
      'Design and build complete production-ready web applications combining modern frontend, robust backend, databases, and cloud services.',
    technologies: [
      'React.js', 'Next.js', 'Node.js', 'Express.js',
      'MongoDB', 'PostgreSQL', 'REST APIs', 'Cloud Deployments',
    ],
    features: [
      'End-to-End Web Applications', 'MERN & Full-Stack Solutions',
      'Secure Authentication Flows', 'Cloud Deployments (Render / Vercel)',
      'Database Integrations', 'Production-Ready Architecture',
    ],
  },
  {
    number: '04',
    title: 'Generative AI Development',
    icon: 'Sparkles',
    theme: 'green',
    description:
      'Build intelligent applications using modern Generative AI, LLMs, prompt architectures, and retrieval workflows.',
    technologies: [
      'OpenAI GPT', 'Google Gemini', 'LangChain', 'RAG Pipelines',
      'Prompt Engineering', 'Vector Databases', 'Python',
    ],
    features: [
      'RAG Retrieval Systems', 'Prompt Engineering Pipelines',
      'Custom Knowledge Base Chatbots', 'LLM Function Calling & Tool Use',
      'Document Intelligence', 'AI + Web App Integrations',
    ],
  },
  {
    number: '05',
    title: 'AI Application Development',
    icon: 'Cpu',
    theme: 'yellow',
    description:
      'Engineer autonomous AI agents, multi-modal reasoning workflows, and intelligent automated tooling tailored for real use cases.',
    technologies: [
      'AI Agents', 'LangChain / LangGraph', 'Vector Search',
      'Embeddings', 'Python FastAPI', 'Streamlit',
    ],
    features: [
      'Autonomous Task Agents', 'Document Parsing & Analysis',
      'Semantic Search & Embeddings', 'Workflow Automation with AI',
      'Multi-Model Integrations', 'Interactive AI Prototyping',
    ],
  },
  {
    number: '06',
    title: 'API Development',
    icon: 'Route',
    theme: 'green',
    description:
      'Architect clean, secure, and documented RESTful APIs and microservice endpoints for mobile and web clients.',
    technologies: [
      'REST APIs', 'Node.js / Express', 'Python FastAPI',
      'Postman', 'JWT Authentication', 'JSON Schema',
    ],
    features: [
      'RESTful API Architecture', 'JWT & OAuth Authentication',
      'Input Validation & Sanitization', 'Postman API Testing Suites',
      'Webhook Integrations', 'Clear Documentation & Error Handling',
    ],
  },
];

function ServiceCard({ service }) {
  const reduce = useReducedMotion();
  const isYellow = service.theme === 'yellow';

  return (
    <RevealItem className="h-full">
      <motion.div
        whileHover={reduce ? undefined : { y: -6 }}
        transition={reduce ? { duration: 0 } : { duration: 0.3, ease: EASE_OUT_EXPO }}
        className="card-stack h-full"
      >
        <article
          className={cn(
            'group relative flex h-full flex-col overflow-hidden rounded-[17px] border p-6 shadow-soft transition-[background-color,border-color,box-shadow] duration-500 sm:p-7',
            isYellow
              ? 'border-[#F2E8A5] bg-[#FFF9D6] hover:border-[#2E5D3B]/40 hover:bg-[#FFF4B8] hover:shadow-lift'
              : 'border-[#C8E6C9] bg-[#E8F5E9] hover:border-[#2E5D3B]/40 hover:bg-[#DFF1DF] hover:shadow-lift',
          )}
        >
          {/* Card header with number and icon */}
          <div className="flex items-center justify-between border-b border-black/5 pb-5">
            <span className="font-mono text-sm font-bold tracking-[0.16em] text-[#2E5D3B]">
              {service.number}
            </span>
            <span
              className={cn(
                'flex h-11 w-11 items-center justify-center rounded-full shadow-sm transition-transform duration-300 group-hover:scale-110',
                isYellow ? 'bg-[#C8E6C9] text-[#2E5D3B]' : 'bg-[#FFF4B8] text-[#2E5D3B]',
              )}
            >
              <Icon name={service.icon} size={20} />
            </span>
          </div>

          {/* Title */}
          <h3 className="mt-5 text-xl font-bold leading-tight tracking-[-0.025em] text-[#2E5D3B] sm:text-2xl">
            {service.title}
          </h3>

          {/* Description */}
          <p className="mt-3 min-h-[4.5rem] text-sm leading-relaxed text-[#425846] sm:text-[0.9375rem]">
            {service.description}
          </p>

          {/* Technologies */}
          <h4 className="mt-6 font-mono text-[0.625rem] font-bold uppercase tracking-[0.18em] text-[#2E5D3B]">
            Technologies
          </h4>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {service.technologies.map((tech) => (
              <li
                key={tech}
                className="rounded-control border border-[#DDE8D8] bg-white/90 px-2.5 py-1 font-mono text-[0.6875rem] font-medium text-[#172117] shadow-2xs"
              >
                {tech}
              </li>
            ))}
          </ul>

          {/* Features / Capabilities */}
          <h4 className="mt-6 font-mono text-[0.625rem] font-bold uppercase tracking-[0.18em] text-[#2E5D3B]">
            Key Capabilities
          </h4>
          <ul className="mt-3 grid gap-x-3 gap-y-2 sm:grid-cols-2">
            {service.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2 text-[0.8125rem] font-medium leading-snug text-[#172117]"
              >
                <Icon name="Check" size={14} className="mt-0.5 shrink-0 text-[#2E5D3B]" />
                {feature}
              </li>
            ))}
          </ul>

          {/* Subtle bottom edge indicator in deep green */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-[#2E5D3B] transition-transform duration-500 group-hover:scale-x-100"
          />
        </article>
      </motion.div>
    </RevealItem>
  );
}

export function Services() {
  return (
    <Section id="services" labelledBy="services-heading" surface="white" reveal>
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
        <div className="lg:col-span-8">
          <SectionHeading
            id="services-heading"
            eyebrow="Specialized Offerings"
            heading="Services & Expertise"
            lede="From responsive user interfaces and robust APIs to generative AI workflows and full-stack solutions."
          />
        </div>
        <p className="max-w-[32ch] border-t border-[#DDE8D8] pt-4 font-mono text-xs font-semibold leading-relaxed text-[#2E5D3B] lg:col-span-4 lg:justify-self-end">
          FULL STACK / GENERATIVE AI / ARCHITECTURE
        </p>
      </div>

      {/* 6 alternating light yellow and light green service cards */}
      <RevealGroup className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
        {services.map((service) => (
          <ServiceCard key={service.number} service={service} />
        ))}
      </RevealGroup>
    </Section>
  );
}

export default Services;