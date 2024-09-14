import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white py-4">
      <div className="container mx-auto flex justify-center space-x-6">
        <Link href="/" className="typewriter">Sai Byrraju</Link>
        <Link href="/work" className="hover:text-gray-400">Work</Link>
        <Link href="/projects" className="hover:text-gray-400">Projects</Link>
        <Link href="/resume" className="hover:text-gray-400">Resume</Link>
      </div>
    </nav>
  );
}