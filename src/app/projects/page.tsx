import Link from 'next/link';
import Card from '../../components/Card';

const projects = [
  { id: 1, title: 'Project 1', description: 'Description for Project 1' },
  { id: 2, title: 'Project 2', description: 'Description for Project 2' },
  { id: 3, title: 'Project 3', description: 'Description for Project 3' },
  { id: 4, title: 'Project 4', description: 'Description for Project 4' },
  { id: 5, title: 'Project 5', description: 'Description for Project 5' },// Add more projects as needed
];

export default function ProjectsPage() {
  return (
    <section className="p-8">
      <h2 className="text-4xl font-bold mb-4">All Projects</h2>
      <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map(project => (
          <li key={project.id}>
            <Link href={`/projects/${project.id}`}>
  
                <Card title={project.title} description={project.description} />
              
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
