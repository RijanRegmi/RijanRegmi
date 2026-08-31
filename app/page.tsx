'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Facebook, 
  Mail, 
  MapPin, 
  Code2, 
  Send, 
  CheckCircle2, 
  AlertCircle,
  Printer,
  Layout,
  TrendingUp,
  ExternalLink,
  Sparkles,
  Clock,
  BookOpen,
  ArrowRight,
  Calendar,
  X,
  Layers,
  Cpu,
  ShieldCheck,
  Check
} from 'lucide-react';
import { contactApi } from '@/lib/api/contact.api';
import FloatingNavbar from '@/components/FloatingNavbar';
import { BLOG_POSTS, BlogPost } from '@/lib/data/blogs';

// Official Projects Data with real screenshots and brand logos
export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  url: string;
  displayUrl: string;
  image: string;
  logo: string;
  tags: string[];
  desc: string;
  actionText: string;
  isUnderDevelopment?: boolean;
}

const PROJECTS: ProjectItem[] = [
  {
    id: 'ropewallet',
    title: 'Ropewallet',
    category: 'Web3 Platform & Mobile App',
    url: 'https://www.ropewallet.com/',
    displayUrl: 'www.ropewallet.com',
    image: '/assets/webiste/ropewallet.png',
    logo: '/assets/brand/ropewallet_logo.png',
    tags: ['Next.js', 'Mobile App', 'TypeScript', 'Web3', 'Tailwind'],
    desc: 'Modern non-custodial multi-chain crypto wallet web platform and mobile application with smooth fluid animations and secure transaction flow.',
    actionText: 'VISIT WEBSITE',
  },
  {
    id: 'rilogram',
    title: 'Rilogram',
    category: 'Royale Gaming & Mobile App',
    url: 'https://www.royalegamingg.com/',
    displayUrl: 'www.royalegamingg.com',
    image: '/assets/webiste/rilogram.png',
    logo: '/assets/brand/rilogram_logo.png',
    tags: ['React', 'Mobile App', 'Node.js', 'Express', 'Gaming UI'],
    desc: 'High-engagement digital royale gaming portal and mobile application with real-time leaderboards, interactive matchmaking, and tournament flows.',
    actionText: 'VISIT WEBSITE',
  },
  {
    id: 'regmiplastictraders',
    title: 'Regmi Plastic Traders',
    category: 'E-Commerce & Enterprise',
    url: 'https://www.regmiplastictraders.com.np/',
    displayUrl: 'www.regmiplastictraders.com.np',
    image: '/assets/webiste/regmiplastictraders.png',
    logo: '/assets/brand/regmiplastictraders_logo.png',
    tags: ['Next.js', 'E-Commerce', 'Express', 'MongoDB'],
    desc: 'Comprehensive industrial & commercial plastic trading enterprise portal with dynamic categorized product catalog and inquiry system.',
    actionText: 'VISIT WEBSITE',
  },
  {
    id: 'pppfootball',
    title: 'PPP Football',
    category: 'Sports & Tournament Hub',
    url: 'https://pppfootball.vercel.app/',
    displayUrl: 'pppfootball.vercel.app',
    image: '/assets/webiste/pppfootball.png',
    logo: '/assets/brand/pppfootball_logo.png',
    tags: ['Next.js', 'Sports Analytics', 'Tailwind', 'Vercel'],
    desc: 'Football tournament hub for live league fixtures, team management, match scorecards, and tournament player statistics.',
    actionText: 'VIEW LIVE DEMO',
  },
  {
    id: 'evefest',
    title: 'EveFest',
    category: 'Events & Ticketing',
    url: 'https://evefest.vercel.app/',
    displayUrl: 'evefest.vercel.app',
    image: '/assets/webiste/evefest.png',
    logo: '/assets/brand/evefest_logo.ico',
    tags: ['React', 'Event Booking', 'UI/UX', 'Vercel'],
    desc: 'Event ticketing, concert discovery, and festival celebration management platform with seamless ticket booking and artist lineups.',
    actionText: 'VIEW LIVE DEMO',
  },
  {
    id: 'hamropadhai',
    title: 'Hamro Padhai',
    category: 'EdTech Platform',
    url: '#',
    displayUrl: 'hamropadhai.com',
    image: '/assets/webiste/hamropadhai.png',
    logo: '/assets/brand/hamropadhai_logo.png',
    tags: ['EdTech', 'Learning Platform', 'Upcoming'],
    desc: 'Interactive digital education and learning platform for students across Nepal. Currently under active development.',
    actionText: 'COMING SOON',
    isUnderDevelopment: true,
  },
];

