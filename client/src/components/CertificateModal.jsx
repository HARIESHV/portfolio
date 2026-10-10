import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import { PdfCanvasViewer } from './PdfCanvasViewer';
import { Icon } from './ui/Icon';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';
import { useFocusTrap } from '../hooks/useFocusTrap';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { Z } from '../lib/constants';
import { EASE_OUT_EXPO } from '../lib/motion';
import { cn } from '../lib/cn';

/**
 * Certificate Lightbox Modal Wrapper.
 */
export function CertificateModal({ certificate, onClose, onDownload }) {
  useBodyScrollLock(Boolean(certificate));

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {certificate ? (
        <CertificateViewerDialog
          key={certificate.id}
          certificate={certificate}
          onClose={onClose}
          onDownload={onDownload}
        />
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}

/**
 * Inner Dialog component with its own local state keyed to each certificate.
 *
 * Supports:
 * - High-fidelity embedded viewing of the original certificate PDF
 * - Zoom controls (Zoom In, Zoom Out, Reset 100%)
 * - Modal fullscreen toggle
 * - Direct external tab opening
 * - Direct download of original PDF with authentic filename
 * - Responsive full-screen mobile experience
 * - Keyboard navigation (Esc to close, +/- to zoom, 0 to reset)
 * - Accessible focus trapping
 */
function CertificateViewerDialog({ certificate, onClose, onDownload }) {
  const reduce = useReducedMotion();
  const panelRef = useRef(null);
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Android Chrome does not render PDFs inside iframes (dark screen + "Open"
  // button). On narrow viewports — and on all mobile browsers — the pages are
  // drawn inline with PDF.js instead, so the certificate stays visible.
  const isSmallViewport = useMediaQuery('(max-width: 639px)');
  const isMobileBrowser =
    typeof navigator !== 'undefined' && /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);
  const useInlineCanvasPdf = isSmallViewport || isMobileBrowser;

  const handlePdfReady = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handlePdfError = useCallback(() => {
    setIsLoading(false);
  }, []);

  const close = useCallback(() => {
    onClose();
  }, [onClose]);

  useFocusTrap(panelRef, true, close);

  // Keyboard shortcut support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        close();
      } else if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        setZoom((z) => Math.min(2, Math.round((z + 0.25) * 100) / 100));
      } else if (e.key === '-' || e.key === '_') {
        e.preventDefault();
        setZoom((z) => Math.max(0.6, Math.round((z - 0.25) * 100) / 100));
      } else if (e.key === '0') {
        e.preventDefault();
        setZoom(1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [close]);

  const handleZoomIn = () => {
    setZoom((z) => Math.min(2, Math.round((z + 0.25) * 100) / 100));
  };

  const handleZoomOut = () => {
    setZoom((z) => Math.max(0.6, Math.round((z - 0.25) * 100) / 100));
  };

  const handleResetZoom = () => {
    setZoom(1);
  };

  const encodedFileUrl = encodeURI(certificate.file);

  return (
    <div
      className={cn(
        'fixed inset-0 flex items-center justify-center overflow-hidden',
        isFullscreen ? 'p-0' : 'p-2 sm:p-4 md:p-6',
      )}
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
        className={cn(
          'relative flex flex-col overflow-hidden bg-white shadow-lift border border-[#DDE8D8]',
          isFullscreen
            ? 'h-full w-full rounded-none'
            : 'h-[94dvh] sm:h-[90dvh] w-full max-w-5xl rounded-[20px] sm:rounded-[24px]',
        )}
        style={{ zIndex: Z.modalContent }}
      >
        {/* Header Toolbar */}
        <div className="flex items-center justify-between gap-2.5 sm:gap-3 border-b border-[#DDE8D8] bg-[#FAFDF7] px-3.5 py-3 sm:px-6 sm:py-3.5">
          {/* Left: Certificate Metadata */}
          <div className="flex min-w-0 flex-1 items-center gap-2.5 sm:gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#C8E6C9] bg-[#E8F5E9] text-[#2E5D3B]">
              <Icon name={certificate.icon || 'Award'} size={18} />
            </span>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline-block rounded-full border border-[#F2E8A5] bg-[#FFF4B8] px-2 py-0.5 font-mono text-[0.625rem] font-bold uppercase tracking-[0.12em] text-[#2E5D3B]">
                  {certificate.organization}
                </span>
                <span className="font-mono text-[0.6875rem] text-[#6c8471] truncate">
                  ID: <span className="font-semibold text-[#2E5D3B]">{certificate.certificateId}</span>
                </span>
              </div>
              <h2
                id="certificate-modal-title"
                className="truncate text-sm font-bold tracking-tight text-[#2E5D3B] sm:text-lg"
                title={certificate.title}
              >
                {certificate.title}
              </h2>
            </div>
          </div>

          {/* Right: Controls & Actions */}
          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            {/* Zoom Controls (hidden on very narrow mobile screens) */}
            <div className="hidden sm:flex items-center gap-1 rounded-control border border-[#DDE8D8] bg-white p-1 shadow-2xs">
              <button
                type="button"
                onClick={handleZoomOut}
                disabled={zoom <= 0.6}
                aria-label="Zoom out"
                title="Zoom out (-)"
                className="flex h-8 w-8 items-center justify-center rounded-full text-[#425846] transition-colors hover:bg-[#E8F5E9] hover:text-[#2E5D3B] disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
              >
                <Icon name="ZoomOut" size={15} />
              </button>

              <button
                type="button"
                onClick={handleResetZoom}
                aria-label="Reset zoom"
                title="Reset to 100% (0)"
                className="px-2 font-mono text-xs font-semibold text-[#2E5D3B] hover:text-[#244b2f] cursor-pointer"
              >
                {Math.round(zoom * 100)}%
              </button>

              <button
                type="button"
                onClick={handleZoomIn}
                disabled={zoom >= 2}
                aria-label="Zoom in"
                title="Zoom in (+)"
                className="flex h-8 w-8 items-center justify-center rounded-full text-[#425846] transition-colors hover:bg-[#E8F5E9] hover:text-[#2E5D3B] disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed"
              >
                <Icon name="ZoomIn" size={15} />
              </button>

              {zoom !== 1 && (
                <button
                  type="button"
                  onClick={handleResetZoom}
                  aria-label="Reset scale"
                  title="Reset scale"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-[#425846] transition-colors hover:bg-[#E8F5E9] hover:text-[#2E5D3B] cursor-pointer"
                >
                  <Icon name="RotateCcw" size={13} />
                </button>
              )}
            </div>

            {/* Fullscreen Toggle (desktop/tablet) */}
            <button
              type="button"
              onClick={() => setIsFullscreen((prev) => !prev)}
              aria-label={isFullscreen ? 'Exit full screen' : 'Full screen viewer'}
              title={isFullscreen ? 'Exit full screen' : 'Full screen'}
              className="hidden sm:flex h-9 w-9 items-center justify-center rounded-control border border-[#DDE8D8] bg-white text-[#2E5D3B] transition-colors hover:bg-[#E8F5E9] cursor-pointer"
            >
              <Icon name={isFullscreen ? 'Minimize2' : 'Maximize2'} size={15} />
            </button>

            {/* Download Certificate */}
            <button
              type="button"
              onClick={() => onDownload(certificate)}
              aria-label="Download Certificate"
              title="Download original PDF"
              className="inline-flex h-9 items-center gap-1.5 rounded-control bg-[#2E5D3B] px-3 text-xs font-semibold text-white shadow-soft transition-colors hover:bg-[#244b2f] cursor-pointer"
            >
              <Icon name="Download" size={14} />
              <span className="hidden md:inline">Download</span>
            </button>

            {/* Close Modal Button */}
            <button
              type="button"
              onClick={close}
              aria-label="Close certificate viewer"
              title="Close (Esc)"
              className="flex h-9 w-9 items-center justify-center rounded-control border border-[#DDE8D8] bg-white text-[#2E5D3B] transition-colors hover:bg-[#E8F5E9] cursor-pointer"
            >
              <Icon name="X" size={16} />
            </button>
          </div>
        </div>

        {/* Viewer Stage */}
        <div className="relative min-h-0 flex-1 overflow-auto overscroll-contain bg-[#1a251a] p-2 sm:p-4 md:p-6 flex">
          {/* Spinner while the certificate renders */}
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#1a251a] text-white">
              <Icon name="LoaderCircle" size={32} className="animate-spin text-[#C8E6C9]" />
              <span className="font-mono text-xs text-[#C8E6C9]">Loading verified certificate PDF...</span>
            </div>
          )}

          {/* Mobile/inline PDF.js renderer (canvas pages) */}
          {useInlineCanvasPdf ? (
            <PdfCanvasViewer
              src={encodedFileUrl}
              preview={certificate.preview}
              title={certificate.title}
              zoom={zoom}
              onReady={handlePdfReady}
              onError={handlePdfError}
            />
          ) : (
            /* Scalable PDF iframe (desktop / laptop) */
            <div
              className="m-auto transition-transform duration-200 ease-out flex items-center justify-center"
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: 'top center',
                width: zoom > 1 ? `${zoom * 100}%` : '100%',
                height: zoom > 1 ? `${zoom * 100}%` : '100%',
                minHeight: '100%',
              }}
            >
              <iframe
                src={`${encodedFileUrl}#view=FitH&toolbar=0&navpanes=0`}
                title={certificate.title}
                onLoad={() => setIsLoading(false)}
                className="h-full w-full min-h-0 rounded-lg border-0 bg-white shadow-2xl"
              />
            </div>
          )}
        </div>

        {/* Bottom Mobile Bar / Info Footer */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#DDE8D8] bg-[#FAFDF7] px-4 py-2.5 text-xs text-[#425846]">
          <div className="flex min-w-0 items-center gap-2">
            <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-[#2E5D3B]" />
            <span className="font-medium text-[#172117] truncate max-w-[160px] sm:max-w-none">{certificate.organization}</span>
            <span aria-hidden="true" className="text-[#DDE8D8]">·</span>
            <span className="hidden sm:inline">{certificate.date}</span>
          </div>

          <div className="flex shrink-0 items-center gap-1 rounded-control border border-[#DDE8D8] bg-white p-0.5 sm:hidden">
            <button
              type="button"
              onClick={handleZoomOut}
              disabled={zoom <= 0.6}
              aria-label="Zoom out"
              className="flex h-8 w-8 items-center justify-center rounded-full text-[#425846] transition-colors hover:bg-[#E8F5E9] disabled:opacity-30"
            >
              <Icon name="ZoomOut" size={15} />
            </button>
            <button
              type="button"
              onClick={handleResetZoom}
              aria-label="Reset zoom"
              className="min-w-10 px-1 font-mono text-xs font-semibold text-[#2E5D3B]"
            >
              {Math.round(zoom * 100)}%
            </button>
            <button
              type="button"
              onClick={handleZoomIn}
              disabled={zoom >= 2}
              aria-label="Zoom in"
              className="flex h-8 w-8 items-center justify-center rounded-full text-[#425846] transition-colors hover:bg-[#E8F5E9] disabled:opacity-30"
            >
              <Icon name="ZoomIn" size={15} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default CertificateModal;
