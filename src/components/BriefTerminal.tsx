'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { track } from '@vercel/analytics';
import { BRIEF_MODES, DEFAULT_MODE_ID, getMode } from '@/lib/brief-modes';

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

// Muted warm traffic lights — desaturated so they whisper
const DOTS = [
  'oklch(0.52 0.07 30)',
  'oklch(0.62 0.08 80)',
  'oklch(0.52 0.06 140)',
];

type Phase = 'typing' | 'streaming' | 'idle';

const CMD_FONT = 13;
const MAX_FONT = 13;
const MIN_FONT = 10;
const BASE_LEADING = 1.625;
const MAX_LEADING = 2.0;
const DESKTOP_QUERY = '(min-width: 1280px)';

export default function BriefTerminal() {
  const reduce = useReducedMotion();

  const [modeId, setModeId] = useState(DEFAULT_MODE_ID);
  const [menuOpen, setMenuOpen] = useState(false);
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState('');
  const [phase, setPhase] = useState<Phase>('typing');
  const [hasMore, setHasMore] = useState(false);
  const [fontPx, setFontPx] = useState(MAX_FONT);
  const [leading, setLeading] = useState(BASE_LEADING);
  const scrollRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const measureTextRef = useRef<HTMLParagraphElement>(null);
  // The current session's final command + brief, so a resize can re-fit
  const sessionRef = useRef<{ cmd: string; text: string }>({ cmd: '', text: '' });

  // Resolved brief per mode: starts as fallback, upgraded by the API when it answers
  const briefs = useRef<Record<string, string>>(
    Object.fromEntries(BRIEF_MODES.map(m => [m.id, m.fallback]))
  );
  const fetched = useRef<Set<string>>(new Set());
  const runId = useRef(0);
  const menuRef = useRef<HTMLDivElement>(null);

  // Fetch once per mode; on success upgrade the stored brief. Failures keep the fallback.
  const ensureFetch = useCallback((id: string): Promise<void> => {
    if (fetched.current.has(id)) return Promise.resolve();
    fetched.current.add(id);
    const hour = new Date().getHours();
    return fetch(`/api/brief?mode=${id}&hour=${hour}`)
      .then(res => (res.ok ? res.json() : null))
      .then(data => {
        if (data?.text) briefs.current[id] = data.text;
      })
      .catch(() => {});
  }, []);

  // Measure the brief off-screen in a hidden clone and pick the largest font
  // (then the largest line-height) at which the whole session still fits the
  // fixed body.
  const fit = useCallback((cmd: string, text: string) => {
    sessionRef.current = { cmd, text };
    const box = scrollRef.current;
    const clone = measureRef.current;
    const textEl = measureTextRef.current;
    if (!box || !clone || !textEl) return;

    if (!window.matchMedia(DESKTOP_QUERY).matches) {
      setFontPx(MAX_FONT);
      setLeading(BASE_LEADING);
      return;
    }

    const target = box.clientHeight; // fixed height incl. padding at xl+
    if (target <= 0) return;
    clone.querySelector('[data-cmd]')!.textContent = cmd || 'brief';
    textEl.textContent = text || ' ';

    let chosen = MIN_FONT;
    for (let size = MAX_FONT; size >= MIN_FONT; size -= 0.5) {
      textEl.style.fontSize = `${size}px`;
      textEl.style.lineHeight = String(BASE_LEADING);
      if (clone.offsetHeight <= target) {
        chosen = size;
        break;
      }
    }
    textEl.style.fontSize = `${chosen}px`;

    let leading = BASE_LEADING;
    for (let l = BASE_LEADING; l <= MAX_LEADING; l += 0.02) {
      textEl.style.lineHeight = String(l);
      if (clone.offsetHeight <= target) leading = l;
      else break;
    }

    setFontPx(chosen);
    setLeading(leading);
  }, []);

  const run = useCallback(
    async (id: string, firstLoad: boolean) => {
      const me = ++runId.current;
      const alive = () => runId.current === me;

      const cmd = firstLoad ? 'brief' : `brief --mode ${id}`;
      const fetchPromise = ensureFetch(id);

      setOutput('');
      setPhase('typing');

      if (reduce) {
        setCommand(cmd);
      } else {
        setCommand('');
        if (firstLoad) await sleep(1200); // let the underline finish drawing first
        // Deliberate, human-feeling keystrokes — the composed beat of the sequence
        const perChar = Math.min(110, 700 / cmd.length);
        for (let i = 1; i <= cmd.length; i++) {
          if (!alive()) return;
          setCommand(cmd.slice(0, i));
          await sleep(perChar);
        }
        await sleep(200);
      }
      if (!alive()) return;

      // Give a fast (or cached) API answer a beat to land; otherwise stream the fallback
      await Promise.race([fetchPromise, sleep(700)]);
      if (!alive()) return;
      const text = briefs.current[id];

      fit(cmd, text);

      if (reduce) {
        setOutput(text);
        setPhase('idle');
        track('brief_completed', { mode: id });
        return;
      }

      setPhase('streaming');
      const words = text.split(' ');
      for (let i = 1; i <= words.length; i++) {
        if (!alive()) return;
        setOutput(words.slice(0, i).join(' '));
        await sleep(20); // stdout speed, not typewriter
      }
      setPhase('idle');
      track('brief_completed', { mode: id });
    },
    [ensureFetch, reduce, fit]
  );

  useEffect(() => {
    run(DEFAULT_MODE_ID, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectMode = (id: string) => {
    setMenuOpen(false);
    if (id === modeId && phase === 'idle') return;
    track('brief_mode_switched', { mode: id });
    setModeId(id);
    run(id, false);
  };

  // Close the dropdown on outside click / Escape
  useEffect(() => {
    if (!menuOpen) return;
    const onClick = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  // Bottom fade is shown when scrollable content continues below the fold
  const updateFade = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setHasMore(
      el.scrollHeight > el.clientHeight + 4 &&
        el.scrollTop + el.clientHeight < el.scrollHeight - 8
    );
  }, []);

  // Pin to the bottom while streaming (terminal behavior), then return to the
  // top once idle so the brief reads from the beginning; recompute fade throughout
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    if (phase === 'streaming') el.scrollTop = el.scrollHeight;
    if (phase === 'idle') el.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    updateFade();
  }, [output, phase, updateFade, reduce]);

  // Refit and recompute the fade when the viewport changes
  useEffect(() => {
    const onResize = () => {
      const { cmd, text } = sessionRef.current;
      if (text) fit(cmd, text);
      updateFade();
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [updateFade, fit]);

  const currentLabel = getMode(modeId)?.label ?? modeId;

  return (
    <div
      role="region"
      aria-label="About Sai — interactive brief"
      className="w-full flex flex-col rounded-lg border border-border overflow-visible shadow-[0_16px_40px_-16px_rgba(0,0,0,0.55)]"
      style={{ backgroundColor: 'var(--surface)', ['--brief-body-h' as string]: '26rem' }}
    >
      {/* Title bar */}
      <div
        className="shrink-0 flex items-center justify-between px-4 py-2.5 border-b border-border rounded-t-lg"
        style={{ backgroundColor: 'var(--surface-2)' }}
      >
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5" aria-hidden>
            {DOTS.map(c => (
              <span
                key={c}
                className="inline-block w-2 h-2 rounded-full"
                style={{ backgroundColor: c }}
              />
            ))}
          </span>
          <span className="font-mono text-xs text-muted">sai@study — brief</span>
        </div>

        {/* Mode dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(o => !o)}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            className="font-mono text-xs text-muted hover:text-ink transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 rounded-sm"
          >
            {currentLabel} ▾
          </button>
          {menuOpen && (
            <ul
              role="menu"
              aria-label="Brief mode"
              className="absolute right-0 top-full mt-1.5 min-w-[140px] py-1 rounded-md border border-border z-20 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.6)]"
              style={{ backgroundColor: 'var(--surface-2)' }}
            >
              {BRIEF_MODES.map(m => (
                <li key={m.id} role="none">
                  <button
                    role="menuitemradio"
                    aria-checked={m.id === modeId}
                    onClick={() => selectMode(m.id)}
                    className={`w-full text-left px-3 py-1.5 font-mono text-xs transition-colors duration-150 hover:bg-[var(--border)] ${
                      m.id === modeId ? 'text-ink' : 'text-muted'
                    }`}
                  >
                    <span className="inline-block w-4">{m.id === modeId ? '✓' : ''}</span>
                    {m.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Body — fixed height on desktop (xl+) */}
      <div className="relative">
        <div
          ref={measureRef}
          aria-hidden
          className="terminal-scroll px-4 py-4 font-mono leading-relaxed absolute inset-x-0 top-0 invisible pointer-events-none"
          style={{ fontSize: `${CMD_FONT}px` }}
        >
          <p>
            <span>~ %</span> <span data-cmd />
          </p>
          <p ref={measureTextRef} className="mt-3 text-pretty whitespace-pre-wrap" />
          <p className="mt-3">~ %</p>
        </div>
        <div
          ref={scrollRef}
          onScroll={updateFade}
          className="terminal-scroll px-4 py-4 font-mono leading-relaxed rounded-b-lg overflow-y-auto xl:h-[var(--brief-body-h)]"
          style={{ fontSize: `${CMD_FONT}px` }}
          aria-busy={phase !== 'idle'}
        >
          <p>
            <span className="text-accent">~ %</span>{' '}
            <span className="text-ink">{command}</span>
            {phase === 'typing' && <span className="terminal-cursor ml-px" aria-hidden />}
          </p>
          {output && (
            <p
              className="mt-3 text-ink text-pretty whitespace-pre-wrap"
              style={{ fontSize: `${fontPx}px`, lineHeight: leading }}
            >
              {output}
            </p>
          )}
          {phase === 'idle' && (
            <p className="mt-3">
              <span className="text-accent">~ %</span>{' '}
              <span className="terminal-cursor ml-px" aria-hidden />
            </p>
          )}
        </div>
        {hasMore && (
          <div
            className="hidden xl:block absolute bottom-0 inset-x-0 h-14 pointer-events-none rounded-b-lg"
            style={{ background: 'linear-gradient(to bottom, transparent, var(--surface))' }}
            aria-hidden
          />
        )}
      </div>
    </div>
  );
}
