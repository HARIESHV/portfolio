import { motion, useReducedMotion } from 'framer-motion';
import { EASE_OUT_EXPO, riseIn, staggerContainer } from '../../lib/motion';
import { cn } from '../../lib/cn';

/**
 * Scroll-reveal wrapper. Single source of the page's reveal behaviour so no
 * component invents its own easing or duration.
 */
export function Reveal({ children, delay = 0, y = 20, className, as = 'div' }) {
  const reduce = useReducedMotion();
  const MotionComponent = motion[as] ?? motion.div;

  return (
    <MotionComponent
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={reduce ? { duration: 0 } : { duration: 0.65, delay, ease: EASE_OUT_EXPO }}
      className={className}
    >
      {children}
    </MotionComponent>
  );
}

/** Parent that staggers its `RevealItem` children on scroll. */
export function RevealGroup({ children, className }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      variants={staggerContainer(reduce)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className, as = 'div' }) {
  const reduce = useReducedMotion();
  const MotionComponent = motion[as] ?? motion.div;

  return (
    <MotionComponent variants={riseIn(reduce)} className={className}>
      {children}
    </MotionComponent>
  );
}

export default Reveal;
