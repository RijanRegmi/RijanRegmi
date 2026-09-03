import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  ArrowLeft, 
  ExternalLink, 
  Calendar, 
  Clock, 
  Layers, 
  Cpu, 
  ShieldCheck, 
  Check, 
  Sparkles,
  BookOpen,
  ArrowRight,
  Smartphone
} from 'lucide-react';
import { BLOG_POSTS } from '@/lib/data/blogs';
import FloatingNavbar from '@/components/FloatingNavbar';
import MobileScreenshotSlider from '@/components/MobileScreenshotSlider';

interface BlogPageProps {
  params: {
    name: string;
  };
}

const SITE_URL = 'https://www.rijanregmi.com.np';

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    name: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const post = BLOG_POSTS.find((p) => p.slug === params.name);
  if (!post) {
    return {
      title: 'Article Not Found | Rijan Regmi',
      description: 'The requested engineering case study could not be found.',
    };
  }

  const postUrl = `${SITE_URL}/blog/${post.slug}`;
  const imageUrl = post.image.startsWith('http') ? post.image : `${SITE_URL}${post.image}`;

  return {
    title: `${post.title}`,
    description: post.excerpt,
    keywords: [
      ...post.tags,
      post.category,
      'Rijan Regmi',
      'Software Architecture',
      'System Design',
      'Case Study',
      'Full Stack Development',
    ],
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      type: 'article',
      locale: 'en_US',
      url: postUrl,
      title: `${post.title} | Rijan Regmi`,
      description: post.excerpt,
      siteName: 'Rijan Regmi Portfolio',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | Rijan Regmi`,
      description: post.excerpt,
      site: '@rijanregmi_',
      creator: '@rijanregmi_',
      images: [imageUrl],
    },
  };
}

export default function BlogDetailPage({ params }: BlogPageProps) {
  const post = BLOG_POSTS.find((p) => p.slug === params.name);

  if (!post) {
    notFound();
  }

  const otherPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug);
  const articleUrl = `${SITE_URL}/blog/${post.slug}`;
  const imageUrl = post.image.startsWith('http') ? post.image : `${SITE_URL}${post.image}`;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: post.title,
    description: post.excerpt,
    image: imageUrl,
    url: articleUrl,
    datePublished: '2026-08-01',
    author: {
      '@type': 'Person',
      name: 'Rijan Regmi',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Person',
      name: 'Rijan Regmi',
      url: SITE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    keywords: post.tags.join(', '),
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 flex flex-col font-sans selection:bg-[#a855f7] selection:text-white w-full max-w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {/* Floating Navbar */}
      <FloatingNavbar />

      {/* Main Content Area */}
      <main className="flex-1 pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8 max-w-[1200px] w-full mx-auto relative z-10">
        
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/#blog"
            aria-label="Back to all engineering case studies and blog posts"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 hover:text-purple-700 transition-colors group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform text-purple-600" />
            <span>Back to All Case Studies &amp; Blogs</span>
          </Link>
        </div>

        {/* Article Header */}
        <div className="space-y-4 mb-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-50 text-purple-700 border border-purple-200 shadow-sm">
              {post.category}
            </span>
            <div className="flex items-center gap-3 text-xs text-slate-500 font-medium">
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={14} className="text-purple-600" />
                {post.date}
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock size={14} className="text-purple-600" />
                {post.readTime}
              </span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-950 tracking-tight leading-[1.15]">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-4xl font-normal">
            {post.excerpt}
          </p>

          {/* Author & Live Project Link Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-purple-300 bg-purple-100 shadow-xs">
                <img src="/assets/imgs/RJN.png" alt="Rijan Regmi author portrait" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="text-sm font-bold text-slate-900 block">Rijan Regmi</span>
                <span className="text-xs text-slate-500 font-medium">Lead Full-Stack Architect</span>
              </div>
            </div>

            <a
              href={post.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit live website ${post.displayUrl}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#c026d3] via-[#9333ea] to-[#7c3aed] text-white font-bold text-xs sm:text-sm shadow-xl shadow-purple-900/25 hover:scale-105 transition-transform"
            >
              <Sparkles size={15} />
              <span>Visit Live {post.displayUrl}</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>

        {/* Featured Screenshot Card */}
        <div className="relative w-full h-72 sm:h-[450px] lg:h-[520px] rounded-3xl overflow-hidden border border-slate-200 bg-slate-900 shadow-2xl mb-12 group">
          <img
            src={post.image}
            alt={`${post.title} architecture overview screenshot`}
            className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
          
          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl border border-slate-200 shadow-lg">
              {post.logo && (
                <img src={post.logo} alt={`${post.title} logo`} className="w-8 h-8 object-contain" />
              )}
              <span className="text-sm font-bold text-slate-900">{post.displayUrl}</span>
            </div>

            <a
              href={post.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open live production site for ${post.title}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/90 hover:bg-white text-slate-900 text-xs font-bold transition-all border border-slate-200 shadow-md"
            >
              <span>Open Website</span>
              <ExternalLink size={13} />
            </a>
          </div>
        </div>

        {/* Performance Metrics Grid */}
        <div className="mb-14">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {post.impactMetrics.map((metric, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-md text-center">
                <div className="text-2xl sm:text-3xl font-black text-[#9333ea]">{metric.value}</div>
                <div className="text-xs font-bold text-slate-900 mt-1">{metric.label}</div>
                <div className="text-[11px] text-slate-500 mt-0.5 font-medium">{metric.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Body Layout: 2 Columns on Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 mb-16 relative">
          
          {/* Main Article Content */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* System Overview */}
            <div className="p-7 rounded-3xl bg-white border border-slate-200 shadow-lg space-y-3">
              <h2 className="text-lg sm:text-xl font-extrabold text-[#9333ea] flex items-center gap-2.5">
                <Layers size={20} />
                <span>System Overview</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                {post.systemOverview}
              </p>
            </div>

            {/* Architecture Blueprint */}
            <div className="p-7 rounded-3xl bg-white border border-slate-200 shadow-lg space-y-3">
              <h2 className="text-lg sm:text-xl font-extrabold text-[#7c3aed] flex items-center gap-2.5">
                <Cpu size={20} />
                <span>Architecture Blueprint</span>
              </h2>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                {post.architectureBlueprint}
              </p>
            </div>

            {/* Narrative Content Sections */}
            <div className="space-y-8">
              {post.contentSections.map((section, idx) => (
                <div key={idx} className="space-y-3">
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    {section.heading}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                    {section.content}
                  </p>
                  {section.bulletPoints && (
                    <ul className="space-y-2 pt-2">
                      {section.bulletPoints.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                          <Check size={16} className="text-[#9333ea] mt-0.5 shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile Screenshots Slider in Phone Covers */}
            {post.mobileScreenshots && post.mobileScreenshots.length > 0 && (
              <MobileScreenshotSlider screens={post.mobileScreenshots} />
            )}

            {/* Key Challenges & Solutions */}
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2.5">
                <ShieldCheck size={22} className="text-[#9333ea]" />
                <span>Technical Challenges &amp; Solutions</span>
              </h3>

              <div className="space-y-3">
                {post.challengesSolved.map((item, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-1.5">
                    <p className="text-sm sm:text-base font-bold text-purple-900 flex items-center gap-2">
                      <Check size={16} className="text-purple-600 shrink-0" />
                      <span>{item.title}</span>
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-6">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar: Technology Stack & Quick Actions */}
          <div className="lg:col-span-4 relative">
            <aside aria-label="Technical Details Sidebar" className="sticky top-24 space-y-6">
              
              {/* Tech Stack Card */}
              <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xl space-y-4">
                <p className="text-base font-bold text-slate-900 flex items-center gap-2 uppercase tracking-wider text-xs">
                  <Cpu size={16} className="text-purple-600" />
                  <span>Technology Stack</span>
                </p>

                <div className="space-y-3">
                  {post.techStackBreakdown.map((tech, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                      <div className="flex items-center justify-between">
                        <strong className="text-xs font-bold text-slate-900">{tech.name}</strong>
                        <span className="text-[10px] uppercase font-bold text-purple-700">{tech.role}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-snug">{tech.highlight}</p>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="pt-3 border-t border-slate-200 flex flex-wrap gap-1.5">
                  {post.tags.map((tag, idx) => (
                    <span key={idx} className="text-[11px] px-3 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200 font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Launch Project CTA */}
              <div className="p-6 rounded-3xl bg-gradient-to-b from-purple-50 to-white border border-purple-200 text-center space-y-3 shadow-xl">
                <p className="text-base font-bold text-slate-900">Experience the Live Platform</p>
                <p className="text-xs text-slate-600">Explore the production deployment with full interactions.</p>
                <a
                  href={post.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Launch production deployment for ${post.title}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-gradient-to-r from-[#c026d3] via-[#9333ea] to-[#7c3aed] text-white text-xs font-bold shadow-lg shadow-purple-900/25 hover:scale-105 transition-transform"
                >
                  <span>Launch {post.displayUrl}</span>
                  <ExternalLink size={14} />
                </a>
              </div>

            </aside>
          </div>

        </div>

        {/* Explore Other Architectural Case Studies */}
        <section aria-label="Related Engineering Case Studies" className="pt-12 border-t border-slate-200 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
              <BookOpen size={20} className="text-[#9333ea]" />
              <span>More Engineering Case Studies</span>
            </h2>
            <Link href="/#blog" aria-label="View all engineering case studies" className="text-xs font-bold text-purple-700 hover:underline">
              View All Case Studies &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherPosts.map((other) => (
              <Link
                key={other.slug}
                href={`/blog/${other.slug}`}
                aria-label={`Read Case Study: ${other.title}`}
                className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-purple-500/50 shadow-md hover:shadow-xl hover:shadow-purple-900/10 transition-all duration-300 group flex items-start gap-4 hover:-translate-y-1"
              >
                <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-900 shrink-0 border border-slate-200">
                  <img src={other.image} alt={`${other.title} preview screenshot`} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform" />
                </div>
                <div className="flex-1 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#9333ea]">
                    {other.category}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-purple-700 transition-colors line-clamp-2 leading-snug">
                    {other.title}
                  </h3>
                  <div className="text-[11px] text-slate-500 flex items-center gap-1 font-semibold pt-1">
                    <span>Read Case Study</span>
                    <span className="sr-only">: {other.title}</span>
                    <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform text-purple-600" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="py-8 bg-slate-950 text-center text-xs text-slate-400 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} Rijan Regmi. All rights reserved.</p>
          <nav aria-label="Blog Article Footer Links" className="flex flex-wrap items-center justify-center gap-6 font-medium text-slate-300">
            <Link href="/" aria-label="Return to Home page" className="hover:text-purple-400 transition-colors">Home</Link>
            <Link href="/#about" aria-label="Go to About page" className="hover:text-purple-400 transition-colors">About</Link>
            <Link href="/#skills" aria-label="Go to Skills page" className="hover:text-purple-400 transition-colors">Skills</Link>
            <Link href="/#portfolio" aria-label="Go to Portfolio page" className="hover:text-purple-400 transition-colors">Portfolio</Link>
            <Link href="/#blog" aria-label="Go to Blog page" className="hover:text-purple-400 transition-colors">Blog</Link>
            <Link href="/#contact" aria-label="Go to Contact page" className="hover:text-purple-400 transition-colors">Contact</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
