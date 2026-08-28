import Link from 'next/link';
import type { Project } from '@/lib/projects';

function StatusBadge({ status }: { status: Project['status'] }) {
  if (status !== 'active') return null;

  return <span className="border border-accent px-2 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-accent">{status}</span>;
}

export default function ProjectDetail({ project }: { project: Project }) {
  const links = [
    { label: 'GitHub ↗', href: project.github },
    ...(project.links ?? []).map((link) => ({
      ...link,
      label: `${link.label} ↗`,
    })),
  ];

  return (
    <article className="min-h-screen px-6 pb-20 pt-28 lg:px-16 lg:pb-28 lg:pt-20">
      <div className="w-full">
        <Link href="/projects" className="link-quiet font-mono text-xs">&lt; Back to projects</Link>
        <header className="mt-12 border-b border-border pb-12">
          <div className="flex flex-wrap items-center gap-4">
            <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[1.02] tracking-[-0.02em] text-ink">{project.name}</h1>
            <StatusBadge status={project.status} />
          </div>
          <p className="mt-6 max-w-[680px] text-lg leading-relaxed text-muted">{project.description}</p>
          <div className="mt-7 flex flex-wrap gap-2">{project.tech?.map((tech) => <span key={tech} className="rounded-full border border-border px-3 py-1 font-mono text-[11px] text-muted">{tech}</span>)}</div>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-xs">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="link whitespace-nowrap text-accent" target="_blank" rel="noreferrer">
                {link.label}
              </a>
            ))}
          </div>
        </header>
        <div className="pt-12">
          <div className="space-y-14">
            <section aria-labelledby="why-heading"><h2 id="why-heading" className="text-2xl font-semibold text-ink">Why I built this</h2><p className="mt-5 text-base leading-relaxed text-muted">{project.why}</p></section>
            <section aria-labelledby="how-heading"><h2 id="how-heading" className="text-2xl font-semibold text-ink">How it works</h2><pre className="mt-6 overflow-x-auto border border-border bg-surface-2 p-5 font-mono text-xs leading-relaxed text-accent"><code>{project.architecture}</code></pre><div className="mt-6 space-y-5 text-base leading-relaxed text-muted">{project.howItWorks?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></section>
            {!!project.decisions?.length && <section aria-labelledby="decisions-heading"><h2 id="decisions-heading" className="text-2xl font-semibold text-ink">Decisions</h2><div className="mt-6 space-y-7">{project.decisions.map(({ choice, reasoning }) => <div key={choice}><h3 className="font-mono text-sm text-ink">{choice}</h3><p className="mt-2 text-base leading-relaxed text-muted">{reasoning}</p></div>)}</div></section>}
          </div>
        </div>
      </div>
    </article>
  );
}
