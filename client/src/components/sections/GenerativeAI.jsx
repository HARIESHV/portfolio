import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import { Icon } from '../ui/Icon';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/Button';
import { Reveal, RevealGroup, RevealItem } from '../ui/Reveal';
import { useSmoothScroll } from '../../hooks/useSmoothScroll';
import { EASE_OUT_EXPO } from '../../lib/motion';
import { cn } from '../../lib/cn';

/** Generative AI Core Pillars */
const aiPillars = [
  {
    id: 'rag',
    title: 'RAG Retrieval Systems',
    subtitle: 'Context-Aware Intelligence',
    icon: 'Database',
    badge: 'Vector Pipeline',
    badgeTone: 'yellow',
    description:
      'Designing robust Retrieval-Augmented Generation architectures that index domain knowledge into vector stores and ground LLM answers with precision, preventing hallucinations.',
    stack: ['Vector DBs', 'Embeddings', 'LangChain', 'Similarity Search', 'Chunking Strategies'],
  },
  {
    id: 'agents',
    title: 'Autonomous AI Agents',
    subtitle: 'Multi-Step Execution',
    icon: 'Blocks',
    badge: 'Agentic Workflows',
    badgeTone: 'green',
    description:
      'Building goal-oriented autonomous agents capable of dynamic tool calling, iterative reasoning, self-reflection, and external API invocation for complex workflows.',
    stack: ['AI Agents', 'LangGraph', 'Function Calling', 'State Machines', 'Task Planning'],
  },
  {
    id: 'prompts',
    title: 'Prompt Architecture & LLMs',
    subtitle: 'High-Fidelity Prompting',
    icon: 'Cpu',
    badge: 'LLM Optimization',
    badgeTone: 'yellow',
    description:
      'Engineering sophisticated prompt templates, chain-of-thought methodologies, few-shot prompting, and structured JSON schema outputs across OpenAI and Google Gemini models.',
    stack: ['GPT-4o', 'Gemini 2.5', 'Few-Shot', 'Structured JSON', 'Guardrails'],
  },
  {
    id: 'doc-ai',
    title: 'Document Intelligence & Vision',
    subtitle: 'Multi-Modal Understanding',
    icon: 'FileText',
    badge: 'Multi-Modal',
    badgeTone: 'green',
    description:
      'Extracting and synthesizing unstructured information from multi-page documents, PDFs, and images into structured databases for downstream web application consumption.',
    stack: ['Multi-Modal Vision', 'Document Parsing', 'Semantic Extraction', 'Python Pipelines'],
  },
];

