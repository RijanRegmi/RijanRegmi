'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-8 bg-slate-900 text-center text-xs text-slate-400 border-t border-slate-800 w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} Rijan Regmi. All rights reserved.</p>
        <div className="flex items-center gap-6 font-medium text-slate-300">
          <Link href="/" className="hover:text-purple-400 transition-colors">Home</Link>
          <Link href="/#about" className="hover:text-purple-400 transition-colors">About</Link>
          <Link href="/#skills" className="hover:text-purple-400 transition-colors">Skills</Link>
          <Link href="/#certificates" className="hover:text-purple-400 transition-colors">Certificates</Link>
          <Link href="/#portfolio" className="hover:text-purple-400 transition-colors">Portfolio</Link>
          <Link href="/#blog" className="hover:text-purple-400 transition-colors">Blog</Link>
          <Link href="/#contact" className="hover:text-purple-400 transition-colors">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
