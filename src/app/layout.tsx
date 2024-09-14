import { ReactNode } from 'react';
import Head from 'next/head';
import '../styles/globals.css';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'Sai Byrraju',
  description: 'My personal portfolio',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Vast+Shadow&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cutive+Mono&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Navbar />
        <main>{children}</main>
        <footer className="bg-black text-white text-center py-4">
          <p>&copy; {new Date().getFullYear()} My Portfolio</p>
        </footer>
      </body>
    </html>
  );
}
