import Link from 'next/link';
import Button from '@/components/atoms/Button';
import styles from './Hero.module.scss';
import type { HeroProps } from './Hero.types';

export default function Hero({
  title = 'Building digital experiences with',
  subtitle = 'Developer focused on clean design, solid architecture, and impactful solutions.',
}: HeroProps) {
  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <p className={styles.eyebrow}>ESGAntall · Developer Portfolio</p>
        <h1 className={styles.title}>
          {title} <span className={styles.accent}>code</span> and{' '}
          <span className={styles.accent}>purpose</span> _
        </h1>
        <p className={styles.subtitle}>{subtitle}</p>
        <div className={styles.actions}>
          <Link href="#projects">
            <Button variant="primary" size="lg">View Projects</Button>
          </Link>
          <Link href="/chat">
            <Button variant="ghost" size="lg">Chat with AI</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
