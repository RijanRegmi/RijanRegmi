'use client';

import React, { useState, useEffect, useRef } from 'react';

/**
 * FootballPitchBackground
 * 
 * Renders an authentic, regulation-geometry football pitch background:
 * - Wide to the very ends of the screen in desktop view
 * - Regulation sharp 90-degree pitch corners (no rounded corners)
 * - Corner arcs as true quarter-circles at each 90-degree corner
 * - FIFA standard proportions: 18-yard penalty box, 6-yard goal area, penalty spots,
 *   penalty arc ("the D") matching center circle radius, center spot, and halfway line
 * - Completely transparent background with very light, subtle green grass mowing stripes
 * - Crisp, clearly visible white markings with subtle nocturnal pitch line glow
 * - Automatically responsive: Horizontal on desktop/laptop, Vertical on mobile
 */
export default function FootballPitchBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 1920, height: 950 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateDimensions = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        if (clientWidth > 0 && clientHeight > 0) {
          setSize({ width: clientWidth, height: clientHeight });
          return;
        }
      }
      if (typeof window !== 'undefined') {
        setSize({ width: window.innerWidth, height: window.innerHeight });
      }
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    window.addEventListener('resize', updateDimensions);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  const { width, height } = size;
  const isDesktop = width >= 768;

  // ─── DESKTOP (HORIZONTAL PITCH) GEOMETRY ─────────────────────────────────────
  // Stretch wide to the very ends of the screen
  const dPadX = Math.max(16, Math.round(width * 0.015)); // minimal margin so it spans to the ends
  const dPadY = Math.max(18, Math.round(height * 0.025));

  const dX1 = dPadX;
  const dX2 = width - dPadX;
  const dY1 = dPadY;
  const dY2 = height - dPadY;
  const dW = dX2 - dX1;
  const dH = dY2 - dY1;
  const dCX = width / 2;
  const dCY = height / 2;

  // Center circle radius (true circle)
  const dCenterR = Math.min(dH * 0.22, dW * 0.125);

  // Corner arc radius (quarter circle in 90-degree corner)
  const dCornerR = Math.min(28, dH * 0.055);

  // 18-yard box: proportional height ~58% of pitch height, depth ~16% of pitch width
  const dBoxH = dH * 0.58;
  const dBoxW = Math.min(dW * 0.165, dBoxH * 0.44);

  // 6-yard box: height ~27% of pitch height, depth ~35% of 18-yard box
  const dSixH = dH * 0.27;
  const dSixW = dBoxW * 0.35;

  // Penalty spot (11m from goal line, approx 68% of 18-yard depth)
  const dSpotDist = dBoxW * 0.68;

  // Penalty arc ("The D"): drawn outside 18yd box with center at penalty spot
  const dDDist = dBoxW - dSpotDist;
  const dHD = Math.sqrt(Math.max(0, dCenterR * dCenterR - dDDist * dDDist));

  // Goal net: width ~42% of 6-yard box
  const dGoalH = dSixH * 0.45;
  const dGoalDepth = Math.max(12, Math.min(22, dPadX - 2));

  // ─── MOBILE (VERTICAL PITCH) GEOMETRY ─────────────────────────────────────────
  const mPadX = Math.max(14, Math.round(width * 0.03));
  const mPadY = Math.max(16, Math.round(height * 0.025));

  const mX1 = mPadX;
  const mX2 = width - mPadX;
  const mY1 = mPadY;
  const mY2 = height - mPadY;
  const mW = mX2 - mX1;
  const mH = mY2 - mY1;
  const mCX = width / 2;
  const mCY = height / 2;

  const mCenterR = Math.min(mW * 0.22, mH * 0.125);
  const mCornerR = Math.min(22, mW * 0.06);

  const mBoxW = mW * 0.58;
  const mBoxH = Math.min(mH * 0.165, mBoxW * 0.44);

  const mSixW = mW * 0.27;
  const mSixH = mBoxH * 0.35;

  const mSpotDist = mBoxH * 0.68;
  const mDDist = mBoxH - mSpotDist;
  const mWD = Math.sqrt(Math.max(0, mCenterR * mCenterR - mDDist * mDDist));

  const mGoalW = mSixW * 0.45;
  const mGoalDepth = Math.max(10, Math.min(18, mPadY - 2));

  // Mowing stripes count
  const stripeCount = 12;

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none bg-transparent"
      aria-hidden="true"
    >
      {/* ─── Ambient Very Light Transparent Turf Glow ──────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.13) 0%, rgba(5, 150, 105, 0.06) 55%, rgba(4, 120, 87, 0.01) 90%, transparent 100%)',
        }}
      />

      {mounted && (
        <svg
          className="w-full h-full absolute inset-0 pointer-events-none"
          width={width}
          height={height}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Soft line glow so white markings stand out brightly & clearly */}
            <filter id="realPitchLineGlow" x="-5%" y="-5%" width="110%" height="110%">
              <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="rgba(255, 255, 255, 0.7)" />
            </filter>
          </defs>

          {/* ══════════════════════════════════════════════════════════════════════
              DESKTOP / LAPTOP: HORIZONTAL PITCH (WIDE TO ENDS OF SCREEN)
             ══════════════════════════════════════════════════════════════════════ */}
          {isDesktop ? (
            <g>
              {/* ── Very Light Transparent Lawn Stripes ── */}
              <g opacity="0.9">
                {Array.from({ length: stripeCount }).map((_, i) => {
                  const stripeW = dW / stripeCount;
                  const isEven = i % 2 === 0;
                  return (
                    <rect
                      key={`d-stripe-${i}`}
                      x={dX1 + i * stripeW}
                      y={dY1}
                      width={stripeW}
                      height={dH}
                      fill={isEven ? 'rgba(16, 185, 129, 0.045)' : 'rgba(5, 150, 105, 0.015)'}
                    />
                  );
                })}
              </g>

              {/* ── Goal Nets (Subtle mesh extending behind goal line) ── */}
              <g stroke="rgba(255, 255, 255, 0.45)" fill="rgba(255, 255, 255, 0.02)" strokeWidth="1.75">
                {/* Left Goal */}
                <rect x={dX1 - dGoalDepth} y={dCY - dGoalH / 2} width={dGoalDepth} height={dGoalH} />
                <line x1={dX1 - dGoalDepth} y1={dCY} x2={dX1} y2={dCY} strokeDasharray="3 3" />
                {/* Right Goal */}
                <rect x={dX2} y={dCY - dGoalH / 2} width={dGoalDepth} height={dGoalH} />
                <line x1={dX2} y1={dCY} x2={dX2 + dGoalDepth} y2={dCY} strokeDasharray="3 3" />
              </g>

              {/* ── Clear, Sharp White Regulation Pitch Lines ── */}
              <g
                stroke="rgba(255, 255, 255, 0.95)"
                fill="none"
                strokeLinecap="square"
                strokeLinejoin="miter"
                filter="url(#realPitchLineGlow)"
              >
                {/* Outer Touchlines & Goal Lines (STRICT 90° SHARP CORNERS, rx=0) */}
                <rect
                  x={dX1}
                  y={dY1}
                  width={dW}
                  height={dH}
                  strokeWidth="2.8"
                />

                {/* Halfway Line */}
                <line
                  x1={dCX}
                  y1={dY1}
                  x2={dCX}
                  y2={dY2}
                  strokeWidth="2.8"
                />

                {/* Center Circle & Spot */}
                <circle
                  cx={dCX}
                  cy={dCY}
                  r={dCenterR}
                  strokeWidth="2.8"
                />
                <circle cx={dCX} cy={dCY} r={4.5} fill="rgba(255, 255, 255, 0.98)" stroke="none" />

                {/* Corner Arcs (Authentic quarter-circles inside sharp 90° corners) */}
                <path d={`M ${dX1 + dCornerR} ${dY1} A ${dCornerR} ${dCornerR} 0 0 1 ${dX1} ${dY1 + dCornerR}`} strokeWidth="2.5" />
                <path d={`M ${dX1} ${dY2 - dCornerR} A ${dCornerR} ${dCornerR} 0 0 1 ${dX1 + dCornerR} ${dY2}`} strokeWidth="2.5" />
                <path d={`M ${dX2 - dCornerR} ${dY1} A ${dCornerR} ${dCornerR} 0 0 0 ${dX2} ${dY1 + dCornerR}`} strokeWidth="2.5" />
                <path d={`M ${dX2} ${dY2 - dCornerR} A ${dCornerR} ${dCornerR} 0 0 0 ${dX2 - dCornerR} ${dY2}`} strokeWidth="2.5" />

                {/* Left 18-Yard Penalty Box (SHARP 90° CORNERS) */}
                <rect
                  x={dX1}
                  y={dCY - dBoxH / 2}
                  width={dBoxW}
                  height={dBoxH}
                  strokeWidth="2.8"
                />

                {/* Left 6-Yard Goal Area (SHARP 90° CORNERS) */}
                <rect
                  x={dX1}
                  y={dCY - dSixH / 2}
                  width={dSixW}
                  height={dSixH}
                  strokeWidth="2.5"
                />

                {/* Left Penalty Spot */}
                <circle cx={dX1 + dSpotDist} cy={dCY} r={4.5} fill="rgba(255, 255, 255, 0.98)" stroke="none" />

                {/* Left Penalty Arc (The "D") */}
                <path
                  d={`M ${dX1 + dBoxW} ${dCY - dHD} A ${dCenterR} ${dCenterR} 0 0 1 ${dX1 + dBoxW} ${dCY + dHD}`}
                  strokeWidth="2.8"
                />

                {/* Right 18-Yard Penalty Box (SHARP 90° CORNERS) */}
                <rect
                  x={dX2 - dBoxW}
                  y={dCY - dBoxH / 2}
                  width={dBoxW}
                  height={dBoxH}
                  strokeWidth="2.8"
                />

                {/* Right 6-Yard Goal Area (SHARP 90° CORNERS) */}
                <rect
                  x={dX2 - dSixW}
                  y={dCY - dSixH / 2}
                  width={dSixW}
                  height={dSixH}
                  strokeWidth="2.5"
                />

                {/* Right Penalty Spot */}
                <circle cx={dX2 - dSpotDist} cy={dCY} r={4.5} fill="rgba(255, 255, 255, 0.98)" stroke="none" />

                {/* Right Penalty Arc (The "D") */}
                <path
                  d={`M ${dX2 - dBoxW} ${dCY - dHD} A ${dCenterR} ${dCenterR} 0 0 0 ${dX2 - dBoxW} ${dCY + dHD}`}
                  strokeWidth="2.8"
                />
              </g>
            </g>
          ) : (
            /* ══════════════════════════════════════════════════════════════════════
               MOBILE: VERTICAL PITCH (TALL & FITTING MOBILE VIEWPORT)
               ══════════════════════════════════════════════════════════════════════ */
            <g>
              {/* ── Very Light Transparent Lawn Stripes (Horizontal Bands) ── */}
              <g opacity="0.9">
                {Array.from({ length: stripeCount }).map((_, i) => {
                  const stripeH = mH / stripeCount;
                  const isEven = i % 2 === 0;
                  return (
                    <rect
                      key={`m-stripe-${i}`}
                      x={mX1}
                      y={mY1 + i * stripeH}
                      width={mW}
                      height={stripeH}
                      fill={isEven ? 'rgba(16, 185, 129, 0.045)' : 'rgba(5, 150, 105, 0.015)'}
                    />
                  );
                })}
              </g>

              {/* ── Goal Nets (Subtle mesh extending behind goal line) ── */}
              <g stroke="rgba(255, 255, 255, 0.45)" fill="rgba(255, 255, 255, 0.02)" strokeWidth="1.75">
                {/* Top Goal */}
                <rect x={mCX - mGoalW / 2} y={mY1 - mGoalDepth} width={mGoalW} height={mGoalDepth} />
                <line x1={mCX} y1={mY1 - mGoalDepth} x2={mCX} y2={mY1} strokeDasharray="3 3" />
                {/* Bottom Goal */}
                <rect x={mCX - mGoalW / 2} y={mY2} width={mGoalW} height={mGoalDepth} />
                <line x1={mCX} y1={mY2} x2={mCX} y2={mY2 + mGoalDepth} strokeDasharray="3 3" />
              </g>

              {/* ── Clear, Sharp White Regulation Pitch Lines ── */}
              <g
                stroke="rgba(255, 255, 255, 0.95)"
                fill="none"
                strokeLinecap="square"
                strokeLinejoin="miter"
                filter="url(#realPitchLineGlow)"
              >
                {/* Outer Touchlines & Goal Lines (STRICT 90° SHARP CORNERS, rx=0) */}
                <rect
                  x={mX1}
                  y={mY1}
                  width={mW}
                  height={mH}
                  strokeWidth="2.8"
                />

                {/* Halfway Line */}
                <line
                  x1={mX1}
                  y1={mCY}
                  x2={mX2}
                  y2={mCY}
                  strokeWidth="2.8"
                />

                {/* Center Circle & Spot */}
                <circle
                  cx={mCX}
                  cy={mCY}
                  r={mCenterR}
                  strokeWidth="2.8"
                />
                <circle cx={mCX} cy={mCY} r={4.5} fill="rgba(255, 255, 255, 0.98)" stroke="none" />

                {/* Corner Arcs (Authentic quarter-circles inside sharp 90° corners) */}
                <path d={`M ${mX1 + mCornerR} ${mY1} A ${mCornerR} ${mCornerR} 0 0 1 ${mX1} ${mY1 + mCornerR}`} strokeWidth="2.5" />
                <path d={`M ${mX2 - mCornerR} ${mY1} A ${mCornerR} ${mCornerR} 0 0 0 ${mX2} ${mY1 + mCornerR}`} strokeWidth="2.5" />
                <path d={`M ${mX1} ${mY2 - mCornerR} A ${mCornerR} ${mCornerR} 0 0 1 ${mX1 + mCornerR} ${mY2}`} strokeWidth="2.5" />
                <path d={`M ${mX2} ${mY2 - mCornerR} A ${mCornerR} ${mCornerR} 0 0 0 ${mX2 - mCornerR} ${mY2}`} strokeWidth="2.5" />

                {/* Top 18-Yard Penalty Box (SHARP 90° CORNERS) */}
                <rect
                  x={mCX - mBoxW / 2}
                  y={mY1}
                  width={mBoxW}
                  height={mBoxH}
                  strokeWidth="2.8"
                />

                {/* Top 6-Yard Goal Area (SHARP 90° CORNERS) */}
                <rect
                  x={mCX - mSixW / 2}
                  y={mY1}
                  width={mSixW}
                  height={mSixH}
                  strokeWidth="2.5"
                />

                {/* Top Penalty Spot */}
                <circle cx={mCX} cy={mY1 + mSpotDist} r={4.5} fill="rgba(255, 255, 255, 0.98)" stroke="none" />

                {/* Top Penalty Arc (The "D") */}
                <path
                  d={`M ${mCX - mWD} ${mY1 + mBoxH} A ${mCenterR} ${mCenterR} 0 0 0 ${mCX + mWD} ${mY1 + mBoxH}`}
                  strokeWidth="2.8"
                />

                {/* Bottom 18-Yard Penalty Box (SHARP 90° CORNERS) */}
                <rect
                  x={mCX - mBoxW / 2}
                  y={mY2 - mBoxH}
                  width={mBoxW}
                  height={mBoxH}
                  strokeWidth="2.8"
                />

                {/* Bottom 6-Yard Goal Area (SHARP 90° CORNERS) */}
                <rect
                  x={mCX - mSixW / 2}
                  y={mY2 - mSixH}
                  width={mSixW}
                  height={mSixH}
                  strokeWidth="2.5"
                />

                {/* Bottom Penalty Spot */}
                <circle cx={mCX} cy={mY2 - mSpotDist} r={4.5} fill="rgba(255, 255, 255, 0.98)" stroke="none" />

                {/* Bottom Penalty Arc (The "D") */}
                <path
                  d={`M ${mCX - mWD} ${mY2 - mBoxH} A ${mCenterR} ${mCenterR} 0 0 1 ${mCX + mWD} ${mY2 - mBoxH}`}
                  strokeWidth="2.8"
                />
              </g>
            </g>
          )}
        </svg>
      )}
    </div>
  );
}
