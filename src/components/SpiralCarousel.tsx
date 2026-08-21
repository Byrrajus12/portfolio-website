'use client';

import { CSSProperties, MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import styles from './SpiralCarousel.module.css';

const PROJECTS = [
  { name: 'Atelier', description: 'fake description', hue: 28 },
  { name: 'AirAim', description: 'fake description', hue: 194 },
  { name: 'ClawVoice', description: 'fake description', hue: 355 },
  { name: 'Transcript Editor', description: 'fake description', hue: 48 },
  { name: 'WhisperX Service', description: 'fake description', hue: 263 },
  { name: 'Resume Matcher', description: 'fake description', hue: 145 },
  { name: 'Project 7', description: 'fake description', hue: 216 },
  { name: 'Project 8', description: 'fake description', hue: 318 },
] as const;


const CARD_GAP = Math.PI * 0.32;
const TOTAL_ROTATION = (PROJECTS.length - 1) * CARD_GAP;

type Project = (typeof PROJECTS)[number];

function ProjectArtwork({ project }: { project: Project }) {
  return (
    <>
      <span
        className={styles.visual}
        style={{ '--project-hue': project.hue } as CSSProperties}
      >
        <span className={styles.visualOrb} />
        <span className={styles.visualLine} />
      </span>
      <span className={styles.cardBody}>
        <strong>{project.name}</strong>
        <span>{project.description}</span>
      </span>
    </>
  );
}

function CardSurface({ project }: { project: Project }) {
  return (
    <span className={styles.cardSurface}>
      <ProjectArtwork project={project} />
    </span>
  );
}

export default function SpiralCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const orientationRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const progressRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const [tooltipName, setTooltipName] = useState<string | null>(null);

  const paint = useCallback(() => {
    frameRef.current = null;
    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const scrollDistance = Math.max(1, rect.height - window.innerHeight);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const progress = reducedMotion
      ? 0
      : Math.min(1, Math.max(0, -rect.top / scrollDistance));
    const compact = window.innerWidth < 700;
    const radius = Math.min(window.innerWidth * (compact ? 0.31 : 0.29), compact ? 132 : 350);
    const pitch = compact ? 63 : 90;

    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      const orientation = orientationRefs.current[index];
      if (!orientation) return;

      const baseTheta = -index * CARD_GAP;
      const theta = baseTheta + progress * TOTAL_ROTATION;
      const depth = Math.cos(theta);
      const x = Math.sin(theta) * radius;
      const y = window.innerHeight * 0.5 + theta * pitch;
      const depth01 = (depth + 1) * 0.5;
      const scale = (compact ? 0.68 : 0.7) + depth01 * (compact ? 0.27 : 0.34);
      const yawAngle = theta * (180 / Math.PI);
      const lateralPosition = Math.sin(theta);
      const rollAngle = lateralPosition * lateralPosition * (compact ? 6 : 8);
      const edgeFade = Math.min(1, Math.max(0, (window.innerHeight * 0.7 - Math.abs(y - window.innerHeight * 0.5)) / 130));
      const opacity = (0.44 + depth01 * 0.56) * edgeFade;

      card.style.transform = `translate3d(calc(-50% + ${x.toFixed(2)}px), calc(-50% + ${y.toFixed(2)}px), 0) scale(${scale.toFixed(4)})`;
      card.style.opacity = opacity.toFixed(3);
      card.style.zIndex = String(Math.round(depth01 * 100) + 1);
      card.style.pointerEvents = opacity > 0.35 ? 'auto' : 'none';
      orientation.style.transform = `rotateY(${yawAngle.toFixed(3)}deg) rotateZ(${rollAngle.toFixed(3)}deg)`;
    });

    if (progressRef.current) {
      progressRef.current.style.transform = `scaleX(${progress.toFixed(4)})`;
    }
  }, []);

  const schedulePaint = useCallback(() => {
    if (frameRef.current === null) frameRef.current = requestAnimationFrame(paint);
  }, [paint]);

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');

    paint();
    window.addEventListener('scroll', schedulePaint, { passive: true });
    window.addEventListener('resize', schedulePaint);
    motionPreference.addEventListener('change', schedulePaint);
    return () => {
      window.removeEventListener('scroll', schedulePaint);
      window.removeEventListener('resize', schedulePaint);
      motionPreference.removeEventListener('change', schedulePaint);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [paint, schedulePaint]);

  const positionTooltip = (x: number, y: number) => {
    if (!tooltipRef.current) return;
    tooltipRef.current.style.transform = `translate3d(${x + 14}px, ${y + 14}px, 0)`;
  };

  const showTooltip = (event: MouseEvent<HTMLSpanElement>, name: string) => {
    positionTooltip(event.clientX, event.clientY);
    setTooltipName(name);
  };

  return (
    <section ref={sectionRef} className={styles.scrollSection} aria-label="Selected projects spiral">
      <div className={styles.stickyStage}>
        <div className={styles.stageCopy} aria-hidden="true">
          <span>Selected experiments</span>
          <span>Scroll to orbit</span>
        </div>
        <div className={styles.carousel}>
          {PROJECTS.map((project, index) => (
            <div
              key={project.name}
              ref={(node) => { cardRefs.current[index] = node; }}
              className={styles.card}
            >
              <span
                ref={(node) => { orientationRefs.current[index] = node; }}
                className={styles.cardOrientation}
                onMouseEnter={(event) => showTooltip(event, project.name)}
                onMouseMove={(event) => positionTooltip(event.clientX, event.clientY)}
                onMouseLeave={() => setTooltipName(null)}
              >
                <CardSurface project={project} />
              </span>
            </div>
          ))}
        </div>
        <div
          ref={tooltipRef}
          className={`${styles.tooltip} ${tooltipName ? styles.tooltipVisible : ''}`}
          aria-hidden="true"
        >
          {tooltipName}
        </div>
        <div className={styles.progressRail} aria-hidden="true">
          <span ref={progressRef} />
        </div>
      </div>
    </section>
  );
}
