'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Award,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ExternalLink
} from 'lucide-react';
import { CERTIFICATES, CertificateItem, CertificateSlide } from '@/lib/data/certificates';

export interface CertificateModalProps {
  modalCert: {
    certId: string;
    slideIndex: number;
  } | null;
  onClose: () => void;
  onSelectSlide: (certId: string, slideIndex: number) => void;
}

export default function CertificateModal({
  modalCert,
  onClose,
  onSelectSlide,
}: CertificateModalProps) {
  const [zoomScale, setZoomScale] = useState<number>(1);

  // Fullscreen certificate modal keyboard navigation & body scroll lock
  useEffect(() => {
    if (!modalCert) {
      document.body.style.overflow = '';
      return;
    }

    document.body.style.overflow = 'hidden';
    setZoomScale(1);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        const activeCert = CERTIFICATES.find((c) => c.id === modalCert.certId);
        if (activeCert && activeCert.slides.length > 1) {
          const nextIdx =
            (modalCert.slideIndex - 1 + activeCert.slides.length) %
            activeCert.slides.length;
          onSelectSlide(modalCert.certId, nextIdx);
        }
      } else if (e.key === 'ArrowRight') {
        const activeCert = CERTIFICATES.find((c) => c.id === modalCert.certId);
        if (activeCert && activeCert.slides.length > 1) {
          const nextIdx = (modalCert.slideIndex + 1) % activeCert.slides.length;
          onSelectSlide(modalCert.certId, nextIdx);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [modalCert, onClose, onSelectSlide]);

  if (!modalCert) return null;

  const activeModalCert = CERTIFICATES.find((c) => c.id === modalCert.certId);
  if (!activeModalCert) return null;

  const activeModalSlide =
    activeModalCert.slides[modalCert.slideIndex] || activeModalCert.slides[0];
  const hasMultiple = activeModalCert.slides.length > 1;

  const handleZoomIn = () => {
    setZoomScale((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoomScale((prev) => Math.max(prev - 0.25, 0.75));
  };

  const handleResetZoom = () => {
    setZoomScale(1);
  };

  const toggleZoom = () => {
    setZoomScale((prev) => (prev > 1.05 ? 1 : 1.75));
  };

  return (
    <div
      className="fixed inset-0 z-[9999] bg-slate-950/35 backdrop-blur-2xl flex flex-col justify-between select-none animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
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
            onClick={onClose}
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
          if (e.target === e.currentTarget) onClose();
        }}
      >
        {/* Certificate Image Frame with Zoom */}
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
                onSelectSlide(modalCert.certId, nextIdx);
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
                  onSelectSlide(modalCert.certId, idx);
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
                onSelectSlide(modalCert.certId, nextIdx);
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
}
