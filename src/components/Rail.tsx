'use client';

import Status from './Status';

const NAV = [
  { label: 'Work',    href: '/#work' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Contact', href: '/#contact' },
] as const;

export default function Rail() {
  return (
    <>
      {/* Desktop: fixed left rail */}
      <header className="hidden lg:flex fixed inset-y-0 left-0 w-56 flex-col justify-between px-8 py-10 border-r border-border z-10">
        <div>
          <a href="/#hero" className="block text-ink font-semibold text-base leading-tight">
            Sai Byrraju
          </a>
          <p className="mt-1 text-sm text-muted">Builder of things</p>

          <nav className="mt-12" aria-label="Sections">
            <ul className="space-y-3">
              {NAV.map(({ label, href }) => (
                <li key={href}>
                  <a href={href} className="link-quiet text-sm">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <Status />
      </header>

      {/* Mobile: slim top bar */}
      <header className="lg:hidden fixed top-0 inset-x-0 h-16 flex items-center justify-between px-6 bg-surface/90 backdrop-blur-sm border-b border-border z-10">
        <a href="/#hero" className="text-ink font-semibold text-sm">
          Sai Byrraju
        </a>
        <nav aria-label="Sections">
          <ul className="flex items-center gap-5">
            {NAV.map(({ label, href }) => (
              <li key={href}>
                <a href={href} className="link-quiet text-sm">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  );
}
