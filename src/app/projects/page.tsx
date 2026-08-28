import Link from 'next/link';
import { projects } from '@/lib/projects';

export default function ProjectsPage() {
  return (
    <section className="min-h-screen px-6 pb-20 pt-28 lg:px-16 lg:pb-28 lg:pt-24">
      <div>
        <header className="border-b border-border pb-10">
          <h1 className="text-feature font-semibold text-ink">Projects</h1>
          <p className="mt-4 max-w-[560px] text-base leading-relaxed text-muted">
            Personal projects, hackathon builds, and experiments.
          </p>
        </header>

        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <li key={project.slug}>
              <Link
                href={`/projects/${project.slug}`}
                className="group flex h-full min-h-52 flex-col border border-border p-6 transition-colors duration-150 hover:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:p-7"
                style={{ background: `linear-gradient(135deg, oklch(0.28 0.035 ${project.hue} / 0.52), var(--surface) 52%, var(--bg))` }}
              >
                <div className="flex flex-wrap items-start justify-between gap-x-5 gap-y-3">
                  <h2 className="min-w-0 break-words text-2xl font-semibold leading-tight text-ink">{project.name}</h2>
                  <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                    {project.language}
                  </span>
                </div>
                <p className="mt-5 max-w-[34rem] text-sm leading-relaxed text-muted">{project.description}</p>
                <span className="mt-auto pt-8 font-mono text-[11px] uppercase tracking-[0.14em] text-muted transition-colors duration-150 group-hover:text-ink">
                  View project →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
