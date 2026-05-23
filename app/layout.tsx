import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono, Space_Grotesk, Poppins, Orbitron, Caveat } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
});

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'knives.lol — your link in bio, but sharper',
  description: 'Customizable link-in-bio profiles with neon style, audio, widgets, and effects.',
  metadataBase: new URL('https://knives.lol'),
  openGraph: {
    title: 'knives.lol',
    description: 'your link in bio, but sharper',
    url: 'https://knives.lol',
    siteName: 'knives.lol',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'knives.lol',
    description: 'your link in bio, but sharper',
  },
  icons: {
    icon: [
      {
        url:
          'data:image/svg+xml,' +
          encodeURIComponent(
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="6" fill="%230a0a0f"/><path d="M8 22 L20 10 L24 14 L12 26 Z" fill="%2300ff66"/></svg>',
          ),
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: '#0a0a0f',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} ${poppins.variable} ${orbitron.variable} ${caveat.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
