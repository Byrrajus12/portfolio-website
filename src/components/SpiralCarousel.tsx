'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MouseEvent, useCallback, useEffect, useRef, useState } from 'react';
import { carouselProjects } from '@/lib/projects';
import styles from './SpiralCarousel.module.css';

const CARD_GAP = Math.PI * 0.32;
const TOTAL_ROTATION = (carouselProjects.length - 1) * CARD_GAP;

type Project = (typeof carouselProjects)[number];

function ProjectArtwork({ project }: { project: Project }) {
  return (
    <span className={styles.cardSurface}>
      <Image
        className={styles.cardArtwork}
        src={project.image!}
        alt=""
        fill
        sizes="(max-width: 699px) 200px, 360px"
        aria-hidden="true"
      />
      <span className={styles.cardCopy}>
        <strong>{project.name}</strong>
        <span>{project.description}</span>
      </span>
    </span>
  );
}

function CardSurface({ project }: { project: Project }) {
  return <ProjectArtwork project={project} />;
}

export default function SpiralCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const orientationRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const progressRef = useRef<HTMLSpanElement>(null);
  const viewAllRef = useRef<HTMLAnchorElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const [tooltipName, setTooltipName] = useState<string | null>(null);

  const paint = useCallback(() => {
    frameRef.current = null;
    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;

    const rect = section.getBoundingClientRect();
    const compact = window.innerWidth < 700;
    const stageHeight = stage.clientHeight;
    const stickyTop = compact ? 64 : 0;
    const scrollDistance = Math.max(1, rect.height - stageHeight);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const progress = reducedMotion
      ? 0
      : Math.min(1, Math.max(0, (stickyTop - rect.top) / scrollDistance));
    const radius = Math.min(window.innerWidth * (compact ? 0.31 : 0.29), compact ? 132 : 350);
    const pitch = compact ? 63 : 90;
    const activeLine = stageHeight * ((compact ? 0.59 : 0.58) - progress * (compact ? 0.18 : 0.16));

    cardRefs.current.forEach((card, index) => {
      if (!card) return;
      const orientation = orientationRefs.current[index];
      if (!orientation) return;

      const baseTheta = -index * CARD_GAP;
      const theta = baseTheta + progress * TOTAL_ROTATION;
      const depth = Math.cos(theta);
      const x = Math.sin(theta) * radius;
      const y = activeLine + theta * pitch;
      const depth01 = (depth + 1) * 0.5;
      const scale = (compact ? 0.68 : 0.7) + depth01 * (compact ? 0.27 : 0.34);
      const yawAngle = theta * (180 / Math.PI);
      const normalizedYaw = ((yawAngle + 180) % 360 + 360) % 360 - 180;
      const isBackwardsFacing = Math.abs(normalizedYaw) > 90;
      const backfaceOpacity = isBackwardsFacing ? 0.4 : 1;
      const blur = isBackwardsFacing ? (compact ? 2 : 3) : 0;
      const edgeFade = Math.min(1, Math.max(0, (stageHeight * 0.7 - Math.abs(y - stageHeight * 0.5)) / 130));
      const opacity = (0.44 + depth01 * 0.56) * edgeFade * backfaceOpacity;

      card.style.transform = `translate3d(calc(-50% + ${x.toFixed(2)}px), calc(-50% + ${y.toFixed(2)}px), 0) scale(${scale.toFixed(4)})`;
      card.style.opacity = opacity.toFixed(3);
      card.style.filter = blur > 0.001 ? `blur(${blur.toFixed(3)}px)` : 'none';
      card.style.zIndex = String(Math.round(depth01 * 100) + 1);
      card.style.pointerEvents = opacity > 0.35 ? 'auto' : 'none';
      orientation.style.transform = `rotateY(${yawAngle.toFixed(3)}deg)`;
    });

    if (progressRef.current) {
      progressRef.current.style.transform = `scaleX(${progress.toFixed(4)})`;
    }

    if (viewAllRef.current) {
      const isVisible = progress > 0.85;
      viewAllRef.current.style.opacity = isVisible ? '1' : '0';
      viewAllRef.current.style.pointerEvents = isVisible ? 'auto' : 'none';
      viewAllRef.current.tabIndex = isVisible ? 0 : -1;
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

  const showTooltip = (event: MouseEvent<HTMLAnchorElement>, name: string) => {
    positionTooltip(event.clientX, event.clientY);
    setTooltipName(name);
  };

  return (
    <section ref={sectionRef} className={styles.scrollSection} aria-label="Selected projects spiral">
      <div ref={stageRef} className={styles.stickyStage}>
        <div className={styles.stageCopy} aria-hidden="true">

        </div>
        <div className={styles.carousel}>
          {carouselProjects.map((project, index) => (
            <div
              key={project.name}
              ref={(node) => { cardRefs.current[index] = node; }}
              className={styles.card}
            >
              <Link
                href={`/projects/${project.slug}`}
                ref={(node) => { orientationRefs.current[index] = node; }}
                className={styles.cardOrientation}
                onMouseEnter={(event) => showTooltip(event, project.name)}
                onMouseMove={(event) => positionTooltip(event.clientX, event.clientY)}
                onMouseLeave={() => setTooltipName(null)}
              >
                <CardSurface project={project} />
              </Link>
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
        <Link ref={viewAllRef} href="/projects" className={styles.viewAllLink} tabIndex={-1}>
          View all projects <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
