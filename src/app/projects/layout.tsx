import { ReactNode } from 'react';

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return (
    <section>
      <div>{children}</div>
    </section>
  );
}
