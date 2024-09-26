"use client";

import { useParams } from 'next/navigation';
import Link from 'next/link';

// projects data to fetch from
const projects = [
  { id: 1, title: 'Custom Python DBMS', description: 'Developed a custom Python module that emulates the behavior of Python’s built-in SQLite3 module.', technologies: ['Python', 'SQLite', 'Data Structures'], imageUrl: '/sqlitepython.png', content: [
    'Developed a DBMS in Python that supports complex SQL operations without using SQL.',
    'Designed to ensure scalability and efficiency for processing large datasets.',
    'Conducted testing to verify functionality, ensuring the DBMS performs for a wide range of queries and edge cases.',
  ] },
  { id: 2, title: 'Smart Grocery Manager', description: 'Developed a grocery app in Android Studio.', technologies: ['Java', 'Android', 'Firebase'], imageUrl: '/blockdiagram.png', content: [
    'Designed and implemented a user-friendly grocery management app with multi-screen navigation.',
    'Optimized user flow through intent-based transitions, allowing for smooth navigation.'
  ] },
  { id: 3, title: 'Bug Squash', description: 'Designed and developed a complex Bug squash program.', technologies: ['C++', 'UI Design'], imageUrl: '/bugsquash.png', content: [
    'Designed and developed a complex Bug Squash game from scratch, featuring a dynamic user interface that engages users in an interactive debugging experience.',
    'Developed functionality that require players to fix code snippets to successfully squash them, enhancing problem-solving skills.'
  ] },
  { id: 4, title: 'saibyrraju.vercel.app', description: "My portfolio", technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'], imageUrl: '/websiteimg.png', content: [
    'Designed a responsive portfolio website to showcase my skills and projects.',
    'Next.js for server side rendering to ensure fast loading times and better performance.',
    'Styled with Tailwind CSS to create a modern, consistent user interface with minimal custom CSS.',
  ] },
];

export default function ProjectPage() {
  const { projectId } = useParams();

  // Convert projectId to string if it's an array
  const id = Array.isArray(projectId) ? projectId[0] : projectId;

  // Find project by id
  const project = projects.find((proj) => proj.id === parseInt(id || '', 10));

  if (!project) {
    return <p>Project not found.</p>;
  }

  return (
    <div className="relative top-28 left-0 animate-move-up-fade-in">
      <Link href={'/projects'}>
        <div className="text-zinc-400 mt-1 px-16 top-5">
          <svg className="w-6 h-6 text-zinc-500 duration-500 hover:text-white dark:hover:text-white text-center inline-flex items-center" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5H1M5 9l-4-4 4-4" />
          </svg>
          <span className="sr-only">left arrow</span>
        </div>
      </Link>

      <div className="mt-4 flex flex-col items-center border-black dark:border-zinc-700 rounded-lg">
        <div className="text-center dark:text-white py-20 px-8">
          <h2 className="text-4xl text-white font-bold">{project.title}</h2>
          <p className="mt-5 px-16 text-zinc-300 dark:text-zinc-300">{project.description}</p>

          <div className="mt-2 flex flex-wrap justify-center space-y-1">
            {project.technologies.map((tech, index) => (
              <p key={index} className="mt-1 items-center mx-1 px-3 py-1 text-xs text-white text-center border border-zinc-400 dark:border-white rounded-lg">
                {tech}
              </p>
            ))}
          </div>
        </div>

        <img
          src={project.imageUrl}
          className="border border-zinc-300 dark:border-zinc-600 rounded object-cover w-1/2"
          alt=''
          width="80%"
          height="auto"
        />

        <div>
          <ul className="py-16 px-16 text-zinc-700 dark:text-zinc-400 ">
            {project.content.map((paragraph, index) => (
              <li key={index} className="text-zinc-400 mb-4 list-none hover:list-disc">{paragraph}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
