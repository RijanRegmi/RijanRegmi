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
          className="w-8 h-8 sm:w-9 sm:h-9 object-contain drop-shadow-sm pointer-events-none"
        />
      </div>

      {/* Text Content */}
      <div className="relative z-10 w-full flex flex-col items-center pointer-events-none">
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
  speed?: number;
  repeatSets?: number;
}

interface PointerSample {
  x: number;
  time: number;
}

function MarqueeRow({ skills, direction, speed = 40, repeatSets = 7 }: MarqueeRowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);
  const setWidthRef = useRef<number>(0);
  const posRef = useRef<number>(0);

  // Slipping physics & momentum state refs
  const isDraggingRef = useRef<boolean>(false);
  const isCoastingRef = useRef<boolean>(false);
  const isRestingRef = useRef<boolean>(false);
  const isHoveredRef = useRef<boolean>(false);
  const velocityRef = useRef<number>(0);
  const currentSpeedRef = useRef<number>(0);
  const lastXRef = useRef<number>(0);
  const historyRef = useRef<PointerSample[]>([]);
  const hasMovedRef = useRef<boolean>(false);
  const restTimerRef = useRef<NodeJS.Timeout | null>(null);

  const [isDraggingState, setIsDraggingState] = useState(false);

  // Base auto-drift speed direction
  const baseAutoSpeed = direction === 'left' ? speed : -speed;

  // Measure single set width and initialize starting scroll offset in the center
  useEffect(() => {
    const el = setRef.current;
    if (!el) return;

    const measure = () => {
      const w = el.offsetWidth;
      if (w > 0) {
        const wasZero = setWidthRef.current === 0;
        setWidthRef.current = w;
        if (wasZero && containerRef.current) {
          posRef.current = w * 2.5;
          containerRef.current.scrollLeft = posRef.current;
          currentSpeedRef.current = baseAutoSpeed;
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
  }, [baseAutoSpeed]);

  // Main high-precision physics loop with slippery inertia curve
  useEffect(() => {
    let animId: number;
    let prevTime = performance.now();

    const tick = (now: number) => {
      const delta = Math.min((now - prevTime) / 1000, 0.1);
      prevTime = now;

      const container = containerRef.current;
      const setWidth = setWidthRef.current;

      if (container && setWidth > 0) {
        if (isDraggingRef.current) {
          // Actively being dragged 1:1 by pointer: position updated in handlePointerMove
        } else if (isCoastingRef.current) {
          // ─── SLIPPING / HIGH-SPEED ROTATION MOMENTUM PHASE ───
          // Apply velocity
          posRef.current += velocityRef.current * delta;

          // Two-tier dynamic friction:
          // At high speed: friction is extremely low (~0.982), giving a free-wheeling "slipping" feel.
          // As it slows down below 600px/s: friction gently tightens (~0.965) to coast smoothly to a complete stop.
          const speedRatio = Math.min(Math.abs(velocityRef.current) / 2400, 1);
          const baseFriction = 0.965 + 0.017 * speedRatio;
          const frameFriction = Math.pow(baseFriction, delta * 60);
          velocityRef.current *= frameFriction;

          // When velocity drops below 8 px/s, it has completely stopped!
          if (Math.abs(velocityRef.current) < 8) {
            velocityRef.current = 0;
            isCoastingRef.current = false;
            isRestingRef.current = true;
            currentSpeedRef.current = 0;

            // Rest cleanly at the stopped position for 2 seconds, then smoothly ramp back into ambient loop
            if (restTimerRef.current) clearTimeout(restTimerRef.current);
            restTimerRef.current = setTimeout(() => {
              isRestingRef.current = false;
            }, 2000);
          }
        } else if (!isRestingRef.current && !isHoveredRef.current) {
          // ─── AMBIENT AUTO-DRIFT LOOP ───
          // Smoothly ramp back up to ambient speed
          const rampRate = Math.min(delta * 2, 1);
          currentSpeedRef.current += (baseAutoSpeed - currentSpeedRef.current) * rampRate;

          posRef.current += currentSpeedRef.current * delta;
        }

        // ─── SEAMLESS INFINITE LOOP WRAP ───
        if (posRef.current >= setWidth * 4.5) {
          posRef.current -= setWidth;
        } else if (posRef.current <= setWidth * 1.5) {
          posRef.current += setWidth;
        }

        container.scrollLeft = posRef.current;
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(animId);
      if (restTimerRef.current) clearTimeout(restTimerRef.current);
    };
  }, [baseAutoSpeed]);

  // Pointer Down: initiates interaction
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Only primary button
    if (e.button !== 0 && e.pointerType === 'mouse') return;

    isDraggingRef.current = true;
    isCoastingRef.current = false;
    isRestingRef.current = false;
    velocityRef.current = 0;
    currentSpeedRef.current = 0;
    hasMovedRef.current = false;

    if (restTimerRef.current) clearTimeout(restTimerRef.current);

    const now = performance.now();
    lastXRef.current = e.clientX;
    historyRef.current = [{ x: e.clientX, time: now }];

    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {}

    setIsDraggingState(true);
  };

  // Pointer Move: 1:1 real-time drag tracking & velocity sampling
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !containerRef.current) return;

    const now = performance.now();
    const currentX = e.clientX;
    const dx = currentX - lastXRef.current;
    lastXRef.current = currentX;

    if (Math.abs(dx) > 0) {
      hasMovedRef.current = true;
    }

    // Keep history of last 75ms for high-responsiveness flick detection
    historyRef.current.push({ x: currentX, time: now });
    historyRef.current = historyRef.current.filter((sample) => now - sample.time <= 75);

    // Direct 1:1 displacement: slow and smooth when dragging gently
    posRef.current -= dx;

    // Wrap check during drag
    const setWidth = setWidthRef.current;
    if (setWidth > 0) {
      if (posRef.current >= setWidth * 4.5) posRef.current -= setWidth;
      else if (posRef.current <= setWidth * 1.5) posRef.current += setWidth;
    }

    containerRef.current.scrollLeft = posRef.current;
  };

  // Pointer Up: launch slipping rotation physics or gentle stop
  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDraggingState(false);

    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}

    const now = performance.now();
    const recent = historyRef.current.filter((sample) => now - sample.time <= 75);

    let rawVelocity = 0;
    if (recent.length >= 2) {
      const oldest = recent[0];
      const newest = recent[recent.length - 1];
      const dt = (newest.time - oldest.time) / 1000;
      if (dt > 0.01) {
        const dist = oldest.x - newest.x;
        rawVelocity = dist / dt;
      }
    }

    // Apply rotation boost multiplier so a strong flick spins/slips fast
    let releaseVelocity = rawVelocity * 1.85;

    // Fast rotation cap (up to 4800 px/s)
    const maxVelocity = 4800;
    releaseVelocity = Math.max(-maxVelocity, Math.min(maxVelocity, releaseVelocity));

    // If moved fast (> 80 px/s): initiate slippery inertia that glides fast and stops
    // If moved slowly (<= 80 px/s): gentle slow stop right where the user released
    if (Math.abs(releaseVelocity) > 80) {
      velocityRef.current = releaseVelocity;
      isCoastingRef.current = true;
      isRestingRef.current = false;
    } else {
      velocityRef.current = 0;
      isCoastingRef.current = false;
      isRestingRef.current = true;

      // Resume ambient loop smoothly after a 1200ms rest
      if (restTimerRef.current) clearTimeout(restTimerRef.current);
      restTimerRef.current = setTimeout(() => {
        isRestingRef.current = false;
      }, 1200);
    }
  };

  // Prevent card click if dragging or spinning
  const handleClickCapture = (e: React.MouseEvent) => {
    if (hasMovedRef.current) {
      e.stopPropagation();
      e.preventDefault();
      hasMovedRef.current = false;
    }
  };

  // Hover detection: gently pause ambient drift on hover
  const handlePointerEnter = () => {
    if (!isDraggingRef.current && !isCoastingRef.current) {
      isHoveredRef.current = true;
    }
  };

  const handlePointerLeave = () => {
    isHoveredRef.current = false;
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClickCapture={handleClickCapture}
      className={`flex overflow-x-auto no-scrollbar py-6 sm:py-7 md:py-8 select-none ${
        isDraggingState ? 'cursor-grabbing' : 'cursor-grab'
      }`}
      style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
        touchAction: 'pan-y', // allows normal vertical scroll, captures horizontal gestures
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
        <MarqueeRow skills={UPPER_SKILLS} direction="left" speed={40} />

        {/* Row 2: Lower layer (moving continuously from left to right: -->) */}
        <MarqueeRow skills={LOWER_SKILLS} direction="right" speed={36} />
      </div>
    </section>
  );
}
