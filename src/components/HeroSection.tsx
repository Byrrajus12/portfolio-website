'use client';

import { motion, useReducedMotion } from 'framer-motion';
import BriefTerminal from './BriefTerminal';

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export default function HeroSection() {
  const reduce = useReducedMotion();

  // Always animate to visible: SSR renders initial opacity 0, so omitting
  // `animate` under reduced motion would leave the hero permanently hidden.
  const fadeUp = (delay: number) => ({
    initial:    { opacity: 0, y: reduce ? 0 : 12 },
    animate:    { opacity: 1, y: 0 },
    transition: reduce
      ? { duration: 0.15 }
      : { duration: 0.6, ease: EASE_OUT_EXPO, delay },
  });

  return (
    <section id="hero" className="min-h-screen flex items-center">
      {/* Headline column keeps its v2 measure (max-w-[760px] preserves the
          three-line wrap); the terminal takes a fixed track in what remains. */}
      <div className="w-full max-w-[1280px] px-6 lg:px-16 xl:pr-8 pt-24 xl:pt-0 pb-16 grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_330px] min-[1440px]:grid-cols-[minmax(0,1fr)_400px] gap-14 xl:gap-x-6 min-[1440px]:gap-x-8 items-center">

        {/* Headline block — the page's one scale moment */}
        <div className="max-w-[760px] xl:self-center">
          <motion.h1
            className="text-hero font-semibold text-ink text-balance"
            {...fadeUp(0.1)}
          >
            I like building products that make processes{' '}
            <span className="accent-underline accent-underline-draw">
              simpler
              <span className="accent-underline-ink" aria-hidden>simpler</span>
            </span>
            .
          </motion.h1>

          <motion.p
            className="mt-8 text-base text-muted max-w-[480px]"
            style={{ lineHeight: 1.7 }}
            {...fadeUp(0.25)}
          >
            AI agents · Voice AI · Backend systems · Operational tooling
          </motion.p>

          <motion.div
            className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-base"
            {...fadeUp(0.4)}
          >
            <a href="#work" className="link">View work ↓</a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              Resume ↗
            </a>
            <a href="#contact" className="link">Contact</a>
          </motion.div>
        </div>

        {/* Dynamic Brief terminal — sized to its content (may extend past the CTA baseline) */}
        <motion.div {...fadeUp(0.55)}>
          <BriefTerminal />
        </motion.div>

      </div>
    </section>
  );
}
