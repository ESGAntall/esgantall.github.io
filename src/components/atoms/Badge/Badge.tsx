import { cn } from '@/lib/utils';
import styles from './Badge.module.scss';
import type { BadgeProps } from './Badge.types';

export default function Badge({ variant = 'cyan', children, className }: BadgeProps) {
  return (
    <span className={cn(styles.badge, className)} data-variant={variant}>
      {children}
    </span>
  );
}
