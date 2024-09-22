// import Link from 'next/link';
// import Image from 'next/image'
// import React from 'react';
// import profilePic from '@/public/img.png'

// export default function Navbar() {
//   return (
//   <nav className="bg-black text-white p-4 ">
//       <div style={{ width: '100%', height: '100%', paddingLeft: 45, paddingRight: 20, paddingTop: 20, paddingBottom: 20, justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex' }}>
//         <div className="typewriter">
//           <Link href="/">Sai Byrraju</Link>       
//         </div>
//         <div style={{ justifyContent: 'flex-start', alignItems: 'center', gap: 25, display: 'flex' }}>
//             <Link href="/work" className='montserrat' style={{ color: 'white', fontSize: '20px', fontWeight: 300, wordWrap: 'break-word' }}>Work</Link>
//               <Link href="/projects" className='montserrat' style={{ color: 'white', fontSize: '20px', fontWeight: 300, wordWrap: 'break-word' }}>Projects</Link>
//               <Link href="/resume" className='montserrat' style={{ color: 'white', fontSize: '20px', fontWeight: 300, wordWrap: 'break-word' }}>Resume</Link>
//               <Image src= {profilePic} width={56} height={28} alt="SB logo"/>
//         </div>
//       </div>
//     </nav>
//     );
// }

"use client";
import Link from 'next/link';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import profilePic from '../../public/img.png';
// import tableDataPDF from '/resume.pdf';

export default function Navbar() {
  const ref = useRef<HTMLElement>(null);
  const [isIntersecting, setIntersecting] = useState(true);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting)
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <header ref={ref}>
      <nav
        className={`fixed inset-x-0 top-0 z-50 backdrop-blur duration-200 border-b p-4 ${
          isIntersecting
            ? "bg-black/0 border-transparent"
            : "bg-black/80 border-zinc-800"
        }`}
      >
        <div style={{
          width: '100%',
          height: '60%',
          paddingLeft: 45,
          paddingRight: 20,
          paddingTop: 20,
          paddingBottom: 5,
          justifyContent: 'space-between',
          alignItems: 'center',
          display: 'inline-flex'
        }}>
          <div className="typewriter">
            <Link href="/" className="text-zinc-300 hover:text-zinc-100">Sai Byrraju</Link>
          </div>
          <div style={{
            justifyContent: 'flex-start',
            alignItems: 'center',
            gap: 25,
            display: 'flex'
          }}>
            <Link href="/work" className="montserrat text-zinc-400 hover:text-zinc-100" style={{ fontSize: '20px', fontWeight: 300 }}>Work</Link>
            <Link href="/projects" className="montserrat text-zinc-400 hover:text-zinc-100" style={{ fontSize: '20px', fontWeight: 300 }}>Projects</Link>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="montserrat text-zinc-400 hover:text-zinc-100" style={{ fontSize: '20px', fontWeight: 300 }}> Resume </a>
            <Image src={profilePic} width={56} height={28} alt="SB logo" />
          </div>
        </div>
      </nav>
    </header>
  );
}
