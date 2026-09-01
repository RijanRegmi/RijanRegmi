'use client';

import React from 'react';
import FloatingNavbar from '@/components/FloatingNavbar';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import ScrollRevealProvider from '@/components/ScrollRevealProvider';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import SkillsSection from '@/components/sections/SkillsSection';
import CertificatesSection from '@/components/sections/CertificatesSection';
import ServicesSection from '@/components/sections/ServicesSection';
import PortfolioSection from '@/components/sections/PortfolioSection';
import BlogSection from '@/components/sections/BlogSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/sections/Footer';

export default function HomePage() {
  return (
    <ScrollRevealProvider>
      <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-[#a855f7] selection:text-white w-full">
        {/* Floating Navbar (Self-contained, dark glass pill design) */}
        <FloatingNavbar />

        {/* Hero Section */}
        <HeroSection />

        {/* About Section */}
        <AboutSection />

        {/* Skills Section */}
        <SkillsSection />

        {/* Certificates & Accreditations Section */}
        <CertificatesSection />

        {/* My Services Section */}
        <ServicesSection />

        {/* Selected Projects Showcase */}
        <PortfolioSection />

        {/* Engineering Blog & Case Studies Section */}
        <BlogSection />

        {/* Contact Section */}
        <ContactSection />

        {/* Footer */}
        <Footer />

        {/* Floating WhatsApp Quick Chat Button (Bottom Right) */}
        <FloatingWhatsApp
          phoneNumber="9779869061333"
          defaultMessage="Hi Rijan, I visited your portfolio and would like to discuss a project!"
        />
      </div>
    </ScrollRevealProvider>
  );
}
