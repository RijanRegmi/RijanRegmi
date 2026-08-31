/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        'navbar-glass-reveal': 'navbarGlassReveal 1.25s cubic-bezier(0.16, 1, 0.3, 1) both',
        'nav-pulse': 'navPulseZoom 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both',
        'nav-click-zoom': 'navClickZoomInOut 0.42s cubic-bezier(0.34, 1.56, 0.64, 1) both',
        'fade-in': 'fadeIn 0.3s ease forwards',
        'float': 'float 5s ease-in-out infinite',
      },
      keyframes: {
        navbarGlassReveal: {
          '0%': { clipPath: 'inset(0 48% round 9999px)', opacity: '0', transform: 'translateY(-6px) scale(0.98)' },
          '25%': { opacity: '1' },
          '100%': { clipPath: 'inset(0 0% round 9999px)', opacity: '1', transform: 'translateY(0px) scale(1)' },
        },
        navPulseZoom: {
          '0%': { transform: 'scale(1)' },
          '45%': { transform: 'scale(1.14)' },
          '75%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1.08)' },
        },
        navClickZoomInOut: {
          '0%': { transform: 'scale(1)' },
          '30%': { transform: 'scale(0.88)' },
          '65%': { transform: 'scale(1.15)' },
          '100%': { transform: 'scale(1)' },
        },
        fadeIn: {
          'from': { opacity: '0', transform: 'translateY(8px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-14px) rotate(1.2deg)' },
        },
      },
    },
  },
  plugins: [],
};
