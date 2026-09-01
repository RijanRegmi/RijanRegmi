'use client';

import React from 'react';
import {
  Github,
  Linkedin,
  Instagram,
  Facebook
} from 'lucide-react';
import XIcon from '@/components/icons/XIcon';

export default function HeroSection() {
  return (
    <section id="home" className="relative w-full min-h-[90vh] sm:min-h-[880px] bg-gradient-to-b from-purple-50/50 via-white to-slate-50/80 flex flex-col justify-center pt-28 sm:pt-36 lg:pt-32 pb-16 sm:pb-24 px-4 sm:px-8 lg:px-16 overflow-hidden">
      {/* Soft Ambient Radial Backlights */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-purple-200/40 rounded-full blur-[140px] pointer-events-none -z-0" />
      <div className="absolute bottom-1/4 left-10 w-[500px] h-[500px] bg-fuchsia-200/30 rounded-full blur-[120px] pointer-events-none -z-0" />

      <div className="max-w-7xl w-full mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

        {/* Column: Info, Big Name, Role, Actions, Stats (Centered on Mobile, Left-aligned on Desktop) */}
        <div className="lg:col-span-7 flex flex-col items-center text-center lg:items-start lg:text-left space-y-6 sm:space-y-8 animate-hero-slide-left">
          <div className="space-y-1.5 sm:space-y-2 w-full">
            <p className="text-xs sm:text-sm text-slate-500 font-bold tracking-widest uppercase">
              Hi I am
            </p>
            <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[90px] font-black text-slate-950 tracking-tight leading-tight sm:leading-[0.95]">
              <span>Rijan Regmi</span>
              <span className="sr-only"> — Full-Stack Developer &amp; Software Engineer</span>
            </h1>
            <p className="text-base xs:text-lg sm:text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#c026d3] via-[#9333ea] to-[#7c3aed] tracking-wide uppercase pt-1">
              UI/UX &amp; Full-Stack Developer
            </p>
          </div>

          {/* Social Icons Row (Centered on Mobile) */}
          <div className="flex items-center justify-center lg:justify-start gap-2.5 sm:gap-3 pt-1 w-full">
            <a
              href="https://www.instagram.com/rijanregmi_"
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white hover:bg-[#a855f7] text-slate-700 hover:text-white border border-slate-200 hover:border-purple-500 transition-all flex items-center justify-center shadow-md hover:scale-110"
              aria-label="Instagram Profile"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/rijan-regmi-a720372b3"
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white hover:bg-[#a855f7] text-slate-700 hover:text-white border border-slate-200 hover:border-purple-500 transition-all flex items-center justify-center shadow-md hover:scale-110"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://github.com/RijanRegmi"
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white hover:bg-[#a855f7] text-slate-700 hover:text-white border border-slate-200 hover:border-purple-500 transition-all flex items-center justify-center shadow-md hover:scale-110"
              aria-label="GitHub Profile"
            >
              <Github size={18} />
            </a>
            <a
              href="https://x.com/rijanregmi_"
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white hover:bg-[#a855f7] text-slate-700 hover:text-white border border-slate-200 hover:border-purple-500 transition-all flex items-center justify-center shadow-md hover:scale-110"
              aria-label="X Profile"
            >
              <XIcon size={16} />
            </a>
            <a
              href="https://www.facebook.com/rijan.regmi.946"
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white hover:bg-[#a855f7] text-slate-700 hover:text-white border border-slate-200 hover:border-purple-500 transition-all flex items-center justify-center shadow-md hover:scale-110"
              aria-label="Facebook Profile"
            >
              <Facebook size={18} />
            </a>
          </div>

          {/* Action Buttons Row */}
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1 w-full">
            <a
              href="#contact"
              className="w-[145px] sm:w-[170px] h-[48px] sm:h-[52px] inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#c026d3] via-[#9333ea] to-[#7c3aed] hover:from-[#a21caf] hover:to-[#6b21a8] text-white font-bold text-sm sm:text-base shadow-xl shadow-purple-900/25 transition-all hover:scale-105 active:scale-95"
            >
              <span>Hire Me</span>
              <span className="sr-only"> for Full-Stack Development</span>
            </a>
            <a
              href="/assets/CV-Rijan Regmi.pdf"
              download="CV-Rijan Regmi.pdf"
              className="w-[145px] sm:w-[170px] h-[48px] sm:h-[52px] inline-flex items-center justify-center rounded-xl bg-white hover:bg-slate-50 text-slate-800 hover:text-purple-700 border border-slate-300 font-semibold text-sm sm:text-base shadow-sm transition-all hover:scale-105 active:scale-95"
            >
              <span>Download CV</span>
              <span className="sr-only"> (Hero Header Document)</span>
            </a>
          </div>

          {/* Stats Bar */}
          <div className="pt-2 sm:pt-3 w-full flex justify-center lg:justify-start">
            <div className="inline-flex items-center justify-center gap-4 sm:gap-8 lg:gap-10 bg-white/90 backdrop-blur-md border border-slate-200/90 rounded-2xl px-4 sm:px-7 py-3.5 sm:py-4 shadow-xl shadow-slate-900/5 w-full max-w-md sm:w-fit">
              <div className="text-center">
                <div className="text-xl sm:text-2xl lg:text-3xl font-black text-[#9333ea]">3+</div>
                <div className="text-[11px] sm:text-xs text-slate-500 font-semibold mt-0.5 whitespace-nowrap">Experiences</div>
              </div>
              <div className="w-[1px] h-8 bg-slate-200" />
              <div className="text-center">
                <div className="text-xl sm:text-2xl lg:text-3xl font-black text-[#9333ea]">20+</div>
                <div className="text-[11px] sm:text-xs text-slate-500 font-semibold mt-0.5 whitespace-nowrap">Project done</div>
              </div>
              <div className="w-[1px] h-8 bg-slate-200" />
              <div className="text-center">
                <div className="text-xl sm:text-2xl lg:text-3xl font-black text-[#9333ea]">30+</div>
                <div className="text-[11px] sm:text-xs text-slate-500 font-semibold mt-0.5 whitespace-nowrap">Happy Clients</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Circular Portrait */}
        <div className="lg:col-span-5 flex justify-center items-center pt-4 lg:pt-0 animate-hero-slide-right">
          <div className="relative w-[260px] h-[260px] sm:w-[360px] sm:h-[360px] lg:w-[460px] lg:h-[460px] rounded-full bg-gradient-to-b from-purple-100/70 to-slate-100 border border-purple-200/80 shadow-2xl flex items-center justify-center overflow-hidden group">
            {/* Backlight circular glow in RJN purple */}
            <div className="absolute inset-0 rounded-full bg-purple-500/15 blur-3xl pointer-events-none group-hover:bg-purple-500/25 transition-all duration-700" />

            {/* Header Profile Photo (Critical LCP Image with high fetch priority and eager loading) */}
            <img
              src="/assets/imgs/header.jpeg"
              alt="Rijan Regmi"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="w-full h-full object-cover object-[center_25%] group-hover:scale-105 transition-transform duration-700 relative z-10"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
