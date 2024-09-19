import { ReactNode } from 'react';
import Head from 'next/head';
import '../styles/globals.css';
import Navbar from '../components/Navbar';
import { Cutive_Mono, Poppins, Vast_Shadow } from 'next/font/google';
import Particles from '@/components/particles'; // Import the Particles component
import { IconBrandLinkedin, IconBrandGithub } from '@tabler/icons-react';

export const metadata = {
  title: 'Sai Byrraju',
  description: 'My personal portfolio',
};

const poppins = Poppins({
      subsets: ['latin'],
      display: 'swap',
      variable: '--font-poppins',
      weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
    });

const vast_shadow = Vast_Shadow({
      subsets: ['latin'],
      display: 'swap',
      variable: '--font-vs',
      weight: ['400']
    });

const cutive_mono = Cutive_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cm',
  weight: ['400']
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
      </Head>
      <body className="bg-black flex flex-col min-h-screen relative">
        <Particles className="absolute inset-0 -z-10" quantity={70} staticity={60} ease={40} />
        <Navbar />
        <main className={`${poppins.variable} ${vast_shadow.variable} ${cutive_mono.variable} ` } >{children}</main>
      </body>
    </html>
  );
}
