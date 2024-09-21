import Link from 'next/link';
import Image from 'next/image'
import React from 'react';
import profilePic from '@/public/img.png'

export default function Navbar() {
  return (
  <nav className="bg-black text-white p-4">
      <div style={{ width: '100%', height: '100%', paddingLeft: 45, paddingRight: 20, paddingTop: 20, paddingBottom: 20, justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex' }}>
        <div className="typewriter">
          <Link href="/" className="typewriter" style={{fontFamily: 'Montserrat'}}>Sai Byrraju</Link>       
        </div>
        <div style={{ justifyContent: 'flex-start', alignItems: 'center', gap: 25, display: 'flex' }}>
            <Link href="/work" style={{ color: 'white', fontFamily: 'montserrat', fontSize: '20px', fontWeight: 300, wordWrap: 'break-word' }}>Work</Link>
              <Link href="/projects" style={{ color: 'white', fontFamily: 'montserrat', fontSize: '20px', fontWeight: 300, wordWrap: 'break-word' }}>Projects</Link>
              <Link href="/resume" style={{ color: 'white', fontFamily: 'montserrat', fontSize: '20px', fontWeight: 300, wordWrap: 'break-word' }}>Resume</Link>
              <Image src= {profilePic} width={56} height={28} alt="Picture of the author"/>
        </div>
      </div>
    </nav>
    );
}