'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Status from './Status';

const LINKS = [
  { label: 'saipramodh12@gmail.com', href: 'mailto:saipramodh12@gmail.com' },
  { label: 'GitHub ↗',               href: 'https://github.com/Byrrajus12' },
  { label: 'LinkedIn ↗',             href: 'https://www.linkedin.com/in/saibyrraju/' },
  { label: 'Resume ↗',               href: '/resume.pdf' },
] as const;

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export default function ContactSection() {
  const reduce = useReducedMotion();

  const reveal = (delay = 0) => ({
    initial:     reduce ? false : { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport:    { once: true, margin: '-5%' },
    transition:  { duration: 0.6, ease: EASE_OUT_EXPO, delay: reduce ? 0 : delay },
  });

  return (
    <section id="contact" className="pt-[clamp(4rem,10vh,7rem)] pb-12">
      <div className="max-w-[880px] px-6 lg:px-16">

        <motion.h2 className="text-2xl font-semibold text-ink" {...reveal()}>
          Contact
        </motion.h2>

        <motion.p
          className="mt-5 text-base text-muted max-w-[480px] text-pretty"
          {...reveal(0.05)}
        >
          If the work above overlaps with what you’re
          building, say hello.
        </motion.p>

        <motion.ul
          className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3"
          {...reveal(0.1)}
        >
          {LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className="link text-sm"
              >
                {label}
              </a>
            </li>
          ))}
        </motion.ul>

        {/* Footer */}
        <motion.footer
          className="mt-24 pt-8 border-t border-border flex flex-wrap items-end justify-between gap-6"
          {...reveal(0.15)}
        >
          {/* Status + time live in the rail on desktop; surface them here on mobile */}
          <div className="lg:hidden">
            <Status />
          </div>
          <p className="font-mono text-xs text-muted">
            © {new Date().getFullYear()} Sai Byrraju
          </p>
        </motion.footer>

      </div>
    </section>
  );
}
