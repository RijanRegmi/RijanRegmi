'use client';

import React, { useState, useEffect } from 'react';

interface FloatingWhatsAppProps {
  phoneNumber?: string;
  defaultMessage?: string;
}

export default function FloatingWhatsApp({
  phoneNumber = '9779869061333',
  defaultMessage = 'Hi Rijan, I visited your portfolio and would like to discuss a project!',
}: FloatingWhatsAppProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show WhatsApp button after user scrolls 150px
      if (window.scrollY > 150) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger on mount
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const encodedMessage = encodeURIComponent(defaultMessage);
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Direct WhatsApp Contact"
      className="fixed right-4 bottom-4 sm:right-6 sm:bottom-6 z-50 flex items-center group pointer-events-auto"
    >
      {/* Interactive Hover Tooltip (Desktop only) */}
      <span className="hidden sm:inline-block mr-3 px-3.5 py-1.5 rounded-full bg-slate-900/90 text-white text-xs font-semibold shadow-xl backdrop-blur-md opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200 pointer-events-none border border-slate-800">
        Chat on WhatsApp
      </span>

      {/* Floating WhatsApp Button (Fixed 48px mobile, 56px desktop) */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat directly with Rijan Regmi on WhatsApp"
        title="Chat with Rijan Regmi on WhatsApp"
        className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-xl shadow-emerald-900/30 flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 border-2 border-white cursor-pointer shrink-0"
      >
        {/* Pulsing halo ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25 pointer-events-none" />

        {/* WhatsApp Official SVG Icon */}
        <svg
          className="w-6 h-6 sm:w-7 sm:h-7 fill-white relative z-10 drop-shadow-sm"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24M8.53 7.33c-.16 0-.42.06-.64.3-.22.23-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62.58.25 1.02.4 1.37.51.58.18 1.11.16 1.53.1.47-.07 1.44-.59 1.64-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.47-.29-.25-.12-1.44-.71-1.66-.79-.22-.08-.38-.12-.55.12-.16.25-.64.79-.78.96-.14.16-.29.18-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.51.11-.11.25-.29.38-.44.12-.14.16-.25.25-.41.08-.16.04-.31-.02-.44-.06-.12-.55-1.32-.75-1.81-.2-.48-.4-.41-.55-.42l-.47-.01Z" />
        </svg>
      </a>
    </aside>
  );
}
