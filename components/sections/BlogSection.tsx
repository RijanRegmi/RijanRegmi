'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, Clock, Check, BookOpen, ArrowRight } from 'lucide-react';
import { BLOG_POSTS } from '@/lib/data/blogs';
import { useCardReveal } from '@/lib/hooks/useCardReveal';

export default function BlogSection() {
  // Stagger 3 blog cards with 180ms between each (slower = more dramatic)
  const gridRef = useCardReveal<HTMLDivElement>(180);

  return (
    <section id="blog" className="py-24 bg-slate-50/80 border-t border-slate-200/80 relative overflow-hidden w-full max-w-full">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16 reveal-up delay-1">
          <span className="text-xs uppercase tracking-widest text-[#9333ea] font-bold">Engineering Insights</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 mt-2 tracking-tight">Architectural Deep-Dives</h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3">Technical analysis and real-world implementation case studies of live production applications</p>
        </div>

        {/* Blog cards grid — reveals one-by-one via useCardReveal */}
        <div ref={gridRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="rounded-3xl overflow-hidden flex flex-col justify-between bg-white border border-slate-200/90 hover:border-purple-500/50 shadow-lg hover:shadow-xl hover:shadow-purple-900/10 transition-shadow duration-300 group hover:-translate-y-2"
            >
              <div>
                {/* Article Screenshot Frame */}
                <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-900">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  <span className="absolute top-4 left-4 text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-white text-purple-700 border border-purple-200 shadow-sm">
                    {post.category}
                  </span>
                </div>

                {/* Body Content */}
                <div className="p-6 sm:p-7">
                  <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                    <span className="inline-flex items-center gap-1">
                      <Calendar size={13} className="text-purple-600" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock size={13} className="text-purple-600" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-purple-700 transition-colors leading-snug mb-3">
                    {post.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {post.excerpt}
                  </p>

                  {/* Key Technical Highlights */}
                  <div className="space-y-1.5 pt-3 border-t border-slate-100 mb-4">
                    {(post.challengesSolved || []).slice(0, 2).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check size={13} className="text-[#9333ea] mt-0.5 shrink-0" />
                        <span className="line-clamp-2">{item.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer Link Button */}
              <div className="px-6 pb-6 pt-2">
                <Link
                  href={`/blog/${post.slug}`}
                  className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-gradient-to-r hover:from-[#c026d3] hover:to-[#7c3aed] text-slate-800 hover:text-white border border-slate-200 hover:border-transparent text-xs font-bold transition-all duration-300 shadow-xs flex items-center justify-center gap-2 cursor-pointer group-hover:shadow-purple-900/20"
                >
                  <BookOpen size={14} />
                  <span>Read Full Case Study</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
