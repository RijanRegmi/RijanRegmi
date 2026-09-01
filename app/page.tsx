'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Github,
  Linkedin,
  Instagram,
  Facebook,
  Mail,
  Phone,
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
  Check,
  Globe,
  Server,
  Smartphone,
  Database,
  Award,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  LucideIcon
} from 'lucide-react';
import { contactApi } from '@/lib/api/contact.api';
import FloatingNavbar from '@/components/FloatingNavbar';
import { BLOG_POSTS, BlogPost } from '@/lib/data/blogs';

// Modern X (Twitter) Icon Component
function XIcon({ size = 18, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

// Professional Services Data
interface ServiceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  features: string[];
  icon: LucideIcon;
  gradient: string;
  badge: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: 'web-dev',
    title: 'Web Development',
    category: 'Full-Stack & Frontend',
    description: 'Modern, high-performance web applications built with Next.js, React, and TypeScript. Pixel-perfect responsive designs, seamless UX, and lightning-fast load speeds.',
    features: ['Next.js App Router & React 18+', 'Tailwind CSS & Responsive UI/UX', 'State Management & Core Web Vitals'],
    icon: Globe,
    gradient: 'from-purple-500/15 via-purple-500/5 to-transparent',
    badge: 'Popular',
  },
  {
    id: 'api-dev',
    title: 'API Development & Integration',
    category: 'Backend & Microservices',
    description: 'Scalable RESTful and GraphQL APIs engineered with Node.js and Express. Secure OAuth/JWT authentication, rate limiting, and seamless third-party service integrations.',
    features: ['RESTful & GraphQL API Design', 'OAuth, JWT & Role-Based Auth', 'Stripe, Twilio & Webhook Pipelines'],
    icon: Server,
    gradient: 'from-indigo-500/15 via-indigo-500/5 to-transparent',
    badge: 'Backend',
  },
  {
    id: 'software-dev',
    title: 'Software Development',
    category: 'Architecture & Logic',
    description: 'End-to-end custom software solutions tailored to complex business requirements. Clean architecture, modular design patterns, and robust enterprise-grade backend logic.',
    features: ['Custom Business Logic & Workflows', 'Clean Architecture & Modular Code', 'Microservices & Event-Driven Systems'],
    icon: Layers,
    gradient: 'from-fuchsia-500/15 via-fuchsia-500/5 to-transparent',
    badge: 'Custom',
  },
  {
    id: 'app-dev',
    title: 'App Development',
    category: 'Cross-Platform & Mobile',
    description: 'High-quality cross-platform and Progressive Web Apps (PWA) with native-like fluidity, offline caching, and responsive touch gestures optimized for all screen sizes.',
    features: ['Progressive Web Apps (PWA)', 'Cross-Platform Mobile Experiences', 'Touch-Optimized Responsive UI'],
    icon: Smartphone,
    gradient: 'from-violet-500/15 via-violet-500/5 to-transparent',
    badge: 'Mobile',
  },
  {
    id: 'db-design',
    title: 'Database Design & Management',
    category: 'Data & Cloud Storage',
    description: 'Optimized schema design and performance management for MongoDB, PostgreSQL, and Redis. Data normalization, efficient indexing, caching, and automated backups.',
    features: ['MongoDB, PostgreSQL & Redis', 'Schema Modeling & Index Optimization', 'Data Integrity & Migration Strategies'],
    icon: Database,
    gradient: 'from-emerald-500/15 via-emerald-500/5 to-transparent',
    badge: 'Database',
  },
  {
    id: 'software-maintenance',
    title: 'Software Maintenance & Support',
    category: 'Reliability & Uptime',
    description: 'Proactive maintenance, bug fixing, dependency upgrades, security patching, and ongoing monitoring to ensure your production applications run with 99.9% uptime.',
    features: ['Continuous Bug Fixes & Hotfixes', 'Security Audits & Patch Updates', 'Performance & Uptime Monitoring'],
    icon: ShieldCheck,
    gradient: 'from-amber-500/15 via-amber-500/5 to-transparent',
    badge: 'Support',
  },
  {
    id: 'consulting-code-review',
    title: 'Consulting & Code Review',
    category: 'Technical Advisory',
    description: 'Comprehensive code audits, architecture reviews, and scalability consulting. Identify bottlenecks, enforce clean code standards, and streamline CI/CD delivery.',
    features: ['In-Depth Code Quality Audits', 'Architecture & Scalability Advisory', 'CI/CD Pipeline & DevOps Setup'],
    icon: Code2,
    gradient: 'from-blue-500/15 via-blue-500/5 to-transparent',
    badge: 'Advisory',
  },
  {
    id: 'seo-integration',
    title: 'SEO Integration & Optimization',
    category: 'Visibility & Rankings',
    description: 'Advanced technical SEO, semantic HTML5 structure, JSON-LD structured data, metadata optimization, and Core Web Vitals tuning for top Google search engine rankings.',
    features: ['Core Web Vitals & Page Speed 95+', 'Structured Data (JSON-LD) & OpenGraph', 'Technical SEO & Semantic Indexing'],
    icon: TrendingUp,
    gradient: 'from-rose-500/15 via-rose-500/5 to-transparent',
    badge: 'SEO',
  },
];

// Core Technical Skills Data
interface SkillItem {
  name: string;
  level: string;
  iconSrc: string;
  whiteBg?: boolean;
}

