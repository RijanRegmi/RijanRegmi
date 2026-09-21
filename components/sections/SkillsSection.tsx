'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { SKILLS, SkillItem } from '@/lib/data/skills';

// Split the skills into upper layer (8 items) and lower layer (7 items)
const UPPER_SKILLS = SKILLS.slice(0, 8);
const LOWER_SKILLS = SKILLS.slice(8);

interface SkillCardProps {
  skill: SkillItem;
}

function SkillCard({ skill }: SkillCardProps) {
  return (
    <div
      className="relative overflow-hidden p-6 sm:p-7 rounded-2xl text-center flex flex-col items-center justify-between w-[185px] sm:w-[215px] md:w-[220px] min-h-[185px] sm:min-h-[195px] shrink-0 bg-white hover:bg-slate-50 border border-slate-200/90 hover:border-purple-500/50 shadow-md hover:shadow-xl hover:shadow-purple-900/10 transition-all duration-300 hover:-translate-y-1.5 group/card cursor-pointer select-none"
    >
      {/* Ambient Subtle Radial Glow */}
      <div className="absolute top-3 w-16 h-16 bg-purple-400/10 rounded-full blur-xl pointer-events-none group-hover/card:bg-purple-400/25 transition-colors duration-300" />

      {/* Circular Logo Badge Container */}
      <div className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-slate-100/90 border border-slate-200/90 flex items-center justify-center p-2.5 sm:p-3 mb-3.5 group-hover/card:scale-110 group-hover/card:shadow-[0_0_20px_rgba(168,85,247,0.2)] transition-transform duration-300">
        <img
          src={skill.iconSrc}
          alt={`${skill.name} official logo`}
          loading="lazy"
          decoding="async"
          className="w-8 h-8 sm:w-9 sm:h-9 object-contain drop-shadow-sm"
        />
      </div>

      {/* Text Content */}
      <div className="relative z-10 w-full flex flex-col items-center">
        <p className="text-sm sm:text-base font-bold text-slate-900 group-hover/card:text-purple-700 transition-colors tracking-tight truncate max-w-full">
          {skill.name}
        </p>
        <span className="mt-2.5 inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-semibold bg-purple-50 text-purple-700 border border-purple-200 group-hover/card:border-purple-400 transition-colors">
          {skill.level}
        </span>
      </div>
    </div>
  );
}

interface MarqueeRowProps {
  skills: SkillItem[];
  direction: 'left' | 'right';
  speed?: number; // pixels per second
  repeatSets?: number;
}

