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
        primary: {
          DEFAULT: "#6366f1",
          hover: "#4f46e5",
          foreground: "#ffffff",
        },
        card: {
          DEFAULT: "#18181b",
          border: "#27272a",
        },
      },
    },
  },
  plugins: [],
};
