'use client';

import React from 'react';
import Link from 'next/link';
import {
  Github,
  Linkedin,
  Instagram,
  Facebook,
  Heart
} from 'lucide-react';
import XIcon from '@/components/icons/XIcon';

export default function Footer() {
  return (
    <footer className="py-12 bg-slate-950 text-slate-400 border-t border-slate-800/80 w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Row: Brand & Social Profile Links */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-purple-500/40 bg-slate-900">
              <img src="/assets/imgs/RJN.png" alt="Rijan Regmi logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="text-sm font-bold text-white block">Rijan Regmi</span>
              <span className="text-xs text-slate-400">Full-Stack Developer &amp; Software Engineer</span>
            </div>
          </div>

          {/* Social Profile Links with rel='nofollow noopener noreferrer' */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 font-medium mr-1 hidden sm:inline">Connect:</span>
            <a
              href="https://github.com/RijanRegmi"
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="w-9 h-9 rounded-full bg-slate-900 hover:bg-[#9333ea] text-slate-300 hover:text-white border border-slate-800 transition-all flex items-center justify-center shadow-sm hover:scale-110"
              aria-label="Visit Rijan Regmi on GitHub"
            >
              <Github size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/rijan-regmi-a720372b3"
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="w-9 h-9 rounded-full bg-slate-900 hover:bg-[#9333ea] text-slate-300 hover:text-white border border-slate-800 transition-all flex items-center justify-center shadow-sm hover:scale-110"
              aria-label="Visit Rijan Regmi on LinkedIn"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="https://x.com/rijanregmi_"
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="w-9 h-9 rounded-full bg-slate-900 hover:bg-[#9333ea] text-slate-300 hover:text-white border border-slate-800 transition-all flex items-center justify-center shadow-sm hover:scale-110"
              aria-label="Visit Rijan Regmi on X"
            >
              <XIcon size={14} />
            </a>
            <a
              href="https://www.instagram.com/rijanregmi_"
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="w-9 h-9 rounded-full bg-slate-900 hover:bg-[#9333ea] text-slate-300 hover:text-white border border-slate-800 transition-all flex items-center justify-center shadow-sm hover:scale-110"
              aria-label="Visit Rijan Regmi on Instagram"
            >
              <Instagram size={16} />
            </a>
            <a
              href="https://www.facebook.com/rijan.regmi.946"
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="w-9 h-9 rounded-full bg-slate-900 hover:bg-[#9333ea] text-slate-300 hover:text-white border border-slate-800 transition-all flex items-center justify-center shadow-sm hover:scale-110"
              aria-label="Visit Rijan Regmi on Facebook"
            >
              <Facebook size={16} />
            </a>
          </div>
        </div>

        {/* Bottom Row: Copyright & Unique Internal Links */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="flex items-center gap-1 text-slate-400">
            <span>© {new Date().getFullYear()} Rijan Regmi. Built with precision &amp;</span>
            <Heart size={13} className="text-purple-500 fill-purple-500 inline" />
          </p>

          <nav aria-label="Footer Quick Navigation" className="flex flex-wrap items-center justify-center gap-5 sm:gap-6 font-medium text-slate-300">
            <Link href="/" aria-label="Navigate to Home overview" className="hover:text-purple-400 transition-colors">
              Home Overview
            </Link>
            <Link href="/#about" aria-label="Navigate to About Rijan section" className="hover:text-purple-400 transition-colors">
              About Rijan
            </Link>
            <Link href="/#skills" aria-label="Navigate to Technical Stack section" className="hover:text-purple-400 transition-colors">
              Technical Stack
            </Link>
            <Link href="/#certificates" aria-label="Navigate to Verified Credentials section" className="hover:text-purple-400 transition-colors">
              Credentials
            </Link>
            <Link href="/#services" aria-label="Navigate to Services List section" className="hover:text-purple-400 transition-colors">
              Services List
            </Link>
            <Link href="/#portfolio" aria-label="Navigate to Project Catalog section" className="hover:text-purple-400 transition-colors">
              Project Catalog
            </Link>
            <Link href="/#blog" aria-label="Navigate to Engineering Case Studies section" className="hover:text-purple-400 transition-colors">
              Case Studies
            </Link>
            <Link href="/#contact" aria-label="Navigate to Contact Form" className="hover:text-purple-400 transition-colors">
              Get In Touch
            </Link>
          </nav>
        </div>

      </div>
    </footer>
  );
}
