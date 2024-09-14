import { ReactNode } from 'react';

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return (
    <section>
      <h1>My Projects</h1>
      <div>{children}</div>
    </section>
  );
}
