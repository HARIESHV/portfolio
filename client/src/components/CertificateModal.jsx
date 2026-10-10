import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import { PdfCanvasViewer } from './PdfCanvasViewer';
import { Icon } from './ui/Icon';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { Z } from '../lib/constants';
import { EASE_OUT_EXPO } from '../lib/motion';

/**
 * Certificate Lightbox Modal Wrapper.
 *
 * Opens an issuing organization's certificates inside a single modal. Every
 * certificate is rendered inside one vertically scrollable container — no
 * carousel, slides or navigation controls.
 */
export function CertificateModal({ group, onClose }) {
  const isOpen = Boolean(group && group.certificates && group.certificates.length > 0);

  useBodyScrollLock(isOpen);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen ? (
        <CertificateViewerDialog key={group.id} group={group} onClose={onClose} />
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}

/**
 * Inner Dialog component.
 *
 * Supports:
 * - All of the organization's certificates stacked vertically
 * - One vertically scrollable container (`overflow-y: auto`)
 * - Original certificate PDFs rendered with PDF.js (crisp on every device)
 * - Full-screen responsive layout
 * - Keyboard close (Esc) and accessible focus trapping
 */
function CertificateViewerDialog({ group, onClose }) {
  const reduce = useReducedMotion();
  const panelRef = useRef(null);
  const certificates = group.certificates;
  const total = certificates.length;

  const close = useCallback(() => {
    onClose();
  }, [onClose]);

  useFocusTrap(panelRef, true, close);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        close();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [close]);

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
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 cursor-default bg-[#172117]/65 backdrop-blur-sm"
      />

      {/* Modal Panel */}
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="certificate-modal-title"
        tabIndex={-1}
        initial={reduce ? false : { opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.99 }}
        transition={reduce ? { duration: 0 } : { duration: 0.35, ease: EASE_OUT_EXPO }}
        className="relative flex h-[94dvh] w-full max-w-5xl flex-col overflow-hidden rounded-[20px] border border-[#DDE8D8] bg-white shadow-lift sm:h-[90dvh] sm:rounded-[24px]"
        style={{ zIndex: Z.modalContent }}
      >
        {/* Header Toolbar */}
        <div className="flex items-center justify-between gap-3 border-b border-[#DDE8D8] bg-[#FAFDF7] px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#C8E6C9] bg-[#E8F5E9] text-[#2E5D3B]">
              <Icon name={group.icon || 'Award'} size={18} />
            </span>

            <div className="min-w-0">
              <h2
                id="certificate-modal-title"
                className="truncate text-sm font-bold tracking-tight text-[#2E5D3B] sm:text-lg"
                title={`${group.name} Certificate Viewer`}
              >
                {group.name} Certificate Viewer
              </h2>
              <p className="font-mono text-[0.6875rem] text-[#6c8471]">
                {total} {total === 1 ? 'certificate' : 'certificates'}
              </p>
            </div>
          </div>

          {/* Close */}
          <button
            type="button"
            onClick={close}
            aria-label="Close certificate viewer"
            title="Close (Esc)"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-control border border-[#DDE8D8] bg-white text-[#2E5D3B] transition-colors hover:bg-[#E8F5E9] cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#2E5D3B]"
          >
            <Icon name="X" size={16} />
          </button>
        </div>

        {/* Vertically scrollable certificate stack */}
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-[#1a251a] p-3 sm:p-5 md:p-8">
          <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 sm:gap-10">
            {certificates.map((certificate, index) => (
              <CertificateViewerItem
                key={certificate.id}
                certificate={certificate}
                index={index}
                total={total}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/**
 * A single certificate inside the vertical stack: its course name, position and
 * the rendered original PDF.
 */
function CertificateViewerItem({ certificate, index, total }) {
  const [isReady, setIsReady] = useState(false);

  const handleReady = useCallback(() => setIsReady(true), []);
  const handleError = useCallback(() => setIsReady(true), []);

  return (
    <section className="w-full">
      <div className="mb-3 flex flex-wrap items-baseline gap-x-2.5 gap-y-1 text-white">
        <h3 className="min-w-0 text-sm font-semibold tracking-tight sm:text-base" title={certificate.title}>
          {certificate.title}
        </h3>
        <span className="font-mono text-[0.6875rem] text-[#C8E6C9]">
          {index + 1} of {total}
        </span>
      </div>

      <div className="relative min-h-[45vh] sm:min-h-[60vh]">
        {!isReady && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-[#C8E6C9]">
            <Icon name="LoaderCircle" size={30} className="animate-spin" />
            <span className="font-mono text-xs">Loading certificate...</span>
          </div>
        )}

        <PdfCanvasViewer
          src={encodeURI(certificate.file)}
          preview={certificate.preview}
          title={certificate.title}
          onReady={handleReady}
          onError={handleError}
        />
      </div>
    </section>
  );
}

export default CertificateModal;
