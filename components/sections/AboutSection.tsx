'use client';

import React from 'react';
import {
  Printer,
  Facebook,
  Instagram,
  Github,
  Linkedin,
  Layout,
  Code2,
  TrendingUp
} from 'lucide-react';
import XIcon from '@/components/icons/XIcon';

export default function AboutSection() {
  return (
    <section id="about" className="py-20 sm:py-24 bg-white border-t border-slate-200/80 relative overflow-hidden w-full max-w-full">
      <div className="max-w-md md:max-w-7xl mx-auto px-8 sm:px-12 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 sm:gap-16 md:gap-12 items-start">

          {/* Column 1: Who am I ? */}
          <div className="flex flex-col justify-between h-full md:border-r md:border-slate-200 md:pr-8 space-y-6 reveal-left delay-1">
            <div>
              <div className="relative inline-block mb-4 sm:mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  Who am I ?
                </h2>
                <div className="w-12 h-0.5 bg-[#a855f7] mt-1.5 rounded-full" />
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-3 leading-snug">
                A Web and Software Designer / Developer
              </h3>

              <p className="text-slate-600 text-sm leading-relaxed mb-6 font-normal">
                A passionate Web and Software Designer/Developer dedicated to creating innovative digital experiences.
              </p>
            </div>

            <div>
              <a
                href="/assets/CV-Rijan Regmi.pdf"
                download="CV-Rijan Regmi.pdf"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#9333ea] text-[#9333ea] hover:bg-[#9333ea] hover:text-white transition-all text-xs font-semibold uppercase tracking-wider shadow-sm group cursor-pointer"
              >
                <Printer size={15} className="group-hover:scale-110 transition-transform" />
                Download My CV
              </a>
            </div>
          </div>

          {/* Column 2: Personal Info */}
          <div className="flex flex-col justify-between h-full md:border-r md:border-slate-200 md:pr-8 space-y-6 reveal-up delay-2">
            <div>
              <div className="relative inline-block mb-4 sm:mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  Personal Info
                </h2>
                <div className="w-12 h-0.5 bg-[#a855f7] mt-1.5 rounded-full" />
              </div>

              <ul className="space-y-3 text-sm">
                <li className="text-slate-700">
                  <strong className="text-slate-900 font-semibold">Birthdate :</strong>{' '}
                  <span className="text-slate-500 ml-1">2004/06/29</span>
                </li>
                <li className="text-slate-700">
                  <strong className="text-slate-900 font-semibold">Email :</strong>{' '}
                  <a href="mailto:rijanregmi8@gmail.com" className="text-[#9333ea] hover:underline ml-1">
                    rijanregmi8@gmail.com
                  </a>
                </li>
                <li className="text-slate-700">
                  <strong className="text-slate-900 font-semibold">Phone :</strong>{' '}
                  <span className="text-slate-500 ml-1">+ (977) 9869061333</span>
                </li>
                <li className="text-slate-700">
                  <strong className="text-slate-900 font-semibold">Address :</strong>{' '}
                  <span className="text-slate-500 ml-1">Nepal, kathmandu.</span>
                </li>
              </ul>
            </div>

            {/* Social icons row below Personal Info */}
            <div className="flex items-center gap-4 pt-4 text-[#9333ea]">
              <a href="https://www.facebook.com/rijan.regmi.946" target="_blank" rel="noopener noreferrer" className="hover:text-purple-800 transition-colors" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="https://x.com/rijanregmi_" target="_blank" rel="noopener noreferrer" className="hover:text-purple-800 transition-colors" aria-label="X">
                <XIcon size={16} />
              </a>
              <a href="https://www.instagram.com/rijanregmi_" target="_blank" rel="noopener noreferrer" className="hover:text-purple-800 transition-colors" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="https://github.com/RijanRegmi" target="_blank" rel="noopener noreferrer" className="hover:text-purple-800 transition-colors" aria-label="GitHub">
                <Github size={18} />
              </a>
              <a href="https://www.linkedin.com/in/rijan-regmi-a720372b3" target="_blank" rel="noopener noreferrer" className="hover:text-purple-800 transition-colors" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Column 3: My Expertise */}
          <div className="space-y-6 reveal-right delay-3">
            <div className="relative inline-block mb-4 sm:mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                My Expertise
              </h2>
              <div className="w-12 h-0.5 bg-[#a855f7] mt-1.5 rounded-full" />
            </div>

            <div className="space-y-4">
              {/* Row 1: UX Design */}
              <div className="flex items-start gap-3.5 pb-4 border-b border-slate-200">
                <div className="p-2 rounded-lg bg-purple-100 text-[#9333ea] shrink-0 border border-purple-200">
                  <Layout size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">UX Design</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Crafting intuitive and user centered designs.</p>
                </div>
              </div>

              {/* Row 2: Web Development */}
              <div className="flex items-start gap-3.5 pb-4 border-b border-slate-200">
                <div className="p-2 rounded-lg bg-purple-100 text-[#9333ea] shrink-0 border border-purple-200">
                  <Code2 size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Web Development</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Building responsive and dynamic websites.</p>
                </div>
              </div>

              {/* Row 3: Software Development */}
              <div className="flex items-start gap-3.5">
                <div className="p-2 rounded-lg bg-purple-100 text-[#9333ea] shrink-0 border border-purple-200">
                  <TrendingUp size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Software Development</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Developing robust and scalable software solutions.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