export function GenerativeAI() {
  const reduce = useReducedMotion();
  const scrollTo = useSmoothScroll();
  const [activeTab, setActiveTab] = useState('rag');

  return (
    <Section
      id="genai"
      labelledBy="genai-heading"
      surface="gradientSoft"
      className="relative overflow-hidden border-y border-[#DDE8D8]"
      reveal
    >
      {/* Background Animated Network Lines (Minimal & Professional) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-70">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="networkLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2E5D3B" stopOpacity="0.12" />
              <stop offset="50%" stopColor="#C8E6C9" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#FFF4B8" stopOpacity="0.15" />
            </linearGradient>
            <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#2E5D3B" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#2E5D3B" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Network constellation lines */}
          <line x1="10%" y1="20%" x2="35%" y2="40%" stroke="url(#networkLineGrad)" strokeWidth="1.5" strokeDasharray="6 6" />
          <line x1="35%" y1="40%" x2="65%" y2="30%" stroke="url(#networkLineGrad)" strokeWidth="1.5" />
          <line x1="65%" y1="30%" x2="90%" y2="60%" stroke="url(#networkLineGrad)" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="35%" y1="40%" x2="50%" y2="80%" stroke="url(#networkLineGrad)" strokeWidth="1.5" />
          <line x1="50%" y1="80%" x2="80%" y2="85%" stroke="url(#networkLineGrad)" strokeWidth="1.5" />
        </svg>

        {/* Floating animated network nodes */}
        <NetworkNode cx="10%" cy="20%" color="#2E5D3B" size={7} delay={0} reduce={reduce} />
        <NetworkNode cx="35%" cy="40%" color="#C8E6C9" size={9} delay={1.2} reduce={reduce} />
        <NetworkNode cx="65%" cy="30%" color="#FFF4B8" size={8} delay={0.6} reduce={reduce} />
        <NetworkNode cx="90%" cy="60%" color="#2E5D3B" size={6} delay={2.1} reduce={reduce} />
        <NetworkNode cx="50%" cy="80%" color="#C8E6C9" size={10} delay={1.8} reduce={reduce} />
        <NetworkNode cx="80%" cy="85%" color="#FFF4B8" size={7} delay={0.9} reduce={reduce} />
      </div>

      <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
        <div className="lg:col-span-8">
          <SectionHeading
            id="genai-heading"
            eyebrow="Artificial Intelligence Practice"
            heading="Generative AI & LLM Systems"
            lede="Designing pragmatic AI-driven architectures: from retrieval-augmented generation and autonomous agent tooling to prompt orchestration and multi-modal integrations."
          />
        </div>
        <div className="lg:col-span-4 lg:justify-self-end">
          <div className="flex items-center gap-2 rounded-control border border-[#C8E6C9] bg-white/90 px-4 py-2 shadow-xs">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2E5D3B] opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#2E5D3B]" />
            </span>
            <span className="font-mono text-xs font-semibold text-[#2E5D3B]">
              Active AI Architecture Pipeline
            </span>
          </div>
        </div>
      </div>

      {/* AI Systems Grid */}
      <RevealGroup className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        {aiPillars.map((pillar) => {
          const isSelected = activeTab === pillar.id;

          return (
            <RevealItem key={pillar.id}>
              <motion.article
                whileHover={reduce ? undefined : { y: -5 }}
                transition={reduce ? { duration: 0 } : { duration: 0.3, ease: EASE_OUT_EXPO }}
                onClick={() => setActiveTab(pillar.id)}
                className={cn(
                  'group relative flex h-full cursor-pointer flex-col justify-between overflow-hidden rounded-[22px] border bg-white/95 p-6 shadow-soft transition-all duration-300 sm:p-8',
                  isSelected
                    ? 'border-[#2E5D3B] ring-2 ring-[#C8E6C9]/60 shadow-lift'
                    : 'border-[#DDE8D8] hover:border-[#2E5D3B]/40 hover:shadow-lift',
                )}
              >
                <div>
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className={cn(
                        'flex h-12 w-12 items-center justify-center rounded-full shadow-xs transition-colors duration-300',
                        pillar.badgeTone === 'yellow'
                          ? 'bg-[#FFF4B8] text-[#2E5D3B]'
                          : 'bg-[#C8E6C9] text-[#2E5D3B]',
                      )}
                    >
                      <Icon name={pillar.icon} size={22} />
                    </span>

                    <span
                      className={cn(
                        'rounded-full border px-3 py-1 font-mono text-[0.625rem] font-bold uppercase tracking-wider',
                        pillar.badgeTone === 'yellow'
                          ? 'border-[#F2E8A5] bg-[#FFF9D6] text-[#2E5D3B]'
                          : 'border-[#C8E6C9] bg-[#E8F5E9] text-[#2E5D3B]',
                      )}
                    >
                      {pillar.badge}
                    </span>
                  </div>

                  <p className="mt-5 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-[#6c8471]">
                    {pillar.subtitle}
                  </p>

                  <h3 className="mt-1 text-xl font-bold tracking-[-0.02em] text-[#2E5D3B] sm:text-2xl">
                    {pillar.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-[#425846] sm:text-[0.9375rem]">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 border-t border-[#DDE8D8] pt-5">
                  <span className="font-mono text-[0.625rem] font-bold uppercase tracking-[0.16em] text-[#2E5D3B]">
                    Technologies & Techniques
                  </span>
                  <ul className="mt-2.5 flex flex-wrap gap-1.5">
                    {pillar.stack.map((item) => (
                      <li
                        key={item}
                        className="rounded-control border border-[#DDE8D8] bg-[#FAFDF7] px-2.5 py-1 font-mono text-[0.6875rem] font-medium text-[#172117]"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            </RevealItem>
          );
        })}
      </RevealGroup>

      {/* Interactive AI Architecture Workflow Diagram Card */}
      <Reveal delay={0.2} className="mt-10">
        <div className="rounded-[22px] border border-[#DDE8D8] bg-white p-6 shadow-soft sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DDE8D8] pb-5">
            <div>
              <span className="font-mono text-[0.6875rem] font-bold uppercase tracking-[0.18em] text-[#2E5D3B]">
                Architectural Flow
              </span>
              <h4 className="mt-1 text-lg font-bold text-[#172117] sm:text-xl">
                End-to-End Generative AI Application Stack
              </h4>
            </div>

            <Button
              variant="secondary"
              size="sm"
              onClick={() => scrollTo('contact')}
            >
              Discuss AI Integration
              <Icon name="ArrowRight" size={14} />
            </Button>
          </div>

          {/* Interactive Steps */}
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <FlowStep
              number="01"
              title="Data Ingestion & Chunking"
              desc="Ingesting unstructured files, sanitizing markdown, and creating semantic vector embeddings."
              color="#FFF4B8"
            />
            <FlowStep
              number="02"
              title="Vector Index & Retrieval"
              desc="Indexing in MongoDB Vector / Pinecone with cosine similarity and hybrid keyword search."
              color="#C8E6C9"
            />
            <FlowStep
              number="03"
              title="Agent & Prompt Orchestration"
              desc="LangChain execution with system prompt constraints, tool calls, and few-shot reasoning."
              color="#FFF4B8"
            />
            <FlowStep
              number="04"
              title="Web Client & Streaming"
              desc="Full-stack React delivery with real-time token streaming and verified response schemas."
              color="#C8E6C9"
            />
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

function FlowStep({ number, title, desc, color }) {
  return (
    <div className="flex flex-col justify-between rounded-[18px] border border-[#DDE8D8] bg-[#FAFDF7] p-5">
      <div>
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs font-bold text-[#2E5D3B]">{number}</span>
          <span
            className="h-3 w-3 rounded-full border border-black/10"
            style={{ backgroundColor: color }}
          />
        </div>
        <h5 className="mt-3 text-sm font-bold text-[#2E5D3B]">{title}</h5>
        <p className="mt-2 text-xs leading-relaxed text-[#425846]">{desc}</p>
      </div>
      <div className="mt-4 flex items-center gap-1.5 font-mono text-[0.625rem] font-semibold text-[#2E5D3B]">
        <Icon name="Check" size={12} />
        Production Standard
      </div>
    </div>
  );
}

/** Animated SVG node for background network */
function NetworkNode({ cx, cy, color, size, delay, reduce }) {
  return (
    <motion.div
      aria-hidden="true"
      style={{ left: cx, top: cy }}
      animate={
        reduce
          ? undefined
          : {
              scale: [1, 1.35, 1],
              opacity: [0.6, 1, 0.6],
            }
      }
      transition={
        reduce
          ? undefined
          : {
              duration: 4,
              repeat: Infinity,
              delay,
              ease: 'easeInOut',
            }
      }
      className="absolute -translate-x-1/2 -translate-y-1/2"
    >
      <span
        className="block rounded-full border border-[#2E5D3B]/40 shadow-xs"
        style={{
          width: size,
          height: size,
          backgroundColor: color,
        }}
      />
    </motion.div>
  );
}

export default GenerativeAI;
