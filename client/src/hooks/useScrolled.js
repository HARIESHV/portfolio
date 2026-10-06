import { useMotionValueEvent, useScroll } from 'framer-motion';
import { useRef, useState } from 'react';

/**
 * True once the page has scrolled past `threshold` pixels.
 *
 * Uses Motion's scroll value rather than a `scroll` event listener, and only
 * calls setState when the boolean actually flips, so scrolling causes no
 * re-renders beyond the single transition.
 */
export function useScrolled(threshold = 8) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const lastValue = useRef(false);

  useMotionValueEvent(scrollY, 'change', (value) => {
    const next = value > threshold;
    if (next !== lastValue.current) {
      lastValue.current = next;
      setScrolled(next);
    }
  });

  return scrolled;
}

export default useScrolled;
