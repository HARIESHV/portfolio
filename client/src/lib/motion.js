/**
 * Shared motion primitives.
 *
 * One easing curve and one reveal pattern for the whole page, so motion reads
 * as a single system rather than a collection of one-off transitions.
 * Every consumer passes `reduce` (from useReducedMotion) so nothing animates
 * for users who have asked the OS to stop motion.
 */

export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];

/** Staggered entrance for a list of items. */
export const staggerContainer = (reduce) => ({
  hidden: {},
  visible: {
    transition: reduce
      ? { staggerChildren: 0 }
      : { staggerChildren: 0.07, delayChildren: 0.05 },
  },
});

export const riseIn = (reduce, distance = 20) => ({
  hidden: { opacity: 0, y: reduce ? 0 : distance },
  visible: {
    opacity: 1,
    y: 0,
    transition: reduce
      ? { duration: 0 }
      : { duration: 0.65, ease: EASE_OUT_EXPO },
  },
});

export const fadeIn = (reduce) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: reduce ? { duration: 0 } : { duration: 0.7, ease: EASE_OUT_EXPO },
  },
});

/** Line-by-line reveal used by the hero headline. */
export const lineReveal = (reduce) => ({
  hidden: { opacity: 0, y: reduce ? 0 : '110%' },
  visible: (index = 0) => ({
    opacity: 1,
    y: 0,
    transition: reduce
      ? { duration: 0 }
      : { duration: 0.8, ease: EASE_OUT_EXPO, delay: 0.12 + index * 0.09 },
  }),
});

/**
 * Scroll-reveal viewport contract.
 *
 * `amount: 'some'` (any pixel visible) instead of a ratio: a ratio such as 0.25
 * can never be satisfied by an element taller than the viewport — which is
 * exactly the case for Services and Projects on mobile and for Projects on
 * laptop/desktop heights — leaving those sections stuck at `opacity: 0`
 * forever. The reveal still only fires once the element actually enters the
 * viewport, so the animation reads the same; it simply cannot strand content.
 */
export const VIEWPORT = { once: true, amount: 'some' };