const SKILLS: SkillItem[] = [
  { name: 'TypeScript', level: 'Advanced', iconSrc: '/assets/skills/typescript.svg' },
  { name: 'React', level: 'Advanced', iconSrc: '/assets/skills/react.svg' },
  { name: 'Node.js', level: 'Proficient', iconSrc: '/assets/skills/nodejs.svg' },
  { name: 'Express.js', level: 'Advanced', iconSrc: '/assets/skills/express.svg' },
  { name: 'Python', level: 'Advanced', iconSrc: '/assets/skills/python.svg' },
  { name: 'SQL, noSQL', level: 'Advanced', iconSrc: '/assets/skills/postgresql.svg' },
  { name: 'Java', level: 'Proficient', iconSrc: '/assets/skills/java.svg', whiteBg: true },
  { name: 'PHP', level: 'Basic', iconSrc: '/assets/skills/php.svg' },
  { name: 'MongoDB', level: 'Proficient', iconSrc: '/assets/skills/mongodb.svg' },
  { name: 'Tailwind CSS', level: 'Expert', iconSrc: '/assets/skills/tailwindcss.svg' },
];

// Certificates & Accreditations Data
export interface CertificateSlide {
  label: string;
  title: string;
  image: string;
  serialNo?: string;
}

export interface CertificateItem {
  id: string;
  title: string;
  subtitle: string;
  issuer: string;
  endorsement?: string;
  issueDate: string;
  enrolledDate?: string;
  completedDate?: string;
  credentialId: string;
  verificationUrl: string;
  orientation: 'portrait' | 'landscape';
  slides: CertificateSlide[];
  summary: string;
  director: string;
  tags: string[];
  highlights: { label: string; value: string }[];
  actionLabel?: string;
}

const CERTIFICATES: CertificateItem[] = [
  {
    id: 'footylytics-graduate',
    title: 'Footylytics Graduate',
    subtitle: 'Footylytics Football Intelligence Programme',
    issuer: 'Footylytics Academy',
    endorsement: 'Institute of Analytics Endorsed Course',
    issueDate: 'July 17, 2026',
    enrolledDate: 'June 3, 2026',
    completedDate: 'July 16, 2026',
    credentialId: 'cmrmzg85k000u2b6i2whfzzso',
    verificationUrl: 'https://footylytics.academy/certificate/cmrmzg85k000u2b6i2whfzzso?theme=solarized',
    orientation: 'portrait',
    slides: [
      {
        label: 'Graduate Certificate',
        title: 'Footylytics Football Intelligence Programme',
        image: '/assets/Certificate/footylytics.academy.png',
        serialNo: 'cmrmzg85k000u2b6i2whfzzso',
      },
    ],
    summary: 'Successfully completed all 17 comprehensive courses (56 days) of the Footylytics Football Intelligence Programme, mastering data science on real match data, mathematical models, tactical analysis, tools & dashboard engineering.',
    director: 'Manoj Shrestha (Programme Director)',
    tags: [
      'Football Intelligence',
      'Data Science',
      'Python & Code on Real Data',
      'Mathematics & Metrics',
      'Tools & Dashboards',
      'Tactical Analysis',
    ],
    highlights: [
      { label: 'Curriculum', value: '17 Courses (56 Days)' },
      { label: 'Issued Date', value: 'July 17, 2026' },
      { label: 'Endorsement', value: 'Institute of Analytics' },
      { label: 'Verification', value: 'Live & Authenticated' },
    ],
    actionLabel: 'View Official Certificate',
  },
  {
    id: 'afcas-scouting',
    title: 'A.F.C.A.S. Technical Scouting & Talent ID',
    subtitle: 'Football Fundamentals & Technical Scouting (Levels 1 – 3)',
    issuer: 'The Association of Football Coaches & Scouts (A.F.C.A.S.)',
    endorsement: 'S4 Scouting Professional Football Accredited',
    issueDate: 'July 17, 2026',
    credentialId: 'CERT_10103 / CERT_20068 / CERT_30039',
    verificationUrl: 'https://afcas.teachable.com/',
    orientation: 'landscape',
    slides: [
      {
        label: 'Level 1',
        title: 'Level 1: Football Fundamentals & Talent ID',
        image: '/assets/Certificate/level1-afcas.png',
        serialNo: 'CERT_10103',
      },
      {
        label: 'Level 2',
        title: 'Level 2: Technical Scouting Course',
        image: '/assets/Certificate/level2-afcas.png',
        serialNo: 'CERT_20068',
      },
      {
        label: 'Level 3',
        title: 'Level 3: Technical Scouting & Advanced Talent ID',
        image: '/assets/Certificate/level3-afcas.png',
        serialNo: 'CERT_30039',
      },
    ],
    summary: 'Comprehensive 3-tier professional technical scouting and talent identification certification series from A.F.C.A.S. and S4 Scouting. Covers foundational to advanced player evaluation, tactical match scouting, opposition reporting, and recruitment metrics.',
    director: 'Ged Searson (Managing Director)',
    tags: [
      'Talent Identification',
      'Technical Scouting',
      'Player Assessment',
      'Tactical Analysis',
      'Match Reporting',
      'Opposition Scouting',
      'Recruitment Strategy',
    ],
    highlights: [
      { label: 'Accreditation', value: 'Levels 1, 2 & 3 Complete' },
      { label: 'Issued Date', value: 'July 17, 2026' },
      { label: 'Governing Body', value: 'A.F.C.A.S. & S4 Scouting' },
      { label: 'Verification', value: 'Official Teachable Portal' },
    ],
    actionLabel: 'Visit Official Portal',
  },
  {
    id: 'afcas-positional-scouting',
    title: 'A.F.C.A.S. Positional Scouting & Recruitment',
    subtitle: 'Professional Football Workshop Series (Modules 1 – 3)',
    issuer: 'The Association of Football Coaches & Scouts (A.F.C.A.S.)',
    endorsement: 'CIMSPA Education Partner & S4 Scouting Accredited',
    issueDate: 'January – February 2026',
    credentialId: 'AFCAS Workshop Modules 1, 2 & 3',
    verificationUrl: 'https://afcas.teachable.com/',
    orientation: 'landscape',
    slides: [
      {
        label: 'Module 1',
        title: 'Module 1: Positional Scouting & Recruitment Workshop',
        image: '/assets/Certificate/module1-afcas.png',
        serialNo: 'Issued: 1st of January 2026',
      },
      {
        label: 'Module 2',
        title: 'Module 2: Positional Scouting & Recruitment Workshop',
        image: '/assets/Certificate/module2-afcas.png',
        serialNo: 'Issued: 16th of January 2026',
      },
      {
        label: 'Module 3',
        title: 'Module 3: Positional Scouting & Recruitment Workshop',
        image: '/assets/Certificate/module3-afcas.png',
        serialNo: 'Issued: 19th of February 2026',
      },
    ],
    summary: 'Interactive professional football webinar workshop series delivered directly by Managing Director Ged Searson. Focuses on in-depth positional role profiling, position-specific key performance indicators, live match recruitment analysis, and modern scouting workflows endorsed by CIMSPA.',
    director: 'Ged Searson (Managing Director)',
    tags: [
      'Positional Scouting',
      'Player Recruitment',
      'Role Profiling',
      'Position-Specific KPIs',
      'Tactical Analysis',
      'Webinar Masterclass',
      'CIMSPA Endorsed',
      'S4 Scouting',
    ],
    highlights: [
      { label: 'Curriculum', value: 'Modules 1, 2 & 3 Complete' },
      { label: 'Instructor', value: 'Ged Searson (Director)' },
      { label: 'Accreditation', value: 'CIMSPA Education Partner' },
      { label: 'Format', value: 'Interactive Live Masterclasses' },
    ],
    actionLabel: 'Visit Official Portal',
  },
];

