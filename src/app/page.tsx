import '../styles/globals.css';
import { FloatingDock } from '@/components/floatingDock';
import { IconBrandLinkedin, IconBrandGithub } from '@tabler/icons-react';

const dockItems = [
  { title: 'LinkedIn', icon: <IconBrandLinkedin />, href: 'https://www.linkedin.com/in/saibyrraju/' },
  { title: 'GitHub', icon: <IconBrandGithub />, href: 'https://github.com/Byrrajus12' }
];

export default function HomePage() {
  return (
    <div className="text-container">
        <span className='poppins' style={{ color: 'white', fontSize: '40px', fontWeight: 700, wordWrap: 'break-word' }}>
        hi<br/>
      </span>
      <span className='poppins' style={{ color: 'white', fontSize: '40px', fontWeight: 300, wordWrap: 'break-word' }}>
        My name is
      </span>
      <span className='poppins' style={{ color: 'white', fontSize: '40px', fontWeight: 400, wordWrap: 'break-word' }}>
        {' '}Sai<br/>
      </span>
      <span className='vastshadow'  style={{ color: 'white', fontSize: '40px', fontWeight: 400, wordWrap: 'break-word' }}>
        a computer science student
      </span>
          <span  className='poppins'  style={{ color: 'white', fontSize: '40px', fontWeight: 300, wordWrap: 'break-word' }}>
          {' '}
          </span>
          <span className='poppins'  style={{ color: 'white', fontSize: '40px', fontWeight: 300, wordWrap: 'break-word' }}>
          at
        </span>
        <span className='poppins'  style={{ color: 'white', fontSize: '40px', fontWeight: 300, wordWrap: 'break-word' }}>
          {' '}
      </span>
        <span className='cutivemono' style={{ color: 'white', fontSize: '40px', fontWeight: 400, wordWrap: 'break-word' }}>
          {'<Michigan State University/>'}
      </span>
      <footer className="bg-black text-white text-center min-h-7">
          <div className="absolute inset-x-0 bottom-0">
            <FloatingDock items={dockItems} />
          </div>
        </footer>
    </div>
    
  );
}