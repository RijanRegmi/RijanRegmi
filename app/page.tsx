'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Facebook, 
  Mail, 
  Phone, 
  MapPin, 
  Download, 
  ExternalLink, 
  Code, 
  Server, 
  Layers, 
  Send, 
  CheckCircle2, 
  AlertCircle,
  Menu,
  X,
  FileText
} from 'lucide-react';
import { contactApi } from '@/lib/api/contact.api';

// Project and Blog Data
const INITIAL_PROJECTS = [
  {
    id: '1',
    title: 'Modern Full-Stack Portal',
    category: 'web',
    image: '/assets/imgs/web-1.jpg',
    tags: ['Next.js', 'Express', 'TypeScript', 'MongoDB'],
    desc: 'High-performance interactive web application with layered architecture.',
  },
  {
    id: '2',
    title: 'E-Commerce Experience',
    category: 'web',
    image: '/assets/imgs/web-2.jpg',
    tags: ['React', 'Node.js', 'Tailwind CSS'],
    desc: 'Clean online store experience with real-time checkout and inventory.',
  },
  {
    id: '3',
    title: 'Cloud Dashboard Platform',
    category: 'web',
    image: '/assets/imgs/web-3.jpg',
    tags: ['Next.js', 'Analytics', 'REST API'],
    desc: 'Interactive business analytics and metrics visualization suite.',
  },
  {
    id: '4',
    title: 'Creative Brand Identity',
    category: 'branding',
    image: '/assets/imgs/branding-1.jpg',
    tags: ['Branding', 'Design System'],
    desc: 'Complete identity overhaul and typography guideline system.',
  },
  {
    id: '5',
    title: 'Visual Strategy & Packaging',
    category: 'branding',
    image: '/assets/imgs/branding-2.jpg',
    tags: ['Packaging', 'Identity'],
    desc: 'Product packaging concept and brand positioning showcase.',
  },
  {
    id: '6',
    title: 'Digital Advertising Campaign',
    category: 'advertising',
    image: '/assets/imgs/advertising-1.jpg',
    tags: ['Advertising', 'Marketing'],
    desc: 'High-converting multi-platform digital marketing campaign assets.',
  },
];