// Official Projects Data with real screenshots and brand logos
interface ProjectItem {
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

  // State for active certificate slide index per certificate card
  const [certSlideIndices, setCertSlideIndices] = useState<{ [key: string]: number }>({});

  // State for active certificate modal (fullscreen zoom lightbox)
  const [modalCert, setModalCert] = useState<{
    certId: string;
    slideIndex: number;
  } | null>(null);
  const [zoomScale, setZoomScale] = useState<number>(1);

  const openCertModal = (certId: string, slideIndex: number = 0) => {
    setModalCert({ certId, slideIndex });
    setZoomScale(1);
  };

  const closeCertModal = () => {
    setModalCert(null);
    setZoomScale(1);
  };

  const handleZoomIn = () => {
    setZoomScale((prev) => Math.min(Number((prev + 0.25).toFixed(2)), 3));
  };

  const handleZoomOut = () => {
    setZoomScale((prev) => Math.max(Number((prev - 0.25).toFixed(2)), 0.75));
  };

  const handleResetZoom = () => {
    setZoomScale(1);
  };

  const toggleZoom = () => {
    setZoomScale((prev) => (prev > 1.2 ? 1 : 1.75));
  };

  const handlePrevCertSlide = (certId: string, totalSlides: number) => {
    setCertSlideIndices((prev) => {
      const current = prev[certId] || 0;
      const next = (current - 1 + totalSlides) % totalSlides;
      return { ...prev, [certId]: next };
    });
  };

  const handleNextCertSlide = (certId: string, totalSlides: number) => {
    setCertSlideIndices((prev) => {
      const current = prev[certId] || 0;
      const next = (current + 1) % totalSlides;
      return { ...prev, [certId]: next };
    });
  };

  const handleSelectCertSlide = (certId: string, index: number) => {
    setCertSlideIndices((prev) => ({ ...prev, [certId]: index }));
  };

