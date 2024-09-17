import { ReactNode } from 'react';
import Head from 'next/head';
import '../styles/globals.css';
import Navbar from '../components/Navbar';
import { Cutive_Mono, Poppins, Vast_Shadow } from 'next/font/google';
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
      <body className="bg-black flex flex-col min-h-screen">
        <Navbar />
        <main className={`${poppins.variable} ${vast_shadow.variable} ${cutive_mono.variable} ` } >{children}</main>
        <footer className="bg-black text-white text-center ">
          <p>&copy; {new Date().getFullYear()} My Portfolio</p>
        </footer>
      </body>
    </html>
  );
}
