'use client';

import { motion, useReducedMotion } from 'framer-motion';

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

const FEATURED = {
  name:   'Voysly',
  role:   'Sole engineer',
  org:    '7C Lingo',
  period: 'Feb 2025 – Dec 2025',
  description:
    'Voice AI interviewing platform for candidate screening and recruiter workflows. Sole engineer for ten months: owned voice AI flows, recruiter dashboard, transcripts, AI scoring, email automation, prescreen flows, client rollout, and production reliability end to end.',
  metrics: [
    { value: '2,000+',           label: 'interviews processed' },
    { value: '16',              label: 'client locations' },
    { value: '1340ms → 850ms',   label: 'voice response latency' },
  ],
  stack: 'OpenAI Realtime · Vapi · Node.js · Python · Next.js · PostgreSQL · WebRTC · Prometheus · Grafana',
};

const SUPPORTING = [
  {
    name:   'KitchenConnect',
    role:   'Backend & voice agents',
    org:    'Zymo Solutions',
    period: '2026 – present',
    description:
      'Backend services and voice agents for restaurant automation. Connects Welbilt IoT kitchen devices (Convotherm ovens, Merrychef units) into one operational layer; staff check equipment status and route support tasks by voice.',
    stack: 'Python · FastAPI · PostgreSQL · AWS RDS · AWS ECS/Lambda · CloudWatch · KitchenConnect API · Vapi',
  },
];

const QUOTE = {
  text:
    'I had the pleasure of working with Sai while he helped us build an MVP for a real-time AI interviewer platform. He consistently demonstrated strong technical ability, resourcefulness, and a willingness to take ownership of complex challenges. Sai is proactive, thinks creatively, and works through problems until he finds solutions. He was a reliable and valuable contributor to our team, and I would confidently recommend him to any organization.',
  author: 'Fathy Shetiah',
  title:  'CEO, 7C Lingo',
};

export default function WorkSection() {
  const reduce = useReducedMotion();

  const reveal = (delay = 0) => ({
    initial:     reduce ? false : { opacity: 0, y: 12 },
    whileInView: { opacity: 1, y: 0 },
    viewport:    { once: true, margin: '-5%' },
    transition:  { duration: 0.6, ease: EASE_OUT_EXPO, delay: reduce ? 0 : delay },
  });

  return (
    <section id="work" className="py-[clamp(4rem,10vh,7rem)]">
      <div className="max-w-[880px] px-6 lg:px-16">

        <motion.h2 className="text-2xl font-semibold text-ink" {...reveal()}>
          Selected Work
        </motion.h2>

        {/* Featured entry — full scale */}
        <motion.article className="mt-14" {...reveal(0.1)}>
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h3 className="text-feature font-semibold text-ink">{FEATURED.name}</h3>
            <p className="text-sm text-muted">
              {FEATURED.role} · {FEATURED.org} · {FEATURED.period}
            </p>
          </div>

          <p className="mt-5 text-base text-muted leading-relaxed max-w-[640px] text-pretty">
            {FEATURED.description}
          </p>

          <dl className="mt-8 max-w-[480px]">
            {FEATURED.metrics.map(({ value, label }) => (
              <div
                key={label}
                className="flex items-baseline justify-between gap-6 py-3 border-t border-border last:border-b"
              >
                <dd className="font-mono text-sm text-accent tabular-nums order-2">{value}</dd>
                <dt className="text-sm text-muted order-1">{label}</dt>
              </div>
            ))}
          </dl>

          <p className="mt-6 font-mono text-xs text-muted">{FEATURED.stack}</p>
        </motion.article>

        {/* Supporting entries — half the visual weight */}
        <div className="mt-16">
          {SUPPORTING.map((entry, i) => (
            <motion.article
              key={entry.name}
              className="py-10 border-t border-border"
              {...reveal(0.05 + i * 0.08)}
            >
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <h3 className="text-lg font-semibold text-ink">{entry.name}</h3>
                <p className="text-sm text-muted">
                  {entry.role}
                  {entry.org && ` · ${entry.org}`} · {entry.period}
                </p>
              </div>
              <p className="mt-3 text-sm text-muted leading-relaxed max-w-[560px] text-pretty">
                {entry.description}
              </p>
              <p className="mt-4 font-mono text-xs text-muted">{entry.stack}</p>
            </motion.article>
          ))}
        </div>

        {/* Recommendation — quiet, attributed */}
        <motion.figure
          className="mt-10 pt-10 border-t border-border max-w-[600px]"
          {...reveal(0.1)}
        >
          <blockquote className="text-sm text-muted leading-relaxed text-pretty">
            “{QUOTE.text}”
          </blockquote>
          <figcaption className="mt-4 font-mono text-xs text-muted">
            {QUOTE.author} · {QUOTE.title}
          </figcaption>
        </motion.figure>

      </div>
    </section>
  );
}
