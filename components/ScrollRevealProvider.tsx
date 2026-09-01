'use client';

import React, { useEffect } from 'react';

export default function ScrollRevealProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const SELECTOR = '.reveal-init, .reveal-up, .reveal-left, .reveal-right, .reveal-scale';

    const revealEl = (el: HTMLElement) => {
      el.classList.add('reveal-visible');
      // Remove will-change after animation finishes to free compositor layer
      el.addEventListener('transitionend', () => {
        el.style.willChange = 'auto';
      }, { once: true });
    };

    let observer: IntersectionObserver | null = null;

    const observeAll = (root: Element | Document = document) => {
      const elements = root.querySelectorAll<HTMLElement>(SELECTOR);
      elements.forEach((el) => {
        // Skip already-revealed elements
        if (el.classList.contains('reveal-visible')) return;
        // Only set will-change when element is being actively watched
        el.style.willChange = 'opacity, transform';
        observer?.observe(el);
      });
    };

    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              revealEl(entry.target as HTMLElement);
              observer?.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.06,
          rootMargin: '0px 0px -30px 0px',
        }
      );

      // Observe elements present at mount
      observeAll();

      // Watch for new elements added dynamically (async data loads)
      const mutationObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const el = node as Element;
              // Check the node itself
              if (el.matches && el.matches(SELECTOR)) {
                const htmlEl = el as HTMLElement;
                if (!htmlEl.classList.contains('reveal-visible')) {
                  htmlEl.style.willChange = 'opacity, transform';
                  observer?.observe(htmlEl);
                }
              }
              // Check descendants
              observeAll(el);
            }
          });
        });
      });

      mutationObserver.observe(document.body, { childList: true, subtree: true });

      return () => {
        observer?.disconnect();
        mutationObserver.disconnect();
      };
    } else {
      // Fallback: reveal everything immediately
      document.querySelectorAll<HTMLElement>(SELECTOR).forEach(revealEl);
    }
  }, []);

  return <>{children}</>;
}
