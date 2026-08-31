import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Rijan Regmi | Full-Stack Developer & Software Engineer',
  description: 'Personal portfolio and API backend for Rijan Regmi - Front-end & Back-end Developer specializing in React, Next.js, Node.js, Express, and MongoDB.',
  keywords: ['Rijan Regmi', 'Full Stack Developer', 'Next.js', 'Express', 'MongoDB', 'Portfolio', 'Software Engineer'],
  authors: [{ name: 'Rijan Regmi' }],
  icons: {
    icon: '/assets/imgs/RJNnobg.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased min-h-screen selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
