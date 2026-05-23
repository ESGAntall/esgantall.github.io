import { cn } from '@/lib/utils';
import styles from './Card.module.scss';
import type { CardProps } from './Card.types';

export default function Card({ children, className, glow, onClick }: CardProps) {
  return (
    <div
      className={cn(styles.card, className)}
      data-glow={glow}
      data-clickable={!!onClick}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
