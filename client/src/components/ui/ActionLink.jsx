import { buttonClasses } from '../../lib/buttonStyles';
import { Icon } from './Icon';
import { cn } from '../../lib/cn';

/**
 * A link that only exists when its destination is real.
 *
 * Every outward-facing control in the portfolio (GitHub, LinkedIn, project
 * repositories, live demos, certificate PDFs, the resume) goes through here.
 * When the URL is blank the control renders as a disabled button with a
 * "Not available yet" affordance instead of pointing at a fabricated address.
 * This is what keeps the site honest while it is still being filled in.
 */
export function ActionLink({
  href,
  label,
  icon,
  trailingIcon,
  variant = 'outline',
  size = 'md',
  available = true,
  external = true,
  unavailableLabel = 'Not available yet',
  className,
  children,
  ...props
}) {
  const isAvailable = Boolean(href) && available;

  if (!isAvailable) {
    return (
      <button
        type="button"
        disabled
        aria-disabled="true"
        title={unavailableLabel}
        className={buttonClasses({
          variant: 'ghost',
          size,
          className: cn('border border-dashed border-line-strong text-ink-faint', className),
        })}
      >
        {icon ? <Icon name={icon} size={16} /> : null}
        {label}
        <span className="sr-only">. {unavailableLabel}.</span>
      </button>
    );
  }

  return (
    <a
      href={href}
      className={buttonClasses({ variant, size, className })}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...props}
    >
      {icon ? <Icon name={icon} size={16} /> : null}
      {children ?? label}
      {trailingIcon ? <Icon name={trailingIcon} size={15} /> : null}
    </a>
  );
}

export default ActionLink;
