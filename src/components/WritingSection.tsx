'use client';

import { motion, useReducedMotion } from 'framer-motion';

// Planned posts — swap each entry to a real Substack URL + date when published
const POSTS = [
  {
    title:    'What I learned building a Voice AI interviewer for ten months',
    category: 'voice-ai',
  },
  {
    title:    'The hard parts of human-in-the-loop agent design',
    category: 'agents',
  },
  {
    title:    'Reducing realtime AI latency: what actually moves the number',
    category: 'backend',
  },
] as const;

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export default function WritingSection() {
  const reduce = useReducedMotion();

  const reveal = (delay = 0) => ({
    initial:     reduce ? false : { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport:    { once: true, margin: '-5%' },
    transition:  { duration: 0.6, ease: EASE_OUT_EXPO, delay: reduce ? 0 : delay },
  });

  return (
    <section id="writing" className="py-[clamp(4rem,10vh,7rem)]">
      <div className="max-w-[880px] px-6 lg:px-16">

        <motion.h2 className="text-2xl font-semibold text-ink" {...reveal()}>
          Writing
        </motion.h2>

        <motion.p className="mt-3 text-sm text-muted" {...reveal(0.05)}>
          Notes from building voice and agent systems. First posts are in progress.
        </motion.p>

        <motion.ul className="mt-10 max-w-[640px]" {...reveal(0.1)}>
          {POSTS.map(post => (
            <li
              key={post.title}
              className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4 border-t border-border last:border-b"
            >
              <p className="text-sm text-ink">{post.title}</p>
              <p className="font-mono text-xs text-muted shrink-0">
                [{post.category}] · coming soon
              </p>
            </li>
          ))}
        </motion.ul>

      </div>
    </section>
  );
}
