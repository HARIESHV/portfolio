import { useCallback, useEffect, useRef } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import { Icon } from './ui/Icon';
import { ActionLink } from './ui/ActionLink';
import { Tag } from './ui/Tag';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { Z } from '../lib/constants';
import { EASE_OUT_EXPO } from '../lib/motion';

/**
 * Project Details Modal Dialog.
 *
 * Displays full-depth architectural specifications, problem & solution statements,
 * comprehensive feature list, full technology stack, system architecture,
 * live preview screenshot, and external repository links.
 */
export function ProjectModal({ project, onClose }) {
  useBodyScrollLock(Boolean(project));

  return (
    <AnimatePresence>
      {project ? (
        <ProjectModalDialog key={project.id} project={project} onClose={onClose} />
      ) : null}
    </AnimatePresence>
  );
}

function ProjectModalDialog({ project, onClose }) {
  const reduce = useReducedMotion();
  const panelRef = useRef(null);
  const close = useCallback(() => onClose(), [onClose]);

  useFocusTrap(panelRef, true, close);

  // Keyboard shortcut support (Esc to close)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        close();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [close]);

  const overviewParagraphs = Array.isArray(project.detailedOverview)
    ? project.detailedOverview
    : [project.description];

  return (
    <div
      className="fixed inset-0 flex items-center justify-center overflow-hidden p-2 sm:p-4 md:p-6"
      style={{ zIndex: Z.modalBackdrop }}
    >
      {/* Backdrop */}
      <motion.button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={close}
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 cursor-default bg-[#172117]/65 backdrop-blur-sm"
      />

      {/* Modal Dialog Panel */}
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        tabIndex={-1}
        initial={reduce ? false : { opacity: 0, y: 22, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.99 }}
        transition={reduce ? { duration: 0 } : { duration: 0.35, ease: EASE_OUT_EXPO }}
        className="relative flex h-[94dvh] w-full max-w-4xl flex-col overflow-hidden rounded-[18px] sm:rounded-[26px] border border-[#DDE8D8] bg-white shadow-lift"
        style={{ zIndex: Z.modalContent }}
      >
        {/* Header Toolbar */}
        <div className="flex items-center justify-between gap-3 border-b border-[#DDE8D8] bg-[#FAFDF7] px-4 py-3 sm:px-7 sm:py-4">
          <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#C8E6C9] bg-[#E8F5E9] text-[#2E5D3B]">
              <Icon name="Activity" size={18} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-block max-w-full truncate rounded-full border border-[#F2E8A5] bg-[#FFF4B8] px-2.5 py-0.5 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-[#2E5D3B]">
                  {project.category}
                </span>
                {project.duration ? (
                  <span className="hidden font-mono text-[0.6875rem] text-[#6c8471] sm:inline-flex items-center gap-1">
                    <Icon name="Calendar" size={12} className="text-[#2E5D3B]" />
                    {project.duration}
                  </span>
                ) : null}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={close}
            aria-label="Close project details"
            title="Close dialog (Esc)"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-control border border-[#DDE8D8] bg-white text-[#2E5D3B] transition-colors duration-200 hover:bg-[#E8F5E9] cursor-pointer"
          >
            <Icon name="X" size={16} />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="flex-1 overflow-y-auto overscroll-contain p-5 sm:p-8 space-y-8">
          {/* 7. Screenshots / Project Preview */}
          <div className="relative overflow-hidden rounded-2xl border border-[#DDE8D8] bg-[#0F1712] shadow-soft">
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#172117]">
              <img
                src={project.image}
                alt={project.imageAlt}
                width={1200}
                height={675}
                className="h-full w-full object-cover"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
              />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white/90">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1 font-mono text-[0.6875rem] backdrop-blur-md">
                  <Icon name="Layers" size={12} className="text-[#C8E6C9]" />
                  Interactive System Dashboard Preview
                </span>
                {project.links.github ? (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden sm:inline-flex items-center gap-1 font-mono text-[0.6875rem] text-[#C8E6C9] hover:underline"
                  >
                    <span>View Repository</span>
                    <Icon name="ExternalLink" size={11} />
                  </a>
                ) : null}
              </div>
            </div>
          </div>

          {/* Project Title & Metadata */}
          <div>
            <div className="flex flex-wrap items-center gap-2.5 font-mono text-[0.72rem] text-[#6c8471]">
              <span className="font-semibold text-[#2E5D3B]">Full Stack Specification</span>
              {project.duration ? (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1">
                    <Icon name="Calendar" size={12} className="text-[#2E5D3B]" />
                    {project.duration}
                  </span>
                </>
              ) : null}
            </div>
            <h2
              id="project-modal-title"
              className="mt-2 text-xl sm:text-3xl font-bold tracking-tight text-[#2E5D3B] break-words"
            >
              {project.name}
            </h2>
          </div>

          {/* 1. Project Overview */}
          <div className="rounded-2xl border border-[#DDE8D8] bg-[#FAFDF7] p-5 sm:p-6">
            <h3 className="font-mono text-[0.75rem] font-bold uppercase tracking-[0.14em] text-[#2E5D3B]">
              Project Overview
            </h3>
            <div className="mt-3.5 space-y-3.5 text-[0.9375rem] leading-relaxed text-[#2C3E30]">
              {overviewParagraphs.map((paragraph, idx) => (
                <p key={idx} className="text-pretty">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* 2 & 3. Problem Statement & Solution */}
          {(project.problem || project.solution) && (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {project.problem ? (
                <div className="rounded-2xl border border-[#F2E8A5] bg-[#FFFBEA] p-5 sm:p-6">
                  <div className="flex items-center gap-2 text-[#7A5A0A]">
                    <Icon name="AlertCircle" size={16} className="shrink-0 text-[#B27B00]" />
                    <h3 className="font-mono text-[0.72rem] font-bold uppercase tracking-[0.14em]">
                      Problem Statement
                    </h3>
                  </div>
                  <p className="mt-3 text-[0.875rem] leading-relaxed text-[#5C4505]">
                    {project.problem}
                  </p>
                </div>
              ) : null}

              {project.solution ? (
                <div className="rounded-2xl border border-[#C8E6C9] bg-[#E8F5E9] p-5 sm:p-6">
                  <div className="flex items-center gap-2 text-[#2E5D3B]">
                    <Icon name="CheckCircle2" size={16} className="shrink-0 text-[#2E5D3B]" />
                    <h3 className="font-mono text-[0.72rem] font-bold uppercase tracking-[0.14em]">
                      The Solution
                    </h3>
                  </div>
                  <p className="mt-3 text-[0.875rem] leading-relaxed text-[#234B2F]">
                    {project.solution}
                  </p>
                </div>
              ) : null}
            </div>
          )}

          {/* 4. Key Features */}
          {project.features && project.features.length > 0 && (
            <div className="rounded-2xl border border-[#DDE8D8] bg-white p-5 sm:p-6 shadow-2xs">
              <div className="flex items-center justify-between gap-2 border-b border-[#DDE8D8] pb-3">
                <h3 className="font-mono text-[0.75rem] font-bold uppercase tracking-[0.14em] text-[#2E5D3B]">
                  Key System Features ({project.features.length})
                </h3>
                <span className="font-mono text-[0.6875rem] text-[#6c8471]">
                  Verified Implementations
                </span>
              </div>
              <ul className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {project.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 rounded-xl border border-[#E8F5E9] bg-[#FAFDF7] p-2.5 transition-colors hover:border-[#C8E6C9]"
                  >
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#E8F5E9] text-[#2E5D3B]">
                      <Icon name="Check" size={11} strokeWidth={2.5} />
                    </span>
                    <span className="text-[0.84rem] font-medium leading-snug text-[#172117]">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 5. Technology Stack */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="rounded-2xl border border-[#DDE8D8] bg-[#FAFDF7] p-5 sm:p-6">
              <h3 className="font-mono text-[0.75rem] font-bold uppercase tracking-[0.14em] text-[#2E5D3B]">
                Technology Stack & Tooling
              </h3>
              <ul className="mt-3.5 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <li key={tech}>
                    <Tag tone="green" className="text-[0.75rem] px-3 py-1 font-medium">
                      {tech}
                    </Tag>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 6. System Architecture */}
          {project.architecture && (
            <div className="rounded-2xl border border-[#DDE8D8] bg-white p-5 sm:p-6 shadow-2xs">
              <div className="flex items-center gap-2 border-b border-[#DDE8D8] pb-3">
                <Icon name="Layers" size={16} className="text-[#2E5D3B]" />
                <h3 className="font-mono text-[0.75rem] font-bold uppercase tracking-[0.14em] text-[#2E5D3B]">
                  System Architecture
                </h3>
              </div>
              <p className="mt-3.5 text-[0.875rem] leading-relaxed text-[#425846]">
                {project.architecture}
              </p>
            </div>
          )}
        </div>

        {/* Sticky Action Footer */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-[#DDE8D8] bg-[#FAFDF7] px-4 py-3 sm:px-7 sm:py-4">
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            {/* 8. GitHub repository link */}
            <ActionLink
              href={project.links.github}
              available={Boolean(project.links.github)}
              label="GitHub / View Source"
              icon="Github"
              variant="primary"
              size="sm"
              unavailableLabel="Repository link is not available yet"
              className="w-full min-[400px]:w-auto justify-center"
            />

            {/* 9. Live Demo button only if a valid deployment URL is configured */}
            {project.links?.live ? (
              <ActionLink
                href={project.links.live}
                available={Boolean(project.links.live)}
                label="Live Demo"
                icon="ExternalLink"
                variant="secondary"
                size="sm"
                unavailableLabel="Live demo link is not available yet"
                className="w-full min-[400px]:w-auto justify-center"
              />
            ) : null}
          </div>

          <button
            type="button"
            onClick={close}
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-control border border-[#DDE8D8] bg-white px-4 text-xs font-semibold text-[#2E5D3B] transition-colors duration-200 hover:bg-[#E8F5E9] cursor-pointer w-full sm:w-auto"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default ProjectModal;
