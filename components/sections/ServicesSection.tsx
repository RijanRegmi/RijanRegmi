'use client';

import React from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { SERVICES } from '@/lib/data/services';
import { useCardReveal } from '@/lib/hooks/useCardReveal';

export default function ServicesSection() {
  // Stagger cards one-by-one as section enters viewport (150ms between each card)
  const gridRef = useCardReveal<HTMLDivElement>(150);

  return (
    <section id="services" className="py-24 bg-white border-t border-slate-200/80 relative overflow-hidden w-full max-w-full">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20 reveal-up delay-1">
          <span className="text-xs uppercase tracking-widest text-[#9333ea] font-bold">
            What I Offer
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 mt-2 tracking-tight">
            My Services
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Comprehensive full-stack engineering, API architecture, mobile solutions, and technical advisory built for performance, reliability, and business impact.
          </p>
        </div>

        {/* 8-Card Responsive Grid — cards reveal one-by-one via useCardReveal */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {SERVICES.map((service) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                className="rounded-3xl p-6 sm:p-7 flex flex-col justify-between bg-white border border-slate-200/90 hover:border-purple-500/50 shadow-md hover:shadow-xl hover:shadow-purple-900/10 transition-shadow duration-300 hover:-translate-y-1.5 group relative overflow-hidden"
              >
                {/* Subtle Gradient Backlight on Hover */}
                <div className={`absolute -top-12 -right-12 w-32 h-32 bg-gradient-to-br ${service.gradient} rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none`} />

                <div className="relative z-10">
                  {/* Top row: Icon + Category Badge */}
                  <div className="flex items-center justify-between gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200/80 flex items-center justify-center text-[#9333ea] group-hover:scale-110 group-hover:bg-[#9333ea] group-hover:text-white transition-all duration-300 shadow-sm">
                      <IconComponent size={22} />
                    </div>
                    <span className="text-[10px] sm:text-[11px] font-semibold uppercase px-2.5 py-0.5 rounded-full border bg-purple-50 text-purple-700 border-purple-200">
                      {service.category}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-purple-700 transition-colors mt-4 tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mt-2">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check size={14} className="text-[#9333ea] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action Link */}
                <div className="relative z-10 mt-6 pt-3 border-t border-slate-100">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#9333ea] hover:text-purple-800 transition-colors"
                  >
                    <span>Inquire Service</span>
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
