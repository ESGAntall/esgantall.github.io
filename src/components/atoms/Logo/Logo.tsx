import { cn } from '@/lib/utils';
import styles from './Logo.module.scss';
import type { LogoProps } from './Logo.types';

export default function Logo({ size = 32, showWordmark = true, className }: LogoProps) {
  return (
    <div className={cn(styles.logo, className)}>
      {/* ESG geometric monogram — simplified SVG */}
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-label="ESGAntall logo">
        <defs>
          <linearGradient id="logo-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#18E0F7" />
            <stop offset="50%" stopColor="#2E7CFF" />
            <stop offset="100%" stopColor="#6B3DFF" />
          </linearGradient>
        </defs>
        <path
          d="M16 2L28 9V23L16 30L4 23V9L16 2Z"
          fill="none"
          stroke="url(#logo-grad)"
          strokeWidth="1.5"
        />
        <text
          x="16" y="20"
          textAnchor="middle"
          fill="url(#logo-grad)"
          fontSize="11"
          fontFamily="Space Grotesk, sans-serif"
          fontWeight="700"
          letterSpacing="-0.5"
        >
          ESG
        </text>
      </svg>

      {showWordmark && (
        <span className={styles.wordmark} style={{ fontSize: size * 0.55 }}>
          <span className={styles.brand}>ESG</span>Antall
        </span>
      )}
    </div>
  );
}
