'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, Send } from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════════════
//  FloatingNavbar — Self-contained Navbar Component
//  All navbar content, menu links, brand config, and animations are managed HERE.
//  Usage in pages: <FloatingNavbar /> (no props required)
// ═══════════════════════════════════════════════════════════════════════════

export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
  badge?: string;
}

// ── Default Navbar Content Configuration ─────────────────────────────────────
const DEFAULT_BRAND_FIRST = 'Rijan';
const DEFAULT_BRAND_SECOND = 'Regmi';
const DEFAULT_LOGO_IMG = '/assets/imgs/RJN.png';
const DEFAULT_CTA_LABEL = 'Contact Me';
const DEFAULT_CTA_HREF = '#contact';
const DEFAULT_ACCENT_COLOR = 'purple';
const DEFAULT_THEME = 'dark';

const DEFAULT_NAV_ITEMS: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Blog', href: '#blog' },
  // { label: 'Resume', href: '/assets/Resume-Rijan Regmi.pdf', isExternal: true, badge: 'PDF' },
];

export interface FloatingNavbarProps {
  brandNameFirst?: string;
  brandNameSecond?: string;
  subTitle?: string;
  logoImg?: string;
  navItems?: NavItem[];
  ctaLabel?: string;
  ctaHref?: string;
  ctaOnClick?: () => void;
  accentColor?: 'purple' | 'emerald' | 'indigo' | 'blue' | 'orange';
  theme?: 'light' | 'dark';
}

