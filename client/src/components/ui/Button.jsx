import { buttonClasses } from '../../lib/buttonStyles';

export function Button({ as, variant = 'primary', size = 'md', className, children, ...props }) {
  const Component = as ?? 'button';

  return (
    <Component className={buttonClasses({ variant, size, className })} {...props}>
      {children}
    </Component>
  );
}

export default Button;
