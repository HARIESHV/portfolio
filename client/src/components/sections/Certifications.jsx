import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import { certificateOrganizations } from '../../data/certificates';
import { CertificateModal } from '../CertificateModal';
import { Icon } from '../ui/Icon';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { RevealGroup, RevealItem } from '../ui/Reveal';
import { EASE_OUT_EXPO } from '../../lib/motion';
import { cn } from '../../lib/cn';

export function Certifications() {
  const [activeGroup, setActiveGroup] = useState(null);

  return (
    <Section id="certifications" labelledBy="certifications-heading" surface="paper" reveal>
      <div className="max-w-3xl">
        <SectionHeading
          id="certifications-heading"
          eyebrow="Certificates"
          heading="Certificates"
          lede="Professional certifications and learning milestones."
        />
      </div>

      <RevealGroup className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {certificateOrganizations.map((group) => (
          <RevealItem key={group.id}>
            <OrganizationCard group={group} onView={setActiveGroup} />
          </RevealItem>
        ))}
      </RevealGroup>

      <CertificateModal group={activeGroup} onClose={() => setActiveGroup(null)} />
    </Section>
  );
}

/**
 * Organization Card.
 *
 * One card per issuing organization. The only content is the organization
 * thumbnail (logo when available, otherwise the first certificate preview) which
 * opens a viewer containing every certificate that belongs to the organization.
 */
function OrganizationCard({ group, onView }) {
  const reduce = useReducedMotion();
  const count = group.certificates.length;

  return (
    <motion.article
      whileHover={reduce ? undefined : { y: -5 }}
      transition={reduce ? { duration: 0 } : { duration: 0.3, ease: EASE_OUT_EXPO }}
      className={cn(
        'group relative flex h-full max-w-full min-w-0 flex-col overflow-hidden rounded-[22px] border border-[#DDE8D8] bg-white p-5 sm:p-7 shadow-soft transition-all duration-300 hover:border-[#C8E6C9] hover:shadow-lift',
      )}
    >
      {/* Organization thumbnail — opens the certificate viewer */}
      <button
        type="button"
        onClick={() => onView(group)}
        aria-label={`View ${group.name} certificates`}
        className="block w-full cursor-pointer rounded-xl text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2E5D3B]"
      >
        <div className="flex aspect-[1600/1131] w-full items-center justify-center rounded-xl border border-[#DDE8D8] bg-[#FAFDF7] p-4 transition-colors duration-200 group-hover:border-[#C8E6C9] sm:p-6">
          {group.logo ? (
            <img
              src={group.logo}
              alt={`${group.name} logo`}
              loading="lazy"
              decoding="async"
              className="h-auto max-h-full w-auto max-w-[70%] object-contain"
            />
          ) : (
            <img
              src={group.thumbnail}
              alt={`Preview of ${group.certificates[0]?.title} certificate`}
              loading="lazy"
              decoding="async"
              className="block h-full w-full rounded-lg object-contain"
            />
          )}
        </div>
      </button>

      {/* Organization identity */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-2.5">
        <span className="inline-block max-w-full rounded-full border border-[#F2E8A5] bg-[#FFF4B8] px-3 py-1 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-[#2E5D3B] break-words text-balance leading-relaxed">
          {group.name}
        </span>

        <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-[#C8E6C9] bg-[#E8F5E9] px-2.5 py-1 text-[0.6875rem] font-semibold text-[#2E5D3B]">
          <Icon name="Award" size={13} className="text-[#2E5D3B]" />
          {count} {count === 1 ? 'Course' : 'Courses'}
        </span>
      </div>
    </motion.article>
  );
}

export default Certifications;
