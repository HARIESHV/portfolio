import { motion, useReducedMotion } from 'framer-motion';
import { EASE_OUT_EXPO, VIEWPORT } from '../../lib/motion';
import { cn } from '../../lib/cn';

/**
 * Section shell: consistent vertical rhythm, semantic landmark, and a scroll
 * reveal that collapses to static under `prefers-reduced-motion`.
 */
export function Section({
  id,
  as: Component = 'section',
  children,
  className,
  containerClassName,
  labelledBy,
  surface = 'paper',
  reveal = false,
}) {
  const reduce = useReducedMotion();
  const MotionComponent = motion[Component] ?? motion.section;

  const surfaces = {
    paper: 'bg-[#FAFDF7]',
    cream: 'bg-[#FAF7F0]',
    sunken: 'bg-white',
    white: 'bg-white',
    softGreen: 'bg-[#E8F5E9]',
    softYellow: 'bg-[#FFF9D6]',
    gradientSoft: 'bg-gradient-brand-soft',
    gradientBrand: 'bg-gradient-brand',
  };

  const body = (
    <div className={cn('container-page', containerClassName)}>{children}</div>
  );

  if (!reveal) {
    return (
      <Component
        id={id}
        aria-labelledby={labelledBy}
        className={cn('py-20 sm:py-24 lg:py-28', surfaces[surface] ?? surfaces.paper, className)}
      >
        {body}
      </Component>
    );
  }

  return (
    <MotionComponent
      id={id}
      aria-labelledby={labelledBy}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={reduce ? { duration: 0 } : { duration: 0.7, ease: EASE_OUT_EXPO }}
      className={cn('py-20 sm:py-24 lg:py-28', surfaces[surface] ?? surfaces.paper, className)}
    >
      {body}
    </MotionComponent>
  );
}

export default Section;