export default function HomePage() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitStatus, setSubmitStatus] = useState<{
    loading: boolean;
    success?: boolean;
    message?: string;
  }>({ loading: false });

  // State for active Case Study modal
  const [activeCaseStudy, setActiveCaseStudy] = useState<BlogPost | null>(null);

  // Universal Staggered Scroll-Reveal Animations
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal-init');
    let revealObserver: IntersectionObserver | null = null;

    if (revealElements.length > 0) {
      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('reveal-visible');
              revealObserver?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      revealElements.forEach((el) => revealObserver?.observe(el));
    }

    return () => {
      revealObserver?.disconnect();
    };
  }, []);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) {
      setSubmitStatus({
        loading: false,
        success: false,
        message: 'Please fill in all required fields.',
      });
      return;
    }

    setSubmitStatus({ loading: true });
    try {
      const response = await contactApi.submitContact(formState);
      if (response.success) {
        setSubmitStatus({
          loading: false,
          success: true,
          message: 'Thank you! Your message has been sent successfully.',
        });
        setFormState({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus({
          loading: false,
          success: false,
          message: response.message || 'Something went wrong. Please try again.',
        });
      }
    } catch (err: any) {
      setSubmitStatus({
        loading: false,
        success: false,
        message: err.message || 'Failed to submit form.',
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans selection:bg-[#a855f7] selection:text-white">
      {/* Floating Navbar (Preserved Exactly as is in Dark Theme) */}
      <FloatingNavbar
        brandNameFirst="Rijan"
        brandNameSecond="Regmi"
        logoImg="/assets/imgs/RJN.png"
        ctaLabel="Contact Me"
        ctaHref="#contact"
        accentColor="purple"
        theme="dark"
      />

      {/* Light Theme Hero Section */}
      <section id="home" className="relative w-full min-h-[92vh] sm:min-h-[880px] bg-gradient-to-b from-purple-50/50 via-white to-slate-50/80 flex flex-col justify-start lg:justify-center pt-24 sm:pt-36 lg:pt-32 pb-16 sm:pb-28 px-4 sm:px-8 lg:px-16 overflow-hidden">
        {/* Soft Ambient Radial Backlights */}
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-purple-200/40 rounded-full blur-[140px] pointer-events-none -z-0" />
        <div className="absolute bottom-1/4 left-10 w-[500px] h-[500px] bg-fuchsia-200/30 rounded-full blur-[120px] pointer-events-none -z-0" />

        <div className="max-w-7xl w-full mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

          {/* Left Column: Info, Big Name, Role, Actions, Stats */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 sm:space-y-8">
            <div className="space-y-1.5 sm:space-y-2">
              <p className="text-xs sm:text-sm text-slate-500 font-bold tracking-widest uppercase">
                Hi I am
              </p>
              <h1 className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[90px] font-black text-slate-950 tracking-tight leading-tight sm:leading-[0.95]">
                Rijan Regmi
              </h1>
              <h2 className="text-base xs:text-lg sm:text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#c026d3] via-[#9333ea] to-[#7c3aed] tracking-wide uppercase pt-1">
                UI/UX & Full-Stack Developer
              </h2>
            </div>

            {/* Social Icons Row */}
            <div className="flex items-center gap-2.5 sm:gap-3 pt-1">
              <a
                href="https://www.instagram.com/rijanregmi_"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white hover:bg-[#a855f7] text-slate-700 hover:text-white border border-slate-200 hover:border-purple-500 transition-all flex items-center justify-center shadow-md hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/rijan-regmi-a720372b3"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white hover:bg-[#a855f7] text-slate-700 hover:text-white border border-slate-200 hover:border-purple-500 transition-all flex items-center justify-center shadow-md hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://github.com/RijanRegmi"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white hover:bg-[#a855f7] text-slate-700 hover:text-white border border-slate-200 hover:border-purple-500 transition-all flex items-center justify-center shadow-md hover:scale-110"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href="https://x.com/rijanregmi_"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white hover:bg-[#a855f7] text-slate-700 hover:text-white border border-slate-200 hover:border-purple-500 transition-all flex items-center justify-center shadow-md hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://www.facebook.com/rijan.regmi.946"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white hover:bg-[#a855f7] text-slate-700 hover:text-white border border-slate-200 hover:border-purple-500 transition-all flex items-center justify-center shadow-md hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
            </div>

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-[#c026d3] via-[#9333ea] to-[#7c3aed] hover:from-[#a21caf] hover:to-[#6b21a8] text-white font-bold text-sm sm:text-base shadow-xl shadow-purple-900/25 transition-all hover:scale-105 active:scale-95"
              >
                Hire Me
              </a>
              <a
                href="/assets/CV-Rijan Regmi.pdf"
                download="CV-Rijan Regmi.pdf"
                className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 hover:text-purple-700 border border-slate-300 font-semibold text-sm sm:text-base shadow-sm transition-all hover:scale-105 active:scale-95"
              >
                Download CV
              </a>
            </div>

            {/* Stats Bar (Light Mode Fitted Card) */}
            <div className="pt-2 sm:pt-3">
              <div className="inline-flex items-center gap-5 sm:gap-8 lg:gap-10 bg-white/90 backdrop-blur-md border border-slate-200/90 rounded-2xl px-5 sm:px-7 py-3.5 sm:py-4 shadow-xl shadow-slate-900/5 w-fit">
                <div>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-black text-[#9333ea]">3+</div>
                  <div className="text-[11px] sm:text-xs text-slate-500 font-semibold mt-0.5 whitespace-nowrap">Experiences</div>
                </div>
                <div className="w-[1px] h-8 bg-slate-200" />
                <div>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-black text-[#9333ea]">20+</div>
                  <div className="text-[11px] sm:text-xs text-slate-500 font-semibold mt-0.5 whitespace-nowrap">Project done</div>
                </div>
                <div className="w-[1px] h-8 bg-slate-200" />
                <div>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-black text-[#9333ea]">30+</div>
                  <div className="text-[11px] sm:text-xs text-slate-500 font-semibold mt-0.5 whitespace-nowrap">Happy Clients</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Circular Portrait */}
          <div className="lg:col-span-5 flex justify-center items-center pt-4 lg:pt-0">
            <div className="relative w-[260px] h-[260px] sm:w-[380px] sm:h-[380px] lg:w-[480px] lg:h-[480px] rounded-full bg-gradient-to-b from-purple-100/70 to-slate-100 border border-purple-200/80 shadow-2xl flex items-center justify-center overflow-hidden group">
              
              {/* Backlight circular glow in RJN purple */}
              <div className="absolute inset-0 rounded-full bg-purple-500/15 blur-3xl pointer-events-none group-hover:bg-purple-500/25 transition-all duration-700" />
              
              {/* Header Profile Photo */}
              <img
                src="/assets/imgs/header.png"
                alt="Rijan Regmi"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 relative z-10"
              />
            </div>
          </div>

        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white border-t border-slate-200/80 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12 items-start">
            
            {/* Column 1: Who am I ? */}
            <div className="flex flex-col justify-between h-full lg:border-r lg:border-slate-200 lg:pr-8">
              <div>
                <div className="relative inline-block mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                    Who am I ?
                  </h2>
                  <div className="w-10 h-0.5 bg-[#a855f7] mt-1.5 rounded-full" />
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
            <div className="flex flex-col justify-between h-full lg:border-r lg:border-slate-200 lg:pr-8">
              <div>
                <div className="relative inline-block mb-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                    Personal Info
                  </h2>
                  <div className="w-10 h-0.5 bg-[#a855f7] mt-1.5 rounded-full" />
                </div>

                <ul className="space-y-2.5 text-sm">
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
              <div className="flex items-center gap-4 pt-6 text-[#9333ea]">
                <a href="https://www.facebook.com/rijan.regmi.946" target="_blank" rel="noopener noreferrer" className="hover:text-purple-800 transition-colors" aria-label="Facebook">
                  <Facebook size={18} />
                </a>
                <a href="https://x.com/rijanregmi_" target="_blank" rel="noopener noreferrer" className="hover:text-purple-800 transition-colors" aria-label="Twitter">
                  <Twitter size={18} />
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
            <div>
              <div className="relative inline-block mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                  My Expertise
                </h2>
                <div className="w-10 h-0.5 bg-[#a855f7] mt-1.5 rounded-full" />
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

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-slate-50/80 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-[#9333ea] font-bold">Core Stack</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mt-2">Technical Proficiencies</h2>
            <p className="text-slate-600 text-sm mt-3">Technologies and tools used across full-stack projects</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-6">
            {[
              {
                name: 'TypeScript',
                level: 'Advanced',
                iconSrc: '/assets/skills/typescript.svg',
              },
              {
                name: 'React',
                level: 'Advanced',
                iconSrc: '/assets/skills/react.svg',
              },
              {
                name: 'Node.js',
                level: 'Proficient',
                iconSrc: '/assets/skills/nodejs.svg',
              },
              {
                name: 'Express.js',
                level: 'Advanced',
                iconSrc: '/assets/skills/express.svg',
              },
              {
                name: 'Python',
                level: 'Advanced',
                iconSrc: '/assets/skills/python.svg',
              },
              {
                name: 'SQL, noSQL',
                level: 'Advanced',
                iconSrc: '/assets/skills/postgresql.svg',
              },
              {
                name: 'Java',
                level: 'Proficient',
                iconSrc: '/assets/skills/java.svg',
                whiteBg: true,
              },
              {
                name: 'PHP',
                level: 'Advanced',
                iconSrc: '/assets/skills/php.svg',
              },
              {
                name: 'MongoDB',
                level: 'Proficient',
                iconSrc: '/assets/skills/mongodb.svg',
              },
              {
                name: 'Tailwind CSS',
                level: 'Expert',
                iconSrc: '/assets/skills/tailwindcss.svg',
              },
            ].map((skill, index) => (
              <div 
                key={index} 
                className="relative overflow-hidden p-6 sm:p-7 rounded-2xl text-center flex flex-col items-center justify-between min-h-[185px] bg-white hover:bg-slate-50 border border-slate-200/90 hover:border-purple-500/50 shadow-md hover:shadow-xl hover:shadow-purple-900/10 transition-all duration-300 hover:-translate-y-1.5 group cursor-pointer"
              >
                {/* Ambient Subtle Radial Glow */}
                <div className="absolute top-3 w-16 h-16 bg-purple-400/10 rounded-full blur-xl pointer-events-none group-hover:bg-purple-400/25 transition-all duration-300" />
                
                {/* Circular Logo Badge Container */}
                <div className="relative z-10 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-slate-100/90 border border-slate-200/90 flex items-center justify-center p-2.5 sm:p-3 mb-3.5 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] transition-all duration-300">
                  <img
                    src={skill.iconSrc}
                    alt={`${skill.name} official logo`}
                    className="w-8 h-8 sm:w-9 sm:h-9 object-contain drop-shadow-sm"
                  />
                </div>

                {/* Text Content */}
                <div className="relative z-10 w-full flex flex-col items-center">
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-purple-700 transition-colors tracking-tight">{skill.name}</h4>
                  <span className="mt-2.5 inline-flex items-center px-3 py-0.5 rounded-full text-[11px] font-semibold bg-purple-50 text-purple-700 border border-purple-200 group-hover:border-purple-400 transition-colors">
                    {skill.level}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Projects Showcase */}
      <section id="portfolio" className="py-24 bg-white border-t border-slate-200/80 relative">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-[#9333ea] font-bold">Live Deployments & Work</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 mt-2 tracking-tight">Featured Projects</h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3">Click on any project screen to launch and explore the live web application</p>
          </div>

          {/* 2-Column Wide Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
            {PROJECTS.map((project) => (
              <div 
                key={project.id} 
                className="rounded-3xl overflow-hidden group flex flex-col bg-white border border-slate-200/90 hover:border-purple-500/40 shadow-xl shadow-slate-200/60 hover:shadow-2xl hover:shadow-purple-900/10 transition-all duration-300 hover:-translate-y-1.5"
              >
                {/* 1. Website Screenshot with subtle bottom gradient fade & Hover Action Overlay */}
                <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden bg-slate-900">
                  <a
                    href={project.url !== '#' ? project.url : undefined}
                    target={project.url !== '#' ? '_blank' : undefined}
                    rel={project.url !== '#' ? 'noopener noreferrer' : undefined}
                    className={`block w-full h-full relative ${project.url !== '#' ? 'cursor-pointer' : 'cursor-default'}`}
                    title={project.url !== '#' ? `Visit ${project.title}` : undefined}
                  >
                    <img
                      src={project.image}
                      alt={`${project.title} screenshot`}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Dark gradient fade at bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                    {/* Hover Container Reveal: "Visit Website" / "View Live Demo" Pill */}
                    {project.url !== '#' && (
                      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                        <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#c026d3] via-[#9333ea] to-[#7c3aed] text-white font-bold text-xs sm:text-sm shadow-2xl shadow-purple-900/60 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          <Sparkles size={14} />
                          <span>{project.actionText}</span>
                          <ExternalLink size={14} />
                        </div>
                      </div>
                    )}
                  </a>
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
                        rel="noopener noreferrer"
                        className="text-xs font-bold uppercase tracking-wider text-[#9333ea] hover:text-purple-800 group-hover:underline inline-flex items-center gap-1.5 transition-colors"
                      >
                        <span>{project.actionText}</span>
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

      {/* Engineering Blog & Case Studies Section */}
      <section id="blog" className="py-24 bg-slate-50/80 border-t border-slate-200/80 relative">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-[#9333ea] font-bold">Engineering Insights</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 mt-2 tracking-tight">Architectural Deep-Dives</h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3">Technical analysis and real-world implementation case studies of live production applications</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post) => (
              <article 
                key={post.slug} 
                className="rounded-3xl overflow-hidden flex flex-col justify-between bg-white border border-slate-200/90 hover:border-purple-500/50 shadow-lg hover:shadow-xl hover:shadow-purple-900/10 transition-all duration-300 group hover:-translate-y-2"
              >
                <div>
                  {/* Article Screenshot Frame */}
                  <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-slate-900">
                    <img
                      src={post.image}
                      alt={post.title}
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

                {/* Footer Link Button to dedicated page /blog/[slug] */}
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

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#9333ea] font-bold">Get In Touch</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mt-2">Let's Build Something Great Together</h2>
                <p className="text-slate-600 text-sm mt-4 leading-relaxed">
                  Have a project inquiry, collaboration proposal, or just want to say hi? Feel free to reach out using the form or through any of my contact channels.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-sm">
                  <div className="p-3 rounded-lg bg-purple-100 text-[#9333ea] border border-purple-200">
                    <Mail size={20} />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">Email Me</span>
                    <a href="mailto:rijanregmi8@gmail.com" className="text-sm font-semibold text-slate-900 hover:text-[#9333ea] transition-colors">
                      rijanregmi8@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-sm">
                  <div className="p-3 rounded-lg bg-purple-100 text-[#9333ea] border border-purple-200">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">Location</span>
                    <span className="text-sm font-semibold text-slate-900">Kathmandu, Nepal</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Send a Message</h3>

              {submitStatus.message && (
                <div
                  className={`p-4 rounded-xl mb-6 text-sm flex items-center gap-3 ${
                    submitStatus.success
                      ? 'bg-emerald-50 border border-emerald-300 text-emerald-800'
                      : 'bg-rose-50 border border-rose-300 text-rose-800'
                  }`}
                >
                  {submitStatus.success ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                  <span>{submitStatus.message}</span>
                </div>
              )}

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Your Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#9333ea] focus:bg-white focus:ring-2 focus:ring-purple-500/20 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Your Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#9333ea] focus:bg-white focus:ring-2 focus:ring-purple-500/20 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    placeholder="Project Inquiry"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#9333ea] focus:bg-white focus:ring-2 focus:ring-purple-500/20 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Tell me about your project..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-[#9333ea] focus:bg-white focus:ring-2 focus:ring-purple-500/20 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitStatus.loading}
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#c026d3] via-[#9333ea] to-[#7c3aed] hover:from-[#a21caf] hover:to-[#6b21a8] text-white font-bold text-sm shadow-xl shadow-purple-900/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 hover:scale-[1.01] active:scale-[0.99]"
                >
                  {submitStatus.loading ? (
                    <span>Sending message...</span>
                  ) : (
                    <>
                      <Send size={16} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-900 text-center text-xs text-slate-400 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Rijan Regmi. All rights reserved.</p>
          <div className="flex items-center gap-6 font-medium text-slate-300">
            <Link href="/" className="hover:text-purple-400 transition-colors">Home</Link>
            <Link href="/#about" className="hover:text-purple-400 transition-colors">About</Link>
            <Link href="/#skills" className="hover:text-purple-400 transition-colors">Skills</Link>
            <Link href="/#portfolio" className="hover:text-purple-400 transition-colors">Portfolio</Link>
            <Link href="/#blog" className="hover:text-purple-400 transition-colors">Blog</Link>
            <Link href="/#contact" className="hover:text-purple-400 transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
