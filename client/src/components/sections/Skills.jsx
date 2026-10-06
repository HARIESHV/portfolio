import {
  SiCloudflare,
  SiCss,
  SiDocker,
  SiExpress,
  SiFramer,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiGooglegemini,
  SiGsap,
  SiHtml5,
  SiJavascript,
  SiJenkins,
  SiKubernetes,
  SiLangchain,
  SiLanggraph,
  SiLinux,
  SiMongodb,
  SiMongoose,
  SiNeon,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenjdk,
  SiOpenapiinitiative,
  SiPostgresql,
  SiPostman,
  SiPython,
  SiQdrant,
  SiReact,
  SiRender,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from '@icons-pack/react-simple-icons';

import { Atom, Binary, Bot, Cloud, Code, Layers, Sparkles } from 'lucide-react';

import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { Reveal } from '../ui/Reveal';
import { cn } from '../../lib/cn';

/**
 * Technology marquee rows.
 *
 * Brand marks are Simple Icons, imported one component per icon so only the
 * paths actually rendered reach the bundle. The few brands Simple Icons no
 * longer ships (OpenAI, AWS) and the abstract categories (RAG, agents,
 * prompts, embeddings) fall back to Lucide glyphs.
 *
 * `reverse` flips travel direction for left-to-right rows, and `tone` keeps a
 * light rhythm so a long row never reads as one flat band.
 */
const marqueeRows = [
  {
    id: 'row-1',
    duration: 48,
    reverse: false,
    technologies: [
      { name: 'HTML5', icon: SiHtml5, tone: 'yellow' },
      { name: 'CSS3', icon: SiCss, tone: 'green' },
      { name: 'JavaScript', icon: SiJavascript, tone: 'yellow' },
      { name: 'TypeScript', icon: SiTypescript, tone: 'green' },
      { name: 'React.js', icon: SiReact, tone: 'yellow' },
      { name: 'Next.js', icon: SiNextdotjs, tone: 'green' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, tone: 'yellow' },
      { name: 'GSAP', icon: SiGsap, tone: 'green' },
      { name: 'Framer Motion', icon: SiFramer, tone: 'yellow' },
      { name: 'Node.js', icon: SiNodedotjs, tone: 'green' },
      { name: 'Express.js', icon: SiExpress, tone: 'yellow' },
      { name: 'Java', icon: SiOpenjdk, tone: 'green' },
      { name: 'Python', icon: SiPython, tone: 'yellow' },
      { name: 'REST APIs', icon: SiOpenapiinitiative, tone: 'green' },
    ],
  },
  {
    id: 'row-2',
    duration: 54,
    reverse: true,
    technologies: [
      { name: 'MongoDB', icon: SiMongodb, tone: 'green' },
      { name: 'Mongoose', icon: SiMongoose, tone: 'yellow' },
      { name: 'PostgreSQL', icon: SiPostgresql, tone: 'green' },
      { name: 'Neon', icon: SiNeon, tone: 'yellow' },
      { name: 'MongoDB Atlas', icon: SiMongodb, tone: 'green' },
      { name: 'Cloudflare', icon: SiCloudflare, tone: 'yellow' },
      { name: 'LangChain', icon: SiLangchain, tone: 'green' },
      { name: 'RAG', icon: Layers, tone: 'yellow' },
      { name: 'LLM Architectures', icon: SiLanggraph, tone: 'green' },
      { name: 'AI Agents', icon: Bot, tone: 'yellow' },
      { name: 'Prompt Engineering', icon: Sparkles, tone: 'green' },
      { name: 'Embeddings', icon: Binary, tone: 'yellow' },
      { name: 'Vector Databases', icon: SiQdrant, tone: 'green' },
      { name: 'OpenAI API', icon: Atom, tone: 'yellow' },
      { name: 'Google Gemini', icon: SiGooglegemini, tone: 'green' },
    ],
  },
  {
    id: 'row-3',
    duration: 51,
    reverse: false,
    technologies: [
      { name: 'Git', icon: SiGit, tone: 'yellow' },
      { name: 'GitHub', icon: SiGithub, tone: 'green' },
      { name: 'GitHub Actions', icon: SiGithubactions, tone: 'yellow' },
      { name: 'VS Code', icon: Code, tone: 'green' },
      { name: 'Postman', icon: SiPostman, tone: 'yellow' },
      { name: 'Vercel', icon: SiVercel, tone: 'green' },
      { name: 'Render', icon: SiRender, tone: 'yellow' },
      { name: 'Docker', icon: SiDocker, tone: 'green' },
      { name: 'AWS', icon: Cloud, tone: 'yellow' },
      { name: 'Jenkins', icon: SiJenkins, tone: 'green' },
      { name: 'Kubernetes', icon: SiKubernetes, tone: 'yellow' },
      { name: 'Linux', icon: SiLinux, tone: 'green' },
    ],
  },
];

/**
 * One technology pill: icon on the left, name on the right. Consistent height
 * and `whitespace-nowrap` keep every pill aligned and unbroken, while the
 * soft shadow and full radius match the card language used elsewhere on the
 * page.
 */
function TechPill({ technology }) {
  const Glyph = technology.icon;
  const isYellow = technology.tone === 'yellow';

  return (
    <span
      className={cn(
        'flex shrink-0 items-center gap-2.5 rounded-full border py-2.5 pl-3 pr-4 shadow-2xs transition-[background-color,border-color,transform] duration-300 hover:-translate-y-0.5 sm:gap-3 sm:py-3 sm:pl-3.5 sm:pr-5',
        isYellow ? 'border-[#F2E8A5] bg-[#FFF9D6]' : 'border-[#C8E6C9] bg-[#E8F5E9]',
      )}
    >
      <Glyph aria-hidden="true" className="shrink-0 text-[#2E5D3B]" size={17} />
      <span className="whitespace-nowrap font-mono text-[0.75rem] font-semibold tracking-[0.02em] text-[#2E5D3B] sm:text-sm">
        {technology.name}
      </span>
    </span>
  );
}

/**
 * Infinite marquee row.
 *
 * The track holds two identical copies of the pill list and is translated by
 * exactly -50% of its own width, which lines copy two up where copy one began:
 * a seamless loop with no snap-back and no visible reset. The duplicate copy is
 * hidden from assistive tech so each technology is announced once.
 *
 * Motion is a single compositor-only `transform` animation. Row direction comes
 * from the page's existing `animate-marquee-left` / `animate-marquee-right`
 * utilities; the drift pauses while the pointer rests on a row and is disabled
 * entirely when the visitor asks for reduced motion.
 */
function MarqueeRow({ row }) {
  const maskImage =
    'linear-gradient(to right, transparent 0%, #000 7%, #000 93%, transparent 100%)';

  return (
    <div
      className="overflow-hidden py-1"
      style={{ maskImage, WebkitMaskImage: maskImage }}
    >
      <div
        className={cn(
          'flex w-max hover:[animation-play-state:paused] motion-reduce:[animation:none]',
          row.reverse ? 'animate-marquee-right' : 'animate-marquee-left',
        )}
        style={{ animationDuration: `${row.duration}s` }}
      >
        {[0, 1].map((copy) => (
          <div
            key={copy}
            className="flex shrink-0 items-center gap-3 pr-3 sm:gap-4 sm:pr-4"
            aria-hidden={copy === 1 ? 'true' : undefined}
          >
            {row.technologies.map((technology) => (
              <TechPill key={`${row.id}-${technology.name}`} technology={technology} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <Section id="skills" labelledBy="skills-heading" surface="paper" reveal>
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
        <div className="lg:col-span-8">
          <SectionHeading
            id="skills-heading"
            eyebrow="Technical Proficiency"
            heading="Skills & Tools"
            lede="Every technology behind the work: interface engineering, server systems, generative AI pipelines, and the cloud tooling that ships them."
          />
        </div>
        <p className="max-w-[32ch] border-t border-[#DDE8D8] pt-4 font-mono text-xs font-semibold leading-relaxed text-[#2E5D3B] lg:col-span-4 lg:justify-self-end">
          ALL TECHNOLOGIES AT A GLANCE
        </p>
      </div>

      {/* Full-bleed marquee: the rows break past the page gutter so pills keep
          entering and leaving at the viewport edges. */}
      <Reveal className="mt-14">
        <div className="-mx-5 flex flex-col gap-3 sm:-mx-8 sm:gap-4 lg:-mx-14">
          {marqueeRows.map((row) => (
            <MarqueeRow key={row.id} row={row} />
          ))}
        </div>
      </Reveal>
    </Section>
  );
}

export default Skills;