export default function FloatingNavbar({
  brandNameFirst = DEFAULT_BRAND_FIRST,
  brandNameSecond = DEFAULT_BRAND_SECOND,
  logoImg = DEFAULT_LOGO_IMG,
  navItems = DEFAULT_NAV_ITEMS,
  ctaLabel = DEFAULT_CTA_LABEL,
  ctaHref = DEFAULT_CTA_HREF,
  ctaOnClick,
  accentColor = DEFAULT_ACCENT_COLOR,
  theme = DEFAULT_THEME,
}: FloatingNavbarProps = {}) {
  const pathname = usePathname();
  const [activeHref, setActiveHref] = useState<string>('');
  const [clickedItem, setClickedItem] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const lastClickTimeRef = useRef<number>(0);
  const navContainerRef = useRef<HTMLDivElement>(null);

  // Close mobile menu on outside click or escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        mobileMenuOpen &&
        navContainerRef.current &&
        !navContainerRef.current.contains(event.target as Node)
      ) {
        setMobileMenuOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  // Robust Unblockable Sentinel IntersectionObserver for Brand Collapse
  useEffect(() => {
    let sentinel = document.getElementById('navbar-scroll-sentinel');
    let created = false;
    if (!sentinel) {
      sentinel = document.createElement('div');
      sentinel.id = 'navbar-scroll-sentinel';
      sentinel.style.position = 'absolute';
      sentinel.style.top = '0px';
      sentinel.style.left = '0px';
      sentinel.style.width = '100%';
      sentinel.style.height = '35px';
      sentinel.style.pointerEvents = 'none';
      sentinel.style.visibility = 'hidden';
      sentinel.style.zIndex = '-9999';
      document.body.prepend(sentinel);
      created = true;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When sentinel is intersecting with viewport top, user is at top -> isScrolled = false
        // When sentinel scrolls out of viewport, user is scrolled down -> isScrolled = true
        setIsScrolled(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(sentinel);

    // Synchronous scroll handler backup
    const checkScroll = () => {
      const top =
        window.pageYOffset ||
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        (document.scrollingElement ? document.scrollingElement.scrollTop : 0) ||
        0;

      if (top > 25) {
        setIsScrolled(true);
      } else if (top === 0) {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', checkScroll, { passive: true, capture: true });
    document.addEventListener('scroll', checkScroll, { passive: true, capture: true });
    window.addEventListener('wheel', checkScroll, { passive: true });
    window.addEventListener('touchmove', checkScroll, { passive: true });

    return () => {
      observer.disconnect();
      if (created && sentinel && sentinel.parentNode) {
        sentinel.parentNode.removeChild(sentinel);
      }
      window.removeEventListener('scroll', checkScroll, { capture: true });
      document.removeEventListener('scroll', checkScroll, { capture: true });
      window.removeEventListener('wheel', checkScroll);
      window.removeEventListener('touchmove', checkScroll);
    };
  }, []);

  // Scroll spy to highlight active section
  useEffect(() => {
    if (!pathname || pathname !== '/') {
      setActiveHref(pathname || '');
      return;
    }

    if (typeof window !== 'undefined' && window.location.hash) {
      const initialHash = window.location.hash;
      setActiveHref(initialHash);
      lastClickTimeRef.current = Date.now();
      const hashId = initialHash.replace('#', '');
      setTimeout(() => {
        const el = document.getElementById(hashId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    }

    const handleActiveSection = () => {
      const currentRaw =
        window.pageYOffset ||
        window.scrollY ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        (document.scrollingElement ? document.scrollingElement.scrollTop : 0) ||
        0;

      if (Date.now() - lastClickTimeRef.current < 900) {
        return;
      }

      const contactEl = document.getElementById('contact');
      const blogEl = document.getElementById('blog');
      const portfolioEl = document.getElementById('portfolio');
      const servicesEl = document.getElementById('services');
      const certificatesEl = document.getElementById('certificates');
      const skillsEl = document.getElementById('skills');
      const aboutEl = document.getElementById('about');

      const scrollPos = currentRaw + 220;

      if (contactEl && scrollPos >= contactEl.offsetTop - 120) {
        setActiveHref('#contact');
      } else if (blogEl && scrollPos >= blogEl.offsetTop - 120) {
        setActiveHref('#blog');
      } else if (portfolioEl && scrollPos >= portfolioEl.offsetTop - 120) {
        setActiveHref('#portfolio');
      } else if (servicesEl && scrollPos >= servicesEl.offsetTop - 120) {
        setActiveHref('#services');
      } else if (certificatesEl && scrollPos >= certificatesEl.offsetTop - 120) {
        setActiveHref('#certificates');
      } else if (skillsEl && scrollPos >= skillsEl.offsetTop - 120) {
        setActiveHref('#skills');
      } else if (aboutEl && scrollPos >= aboutEl.offsetTop - 120) {
        setActiveHref('#about');
      } else {
        setActiveHref('');
      }
    };

    handleActiveSection();
    window.addEventListener('scroll', handleActiveSection, { passive: true, capture: true });
    document.addEventListener('scroll', handleActiveSection, { passive: true, capture: true });
    return () => {
      window.removeEventListener('scroll', handleActiveSection, { capture: true });
      document.removeEventListener('scroll', handleActiveSection, { capture: true });
    };
  }, [pathname]);

  const scrollToTop = (e: React.MouseEvent) => {
    if (typeof window !== 'undefined' && window.location.pathname !== '/') {
      return;
    }
    e.preventDefault();
    setActiveHref('');
    lastClickTimeRef.current = Date.now();
    if (typeof window !== 'undefined') {
      history.replaceState(null, '', '/');
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setActiveHref(href);
    setClickedItem(href);
    setTimeout(() => setClickedItem(null), 450);
    lastClickTimeRef.current = Date.now();
    setMobileMenuOpen(false);

    if (href.startsWith('/') && !href.includes('#')) {
      return;
    }

    const hashPart = href.includes('#') ? href.split('#')[1] : '';
    if (!hashPart) return;

    if (typeof window !== 'undefined') {
      const isHomePage = window.location.pathname === '/' || window.location.pathname === '';
      if (isHomePage) {
        e.preventDefault();
        const elem = document.getElementById(hashPart);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
          history.replaceState(null, '', `#${hashPart}`);
        }
      } else {
        window.location.href = `/#${hashPart}`;
      }
    }
  };

  const isDark = theme === 'dark';

  // Theme styling definitions
  const themeStyles = {
    purple: {
      textAccent: 'text-[#d946ef]',
      ctaBtn: 'bg-gradient-to-r from-[#c026d3] via-[#9333ea] to-[#7c3aed] hover:from-[#a21caf] hover:to-[#6b21a8] text-white shadow-lg shadow-purple-900/40 font-semibold',
      badge: 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
    },
    emerald: {
      textAccent: 'text-emerald-500',
      ctaBtn: 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold',
      badge: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
    },
    indigo: {
      textAccent: 'text-indigo-500',
      ctaBtn: 'bg-indigo-600 hover:bg-indigo-700 text-white font-semibold',
      badge: 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30',
    },
    blue: {
      textAccent: 'text-blue-500',
      ctaBtn: 'bg-blue-600 hover:bg-blue-700 text-white font-semibold',
      badge: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
    },
    orange: {
      textAccent: 'text-[#ff6b00]',
      ctaBtn: 'bg-[#ff6b00] hover:bg-[#ff5500] text-white font-semibold',
      badge: 'bg-orange-500/20 text-orange-300 border border-orange-500/30',
    },
  }[accentColor];

  const brandFirstClass = isDark ? 'text-white' : 'text-slate-950';

  return (
    <header className="fixed top-2.5 sm:top-4 left-0 right-0 z-50 w-full max-w-[100vw] box-border px-2 sm:px-4 md:px-6 pointer-events-none transition-all duration-500">
      {/* Centered spacious container */}
      <div
        ref={navContainerRef}
        className={`relative mx-auto flex flex-col items-center pointer-events-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isScrolled ? 'max-w-[1240px] w-full' : 'max-w-[1380px] w-full'
          }`}
      >
        {/* Transparent Frosted Glass Floating Pill Container */}
        <div className={`relative rounded-full px-3 sm:px-5 py-2 sm:py-2.5 flex items-center justify-between gap-2 sm:gap-3 lg:gap-4 ${isDark
            ? 'bg-[#0e0e14]/85 border border-white/10 shadow-2xl shadow-black/60'
            : 'bg-white/70 backdrop-blur-2xl sm:backdrop-blur-3xl border border-white/75 shadow-lg shadow-slate-900/5'
          } backdrop-blur-2xl sm:backdrop-blur-3xl w-full overflow-hidden animate-navbar-glass-reveal`}>

          {/* Inner Content */}
          <div className="w-full flex items-center justify-between gap-2 sm:gap-3 lg:gap-4">
            {/* 1. Left: Animated Splitting Logo with Smooth Scroll to Very Top */}
            <Link
              href="/"
              onClick={scrollToTop}
              className="flex items-center group cursor-pointer select-none shrink-0 pl-1 sm:pl-2"
              title={`${brandNameFirst} ${brandNameSecond} Portfolio`}
            >
              {/* Animated Circular Logo Icon with higher z-index so text slides underneath it */}
              <div
                className={`relative z-20 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-black/40 flex items-center justify-center shrink-0 transition-all duration-[1000ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:rotate-1 ${isScrolled ? 'scale-95' : 'scale-105'
                  }`}
              >
                <Image
                  src={logoImg}
                  alt={`${brandNameFirst} ${brandNameSecond} Logo`}
                  width={44}
                  height={44}
                  priority
                  unoptimized
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              {/* Splitting Brand Text: Emerges & splits out from behind the logo icon */}
              <div
                style={{
                  maxWidth: isScrolled ? 0 : 280,
                  opacity: isScrolled ? 0 : 1,
                  transform: isScrolled ? 'translateX(-24px) scale(0.9)' : 'translateX(0) scale(1)',
                  pointerEvents: isScrolled ? 'none' : 'auto',
                }}
                className={`relative z-10 flex flex-col justify-center overflow-hidden py-1 transition-all duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] origin-left will-change-[max-width,transform,opacity] ${
                  isScrolled
                    ? 'max-w-0 opacity-0 -translate-x-12 scale-90 ml-0 pointer-events-none'
                    : 'max-w-[280px] opacity-100 translate-x-0 scale-100 ml-2.5 sm:ml-3.5'
                }`}
              >
                <div className="flex items-baseline font-black tracking-tight text-xl sm:text-2xl leading-none whitespace-nowrap">
                  <span className={brandFirstClass}>{brandNameFirst}</span>
                  <span className={`${themeStyles.textAccent} ml-1`}>{brandNameSecond}</span>
                </div>
              </div>
            </Link>

            {/* 2. Middle: Single-Line Nav Items with Direct Bubble Hover & Spring Pulse */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 text-[13.5px] xl:text-[14.5px] font-medium shrink-0">
              {navItems.map((item) => {
                const isActive = (item.href.startsWith('/') && pathname === item.href) || activeHref === item.href;
                const isClicked = clickedItem === item.href;

                return (
                  <div key={item.label} className="relative shrink-0">
                    {item.href.startsWith('/') && !item.href.includes('#') ? (
                      <Link
                        href={item.href}
                        onClick={() => {
                          setClickedItem(item.href);
                          setTimeout(() => setClickedItem(null), 450);
                        }}
                        className={`nav-pill-link ${isActive ? 'active-pill' : ''} ${isClicked ? 'clicked-pill' : ''}`}
                      >
                        <span className="nav-pill-text whitespace-nowrap inline-block">
                          {item.label}
                        </span>
                        {item.badge && (
                          <span
                            className={`text-[9px] font-semibold uppercase px-1.5 py-0.2 rounded-full whitespace-nowrap ${themeStyles.badge}`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    ) : (
                      <a
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href)}
                        className={`nav-pill-link ${isActive ? 'active-pill' : ''} ${isClicked ? 'clicked-pill' : ''}`}
                      >
                        <span className="nav-pill-text whitespace-nowrap inline-block">
                          {item.label}
                        </span>
                        {item.badge && (
                          <span
                            className={`text-[9px] font-semibold uppercase px-1.5 py-0.2 rounded-full whitespace-nowrap ${themeStyles.badge}`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </a>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* 3. Right: High-Impact Single-Line Pill CTA Button with White Text */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0 pr-1 sm:pr-1.5">
              {ctaHref.startsWith('/') && !ctaHref.includes('#') ? (
                <Link
                  href={ctaHref}
                  onClick={ctaOnClick}
                  className={`hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold text-white transition-all duration-200 hover:scale-105 active:scale-95 select-none whitespace-nowrap shrink-0 outline-none focus:outline-none focus:ring-0 focus-visible:outline-none ${themeStyles.ctaBtn}`}
                >
                  <Send className="w-4 h-4 shrink-0 text-white" />
                  <span className="whitespace-nowrap text-white font-bold">{ctaLabel}</span>
                </Link>
              ) : (
                <a
                  href={ctaHref}
                  onClick={(e) => {
                    if (ctaOnClick) {
                      ctaOnClick();
                    } else {
                      handleNavClick(e, ctaHref);
                    }
                  }}
                  className={`hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold text-white transition-all duration-200 hover:scale-105 active:scale-95 select-none cursor-pointer whitespace-nowrap shrink-0 outline-none focus:outline-none focus:ring-0 focus-visible:outline-none ${themeStyles.ctaBtn}`}
                >
                  <Send className="w-4 h-4 shrink-0 text-white" />
                  <span className="whitespace-nowrap text-white font-bold">{ctaLabel}</span>
                </a>
              )}

              {/* Mobile Menu Hamburger Toggle Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                className={`lg:hidden p-2.5 rounded-full transition-all duration-300 cursor-pointer shrink-0 outline-none focus:outline-none focus:ring-0 focus-visible:outline-none ${mobileMenuOpen
                    ? 'bg-gradient-to-r from-[#c026d3] to-[#7c3aed] text-white rotate-90 scale-105 shadow-md shadow-purple-900/40'
                    : isDark ? 'text-gray-300 hover:text-white hover:bg-white/10' : 'text-slate-800 hover:bg-slate-100/90'
                  }`}
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* 4. Responsive Mobile Glassmorphic Drawer (Slow top-to-bottom expand with staggered item loading) */}
        <div
          className={`lg:hidden absolute top-full left-0 right-0 w-full grid transition-[grid-template-rows,opacity] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] z-50 ${mobileMenuOpen
              ? 'grid-rows-[1fr] opacity-100 pointer-events-auto visible'
              : 'grid-rows-[0fr] opacity-0 pointer-events-none invisible'
            }`}
        >
          <div className="overflow-hidden w-full">
            <div className={`mt-2.5 ${isDark
                ? 'bg-[#0e0e14]/95 border border-white/10 text-gray-200 shadow-2xl shadow-black/80'
                : 'bg-white/95 border border-slate-200/90 text-slate-800 shadow-2xl shadow-slate-900/20'
              } backdrop-blur-3xl rounded-3xl p-5 space-y-1`}>
              {navItems.map((item, index) => (
                <div
                  key={item.label}
                  style={{
                    transitionDelay: mobileMenuOpen ? `${120 + index * 80}ms` : '0ms',
                  }}
                  className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${mobileMenuOpen
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 -translate-y-3 pointer-events-none'
                    }`}
                >
                  {item.href.startsWith('/') && !item.href.includes('#') ? (
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-4 py-3 rounded-2xl text-[15px] font-medium ${isDark ? 'text-gray-200 hover:text-white hover:bg-purple-600/20' : 'text-slate-800 hover:text-slate-950 hover:bg-purple-50'
                        } transition-all whitespace-nowrap`}
                    >
                      <span>{item.label}</span>
                      <span className="sr-only"> (Mobile Menu Link)</span>
                      {item.badge && (
                        <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full border ${themeStyles.badge}`}>
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`flex items-center justify-between px-4 py-3 rounded-2xl text-[15px] font-medium ${isDark ? 'text-gray-200 hover:text-white hover:bg-purple-600/20' : 'text-slate-800 hover:text-slate-950 hover:bg-purple-50'
                        } transition-all cursor-pointer whitespace-nowrap`}
                    >
                      <span>{item.label}</span>
                      <span className="sr-only"> (Mobile Menu Link)</span>
                      {item.badge && (
                        <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full border ${themeStyles.badge}`}>
                          {item.badge}
                        </span>
                      )}
                    </a>
                  )}
                </div>
              ))}

              <div
                style={{
                  transitionDelay: mobileMenuOpen ? `${120 + navItems.length * 80}ms` : '0ms',
                }}
                className={`pt-3 mt-2 border-t ${isDark ? 'border-white/10' : 'border-slate-200/70'
                  } transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${mobileMenuOpen
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 -translate-y-3 pointer-events-none'
                  }`}
              >
                <a
                  href={ctaHref}
                  onClick={(e) => handleNavClick(e, ctaHref)}
                  className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold text-sm text-white transition-all whitespace-nowrap cursor-pointer shadow-md ${themeStyles.ctaBtn}`}
                >
                  <Send className="w-4 h-4 shrink-0 text-white" />
                  <span>{ctaLabel}</span>
                  <span className="sr-only"> (Mobile Header Action)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
