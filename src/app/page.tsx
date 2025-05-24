'use client';

import '../styles/globals.css';
import { FloatingDock } from '@/components/floatingDock';
import { IconBrandLinkedin, IconBrandGithub } from '@tabler/icons-react';
import { useState } from 'react';
import Intro from '@/components/Intro';

const dockItems = [
  { title: 'LinkedIn', icon: <IconBrandLinkedin />, href: 'https://www.linkedin.com/in/saibyrraju/' },
  { title: 'GitHub', icon: <IconBrandGithub />, href: 'https://github.com/Byrrajus12' }
];

export default function HomePage() {
  const [, setIntroComplete] = useState(false); 

  return (
    <>
      <Intro onComplete={() => setIntroComplete(true)} />
      <main className="fixed inset-0">
        <div className="text-container">
          <span className='poppins' style={{ color: 'white', fontSize: '40px', fontWeight: 300 }}>
            My name is
          </span>
          <span className='poppins' style={{ color: 'white', fontSize: '40px', fontWeight: 400 }}>
            {' '}Sai<br />
          </span>
          <span className='vastshadow' style={{ color: 'white', fontSize: '40px', fontWeight: 400 }}>
            a computer science grad
          </span>
          <span className='poppins' style={{ color: 'white', fontSize: '40px', fontWeight: 300 }}>
            {' '}
          </span>
          <span className='poppins' style={{ color: 'white', fontSize: '30px', fontWeight: 300 }}>
            from
          </span>
          <span className='poppins' style={{ color: 'white', fontSize: '40px', fontWeight: 300 }}>
            {' '}
          </span>
          <span className='cutivemono' style={{ color: 'white', fontSize: '40px', fontWeight: 400 }}>
            {'<Michigan State University/>'}
          </span>
          <footer className="bg-black text-white text-center min-h-7">
            <div className="absolute inset-x-0 bottom-0">
              <FloatingDock items={dockItems} />
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}