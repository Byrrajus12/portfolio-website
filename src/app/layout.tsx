import { ReactNode } from 'react';
import '../styles/globals.css';
import Rail from '../components/Rail';
import TimeWarmth from '../components/TimeWarmth';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Bricolage_Grotesque, Spline_Sans_Mono } from 'next/font/google';

export const metadata = {
  title: 'Sai Byrraju',
  description: 'Builder of things. Voice AI, agent infrastructure, backend systems, operational tooling.',
};

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bricolage',
  axes: ['opsz', 'wdth'],
});

const splineMono = Spline_Sans_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-spline-mono',
  weight: ['400', '500'],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${splineMono.variable}`}>
      <body>
        <TimeWarmth />
        <Rail />
        <main className="lg:pl-56">{children}</main>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