  // Fullscreen certificate modal keyboard navigation & body scroll lock
  useEffect(() => {
    if (!modalCert) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModalCert(null);
        setZoomScale(1);
      } else if (e.key === 'ArrowLeft') {
        const activeCert = CERTIFICATES.find((c) => c.id === modalCert.certId);
        if (activeCert && activeCert.slides.length > 1) {
          setModalCert((prev) => {
            if (!prev) return null;
            const nextIdx =
              (prev.slideIndex - 1 + activeCert.slides.length) %
              activeCert.slides.length;
            return { ...prev, slideIndex: nextIdx };
          });
        }
      } else if (e.key === 'ArrowRight') {
        const activeCert = CERTIFICATES.find((c) => c.id === modalCert.certId);
        if (activeCert && activeCert.slides.length > 1) {
          setModalCert((prev) => {
            if (!prev) return null;
            const nextIdx =
              (prev.slideIndex + 1) % activeCert.slides.length;
            return { ...prev, slideIndex: nextIdx };
          });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [modalCert]);

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
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans selection:bg-[#a855f7] selection:text-white w-full max-w-full overflow-x-hidden">
      {/* Floating Navbar (Self-contained, dark glass pill design) */}
      <FloatingNavbar />

      {/* Light Theme Hero Section */}
      <section id="home" className="relative w-full min-h-[90vh] sm:min-h-[880px] bg-gradient-to-b from-purple-50/50 via-white to-slate-50/80 flex flex-col justify-center pt-28 sm:pt-36 lg:pt-32 pb-16 sm:pb-24 px-4 sm:px-8 lg:px-16 overflow-hidden">
        {/* Soft Ambient Radial Backlights */}
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-purple-200/40 rounded-full blur-[140px] pointer-events-none -z-0" />
        <div className="absolute bottom-1/4 left-10 w-[500px] h-[500px] bg-fuchsia-200/30 rounded-full blur-[120px] pointer-events-none -z-0" />

        <div className="max-w-7xl w-full mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

          {/* Column: Info, Big Name, Role, Actions, Stats (Centered on Mobile, Left-aligned on Desktop) */}
          <div className="lg:col-span-7 flex flex-col items-center text-center lg:items-start lg:text-left space-y-6 sm:space-y-8">
            <div className="space-y-1.5 sm:space-y-2 w-full">
              <p className="text-xs sm:text-sm text-slate-500 font-bold tracking-widest uppercase">
                Hi I am
              </p>
              <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[90px] font-black text-slate-950 tracking-tight leading-tight sm:leading-[0.95]">
                Rijan Regmi
              </h1>
              <h2 className="text-base xs:text-lg sm:text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#c026d3] via-[#9333ea] to-[#7c3aed] tracking-wide uppercase pt-1">
                UI/UX & Full-Stack Developer
              </h2>
            </div>

            {/* Social Icons Row (Centered on Mobile) */}
            <div className="flex items-center justify-center lg:justify-start gap-2.5 sm:gap-3 pt-1 w-full">
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
                aria-label="X"
              >
                <XIcon size={16} />
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

            {/* Action Buttons Row (Centered on Mobile with Equal Button Sizes) */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1 w-full">
              <a
                href="#contact"
                className="w-[145px] sm:w-[170px] h-[48px] sm:h-[52px] inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#c026d3] via-[#9333ea] to-[#7c3aed] hover:from-[#a21caf] hover:to-[#6b21a8] text-white font-bold text-sm sm:text-base shadow-xl shadow-purple-900/25 transition-all hover:scale-105 active:scale-95"
              >
                Hire Me
              </a>
              <a
                href="/assets/CV-Rijan Regmi.pdf"
                download="CV-Rijan Regmi.pdf"
                className="w-[145px] sm:w-[170px] h-[48px] sm:h-[52px] inline-flex items-center justify-center rounded-xl bg-white hover:bg-slate-50 text-slate-800 hover:text-purple-700 border border-slate-300 font-semibold text-sm sm:text-base shadow-sm transition-all hover:scale-105 active:scale-95"
              >
                Download CV
              </a>
            </div>

            {/* Stats Bar (Centered on Mobile) */}
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

          {/* Right Column: Circular Portrait (Centered) */}
          <div className="lg:col-span-5 flex justify-center items-center pt-4 lg:pt-0">
            <div className="relative w-[260px] h-[260px] sm:w-[360px] sm:h-[360px] lg:w-[460px] lg:h-[460px] rounded-full bg-gradient-to-b from-purple-100/70 to-slate-100 border border-purple-200/80 shadow-2xl flex items-center justify-center overflow-hidden group">

              {/* Backlight circular glow in RJN purple */}
              <div className="absolute inset-0 rounded-full bg-purple-500/15 blur-3xl pointer-events-none group-hover:bg-purple-500/25 transition-all duration-700" />

              {/* Header Profile Photo */}
              <img
                src="/assets/imgs/header.jpeg"
                alt="Rijan Regmi"
                className="w-full h-full object-cover object-[center_25%] group-hover:scale-105 transition-transform duration-700 relative z-10"
              />
            </div>
          </div>

        </div>
      </section>

      {/* About Section (Centered & Clean Spacing on Mobile) */}
      <section id="about" className="py-20 sm:py-24 bg-white border-t border-slate-200/80 relative overflow-hidden w-full max-w-full">
        <div className="max-w-md md:max-w-7xl mx-auto px-8 sm:px-12 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-14 sm:gap-16 md:gap-12 items-start">

            {/* Column 1: Who am I ? */}
            <div className="flex flex-col justify-between h-full md:border-r md:border-slate-200 md:pr-8 space-y-6">
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
            <div className="flex flex-col justify-between h-full md:border-r md:border-slate-200 md:pr-8 space-y-6">
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
            <div className="space-y-6">
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

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-slate-50/80 border-t border-slate-200/80 relative overflow-hidden w-full max-w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-[#9333ea] font-bold">Core Stack</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-2 tracking-tight">Technical Proficiencies</h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3">Technologies and tools used across full-stack projects</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {SKILLS.map((skill, index) => (
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

      {/* Certificates & Accreditations Section */}
      <section id="certificates" className="py-24 bg-white border-t border-slate-200/80 relative overflow-hidden w-full max-w-full">
        {/* Soft Ambient Radial Backlights */}
        <div className="absolute top-10 right-10 w-96 h-96 bg-purple-200/30 rounded-full blur-[100px] pointer-events-none -z-0" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-fuchsia-100/30 rounded-full blur-[100px] pointer-events-none -z-0" />

        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
            <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#9333ea] font-bold">
              <Award size={14} className="text-[#9333ea]" />
              Verified Credentials
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 mt-2 tracking-tight">
              Certificates & Accreditations
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3">
              Industry-recognized certifications and professional credentials validating technical domain expertise and practical execution.
            </p>
          </div>

          {/* Certificate Showcase Cards */}
          <div className="space-y-12">
            {CERTIFICATES.map((cert) => {
              const currentSlideIndex = certSlideIndices[cert.id] || 0;
              const currentSlide = cert.slides[currentSlideIndex] || cert.slides[0];
              const hasMultipleSlides = cert.slides.length > 1;
              const isPortrait = cert.orientation === 'portrait';

              return (
                <div
                  key={cert.id}
                  className="rounded-3xl bg-slate-50/80 border border-slate-200/90 hover:border-purple-500/40 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-purple-900/10 transition-all duration-300 overflow-hidden"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 p-6 sm:p-8 lg:p-10 items-center">
                    {/* Left Column: Certificate Visual Frame with Interactive Zoom & Slider */}
                    <div className={`${isPortrait ? 'lg:col-span-5' : 'lg:col-span-6'} flex flex-col items-center justify-center`}>
                      {/* Certificate Image Container */}
                      <div className={`relative w-full ${isPortrait ? 'max-w-[400px] sm:max-w-[430px]' : 'max-w-[540px] sm:max-w-[580px]'} rounded-2xl overflow-hidden bg-white/80 border border-slate-200 shadow-lg hover:shadow-2xl hover:shadow-purple-900/20 transition-all duration-500`}>
                        {/* Clickable Image -> Opens Fullscreen Zoom Modal */}
                        <div
                          onClick={() => openCertModal(cert.id, currentSlideIndex)}
                          className={`block relative ${isPortrait ? 'aspect-[3/4]' : 'aspect-[4/3] sm:aspect-[16/11]'} w-full overflow-hidden bg-slate-100 cursor-pointer select-none`}
                          title={`Click to view ${currentSlide.title || cert.title} in Fullscreen`}
                        >
                          {/* Preloaded smooth cross-fading slide stack */}
                          {cert.slides.map((slide, idx) => (
                            <img
                              key={slide.image}
                              src={slide.image}
                              alt={slide.title || `${cert.title} certificate`}
                              className={`absolute inset-0 w-full h-full object-contain p-2 sm:p-3 transition-opacity duration-300 ease-in-out ${
                                idx === currentSlideIndex
                                  ? 'opacity-100 z-10'
                                  : 'opacity-0 z-0 pointer-events-none'
                              }`}
                              loading="eager"
                              decoding="async"
                              draggable={false}
                            />
                          ))}

                          {/* Top Right Verified Floating Badge */}
                          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md border border-purple-200/80 shadow-md rounded-full px-2.5 py-1 flex items-center gap-1.5 pointer-events-none z-20">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] font-bold text-slate-800 uppercase tracking-wider">
                              {hasMultipleSlides ? currentSlide.label : 'Official'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Level Switcher & Arrow Navigation Bar */}
                      {hasMultipleSlides && (
                        <div className="flex items-center justify-between gap-1.5 p-1.5 bg-white border border-slate-200 rounded-2xl mt-3.5 shadow-sm w-full max-w-[540px]">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePrevCertSlide(cert.id, cert.slides.length);
                            }}
                            className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-[#9333ea] text-slate-700 hover:text-white transition-all flex items-center justify-center cursor-pointer shrink-0"
                            title="Previous Level"
                            aria-label="Previous Level"
                          >
                            <ChevronLeft size={20} />
                          </button>

                          <div className="flex items-center justify-center gap-1.5 flex-1">
                            {cert.slides.map((slide, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSelectCertSlide(cert.id, idx);
                                }}
                                className={`flex-1 py-1.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer text-center ${
                                  currentSlideIndex === idx
                                    ? 'bg-gradient-to-r from-[#c026d3] via-[#9333ea] to-[#7c3aed] text-white shadow-sm'
                                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                                }`}
                              >
                                {slide.label}
                              </button>
                            ))}
                          </div>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleNextCertSlide(cert.id, cert.slides.length);
                            }}
                            className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-[#9333ea] text-slate-700 hover:text-white transition-all flex items-center justify-center cursor-pointer shrink-0"
                            title="Next Level"
                            aria-label="Next Level"
                          >
                            <ChevronRight size={20} />
                          </button>
                        </div>
                      )}

                      {/* Active Level Sub-label */}
                      {hasMultipleSlides && (
                        <p className="text-xs sm:text-sm text-slate-600 font-medium mt-2 text-center">
                          Showing: <span className="font-bold text-slate-900">{currentSlide.title}</span>
                        </p>
                      )}
                    </div>

                    {/* Right Column: Certificate Details */}
                    <div className={`${isPortrait ? 'lg:col-span-7' : 'lg:col-span-6'} flex flex-col items-center text-center lg:items-start lg:text-left justify-between space-y-6`}>
                      <div className="space-y-4 w-full">
                        {/* Top Badges */}
                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 sm:gap-3">
                          {cert.endorsement && (
                            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-purple-100 text-purple-800 border border-purple-200">
                              <ShieldCheck size={15} className="text-[#9333ea]" />
                              {cert.endorsement}
                            </span>
                          )}
                          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <CheckCircle2 size={14} className="text-emerald-600" />
                            {hasMultipleSlides ? `${cert.slides.length} Certified Levels` : 'Verified Graduate'}
                          </span>
                        </div>

                        {/* Title & Subtitle */}
                        <div>
                          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
                            {cert.title}
                          </h3>
                          <p className="text-base sm:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#c026d3] via-[#9333ea] to-[#7c3aed] mt-1.5">
                            {cert.subtitle}
                          </p>
                          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1.5">
                            Issued by <span className="font-semibold text-slate-800">{cert.issuer}</span> • Director: <span className="font-semibold text-slate-800">{cert.director}</span>
                          </p>
                        </div>

                        {/* Summary / Description */}
                        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                          {cert.summary}
                        </p>

                        {/* Key Highlights Grid */}
                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 w-full text-center">
                          {cert.highlights.map((h, i) => (
                            <div key={i} className="bg-white p-3 sm:p-3.5 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center justify-center text-center">
                              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                                {h.label}
                              </span>
                              <span className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5 block break-words">
                                {h.value}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Skills / Domain Tags */}
                        <div className="pt-2 flex flex-col items-center lg:items-start w-full">
                          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2 text-center lg:text-left">
                            Competencies & Tools Covered
                          </span>
                          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
                            {cert.tags.map((tag, i) => (
                              <span
                                key={i}
                                className="text-xs font-medium px-3 py-1 rounded-full bg-white text-slate-700 border border-slate-200 shadow-xs"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Bottom Row: CTA Button & Credential ID */}
                      <div className="pt-4 border-t border-slate-200/90 flex flex-col lg:flex-row items-center justify-between gap-3 sm:gap-4 w-full">
                        <div className="text-xs text-slate-500 font-mono text-center lg:text-left">
                          <span className="text-slate-400">
                            {hasMultipleSlides ? `${currentSlide.label} Serial:` : 'Credential ID:'}{' '}
                          </span>
                          <span className="font-bold text-slate-800 select-all">
                            {currentSlide.serialNo || cert.credentialId}
                          </span>
                        </div>

                        <div className="flex items-center justify-center lg:justify-end gap-2 sm:gap-3 flex-wrap w-full sm:w-auto">
                          <a
                            href={cert.verificationUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#c026d3] via-[#9333ea] to-[#7c3aed] hover:from-[#a21caf] hover:to-[#6b21a8] text-white font-bold text-sm shadow-lg shadow-purple-900/25 transition-all hover:scale-105 active:scale-95 cursor-pointer w-full sm:w-auto"
                          >
                            <Award size={16} />
                            <span>{cert.actionLabel || 'View Official Certificate'}</span>
                            <ExternalLink size={15} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* My Services Section */}
      <section id="services" className="py-24 bg-white border-t border-slate-200/80 relative overflow-hidden w-full max-w-full">
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
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

          {/* 8-Card Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
            {SERVICES.map((service) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={service.id}
                  className="rounded-3xl p-6 sm:p-7 flex flex-col justify-between bg-white border border-slate-200/90 hover:border-purple-500/50 shadow-md hover:shadow-xl hover:shadow-purple-900/10 transition-all duration-300 hover:-translate-y-1.5 group relative overflow-hidden"
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
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#9333ea] group-hover:text-purple-800 transition-colors"
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

      {/* Selected Projects Showcase */}
      <section id="portfolio" className="py-24 bg-white border-t border-slate-200/80 relative overflow-hidden w-full max-w-full">
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
      <section id="blog" className="py-24 bg-slate-50/80 border-t border-slate-200/80 relative overflow-hidden w-full max-w-full">
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
      <section id="contact" className="py-20 bg-white border-t border-slate-200/80 relative overflow-hidden w-full max-w-full">
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
                <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-sm hover:border-purple-300 transition-colors">
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

                <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-sm hover:border-purple-300 transition-colors">
                  <div className="p-3 rounded-lg bg-purple-100 text-[#9333ea] border border-purple-200">
                    <Phone size={20} />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">Contact Number</span>
                    <a href="tel:+9779869061333" className="text-sm font-semibold text-slate-900 hover:text-[#9333ea] transition-colors">
                      + (977) 9869061333
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200 shadow-sm hover:border-purple-300 transition-colors">
                  <div className="p-3 rounded-lg bg-purple-100 text-[#9333ea] border border-purple-200">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 block">Location</span>
                    <span className="text-sm font-semibold text-slate-900">Kathmandu, Nepal</span>
                  </div>
                </div>
              </div>

              {/* Social Channels (Centered Circular Style) */}
              <div className="pt-3 text-center">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-4">
                  Follow & Connect
                </span>
                <div className="flex items-center justify-center gap-3 sm:gap-4">
                  <a
                    href="https://www.instagram.com/rijanregmi_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white hover:bg-[#9333ea] text-slate-700 hover:text-white border border-slate-200/80 hover:border-purple-500 transition-all flex items-center justify-center shadow-md shadow-slate-200/60 hover:shadow-xl hover:shadow-purple-900/20 hover:scale-110 cursor-pointer"
                    aria-label="Instagram"
                  >
                    <Instagram size={19} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/rijan-regmi-a720372b3"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white hover:bg-[#9333ea] text-slate-700 hover:text-white border border-slate-200/80 hover:border-purple-500 transition-all flex items-center justify-center shadow-md shadow-slate-200/60 hover:shadow-xl hover:shadow-purple-900/20 hover:scale-110 cursor-pointer"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={19} />
                  </a>
                  <a
                    href="https://github.com/RijanRegmi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white hover:bg-[#9333ea] text-slate-700 hover:text-white border border-slate-200/80 hover:border-purple-500 transition-all flex items-center justify-center shadow-md shadow-slate-200/60 hover:shadow-xl hover:shadow-purple-900/20 hover:scale-110 cursor-pointer"
                    aria-label="GitHub"
                  >
                    <Github size={19} />
                  </a>
                  <a
                    href="https://x.com/rijanregmi_"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white hover:bg-[#9333ea] text-slate-700 hover:text-white border border-slate-200/80 hover:border-purple-500 transition-all flex items-center justify-center shadow-md shadow-slate-200/60 hover:shadow-xl hover:shadow-purple-900/20 hover:scale-110 cursor-pointer"
                    aria-label="X"
                  >
                    <XIcon size={17} />
                  </a>
                  <a
                    href="https://www.facebook.com/rijan.regmi.946"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white hover:bg-[#9333ea] text-slate-700 hover:text-white border border-slate-200/80 hover:border-purple-500 transition-all flex items-center justify-center shadow-md shadow-slate-200/60 hover:shadow-xl hover:shadow-purple-900/20 hover:scale-110 cursor-pointer"
                    aria-label="Facebook"
                  >
                    <Facebook size={19} />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white p-5 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-5 sm:mb-6">Send a Message</h3>

              {submitStatus.message && (
                <div
                  className={`p-4 rounded-xl sm:rounded-2xl mb-5 text-sm flex items-center gap-3 ${submitStatus.success
                      ? 'bg-emerald-50 border border-emerald-300 text-emerald-800'
                      : 'bg-rose-50 border border-rose-300 text-rose-800'
                    }`}
                >
                  {submitStatus.success ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                  <span>{submitStatus.message}</span>
                </div>
              )}

              <form onSubmit={handleContactSubmit} className="space-y-4 sm:space-y-5">
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
                    className="w-full px-4 sm:px-5 py-3.5 sm:py-3.5 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-base sm:text-sm focus:outline-none focus:border-[#9333ea] focus:bg-white focus:ring-2 focus:ring-purple-500/20 transition-all"
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
                    className="w-full px-4 sm:px-5 py-3.5 sm:py-3.5 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-base sm:text-sm focus:outline-none focus:border-[#9333ea] focus:bg-white focus:ring-2 focus:ring-purple-500/20 transition-all"
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
                    className="w-full px-4 sm:px-5 py-3.5 sm:py-3.5 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-base sm:text-sm focus:outline-none focus:border-[#9333ea] focus:bg-white focus:ring-2 focus:ring-purple-500/20 transition-all"
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
                    className="w-full px-4 sm:px-5 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-base sm:text-sm focus:outline-none focus:border-[#9333ea] focus:bg-white focus:ring-2 focus:ring-purple-500/20 transition-all resize-none min-h-[120px] sm:min-h-[130px]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitStatus.loading}
                  className="w-full py-4 sm:py-3.5 px-6 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#c026d3] via-[#9333ea] to-[#7c3aed] hover:from-[#a21caf] hover:to-[#6b21a8] text-white font-bold text-base sm:text-sm shadow-xl shadow-purple-900/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
                >
                  {submitStatus.loading ? (
                    <span>Sending message...</span>
                  ) : (
                    <>
                      <Send size={18} />
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

      {/* Fullscreen Certificate Zoom Modal (Transparent White Theme) */}
      {modalCert && (() => {
        const activeModalCert = CERTIFICATES.find((c) => c.id === modalCert.certId);
        if (!activeModalCert) return null;
        const activeModalSlide = activeModalCert.slides[modalCert.slideIndex] || activeModalCert.slides[0];
        if (!activeModalSlide) return null;
        const hasMultiple = activeModalCert.slides.length > 1;

        return (
          <div
            className="fixed inset-0 z-[9999] bg-slate-950/35 backdrop-blur-2xl flex flex-col justify-between select-none animate-fadeIn"
            onClick={(e) => {
              if (e.target === e.currentTarget) closeCertModal();
            }}
          >
            {/* Modal Top Header Bar */}
            <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3.5 bg-white/85 border-b border-white/40 backdrop-blur-xl z-30 shadow-sm">
              {/* Title & Level Badge */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2 rounded-xl bg-purple-100 border border-purple-200 text-[#9333ea] shrink-0 hidden sm:flex shadow-xs">
                  <Award size={20} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-slate-950 font-extrabold text-sm sm:text-base truncate">
                      {activeModalCert.title}
                    </h3>
                    {hasMultiple && (
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-100 text-purple-800 border border-purple-200">
                        {activeModalSlide.label}
                      </span>
                    )}
                  </div>
                  <p className="text-slate-500 text-xs truncate">
                    {activeModalSlide.title || activeModalCert.subtitle}
                  </p>
                </div>
              </div>

              {/* Center: Zoom Controls Toolbar */}
              <div className="flex items-center gap-1 sm:gap-1.5 bg-white/90 border border-slate-200/90 rounded-full px-2.5 sm:px-3 py-1.5 shadow-sm">
                <button
                  type="button"
                  onClick={handleZoomOut}
                  disabled={zoomScale <= 0.75}
                  className="p-1.5 rounded-full hover:bg-slate-100 text-slate-700 hover:text-slate-950 disabled:opacity-40 transition-all cursor-pointer"
                  title="Zoom Out (-)"
                  aria-label="Zoom Out"
                >
                  <ZoomOut size={16} />
                </button>

                <button
                  type="button"
                  onClick={handleResetZoom}
                  className="px-2 py-0.5 text-xs font-mono font-bold text-[#9333ea] hover:text-purple-900 transition-colors cursor-pointer"
                  title="Reset Zoom"
                >
                  {Math.round(zoomScale * 100)}%
                </button>

                <button
                  type="button"
                  onClick={handleZoomIn}
                  disabled={zoomScale >= 3}
                  className="p-1.5 rounded-full hover:bg-slate-100 text-slate-700 hover:text-slate-950 disabled:opacity-40 transition-all cursor-pointer"
                  title="Zoom In (+)"
                  aria-label="Zoom In"
                >
                  <ZoomIn size={16} />
                </button>

                <div className="w-[1px] h-4 bg-slate-300 mx-1" />

                <button
                  type="button"
                  onClick={handleResetZoom}
                  className="p-1.5 rounded-full hover:bg-slate-100 text-slate-700 hover:text-slate-950 transition-all cursor-pointer"
                  title="Reset View"
                  aria-label="Reset View"
                >
                  <RotateCcw size={15} />
                </button>
              </div>

              {/* Right: Official Link & Close */}
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={activeModalCert.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#c026d3] via-[#9333ea] to-[#7c3aed] hover:from-[#a21caf] hover:to-[#6b21a8] text-white font-bold text-xs transition-all shadow-md cursor-pointer"
                >
                  <span>Official Site</span>
                  <ExternalLink size={13} />
                </a>

                <button
                  type="button"
                  onClick={closeCertModal}
                  className="p-2 rounded-xl bg-slate-100/90 hover:bg-rose-50 text-slate-700 hover:text-rose-600 border border-slate-200 transition-colors cursor-pointer"
                  title="Close (Esc)"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Center Interactive Canvas (Transparent View) */}
            <div
              className="relative flex-1 overflow-auto flex items-center justify-center p-4 sm:p-8 bg-transparent"
              onClick={(e) => {
                if (e.target === e.currentTarget) closeCertModal();
              }}
            >
              {/* Certificate Image Frame with Zoom (No opaque container box, smooth crossfade) */}
              <div
                className={`transition-transform duration-200 origin-center select-none bg-transparent relative flex items-center justify-center ${
                  zoomScale > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-zoom-in'
                }`}
                style={{
                  transform: `scale(${zoomScale})`,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleZoom();
                }}
                title={zoomScale > 1 ? 'Click to reset zoom' : 'Click to zoom in'}
              >
                {activeModalCert.slides.map((slide, idx) => (
                  <img
                    key={slide.image}
                    src={slide.image}
                    alt={slide.title}
                    className={`max-h-[76vh] max-w-[88vw] object-contain rounded-2xl shadow-2xl bg-transparent transition-opacity duration-300 ease-in-out ${
                      idx === modalCert.slideIndex
                        ? 'opacity-100 relative z-10'
                        : 'opacity-0 absolute inset-0 m-auto pointer-events-none z-0'
                    } ${activeModalCert.orientation === 'portrait' ? 'h-[76vh]' : 'w-auto'}`}
                    loading="eager"
                    decoding="async"
                    draggable={false}
                  />
                ))}
              </div>
            </div>

            {/* Bottom Footer Bar with Navigation Arrows and Level Switcher */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 sm:px-6 py-3 bg-white/85 border-t border-white/40 backdrop-blur-xl z-30 shadow-sm">
              {/* Bottom Level Tabs with < and > arrows */}
              {hasMultiple ? (
                <div className="flex items-center gap-1.5 p-1 bg-white/90 border border-slate-200 rounded-2xl shadow-xs">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      const nextIdx =
                        (modalCert.slideIndex - 1 + activeModalCert.slides.length) %
                        activeModalCert.slides.length;
                      setModalCert({ ...modalCert, slideIndex: nextIdx });
                    }}
                    className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-700 hover:text-slate-950 transition-all cursor-pointer"
                    title="Previous Level"
                    aria-label="Previous Level"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  {activeModalCert.slides.map((s, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setModalCert({ ...modalCert, slideIndex: idx });
                      }}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        modalCert.slideIndex === idx
                          ? 'bg-gradient-to-r from-[#c026d3] to-[#7c3aed] text-white shadow-sm'
                          : 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      const nextIdx =
                        (modalCert.slideIndex + 1) % activeModalCert.slides.length;
                      setModalCert({ ...modalCert, slideIndex: nextIdx });
                    }}
                    className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-700 hover:text-slate-950 transition-all cursor-pointer"
                    title="Next Level"
                    aria-label="Next Level"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              ) : (
                <div className="text-xs text-slate-600">
                  Credential ID: <span className="font-mono text-[#9333ea] font-bold">{activeModalSlide.serialNo || activeModalCert.credentialId}</span>
                </div>
              )}

              {/* Info Tip */}
              <div className="text-[11px] text-slate-500 text-center">
                <span>Click image to toggle zoom ({Math.round(zoomScale * 100)}%) • ESC to close</span>
              </div>

              {/* Mobile Official Link */}
              <a
                href={activeModalCert.verificationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="md:hidden inline-flex items-center gap-1 text-xs text-[#9333ea] font-bold hover:underline"
              >
                <span>Open Verification Site</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
