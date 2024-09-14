"use client";

import { useParams } from 'next/navigation';

export default function ProjectPage() {
  const { projectId } = useParams();

  return (
    <section>
      <h2>Project {projectId}</h2>
      <p>This is the details page for project {projectId}.</p>
    </section>
  );
}
