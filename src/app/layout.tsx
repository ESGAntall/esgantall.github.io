import type { Metadata } from 'next';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import '@/styles/globals.scss';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-primary',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-secondary',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ESGAntall — Developer Portfolio',
  description: 'Building digital experiences with code and purpose.',
  icons: { icon: '/favicon.svg' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="vi"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
