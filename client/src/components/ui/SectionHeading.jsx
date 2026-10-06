import { motion, useReducedMotion } from 'framer-motion';
import { EASE_OUT_EXPO, VIEWPORT } from '../../lib/motion';
import { cn } from '../../lib/cn';

/**
 * Section header.
 *
 * Structure is consistent: deep green accent mark, light green/yellow eyebrow,
 * deep green headline, and readable muted sage supporting lede.
 */
export function SectionHeading({
  id,
  eyebrow,
  heading,
  lede,
  align = 'left',
  className,
  children,
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={reduce ? { duration: 0 } : { duration: 0.6, ease: EASE_OUT_EXPO }}
      className={cn(
        'flex flex-col',
        align === 'center' ? 'items-center text-center' : 'items-start',
        className,
      )}
    >
      {/* Deep green accent bar */}
      <span
        aria-hidden="true"
        className={cn(
          'mb-5 block h-1 w-12 rounded-full bg-[#2E5D3B]',
          align === 'center' && 'mx-auto',
        )}
      />

      {eyebrow ? (
        <p className="mb-4 inline-flex items-center gap-2 rounded-control border border-[#C8E6C9] bg-[#E8F5E9] px-3.5 py-1 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-[#2E5D3B]">
          {eyebrow}
        </p>
      ) : null}

      <h2
        id={id}
        className="text-[clamp(2rem,1.35rem+2.4vw,3.25rem)] font-semibold tracking-[-0.035em] text-[#2E5D3B]"
      >
        {heading}
      </h2>

      {lede ? (
        <p className="mt-4 max-w-[58ch] text-base leading-relaxed text-[#425846] sm:text-[1.0625rem]">
          {lede}
        </p>
      ) : null}

      {children}
    </motion.div>
  );
}

export default SectionHeading;
