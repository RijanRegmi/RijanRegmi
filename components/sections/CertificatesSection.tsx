'use client';

import React, { useState } from 'react';
import {
  Award,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { CERTIFICATES } from '@/lib/data/certificates';
import CertificateModal from './CertificateModal';

export default function CertificatesSection() {
  // State for active slide index per certificate card
  const [certSlideIndices, setCertSlideIndices] = useState<{ [key: string]: number }>({});

  // State for active fullscreen modal
  const [modalCert, setModalCert] = useState<{
    certId: string;
    slideIndex: number;
  } | null>(null);

  const openCertModal = (certId: string, slideIndex: number = 0) => {
    setModalCert({ certId, slideIndex });
  };

  const closeCertModal = () => {
    setModalCert(null);
  };

  const handleNextCertSlide = (certId: string, totalSlides: number) => {
    setCertSlideIndices((prev) => {
      const current = prev[certId] || 0;
      return { ...prev, [certId]: (current + 1) % totalSlides };
    });
  };

  const handlePrevCertSlide = (certId: string, totalSlides: number) => {
    setCertSlideIndices((prev) => {
      const current = prev[certId] || 0;
      return { ...prev, [certId]: (current - 1 + totalSlides) % totalSlides };
    });
  };

  const handleSelectCertSlide = (certId: string, index: number) => {
    setCertSlideIndices((prev) => ({ ...prev, [certId]: index }));
    if (modalCert && modalCert.certId === certId) {
      setModalCert({ certId, slideIndex: index });
    }
  };

  return (
    <>
      <section id="certificates" aria-label="Verified Certificates & Accreditations" className="py-24 bg-white border-t border-slate-200/80 relative overflow-hidden w-full max-w-full">
        {/* Soft Ambient Radial Backlights */}
        <div className="absolute top-10 right-10 w-96 h-96 bg-purple-200/30 rounded-full blur-[100px] pointer-events-none -z-0" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-fuchsia-100/30 rounded-full blur-[100px] pointer-events-none -z-0" />

        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20 reveal-up delay-1">
            <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#9333ea] font-bold">
              <Award size={14} className="text-[#9333ea]" />
              Verified Credentials
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 mt-2 tracking-tight">
              Certificates &amp; Accreditations
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3">
              Industry-recognized certifications and professional credentials validating technical domain expertise and practical execution.
            </p>
          </div>

          {/* Certificate Showcase Cards */}
          <div className="space-y-12">
            {CERTIFICATES.map((cert, index) => {
              const currentSlideIndex = certSlideIndices[cert.id] || 0;
              const currentSlide = cert.slides[currentSlideIndex] || cert.slides[0];
              const hasMultipleSlides = cert.slides.length > 1;
              const isPortrait = cert.orientation === 'portrait';

              return (
                <div
                  key={cert.id}
                  className={`rounded-3xl bg-slate-50/80 border border-slate-200/90 hover:border-purple-500/40 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-purple-900/10 transition-shadow duration-300 overflow-hidden reveal-up delay-${index + 1}`}
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
                              alt={`${cert.title} - ${slide.label} credential view`}
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
                            Authority: <span className="font-semibold text-slate-800">{cert.issuer}</span> • Instructor: <span className="font-semibold text-slate-800">{cert.director}</span>
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
                            {cert.skillsLabel || 'Competencies & Tools Covered'}
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

                      {/* Bottom Row: CTA Button & Credential ID (with rel='nofollow noopener noreferrer') */}
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
                            rel="nofollow noopener noreferrer"
                            aria-label={`${cert.actionLabel || 'Verify Official Certificate'} for ${cert.title}`}
                            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#c026d3] via-[#9333ea] to-[#7c3aed] hover:from-[#a21caf] hover:to-[#6b21a8] text-white font-bold text-sm shadow-lg shadow-purple-900/25 transition-all hover:scale-105 active:scale-95 cursor-pointer w-full sm:w-auto"
                          >
                            <Award size={16} />
                            <span>{cert.actionLabel || 'View Official Certificate'}</span>
                            <span className="sr-only">: {cert.title}</span>
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

      {/* Fullscreen Certificate Modal */}
      <CertificateModal
        modalCert={modalCert}
        onClose={closeCertModal}
        onSelectSlide={handleSelectCertSlide}
      />
    </>
  );
}