function MarqueeRow({ skills, direction, speed = 42, repeatSets = 6 }: MarqueeRowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);
  const setWidthRef = useRef<number>(0);
  const posRef = useRef<number>(0);
  const isDraggingRef = useRef(false);
  const isUserInteractingRef = useRef(false);
  const startXRef = useRef(0);
  const startPosRef = useRef(0);
  const hasMovedRef = useRef(false);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const [isDraggingState, setIsDraggingState] = useState(false);

  // Measure single set width and initialize starting scroll offset
  useEffect(() => {
    const el = setRef.current;
    if (!el) return;

    const measure = () => {
      const w = el.offsetWidth;
      if (w > 0) {
        const wasZero = setWidthRef.current === 0;
        setWidthRef.current = w;
        if (wasZero && containerRef.current) {
          posRef.current = w * 2;
          containerRef.current.scrollLeft = posRef.current;
        }
      }
    };

    measure();
    const ro = new ResizeObserver(() => measure());
    ro.observe(el);
    window.addEventListener('resize', measure);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  const scheduleResume = useCallback((delay = 1200) => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      isUserInteractingRef.current = false;
    }, delay);
  }, []);

  // Main continuous auto-scrolling loop
  useEffect(() => {
    let animId: number;

    const tick = (now: number) => {
      if (lastTimeRef.current === null) {
        lastTimeRef.current = now;
      }
      const delta = Math.min((now - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = now;

      const container = containerRef.current;
      const setWidth = setWidthRef.current;

      if (container && setWidth > 0) {
        // Automatic drift when not dragging or manually interacting
        if (!isUserInteractingRef.current && !isDraggingRef.current) {
          const move = speed * delta;
          if (direction === 'left') {
            posRef.current += move;
          } else {
            posRef.current -= move;
          }

          // Seamless loop wrap
          if (posRef.current >= setWidth * 4) {
            posRef.current -= setWidth;
          } else if (posRef.current <= setWidth) {
            posRef.current += setWidth;
          }

          container.scrollLeft = posRef.current;
        }
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [direction, speed]);

  // Mouse drag handlers (Desktop manual slide)
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    isDraggingRef.current = true;
    isUserInteractingRef.current = true;
    hasMovedRef.current = false;
    startXRef.current = e.pageX;
    startPosRef.current = posRef.current;
    setIsDraggingState(true);
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !containerRef.current) return;
    const dx = e.pageX - startXRef.current;
    if (Math.abs(dx) > 3) {
      hasMovedRef.current = true;
    }
    const setWidth = setWidthRef.current;
    posRef.current = startPosRef.current - dx;

    // Wrap check during drag
    if (setWidth > 0) {
      if (posRef.current >= setWidth * 4) {
        posRef.current -= setWidth;
        startPosRef.current -= setWidth;
      } else if (posRef.current <= setWidth) {
        posRef.current += setWidth;
        startPosRef.current += setWidth;
      }
    }

    containerRef.current.scrollLeft = posRef.current;
  };

  const handleMouseUp = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      setIsDraggingState(false);
      scheduleResume(1000);
    }
  };

  // Prevent accidental card click while dragging
  const handleClickCapture = (e: React.MouseEvent) => {
    if (hasMovedRef.current) {
      e.stopPropagation();
      e.preventDefault();
      hasMovedRef.current = false;
    }
  };

  // Mobile touch handlers
  const handleTouchStart = () => {
    isUserInteractingRef.current = true;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
  };

  const handleTouchEnd = () => {
    scheduleResume(1200);
  };

  // Detect manual scroll (mobile touch swipe, trackpad, mouse wheel)
  const handleScroll = () => {
    const container = containerRef.current;
    if (!container) return;
    const current = container.scrollLeft;

    // Distinguish user manual scroll from programmatic auto-scroll
    if (Math.abs(current - posRef.current) > 1.8) {
      posRef.current = current;
      isUserInteractingRef.current = true;
      scheduleResume(1200);

      const setWidth = setWidthRef.current;
      if (setWidth > 0) {
        if (posRef.current >= setWidth * 4) {
          posRef.current -= setWidth;
          container.scrollLeft = posRef.current;
        } else if (posRef.current <= setWidth) {
          posRef.current += setWidth;
          container.scrollLeft = posRef.current;
        }
      }
    }
  };

  // Pause on hover
  const handleMouseEnter = () => {
    if (!isDraggingRef.current) {
      isUserInteractingRef.current = true;
    }
  };

  const handleMouseLeave = () => {
    if (!isDraggingRef.current) {
      scheduleResume(400);
    }
  };

  // Window mouseup safeguard
  useEffect(() => {
    const onWindowMouseUp = () => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        setIsDraggingState(false);
        scheduleResume(1000);
      }
    };
    window.addEventListener('mouseup', onWindowMouseUp);
    return () => window.removeEventListener('mouseup', onWindowMouseUp);
  }, [scheduleResume]);

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onScroll={handleScroll}
      onClickCapture={handleClickCapture}
      className={`flex overflow-x-auto no-scrollbar py-6 sm:py-7 md:py-8 select-none ${
        isDraggingState ? 'cursor-grabbing' : 'cursor-grab'
      }`}
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {Array.from({ length: repeatSets }).map((_, setIndex) => (
        <div
          key={`set-${setIndex}`}
          ref={setIndex === 0 ? setRef : undefined}
          className="flex shrink-0 items-center gap-4 sm:gap-6 pr-4 sm:pr-6"
          aria-hidden={setIndex > 0 ? 'true' : undefined}
        >
          {skills.map((skill, skillIndex) => (
            <SkillCard key={`card-${setIndex}-${skillIndex}-${skill.name}`} skill={skill} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default function SkillsSection() {
  return (
    <section id="skills" className="py-16 sm:py-20 bg-slate-50/80 border-t border-slate-200/80 relative overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="text-xs uppercase tracking-widest text-[#9333ea] font-bold">Core Stack</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">Technical Proficiencies</h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3">Technologies and tools used across full-stack projects</p>
        </div>
      </div>

      {/* Infinite Loop Marquee Area with ample shadow headroom and edge fades */}
      <div className="relative w-full flex flex-col gap-1 sm:gap-2 marquee-mask">
        {/* Row 1: Upper layer (moving continuously from right to left: <--) */}
        <MarqueeRow skills={UPPER_SKILLS} direction="left" speed={42} />

        {/* Row 2: Lower layer (moving continuously from left to right: -->) */}
        <MarqueeRow skills={LOWER_SKILLS} direction="right" speed={38} />
      </div>
    </section>
  );
}
