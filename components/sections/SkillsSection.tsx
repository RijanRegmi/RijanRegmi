'use client';

import React from 'react';
import { SKILLS } from '@/lib/data/skills';
import { useCardReveal } from '@/lib/hooks/useCardReveal';

export default function SkillsSection() {
  // Stagger skill cards with a short 80ms delay (many cards, faster pace)
  const gridRef = useCardReveal<HTMLDivElement>(80);

  return (
    <section id="skills" className="py-20 bg-slate-50/80 border-t border-slate-200/80 relative overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 reveal-up delay-1">
          <span className="text-xs uppercase tracking-widest text-[#9333ea] font-bold">Core Stack</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">Technical Proficiencies</h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3">Technologies and tools used across full-stack projects</p>
        </div>

        {/* Skill cards — reveal one-by-one via useCardReveal */}
        <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {SKILLS.map((skill, index) => (
            <div
              key={index}
              className="relative overflow-hidden p-6 sm:p-7 rounded-2xl text-center flex flex-col items-center justify-between min-h-[185px] bg-white hover:bg-slate-50 border border-slate-200/90 hover:border-purple-500/50 shadow-md hover:shadow-xl hover:shadow-purple-900/10 transition-shadow duration-300 hover:-translate-y-1.5 group cursor-pointer"
            >
              {/* Ambient Subtle Radial Glow */}
              <div className="absolute top-3 w-16 h-16 bg-purple-400/10 rounded-full blur-xl pointer-events-none group-hover:bg-purple-400/25 transition-colors duration-300" />

              {/* Circular Logo Badge Container */}
              <div className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-slate-100/90 border border-slate-200/90 flex items-center justify-center p-2.5 sm:p-3 mb-3.5 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] transition-transform duration-300">
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
                <p className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-purple-700 transition-colors tracking-tight">{skill.name}</p>
                <span className="mt-2.5 inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-semibold bg-purple-50 text-purple-700 border border-purple-200 group-hover:border-purple-400 transition-colors">
                  {skill.level}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
