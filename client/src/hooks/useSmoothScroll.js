import { useMediaQuery } from './useMediaQuery';

/**
 * Smooth in-page scrolling that accounts for the sticky navbar height and
 * respects the user's motion preference.
 */
export function useSmoothScroll() {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  return (targetId) => {
    const element = document.getElementById(targetId);
    if (!element) return;

    element.scrollIntoView({
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
      block: 'start',
    });

    // Move keyboard focus with the viewport so the next Tab continues from the
    // section the reader just jumped to.
    const hadTabIndex = element.hasAttribute('tabindex');
    if (!hadTabIndex) element.setAttribute('tabindex', '-1');
    element.focus({ preventScroll: true });
    if (!hadTabIndex) {
      element.addEventListener('blur', () => element.removeAttribute('tabindex'), { once: true });
    }
  };
}

export default useSmoothScroll;
