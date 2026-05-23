import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import styles from './Input.module.scss';
import type { InputProps } from './Input.types';

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, hint, inputSize = 'md', leftIcon, rightIcon, className, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className={styles.wrapper}>
        {label && <label className={styles.label} htmlFor={inputId}>{label}</label>}
        <div className={styles.inputWrapper}>
          {leftIcon && <span className={`${styles.icon} ${styles.left}`}>{leftIcon}</span>}
          <input
            ref={ref}
            id={inputId}
            className={cn(styles.input, className)}
            data-size={inputSize}
            data-has-left={!!leftIcon}
            data-has-right={!!rightIcon}
            data-error={!!error}
            {...props}
          />
          {rightIcon && <span className={`${styles.icon} ${styles.right}`}>{rightIcon}</span>}
        </div>
        {error && <span className={styles.error}>{error}</span>}
        {hint && !error && <span className={styles.hint}>{hint}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
