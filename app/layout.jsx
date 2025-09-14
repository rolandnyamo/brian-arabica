import './globals.css';
import { Fraunces, Inter } from 'next/font/google';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap'
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

export const metadata = {
  title: "Brian's Arabica — Straight from Uganda",
  description: 'Ugandan coffee, delivered fresh to Dubai. Direct lots, quote-based.',
  openGraph: {
    title: "Brian's Arabica — Straight from Uganda",
    description: 'Ugandan coffee, delivered fresh to Dubai. Direct lots, quote-based.',
    images: ['/og-image.svg']
  },
  icons: {
    icon: '/favicon.svg'
  },
  metadataBase: new URL('https://example.com') // replace on deploy
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="font-sans text-espresso">
        {children}
      </body>
    </html>
  );
}
