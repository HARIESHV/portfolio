import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import { Icon } from './ui/Icon';
import { ActionLink } from './ui/ActionLink';
import { EASE_OUT_EXPO, VIEWPORT } from '../lib/motion';
import { publicAssetUrl } from '../lib/publicAssetUrl';

/**
 * Premium developer-style project card.
 *
 * Implements the two-column card structure, proportions, and green developer aesthetic
 * from the design reference image while preserving complete project data integrity.
 */
export function ProjectCard({ project, index = 0, onOpenModal }) {
  const reduce = useReducedMotion();
  const [imageSrc, setImageSrc] = useState(() => publicAssetUrl(project.image));
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImageSrc(publicAssetUrl(project.image));
    setHasError(false);
  }, [project.image]);

  const handleImageError = () => {
    if (imageSrc.endsWith('.png')) {
      setImageSrc(imageSrc.replace(/\.png$/, '.svg'));
    } else if (imageSrc.endsWith('.svg')) {
      setImageSrc(imageSrc.replace(/\.svg$/, '.png'));
    } else {
      setHasError(true);
    }
  };

  const handleCardClick = (e) => {
    // If user clicked inside an interactive button or link, do not trigger card click
    if (e.target.closest('a, button')) return;
    if (onOpenModal) {
      onOpenModal(project);
    }
  };

  const handleKeyDown = (e) => {
    if (e.target.closest('a, button')) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (onOpenModal) onOpenModal(project);
    }
  };

  const shownTech = project.technologies ? project.technologies.slice(0, 5) : [];
  const overflowTech = project.technologies ? project.technologies.length - shownTech.length : 0;
  const highlights = project.highlightFeatures
    ? project.highlightFeatures.slice(0, 3)
    : project.features
      ? project.features.slice(0, 3)
      : [];

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.6, delay: index * 0.08, ease: EASE_OUT_EXPO }}
      whileHover={reduce ? undefined : { y: -4 }}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View full details for ${project.name}`}
      className="group relative flex h-full max-w-full min-w-0 cursor-pointer flex-col overflow-hidden rounded-[22px] border border-[#DDE8D8] bg-white shadow-soft transition-[border-color,box-shadow,transform] duration-300 hover:border-[#C8E6C9] hover:shadow-lift focus-visible:outline-2 focus-visible:outline-[#2E5D3B]"
    >
      {/* 1. Project Preview at the top */}
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-[#E5EAE2] bg-[#121A13]">
        {!hasError ? (
          <img
            src={imageSrc}
            alt={project.imageAlt}
            width={800}
            height={500}
            loading={index === 0 ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={index === 0 ? 'high' : 'auto'}
            onError={handleImageError}
            className="h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[#172117] p-6 text-center">
            <span className="font-mono text-xs uppercase tracking-wider text-[#C8E6C9]">
              {project.name}
            </span>
          </div>
        )}

        {/* Subtle green hover highlight ring */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-transparent transition-colors duration-500 group-hover:ring-[#C8E6C9]/80"
        />

        {/* Quick view overlay badge on hover */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-black/60 via-transparent to-transparent p-3.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 text-xs text-white">
          <span className="inline-flex items-center gap-1.5 font-mono text-[0.6875rem] text-[#C8E6C9]">
            <Icon name="Eye" size={13} />
            Click card to inspect full architecture
          </span>
        </div>
      </div>

      {/* 2. White Content Area below preview */}
      <div className="flex flex-1 flex-col justify-between bg-white p-5 sm:p-7 lg:p-8">
        <div>
          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-2">
            {/* Category badge */}
            <span className="inline-block max-w-full rounded-full border border-[#F2E8A5] bg-[#FFF4B8] px-3 py-1 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-[#2E5D3B] break-words text-balance leading-relaxed">
              {project.category}
            </span>

            {/* Featured pulse indicator if featured */}
            {project.featured && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#C8E6C9] bg-[#E8F5E9] px-2.5 py-1 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-[#2E5D3B]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#2E5D3B] animate-pulse" />
                Featured Flagship
              </span>
            )}

            {/* Date with calendar icon */}
            {project.duration ? (
              <>
                <span aria-hidden="true" className="hidden sm:inline h-3 w-px bg-[#DDE8D8]" />
                <span className="inline-flex items-center gap-1.5 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-[#5A6B5C]">
                  <Icon name="Calendar" size={12} className="shrink-0 text-[#2E5D3B]" />
                  {project.duration}
                </span>
              </>
            ) : null}
          </div>

          {/* 3. Project Title */}
          <h3 className="mt-4 text-xl font-bold leading-tight tracking-[-0.025em] text-[#1E4620] sm:text-[1.4rem] break-words">
            {project.name}
          </h3>

          {/* 4. Project Description */}
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-[#4A5568] break-words">
            {project.description}
          </p>

          {/* 5. Key Highlights */}
          {highlights.length > 0 && (
            <div className="mt-4">
              <h4 className="font-mono text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-[#6c8471]">
                Key Highlights
              </h4>
              <ul className="mt-2.5 space-y-2">
                {highlights.map((feat) => (
                  <li key={feat} className="flex min-w-0 items-start gap-2.5 text-[0.8125rem] text-[#2C3E30]">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#E8F5E9] text-[#2E5D3B]">
                      <Icon name="Check" size={10} strokeWidth={2.5} />
                    </span>
                    <span className="min-w-0 flex-1 leading-snug break-words">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Bottom Section: Technologies & Action Buttons */}
        <div className="mt-6">
          {/* 6. Technologies */}
          {shownTech.length > 0 && (
            <ul className="flex flex-wrap gap-2">
              {shownTech.map((tech) => (
                <li key={tech}>
                  <span className="inline-flex items-center rounded-full border border-[#C8E6C9] bg-[#E8F5E9] px-3 py-1 font-mono text-[0.75rem] font-medium text-[#2E5D3B] break-words">
                    {tech}
                  </span>
                </li>
              ))}
              {overflowTech > 0 && (
                <li>
                  <span className="inline-flex items-center rounded-full border border-[#F2E8A5] bg-[#FFF4B8] px-2.5 py-1 font-mono text-[0.75rem] font-bold text-[#2E5D3B]">
                    +{overflowTech}
                  </span>
                </li>
              )}
            </ul>
          )}

          {/* 7. Action Buttons with Divider */}
          <div className="mt-6 border-t border-[#E5EAE2] pt-5">
            <div
              className="flex flex-wrap items-center gap-2.5 sm:gap-3"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Primary View Details Button */}
              <button
                type="button"
                onClick={() => onOpenModal && onOpenModal(project)}
                aria-label={`View full details for ${project.name}`}
                className="group/btn inline-flex h-10 w-full min-[400px]:w-auto sm:w-auto cursor-pointer items-center justify-center gap-2 rounded-full bg-[#2E5D3B] px-5 text-sm font-semibold text-white shadow-soft transition-all duration-200 hover:bg-[#244b2f] hover:shadow-lift active:translate-y-px"
              >
                <span>View Details</span>
                <Icon
                  name="ArrowRight"
                  size={15}
                  className="transition-transform duration-200 group-hover/btn:translate-x-0.5"
                />
              </button>

              {/* GitHub Repository Button */}
              <ActionLink
                href={project.links?.github}
                available={Boolean(project.links?.github)}
                label="GitHub"
                icon="Github"
                size="sm"
                variant="outline"
                className="h-10 rounded-full px-4 text-sm font-medium flex-1 min-[400px]:flex-initial justify-center"
                unavailableLabel="Repository link is not available yet"
              />

              {/* Live Demo button ONLY if a deployed URL exists */}
              {project.links?.live ? (
                <ActionLink
                  href={project.links.live}
                  available={Boolean(project.links.live)}
                  label="Live Demo"
                  icon="ExternalLink"
                  size="sm"
                  variant="secondary"
                  className="h-10 rounded-full px-4 text-sm font-medium flex-1 min-[400px]:flex-initial justify-center"
                  unavailableLabel="Live demo URL not configured"
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default ProjectCard;