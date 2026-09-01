'use client';

import { useEffect, useRef } from 'react';

/**
 * useCardReveal
 *
 * Observes a container element and stagger-reveals its direct card children
 * one-by-one as the section enters the viewport. Each card slides in with a
 * configurable delay between them.
 *
 * @param staggerMs   - ms delay between each card (default 120ms)
 * @param threshold   - IntersectionObserver threshold (default 0.08)
 * @param rootMargin  - IntersectionObserver rootMargin (default "0px 0px -40px 0px")
 */
export function useCardReveal<T extends HTMLElement = HTMLDivElement>(
  staggerMs = 120,
  threshold = 0.08,
  rootMargin = '0px 0px -40px 0px'
) {
  const containerRef = useRef<T>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof IntersectionObserver === 'undefined') return;

    // Collect all direct children that are cards
    const cards = Array.from(container.children) as HTMLElement[];
    if (cards.length === 0) return;

    // Step 1: Set initial invisible state synchronously (no transition yet).
    // Use double-rAF so the browser commits the opacity:0 paint BEFORE we
    // add the transition — otherwise the transition start is skipped.
    requestAnimationFrame(() => {
      cards.forEach((card) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(32px)';
        card.style.transition = 'none';
      });

      // Step 2: Force a style recalc by reading a layout property,
      // then commit transition on next paint.
      requestAnimationFrame(() => {
        // Reading offsetHeight forces the browser to flush styles above
        // before we apply the transition, ensuring the initial state is painted.
        void container.offsetHeight;

        // Now set will-change so compositor layer is created just in time
        cards.forEach((card) => {
          card.style.willChange = 'opacity, transform';
        });
      });
    });

    let revealed = false;

    const reveal = () => {
      if (revealed) return;
      revealed = true;

      cards.forEach((card, i) => {
        const delayMs = i * staggerMs;

        // Schedule each card independently so they truly animate one-by-one
        setTimeout(() => {
          requestAnimationFrame(() => {
            // Apply smooth spring transition with per-card timing
            card.style.transition = `opacity 0.80s cubic-bezier(0.16, 1, 0.3, 1), transform 0.80s cubic-bezier(0.16, 1, 0.3, 1)`;
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';

            // Free the compositor layer once this card's animation is done
            card.addEventListener(
              'transitionend',
              () => {
                card.style.willChange = 'auto';
                card.style.transition = '';
              },
              { once: true }
            );
          });
        }, delayMs);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal();
            observer.disconnect();
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(container);

    return () => {
      observer.disconnect();
      // Cleanup: ensure cards are visible if component unmounts mid-animation
      cards.forEach((card) => {
        card.style.opacity = '';
        card.style.transform = '';
        card.style.transition = '';
        card.style.willChange = '';
      });
    };
  }, [staggerMs, threshold, rootMargin]);

  return containerRef;
}
