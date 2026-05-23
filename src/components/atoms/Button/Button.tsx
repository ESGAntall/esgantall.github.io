import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import styles from './Button.module.scss';
import type { ButtonProps } from './Button.types';

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, fullWidth, className, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(styles.button, className)}
        data-variant={variant}
        data-size={size}
        data-full-width={fullWidth}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <span className={styles.spinner} aria-hidden="true" />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export default Button;
