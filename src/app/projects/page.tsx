import Link from 'next/link';
import { Card } from '@/components/staticCard';

const projects = [
  { id: 1, title: 'DebugMore', description: 'Engineered an advanced platform leveraging React, Node.js, and Flask to extract key skills from job descriptions and recommend coding problems.' },
  { id: 2, title: 'Custom Python DBMS', description: 'Created a scalable Python module emulating SQLite3 functionality.' },
  { id: 3, title: 'Smart Grocery Manager', description: 'Developed a scalable grocery management app in Java.' },
  { id: 4, title: 'Bug Squash', description: 'Created a dynamic Bug Squash program featuring an engaging user interface for an interactive and immersive user experience' },
  { id: 5, title: 'saibyrraju.vercel.app', description: "The website you're looking at" },
];

export default function ProjectsPage() {
  return (

    <section className="p-8">
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-8xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Projects
          </h2>
          <p className="mt-4 text-zinc-400">
            Projects I did in school and my free time
          </p>
        </div>
        <div className="w-full h-px bg-zinc-800" />
      </div>
      <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-8">
        {projects.map(project => (
          <li key={project.id}>
            <Link href={`/projects/${project.id}`}>
            </Link>
          <Card>
            <Link href={`/projects/${project.id}`}>
              <article className="relative bg-black w-full h-full p-5 md:p-8">
                <div className="flex items-center justify-between gap-2">
                </div>

                <h2
                  id="featured-post"
                  className="mt-4 text-3xl text-zinc-50 group-hover:text-white sm:text-4xl font-display"
                >
                  {project.title}
                </h2>
                <p className="mt-4 leading-8 duration-150 text-zinc-400 group-hover:text-zinc-300">
                  {project.description}
                </p>
              </article>
            </Link>
          </Card>
          </li>
        ))}
      </ul>
    </section>
  );
}
