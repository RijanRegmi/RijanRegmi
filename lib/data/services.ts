import {
  Globe,
  Server,
  Layers,
  Smartphone,
  Database,
  ShieldCheck,
  Code2,
  TrendingUp,
  LucideIcon
} from 'lucide-react';

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  features: string[];
  icon: LucideIcon;
  gradient: string;
  badge: string;
}

export const SERVICES: ServiceItem[] = [
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
