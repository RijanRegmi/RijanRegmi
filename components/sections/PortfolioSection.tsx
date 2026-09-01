'use client';

import React from 'react';
import { Sparkles, ExternalLink } from 'lucide-react';
import { PROJECTS } from '@/lib/data/projects';
import { useCardReveal } from '@/lib/hooks/useCardReveal';

export default function PortfolioSection() {
  // Stagger project cards one-by-one (200ms = slow, dramatic entry)
  const gridRef = useCardReveal<HTMLDivElement>(200);

  return (
    <section id="portfolio" className="py-24 bg-white border-t border-slate-200/80 relative overflow-hidden w-full max-w-full">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 reveal-up delay-1">
          <span className="text-xs uppercase tracking-widest text-[#9333ea] font-bold">Live Deployments &amp; Work</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 mt-2 tracking-tight">Featured Projects</h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3">Click on any project screen to launch and explore the live web application</p>
        </div>

        {/* 2-Column Wide Projects Grid — cards reveal one-by-one via useCardReveal */}
        <div ref={gridRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              className="rounded-3xl overflow-hidden group flex flex-col bg-white border border-slate-200/90 hover:border-purple-500/40 shadow-xl shadow-slate-200/60 hover:shadow-2xl hover:shadow-purple-900/10 transition-shadow duration-300 hover:-translate-y-1.5"
            >
              {/* 1. Website Screenshot with subtle bottom gradient fade & Hover Action Overlay */}
              <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden bg-slate-900">
                <div
                  onClick={() => {
                    if (project.url !== '#') {
                      window.open(project.url, '_blank', 'noopener,noreferrer');
                    }
                  }}
                  className={`block w-full h-full relative ${project.url !== '#' ? 'cursor-pointer' : 'cursor-default'}`}
                  title={project.url !== '#' ? `Visit ${project.title}` : undefined}
                >
                  <img
                    src={project.image}
                    alt={`${project.title} screenshot`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Dark gradient fade at bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Hover Container Reveal: "Visit Website" / "View Live Demo" Pill */}
                  {project.url !== '#' && (
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 pointer-events-none">
                      <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#c026d3] via-[#9333ea] to-[#7c3aed] text-white font-bold text-xs sm:text-sm shadow-2xl shadow-purple-900/60 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <Sparkles size={14} />
                        <span>{project.actionText}</span>
                        <ExternalLink size={14} />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 2. Card Content Body */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 space-y-4">
                <div>
                  {/* Domain Display on Top */}
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#9333ea] mb-1.5 flex items-center justify-between">
                    <span>{project.displayUrl}</span>
                  </div>

                  {/* Logo on Left in Front of the Name */}
                  <div className="flex items-center gap-3.5 my-2">
                    {project.logo && (
                      <img
                        src={project.logo}
                        alt={`${project.title} logo`}
                        loading="lazy"
                        decoding="async"
                        className="w-10 h-10 sm:w-12 sm:h-12 object-contain shrink-0 bg-transparent drop-shadow-sm"
                      />
                    )}
                    <div>
                      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 group-hover:text-purple-700 transition-colors tracking-tight leading-tight">
                        {project.title}
                      </h3>
                      <span className="text-[11px] text-slate-500 font-semibold mt-0.5 block">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
                    {project.desc}
                  </p>
                </div>

                {/* 3. Divider & Bottom Row: Tags + Action Link */}
                <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 mt-auto">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Button */}
                  {project.url !== '#' ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="nofollow noopener noreferrer"
                      className="text-xs font-bold uppercase tracking-wider text-[#9333ea] hover:text-purple-800 group-hover:underline inline-flex items-center gap-1.5 transition-colors"
                    >
                      <span>{project.actionText}</span>
                      <span className="sr-only">: {project.title}</span>
                      <ExternalLink size={13} />
                    </a>
                  ) : (
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-600 inline-flex items-center gap-1">
                      <span>{project.actionText}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
