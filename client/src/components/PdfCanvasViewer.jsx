import { useEffect, useRef, useState } from 'react';

import { cn } from '../lib/cn';

import workerAssetUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

/**
 * Inline PDF page renderer (PDF.js → <canvas>).
 *
 * Android Chrome cannot display a PDF inside an <iframe>: instead of the
 * document it shows a dark screen with the file name and an "Open" button.
 * Rendering every page of the certificate with PDF.js keeps the actual
 * document visible inside the modal on those browsers.
 *
 * Pages are drawn at the available frame width × `zoom` (pixel-perfect on the
 * device's pixel ratio) and re-rendered whenever the width or zoom changes.
 */
export function PdfCanvasViewer({ src, preview, title, zoom = 1, onReady, onError }) {
  const frameRef = useRef(null);
  const readyRef = useRef(false);
  const [frameWidth, setFrameWidth] = useState(0);
  const [renderError, setRenderError] = useState(false);

  // Track the available width so pages always fit the stage.
  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return undefined;

    const update = () => setFrameWidth(frame.clientWidth);
    update();

    const observer = new ResizeObserver(update);
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (frameWidth <= 0) return undefined;

    let cancelled = false;
    let documentPromise = null;
    const activeRenderTasks = [];

    const render = async () => {
      try {
        const pdfjs = await import('pdfjs-dist');
        pdfjs.GlobalWorkerOptions.workerSrc ||= workerAssetUrl;

        const loadingTask = pdfjs.getDocument({ url: src });
        documentPromise = loadingTask.promise;
        const pdfDocument = await documentPromise;

        if (cancelled) return;

        const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);
        const frame = frameRef.current;
        frame.replaceChildren();

        for (let pageNumber = 1; pageNumber <= pdfDocument.numPages; pageNumber += 1) {
          if (cancelled) return;

          const page = await pdfDocument.getPage(pageNumber);
          const baseViewport = page.getViewport({ scale: 1 });

          const cssWidth = Math.max(1, Math.floor(frameWidth * zoom));
          const cssHeight = Math.max(
            1,
            Math.floor(cssWidth * (baseViewport.height / baseViewport.width)),
          );
          const renderScale = (cssWidth / baseViewport.width) * devicePixelRatio;

          const canvas = document.createElement('canvas');
          canvas.width = Math.max(1, Math.round(baseViewport.width * renderScale));
          canvas.height = Math.max(1, Math.round(baseViewport.height * renderScale));
          canvas.style.width = `${cssWidth}px`;
          canvas.style.height = `${cssHeight}px`;
          // The global reset caps `canvas` at max-width:100%; re-enable the
          // explicit zoom width so zoomed-in pages really grow (and scroll).
          canvas.className = 'max-w-none';
          canvas.dataset.pdfPage = String(pageNumber);

          const renderTask = page.render({
            canvasContext: canvas.getContext('2d', { alpha: false }),
            viewport: page.getViewport({ scale: renderScale }),
          });
          activeRenderTasks.push(renderTask);

          await renderTask.promise;
          if (cancelled) return;

          frame.appendChild(canvas);

          if (!readyRef.current) {
            readyRef.current = true;
            onReady?.();
          }
        }
      } catch (error) {
        if (cancelled) return;
        console.error('PDF.js certificate render failed:', error);
        setRenderError(true);
        onError?.(error);
      }
    };

    render();

    return () => {
      cancelled = true;
      for (const task of activeRenderTasks) {
        task.cancel();
      }
      const docToDestroy = documentPromise;
      if (docToDestroy) {
        docToDestroy.then((doc) => doc.destroy()).catch(() => {});
      }
    };
  }, [frameWidth, src, zoom, onReady, onError]);

  return (
    <div ref={frameRef} className="m-auto flex w-full flex-col items-center gap-2">
      {renderError && preview ? (
        <a
          href={src}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open ${title}`}
          className="block w-full cursor-pointer rounded-lg border-0 bg-white shadow-2xl"
        >
          <img
            src={preview}
            alt={`Preview of ${title}`}
            className="block h-auto w-full rounded-lg"
          />
        </a>
      ) : null}
      {renderError && !preview ? (
        <p
          className={cn(
            'flex min-h-24 w-full items-center justify-center rounded-lg bg-white/10',
            'px-4 text-center font-mono text-xs text-[#C8E6C9]',
          )}
        >
          Unable to preview this certificate on this device.
        </p>
      ) : null}
    </div>
  );
}

export default PdfCanvasViewer;