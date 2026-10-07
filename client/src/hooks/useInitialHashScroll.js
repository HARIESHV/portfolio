import { useEffect } from 'react';

/**
 * Honours the URL hash on first load.
 *
 * The browser tries to scroll to `#section` while the document is still empty —
 * React renders afterwards, so the target does not exist yet and a shared or
 * bookmarked link such as `/#certifications` opens at the top of the page with
 * the section still un-revealed. This re-applies the jump once the tree is
 * mounted, and again after `load` when late-arriving images and fonts have
 * finished shifting the layout.
 *
 * Scrolling is forced instant: a smooth scroll on page load reads as a bug,
 * and `scroll-padding-top` on the root still clears the sticky navbar.
 */
export function useInitialHashScroll() {
  useEffect(() => {
    const rawHash = window.location.hash.slice(1);
    if (!rawHash) return undefined;

    const targetId = decodeURIComponent(rawHash);

    const jump = () => {
      const target = document.getElementById(targetId);
      if (!target) return;

      const root = document.documentElement;
      const previousBehaviour = root.style.scrollBehavior;
      root.style.scrollBehavior = 'auto';
      target.scrollIntoView({ block: 'start' });
      root.style.scrollBehavior = previousBehaviour;
    };

    // Double rAF: the first frame commits the React commit, the second lays it out.
    const frame = requestAnimationFrame(() => requestAnimationFrame(jump));
    window.addEventListener('load', jump, { once: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('load', jump);
    };
  }, []);
}

export default useInitialHashScroll;
