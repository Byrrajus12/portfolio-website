import Link from 'next/link';
import Image from 'next/image'
import profilePic from './img.png'

export default function Navbar() {
  return (
  <nav className="bg-black text-white p-4">
      <div style={{ width: '100%', height: '100%', paddingLeft: 45, paddingRight: 20, paddingTop: 20, paddingBottom: 20, justifyContent: 'space-between', alignItems: 'center', display: 'inline-flex' }}>
        <div className="typewriter">
          <Link href="/" className="typewriter">Sai Byrraju</Link>       
        </div>
        <div style={{ justifyContent: 'flex-start', alignItems: 'center', gap: 25, display: 'flex' }}>
            <Link href="/work" className="header">Work</Link>
            <Link href="/projects" className="header">Projects</Link>
              <Link href="/resume" className="header">Resume</Link>
              <Image src= {profilePic} width={56} height={28} alt="Picture of the author"/>
        </div>
      </div>
    </nav>
    );
}