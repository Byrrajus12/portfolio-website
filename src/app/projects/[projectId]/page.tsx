import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProject, projects } from '@/lib/projects';
import ProjectDetail from '@/components/ProjectDetail';

type ProjectPageProps = { params: { projectId: string } };

export function generateStaticParams() {
  return projects.map((project) => ({ projectId: project.slug }));
}

export function generateMetadata({ params }: ProjectPageProps): Metadata {
  const project = getProject(params.projectId);
  return project
    ? { title: `${project.name} — Sai Byrraju`, description: project.description }
    : { title: 'Project not found — Sai Byrraju' };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProject(params.projectId);
  if (!project) notFound();

  return <ProjectDetail project={project} />;
}
