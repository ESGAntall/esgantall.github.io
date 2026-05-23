export type BadgeVariant = 'cyan' | 'blue' | 'purple' | 'neutral';
export interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}
