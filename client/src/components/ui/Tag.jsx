import { cn } from '../../lib/cn';

/**
 * Technology / metadata pill.
 * Rounded-control shape, consistent with every other interactive element.
 */
export function Tag({ children, tone = 'neutral', className }) {
  const tones = {
    neutral: 'border-[#DDE8D8] bg-white text-[#172117]',
    yellow: 'border-[#F2E8A5] bg-[#FFF4B8] text-[#2E5D3B] font-semibold',
    green: 'border-[#C8E6C9] bg-[#E8F5E9] text-[#2E5D3B] font-medium',
    signal: 'border-[#C8E6C9] bg-[#E8F5E9] text-[#2E5D3B]',
    deepGreen: 'border-[#2E5D3B] bg-[#2E5D3B] text-white',
    outline: 'border-[#DDE8D8] bg-transparent text-[#2E5D3B]',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-control border px-3 py-1',
        'font-mono text-[0.6875rem] leading-5 tracking-tight',
        tones[tone] ?? tones.neutral,
        className,
      )}
    >
      {children}
    </span>
  );
}

export default Tag;