const BLOG_POSTS = [
  {
    id: '1',
    title: 'Building Scalable Full-Stack Apps with Next.js & Express',
    date: 'August 2026',
    excerpt: 'Learn how to architect clean monorepos with TypeScript, Next.js frontend, and Express MongoDB backend.',
    image: '/assets/imgs/blog1.png',
    author: 'Rijan Regmi',
    category: 'Architecture',
  },
  {
    id: '2',
    title: 'Mastering MongoDB Layered Repository Pattern',
    date: 'July 2026',
    excerpt: 'Decouple data queries from business logic for maintainable, testable, and robust enterprise software.',
    image: '/assets/imgs/blog2.jpg',
    author: 'Rijan Regmi',
    category: 'Backend',
  },
  {
    id: '3',
    title: 'UI/UX Principles for Modern Developer Portfolios',
    date: 'June 2026',
    excerpt: 'Design tokens, dark modes, and subtle micro-interactions that elevate your developer brand.',
    image: '/assets/imgs/blog3.jpg',
    author: 'Rijan Regmi',
    category: 'Design',
  },
];

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'all' | 'web' | 'advertising' | 'branding'>('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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

  const filteredProjects = activeTab === 'all' 
    ? INITIAL_PROJECTS 
    : INITIAL_PROJECTS.filter((p) => p.category === activeTab);

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
    <div className="min-h-screen bg-[#090a0f] text-gray-100 flex flex-col font-sans">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#090a0f]/80 border-b border-white/10 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-indigo-500/50 group-hover:border-indigo-400 transition-colors">
              <img 
                src="/assets/imgs/profile.jpg" 
                alt="Rijan Regmi" 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="font-bold text-lg text-white group-hover:text-indigo-400 transition-colors">Rijan Regmi</span>
              <span className="block text-xs text-gray-400">Full-Stack Developer</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#home" className="text-gray-300 hover:text-white hover:text-indigo-400 transition-colors">Home</a>
            <a href="#about" className="text-gray-300 hover:text-white hover:text-indigo-400 transition-colors">About</a>
            <a href="#skills" className="text-gray-300 hover:text-white hover:text-indigo-400 transition-colors">Skills</a>
            <a href="#portfolio" className="text-gray-300 hover:text-white hover:text-indigo-400 transition-colors">Portfolio</a>
            <a href="#blog" className="text-gray-300 hover:text-white hover:text-indigo-400 transition-colors">Blog</a>
            <a href="#contact" className="px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-lg shadow-indigo-600/30">
              Contact Me
            </a>
          </nav>

          {/* Mobile menu button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0e1017] border-b border-white/10 px-4 pt-2 pb-6 space-y-3">
            <a 
              href="#home" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-gray-300 hover:text-indigo-400"
            >
              Home
            </a>
            <a 
              href="#about" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-gray-300 hover:text-indigo-400"
            >
              About
            </a>
            <a 
              href="#skills" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-gray-300 hover:text-indigo-400"
            >
              Skills
            </a>
            <a 
              href="#portfolio" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-gray-300 hover:text-indigo-400"
            >
              Portfolio
            </a>
            <a 
              href="#blog" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-gray-300 hover:text-indigo-400"
            >
              Blog
            </a>
            <a 
              href="#contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-indigo-400 font-semibold"
            >
              Contact Me
            </a>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="relative pt-24 pb-20 md:pt-36 md:pb-32 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-indigo-600/15 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-950/60 border border-indigo-500/30 text-indigo-300 text-xs font-medium uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Available for New Projects & Opportunities
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
              Hello, I am <span className="gradient-text">Rijan Regmi</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-300 font-light leading-relaxed">
              Front-End and Back-End Developer building high-performance, beautiful web applications with Next.js, TypeScript, Express, and MongoDB.
            </p>

            {/* Social Icons */}
            <div className="flex items-center justify-center gap-4 pt-2">
              <a href="https://github.com/RijanRegmi" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 hover:bg-indigo-600 text-gray-300 hover:text-white transition-colors border border-white/10" aria-label="GitHub">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/in/rijan-regmi-a720372b3" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 hover:bg-indigo-600 text-gray-300 hover:text-white transition-colors border border-white/10" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="https://x.com/rijanregmi_" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 hover:bg-indigo-600 text-gray-300 hover:text-white transition-colors border border-white/10" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="https://www.instagram.com/rijanregmi_" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 hover:bg-indigo-600 text-gray-300 hover:text-white transition-colors border border-white/10" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://www.facebook.com/rijan.regmi.946" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-white/5 hover:bg-indigo-600 text-gray-300 hover:text-white transition-colors border border-white/10" aria-label="Facebook">
                <Facebook size={20} />
              </a>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <a
                href="/assets/Resume-Rijan Regmi.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow-lg shadow-indigo-600/30 transition-all hover:scale-105"
              >
                <FileText size={18} />
                View Resume
              </a>
              <a
                href="/assets/CV-Rijan Regmi.pdf"
                download="CV-Rijan Regmi.pdf"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-200 border border-white/15 font-medium transition-all hover:scale-105"
              >
                <Download size={18} />
                Download CV
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 border-t border-white/5 bg-[#0c0e15]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Who Am I */}
            <div className="glass-card p-8 rounded-2xl flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold">Introduction</span>
                <h3 className="text-2xl font-bold text-white mt-1 mb-4">Who am I?</h3>
                <p className="text-gray-300 leading-relaxed text-sm">
                  A passionate Web and Software Designer & Developer dedicated to creating innovative digital experiences, clean code architecture, and high-impact software.
                </p>
              </div>
              <div className="pt-6">
                <a
                  href="/assets/CV-Rijan Regmi.pdf"
                  download="CV-Rijan Regmi.pdf"
                  className="inline-flex items-center gap-2 text-sm text-indigo-400 hover:text-indigo-300 font-semibold"
                >
                  <Download size={16} /> Download Full CV
                </a>
              </div>
            </div>

            {/* Personal Info */}
            <div className="glass-card p-8 rounded-2xl">
              <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold">Details</span>
              <h3 className="text-2xl font-bold text-white mt-1 mb-4">Personal Info</h3>
              <ul className="space-y-3 text-sm text-gray-300">
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-400">Birthdate:</span>
                  <span className="font-medium text-gray-200">2004/06/29</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-400">Email:</span>
                  <a href="mailto:rijanregmi8@gmail.com" className="font-medium text-indigo-400 hover:underline">rijanregmi8@gmail.com</a>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-400">Role:</span>
                  <span className="font-medium text-gray-200">Full-Stack Engineer</span>
                </li>
                <li className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-400">Location:</span>
                  <span className="font-medium text-gray-200">Kathmandu, Nepal</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-400">Languages:</span>
                  <span className="font-medium text-gray-200">English, Nepali</span>
                </li>
              </ul>
            </div>

            {/* Expertise */}
            <div className="glass-card p-8 rounded-2xl flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold">Domain</span>
                <h3 className="text-2xl font-bold text-white mt-1 mb-4">My Expertise</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Code className="text-indigo-400 mt-1 shrink-0" size={20} />
                    <div>
                      <h4 className="text-sm font-semibold text-white">Front-End Development</h4>
                      <p className="text-xs text-gray-400">Next.js, React, TypeScript, Tailwind CSS</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Server className="text-indigo-400 mt-1 shrink-0" size={20} />
                    <div>
                      <h4 className="text-sm font-semibold text-white">Back-End Architecture</h4>
                      <p className="text-xs text-gray-400">Node.js, Express, Layered Pattern, REST APIs</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Layers className="text-indigo-400 mt-1 shrink-0" size={20} />
                    <div>
                      <h4 className="text-sm font-semibold text-white">Database & Systems</h4>
                      <p className="text-xs text-gray-400">MongoDB, Mongoose, Data Repositories</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold">Core Stack</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">Technical Proficiencies</h2>
            <p className="text-gray-400 text-sm mt-3">Technologies and tools used across full-stack projects</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'TypeScript', level: 'Advanced', icon: '⚡' },
              { name: 'Next.js 14/15', level: 'Advanced', icon: '▲' },
              { name: 'React', level: 'Advanced', icon: '⚛' },
              { name: 'Node.js', level: 'Proficient', icon: '🟢' },
              { name: 'Express.js', level: 'Advanced', icon: '🚂' },
              { name: 'MongoDB', level: 'Proficient', icon: '🍃' },
              { name: 'Tailwind CSS', level: 'Expert', icon: '🎨' },
              { name: 'REST APIs', level: 'Advanced', icon: '🔗' },
              { name: 'Git & GitHub', level: 'Proficient', icon: '🐙' },
              { name: 'Layered Arch', level: 'Advanced', icon: '🏛' },
              { name: 'Zod & Validation', level: 'Advanced', icon: '🛡' },
              { name: 'Vercel Deploy', level: 'Proficient', icon: '▲' },
            ].map((skill, index) => (
              <div key={index} className="glass-card p-5 rounded-xl text-center flex flex-col items-center justify-center space-y-2 hover:border-indigo-500/40">
                <span className="text-2xl">{skill.icon}</span>
                <h4 className="text-sm font-semibold text-white">{skill.name}</h4>
                <span className="text-xs text-indigo-400">{skill.level}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-20 bg-[#0c0e15]/50 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold">Showcase</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">Selected Projects</h2>
            <p className="text-gray-400 text-sm mt-3">Explore some of my web development and design work</p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {[
              { label: 'All Projects', value: 'all' },
              { label: 'Web Applications', value: 'web' },
              { label: 'Advertising', value: 'advertising' },
              { label: 'Branding', value: 'branding' },
            ].map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value as any)}
                className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                  activeTab === tab.value
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                    : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div key={project.id} className="glass-card rounded-2xl overflow-hidden group flex flex-col">
                <div className="relative h-52 w-full overflow-hidden bg-black/40">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12141d] via-transparent to-transparent opacity-80" />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">{project.category}</span>
                    <h3 className="text-lg font-bold text-white mt-1 mb-2 group-hover:text-indigo-400 transition-colors">{project.title}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed mb-4">{project.desc}</p>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="text-[11px] px-2 py-0.5 rounded-md bg-white/5 text-gray-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold">Articles & Insights</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">Latest Publications</h2>
            <p className="text-gray-400 text-sm mt-3">Thoughts on full-stack architecture, design, and software engineering</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BLOG_POSTS.map((post) => (
              <article key={post.id} className="glass-card rounded-2xl overflow-hidden flex flex-col group">
                <div className="relative h-48 w-full overflow-hidden bg-black/40">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-indigo-600 text-white">
                    {post.category}
                  </span>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs text-gray-400">{post.date}</span>
                    <h3 className="text-base font-bold text-white mt-2 mb-3 group-hover:text-indigo-400 transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed">{post.excerpt}</p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-400">
                    <span>By {post.author}</span>
                    <span className="text-indigo-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Read More &rarr;
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-[#0c0e15]/50 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <span className="text-xs uppercase tracking-widest text-indigo-400 font-semibold">Get In Touch</span>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mt-2">Let's Build Something Great Together</h2>
                <p className="text-gray-400 text-sm mt-4 leading-relaxed">
                  Have a project inquiry, collaboration proposal, or just want to say hi? Feel free to reach out using the form or through any of my contact channels.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-xl glass-card">
                  <div className="p-3 rounded-lg bg-indigo-600/20 text-indigo-400">
                    <Mail size={20} />
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block">Email Me</span>
                    <a href="mailto:rijanregmi8@gmail.com" className="text-sm font-medium text-white hover:text-indigo-400">
                      rijanregmi8@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-xl glass-card">
                  <div className="p-3 rounded-lg bg-indigo-600/20 text-indigo-400">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block">Location</span>
                    <span className="text-sm font-medium text-white">Kathmandu, Nepal</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="glass-card p-8 rounded-2xl border border-white/10">
              <h3 className="text-xl font-bold text-white mb-6">Send a Message</h3>

              {submitStatus.message && (
                <div
                  className={`p-4 rounded-xl mb-6 text-sm flex items-center gap-3 ${
                    submitStatus.success
                      ? 'bg-emerald-950/60 border border-emerald-500/30 text-emerald-300'
                      : 'bg-rose-950/60 border border-rose-500/30 text-rose-300'
                  }`}
                >
                  {submitStatus.success ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                  <span>{submitStatus.message}</span>
                </div>
              )}

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    Your Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    Your Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    placeholder="Project Inquiry"
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Tell me about your project..."
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitStatus.loading}
                  className="w-full py-3.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
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
      <footer className="py-8 border-t border-white/10 text-center text-xs text-gray-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Rijan Regmi. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#home" className="hover:text-indigo-400 transition-colors">Home</a>
            <a href="#about" className="hover:text-indigo-400 transition-colors">About</a>
            <a href="#portfolio" className="hover:text-indigo-400 transition-colors">Portfolio</a>
            <a href="#contact" className="hover:text-indigo-400 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
