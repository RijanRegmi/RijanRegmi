'use client';

import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Zap, ShieldCheck } from 'lucide-react';

export interface FloatingBadge {
  position: 'top-left' | 'bottom-right';
  type: 'verification' | 'split';
  category: string;
  title: string;
}

export interface ScreenItem {
  image: string;
  label?: string;
  badges?: FloatingBadge[];
}

interface MobileScreenshotSliderProps {
  screens: ScreenItem[];
}

export default function MobileScreenshotSlider({ screens }: MobileScreenshotSliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const updateActiveIndex = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const item = container.querySelector<HTMLElement>('[data-slider-item]');
    const step = item ? item.offsetWidth + 16 : 180;
    const newIdx = Math.round(container.scrollLeft / step);
    setActiveIdx(Math.max(0, Math.min(screens.length - 1, newIdx)));
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateActiveIndex, { passive: true });
    return () => el.removeEventListener('scroll', updateActiveIndex);
  }, [screens.length]);

  const scrollTo = (direction: 'prev' | 'next') => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const item = container.querySelector<HTMLElement>('[data-slider-item]');
    const step = item ? item.offsetWidth + 16 : 180;
    const targetScroll = direction === 'next' ? container.scrollLeft + step : container.scrollLeft - step;

    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth',
    });
  };

  if (!screens || screens.length === 0) return null;

  return (
    <div className="w-full my-8 relative overflow-visible">
      {/* Horizontal Scrollable Row */}
      <div
        ref={scrollRef}
        className="flex items-center gap-6 sm:gap-8 overflow-x-auto sm:overflow-visible snap-x snap-mandatory pt-6 pb-12 sm:pb-6 px-6 sm:px-4 sm:justify-center [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden scroll-smooth"
      >
        {screens.map((screen, sIdx) => (
          <div
            key={sIdx}
            data-slider-item
            className="snap-start sm:snap-center shrink-0 flex justify-center relative"
          >
            {/* Realistic Android Phone Device Shell (Matching Reference Mockup) */}
            <div className="relative w-[160px] sm:w-[225px] aspect-[9/19.5] rounded-[34px] sm:rounded-[42px] bg-[#0b101d] p-[6px] sm:p-[7.5px] shadow-[0_16px_32px_-6px_rgba(11,16,29,0.22),0_6px_14px_-2px_rgba(11,16,29,0.08)] hover:scale-[1.02] transition-transform duration-300">

              {/* Display Screen */}
              <div className="relative w-full h-full rounded-[28px] sm:rounded-[35px] overflow-hidden bg-black">
                {/* Small Realistic Android Camera Punch-Hole */}
                <div className="absolute top-2 sm:top-2.5 left-1/2 -translate-x-1/2 w-[9px] h-[9px] sm:w-[11px] sm:h-[11px] bg-black rounded-full z-20 ring-1 ring-black/30 pointer-events-none" />

                <img
                  src={screen.image}
                  alt={screen.label || 'Android Mobile UI'}
                  loading="lazy"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>

            {/* Optional Floating Glass Badges */}
            {screen.badges && screen.badges.map((badge, bIdx) => (
              badge.position === 'top-left' ? (
                <div
                  key={bIdx}
                  className="absolute -top-3 sm:-top-4 -left-4 sm:-left-6 z-30 bg-white/95 backdrop-blur-md px-2.5 py-1.5 sm:px-3.5 sm:py-2.5 rounded-2xl border border-slate-100 shadow-xl flex items-center gap-2 pointer-events-none animate-fade-in"
                >
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs shrink-0">
                    <Zap size={14} className="fill-emerald-500 text-emerald-500" />
                  </div>
                  <div className="text-left leading-tight">
                    <span className="block text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-slate-400">{badge.category}</span>
                    <span className="block text-[10px] sm:text-xs font-black text-slate-900">{badge.title}</span>
                  </div>
                </div>
              ) : (
                <div
                  key={bIdx}
                  className="absolute -bottom-3 sm:-bottom-4 -right-4 sm:-right-6 z-30 bg-white/95 backdrop-blur-md px-2.5 py-1.5 sm:px-3.5 sm:py-2.5 rounded-2xl border border-slate-100 shadow-xl flex items-center gap-2 pointer-events-none animate-fade-in"
                >
                  <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs shrink-0">
                    <ShieldCheck size={14} className="text-blue-600" />
                  </div>
                  <div className="text-left leading-tight">
                    <span className="block text-[8px] sm:text-[9px] font-bold uppercase tracking-wider text-slate-400">{badge.category}</span>
                    <span className="block text-[10px] sm:text-xs font-black text-slate-900">{badge.title}</span>
                  </div>
                </div>
              )
            ))}
          </div>
        ))}
      </div>

      {/* Slide Navigation Controls (< and > buttons + dots) */}
      <div className="flex sm:hidden items-center justify-center gap-3 mt-2">
        <button
          type="button"
          onClick={() => scrollTo('prev')}
          disabled={activeIdx === 0}
          aria-label="Previous screenshot"
          className="w-8 h-8 rounded-full bg-white border border-slate-300 shadow-sm flex items-center justify-center text-slate-700 hover:text-purple-600 hover:border-purple-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
        >
          <ChevronLeft size={16} />
        </button>

        {/* Slide Indicator Dots */}
        <div className="flex items-center gap-1.5">
          {screens.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                if (!scrollRef.current) return;
                const container = scrollRef.current;
                const item = container.firstElementChild as HTMLElement | null;
                const step = item ? item.offsetWidth + 16 : 180;
                container.scrollTo({ left: i * step, behavior: 'smooth' });
              }}
              aria-label={`Go to screenshot ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${activeIdx === i ? 'w-5 bg-purple-600' : 'w-1.5 bg-slate-300'
                }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollTo('next')}
          disabled={activeIdx === screens.length - 1}
          aria-label="Next screenshot"
          className="w-8 h-8 rounded-full bg-white border border-slate-300 shadow-sm flex items-center justify-center text-slate-700 hover:text-purple-600 hover:border-purple-300 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
