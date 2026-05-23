import Link from 'next/link';
import Logo from '@/components/atoms/Logo';
import styles from './NavBar.module.scss';
import type { NavBarProps } from './NavBar.types';

const DEFAULT_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Chat', href: '/chat' },
];

export default function NavBar({ items = DEFAULT_ITEMS }: NavBarProps) {
  return (
    <nav className={styles.nav}>
      <Link href="/" aria-label="ESGAntall home">
        <Logo size={28} showWordmark />
      </Link>
      <ul className={styles.links}>
        {items.map(item => (
          <li key={item.href}>
            <Link href={item.href} className={styles.link}>{item.label}</Link>
          </li>
        ))}
      </ul>
      <button className={styles.cta}>Let&apos;s Connect</button>
    </nav>
  );
}
