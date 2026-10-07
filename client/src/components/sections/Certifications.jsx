import { useCallback, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import { certificates } from '../../data/certificates';
import { Icon } from '../ui/Icon';
import { Section } from '../ui/Section';
import { SectionHeading } from '../ui/SectionHeading';
import { RevealGroup, RevealItem } from '../ui/Reveal';
import { CertificateModal } from '../CertificateModal';
import { EASE_OUT_EXPO, VIEWPORT } from '../../lib/motion';
import { cn } from '../../lib/cn';

/**
 * Downloads the exact original PDF certificate with a clean, descriptive filename.
 */
async function downloadCertificatePdf(certificate) {
  const fileUrl = encodeURI(certificate.file);
  const downloadName = certificate.downloadName || `${certificate.title}.pdf`;

  try {
    const response = await fetch(fileUrl);
    if (!response.ok) throw new Error(`HTTP error ${response.status}`);
    const blob = await response.blob();
    const objectUrl = window.URL.createObjectURL(blob);

    const anchor = document.createElement('a');
    anchor.href = objectUrl;
    anchor.download = downloadName;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

    window.URL.revokeObjectURL(objectUrl);
  } catch (error) {
    console.warn('Blob fetch failed, falling back to direct link download:', error);
    const anchor = document.createElement('a');
    anchor.href = fileUrl;
    anchor.download = downloadName;
    anchor.target = '_blank';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }
}

export function Certifications() {
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  const handleView = useCallback((cert) => {
    setSelectedCertificate(cert);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedCertificate(null);
  }, []);

  const handleDownload = useCallback((cert) => {
    downloadCertificatePdf(cert);
  }, []);

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

      {/* Responsive layout: Mobile 1 card, Tablet 2 cards, Desktop 3 cards */}
      <RevealGroup className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {certificates.map((certificate, index) => (
          <RevealItem key={certificate.id}>
            <CertificateCard
              certificate={certificate}
              index={index}
              onView={handleView}
              onDownload={handleDownload}
            />
          </RevealItem>
        ))}
      </RevealGroup>

      {/* Interactive PDF Viewer Modal */}
      <CertificateModal
        certificate={selectedCertificate}
        onClose={handleCloseModal}
        onDownload={handleDownload}
      />
    </Section>
  );
}

/**
 * Individual Certificate Card.
 * Structure: Certificate → Details → View → Download
 */
function CertificateCard({ certificate, index, onView, onDownload }) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      whileHover={reduce ? undefined : { y: -5 }}
      transition={reduce ? { duration: 0 } : { duration: 0.3, ease: EASE_OUT_EXPO }}
      className={cn(
        'group relative flex h-full max-w-full min-w-0 flex-col justify-between overflow-hidden rounded-[22px] border border-[#DDE8D8] bg-white p-5 sm:p-7 shadow-soft transition-all duration-300 hover:border-[#C8E6C9] hover:shadow-lift',
      )}
    >
      {/* 1. Certificate Identity & Issuer Header */}
      <div>
        <div className="flex flex-wrap items-start justify-between gap-3">
          {/* Certificate Icon & Issuer Badge */}
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2.5">
            <span
              className={cn(
                'flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-2xl border border-[#C8E6C9] bg-[#E8F5E9] text-[#2E5D3B] transition-transform duration-300 group-hover:scale-105 shadow-2xs',
              )}
            >
              <Icon name={certificate.icon || 'Award'} size={19} />
            </span>

            <span
              className={cn(
                'inline-block max-w-full rounded-full border border-[#F2E8A5] bg-[#FFF4B8] px-3 py-1 font-mono text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-[#2E5D3B] break-words text-balance leading-relaxed',
              )}
            >
              {certificate.organization}
            </span>
          </div>

          {/* Verification Badge */}
          <span
            className="inline-flex shrink-0 items-center gap-1 rounded-full border border-[#C8E6C9] bg-[#E8F5E9] px-2.5 py-1 text-[0.6875rem] font-semibold text-[#2E5D3B]"
            title="Verified Credential"
          >
            <Icon name="CheckCircle2" size={13} className="text-[#2E5D3B]" />
            <span className="hidden sm:inline">Verified</span>
          </span>
        </div>

        {/* 2. Details: Title */}
        <h3 className="mt-5 text-xl font-bold leading-snug tracking-[-0.025em] text-[#2E5D3B] transition-colors duration-200 group-hover:text-[#244b2f] break-words">
          {certificate.title}
        </h3>

        {/* 2. Details: Metadata Block (Date & Certificate ID) */}
        <div className="mt-4 space-y-2 rounded-xl border border-[#E8F5E9] bg-[#FAFDF7] p-3 text-xs">
          {/* Completion Date */}
          <div className="flex items-start gap-2 text-[#425846]">
            <Icon name="Calendar" size={14} className="mt-0.5 shrink-0 text-[#2E5D3B]" />
            <span className="min-w-0 flex-1 font-medium leading-relaxed text-[#172117] break-words [overflow-wrap:anywhere]">{certificate.date}</span>
          </div>

          {/* Certificate ID */}
          <div className="flex items-center gap-2 font-mono text-[0.72rem] text-[#425846] min-w-0">
            <Icon name="Award" size={14} className="shrink-0 text-[#2E5D3B]" />
            <span className="text-[#6c8471] shrink-0">ID:</span>
            <span className="min-w-0 flex-1 font-semibold tracking-wider text-[#2E5D3B] select-all truncate [overflow-wrap:anywhere]">
              {certificate.certificateId}
            </span>
          </div>
        </div>

        {/* 2. Details: Short Description */}
        <p className="mt-4 text-[0.9125rem] leading-relaxed text-[#425846] break-words [overflow-wrap:anywhere]">
          {certificate.description}
        </p>

        {/* Skills / Covered Topics */}
        {certificate.skills && certificate.skills.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {certificate.skills.map((skill) => (
              <span
                key={skill}
                className="max-w-full rounded-full border border-[#DDE8D8] bg-[#FAFDF7] px-2.5 py-0.5 font-mono text-[0.6875rem] text-[#2E5D3B] break-words [overflow-wrap:anywhere]"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* 3 & 4. Actions: View Certificate & Download Certificate */}
      <div className="relative mt-7 border-t border-[#DDE8D8] pt-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2 gap-2.5">
          {/* View Certificate Button */}
          <button
            type="button"
            onClick={() => onView(certificate)}
            aria-label={`View ${certificate.title} certificate PDF`}
            className="inline-flex items-center justify-center gap-2 rounded-control bg-[#2E5D3B] px-4 py-2.5 text-sm font-semibold text-white shadow-soft transition-all duration-200 hover:bg-[#244b2f] hover:shadow-lift cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#2E5D3B]"
          >
            <Icon name="Eye" size={16} />
            <span>View Certificate</span>
          </button>

          {/* Download Certificate Button */}
          <button
            type="button"
            onClick={() => onDownload(certificate)}
            aria-label={`Download ${certificate.title} certificate PDF`}
            className="inline-flex items-center justify-center gap-2 rounded-control border border-[#DDE8D8] bg-white px-4 py-2.5 text-sm font-semibold text-[#2E5D3B] shadow-soft transition-all duration-200 hover:border-[#2E5D3B] hover:bg-[#E8F5E9] cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#2E5D3B]"
          >
            <Icon name="Download" size={16} />
            <span>Download</span>
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default Certifications;
