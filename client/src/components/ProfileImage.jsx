import { motion, useReducedMotion } from 'framer-motion';
import { profileImage } from '../data/assets';
import { cn } from '../lib/cn';
import { EASE_OUT_EXPO } from '../lib/motion';

const ASPECTS = {
  '4/5': 'aspect-[4/5]',
  '3/4': 'aspect-[3/4]',
  '1/1': 'aspect-square',
  '5/6': 'aspect-[5/6]',
};

/**
 * The professional portrait.
 *
 * Kept clearly visible, framed with a clean white/soft-border container
 * with a subtle nature-inspired light green and light yellow ambient glow.
 */
export function ProfileImage({
  className,
  frameClassName,
  aspect = '4/5',
  shape = 'rounded',
  objectPosition = 'center',
  floating = false,
  priority = false,
  glow = true,
  labelledBy,
}) {
  const reduce = useReducedMotion();

  const shouldFloat = floating && !reduce;
  const radiusClass = shape === 'circle' ? 'rounded-full' : 'rounded-[22px]';

  return (
    <div className={cn('relative', className)}>
      {/* Subtle light green + light yellow ambient glow */}
      {glow ? (
        <span
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute -inset-4 -z-10 bg-gradient-to-tr from-[#C8E6C9]/50 via-[#FFF4B8]/40 to-[#C8E6C9]/30 blur-2xl',
            radiusClass,
          )}
        />
      ) : null}

      <motion.div
        animate={shouldFloat ? { y: [0, -9, 0] } : undefined}
        transition={
          shouldFloat
            ? { duration: 8, repeat: Infinity, ease: EASE_OUT_EXPO }
            : undefined
        }
        className={cn(
          'relative overflow-hidden border border-[#DDE8D8] bg-white shadow-portrait',
          radiusClass,
          ASPECTS[aspect] ?? ASPECTS['4/5'],
          frameClassName,
        )}
      >
        {profileImage.available ? (
          <img
            src={profileImage.src}
            alt={profileImage.alt}
            aria-labelledby={labelledBy}
            width={880}
            height={1100}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={priority ? 'high' : 'auto'}
            style={{ objectFit: 'cover', objectPosition }}
            className="h-full w-full object-cover"
          />
        ) : (
          <MonogramPlate />
        )}

        {/* Inner edge highlight */}
        <span
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute inset-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]',
            radiusClass,
          )}
        />

        {/* Soft light green edge ring */}
        <span
          aria-hidden="true"
          className={cn(
            'pointer-events-none absolute inset-0 ring-1 ring-inset ring-[#C8E6C9]/50',
            radiusClass,
          )}
        />
      </motion.div>
    </div>
  );
}

/** Stand-in when no image file is present */
function MonogramPlate() {
  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[#E8F5E9]"
      role="img"
      aria-label="Portrait placeholder."
    >
      <span className="font-display text-5xl font-semibold tracking-[-0.04em] text-[#2E5D3B]">
        HV
      </span>
      <span aria-hidden="true" className="h-1 w-10 rounded-full bg-[#2E5D3B]" />
      <span className="font-mono text-[0.625rem] uppercase tracking-[0.22em] text-[#425846]">
        Portrait
      </span>
    </div>
  );
}

export default ProfileImage;
