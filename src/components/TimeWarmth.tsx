'use client';

import { useEffect } from 'react';

// Day ↔ night anchors for each token: [L, C, H] in OKLCH.
// :root in globals.css holds the midpoint as the no-JS / SSR baseline.
// Documented in DESIGN.md — keep the two in sync.
const TOKENS: Record<string, { day: [number, number, number]; night: [number, number, number] }> = {
  '--bg':          { day: [0.165, 0.010, 60], night: [0.148, 0.015, 50] },
  '--surface':     { day: [0.200, 0.012, 60], night: [0.185, 0.017, 50] },
  '--surface-2':   { day: [0.240, 0.014, 60], night: [0.225, 0.019, 50] },
  '--ink':         { day: [0.935, 0.012, 90], night: [0.925, 0.024, 78] },
  '--muted':       { day: [0.675, 0.022, 75], night: [0.665, 0.034, 65] },
  '--border':      { day: [0.290, 0.014, 60], night: [0.275, 0.022, 50] },
  '--accent':      { day: [0.790, 0.120, 76], night: [0.770, 0.148, 64] },
  '--accent-deep': { day: [0.610, 0.115, 66], night: [0.590, 0.135, 56] },
};

// 0 at 14:00 (full day), 1 at 02:00 (full night), smooth cosine between
function nightness(date: Date): number {
  const h = date.getHours() + date.getMinutes() / 60;
  return 0.5 + 0.5 * Math.cos(((h - 14) / 24) * 2 * Math.PI);
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export default function TimeWarmth() {
  useEffect(() => {
    const apply = () => {
      const t = nightness(new Date());
      const root = document.documentElement;
      for (const [name, { day, night }] of Object.entries(TOKENS)) {
        const L = lerp(day[0], night[0], t).toFixed(4);
        const C = lerp(day[1], night[1], t).toFixed(4);
        const H = lerp(day[2], night[2], t).toFixed(1);
        root.style.setProperty(name, `oklch(${L} ${C} ${H})`);
      }
    };
    apply();
    const id = setInterval(apply, 5 * 60_000);
    return () => clearInterval(id);
  }, []);

  return null;
}
