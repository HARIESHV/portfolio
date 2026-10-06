import { cn } from './cn';

/**
 * Control styling, kept out of the component modules.
 *
 * `Button` and `ActionLink` produce byte-identical class lists whether
 * they render a real `<a href>` or a disabled `<button>`.
 */

/**
 * Shape consistency lock: interactive controls are always fully pill-shaped.
 * Cards/surfaces use 16–24px (1.25rem = 20px).
 */
const BASE =
  'inline-flex items-center justify-center gap-2 rounded-control font-medium ' +
  'transition-[background-color,background-image,color,border-color,box-shadow,filter,transform] duration-200 ' +
  'ease-[cubic-bezier(0.16,1,0.3,1)] active:translate-y-px ' +
  'disabled:pointer-events-none disabled:opacity-45 whitespace-nowrap cursor-pointer';

const VARIANTS = {
  /** Primary CTA button: deep green background with white text. */
  primary: 'bg-[#2E5D3B] text-white shadow-soft hover:bg-[#244b2f] hover:shadow-lift',
  /** Secondary CTA: light yellow background with dark green text. */
  secondary: 'bg-[#FFF4B8] text-[#2E5D3B] border border-[#F2E8A5] shadow-soft hover:bg-[#FEEAA0]',
  /** Light green action button. */
  greenLight: 'bg-[#C8E6C9] text-[#2E5D3B] border border-[#b5dab6] shadow-soft hover:bg-[#bce4bd]',
  /** Outlined, for secondary actions. */
  outline: 'border border-[#DDE8D8] bg-white text-[#2E5D3B] hover:border-[#2E5D3B] hover:bg-[#E8F5E9] shadow-soft',
  /** Deep green fill. */
  ink: 'bg-[#2E5D3B] text-white hover:bg-[#244b2f] shadow-soft',
  /** Tinted with soft green. */
  signal: 'border border-[#C8E6C9] bg-[#E8F5E9] text-[#2E5D3B] hover:border-[#2E5D3B] hover:bg-[#C8E6C9]',
  ghost: 'text-[#2E5D3B] hover:bg-[#E8F5E9]',
};

const SIZES = {
  sm: 'h-9 px-4 text-[0.8125rem]',
  md: 'h-11 px-6 text-sm',
  lg: 'h-12 px-7 text-[0.9375rem]',
};

/**
 * Class-name builder, shared with `ActionLink` so anchors and buttons carry
 * identical styling whether or not a real destination exists.
 */
export function buttonClasses({ variant = 'primary', size = 'md', className } = {}) {
  return cn(BASE, VARIANTS[variant] ?? VARIANTS.primary, SIZES[size], className);
}

export default buttonClasses;
