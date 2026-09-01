import type { Metadata, Viewport } from 'next';
import './globals.css';

const SITE_URL = 'https://www.rijanregmi.com.np';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#9333ea',
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Rijan Regmi | Full-Stack Developer & Software Engineer',
    template: '%s | Rijan Regmi',
  },
  description:
    'Rijan Regmi is a Full-Stack Developer & Software Engineer in Nepal specializing in React, Next.js, Node.js, TypeScript, and scalable API architecture.',
  keywords: [
    'Rijan Regmi',
    'Rijan Regmi Portfolio',
    'Full-Stack Developer Nepal',
    'Software Engineer Kathmandu',
    'React Developer Nepal',
    'Next.js Full Stack Engineer',
    'Node.js & Express Specialist',
    'Python Developer',
    'TypeScript Architecture',
    'UI/UX Designer Nepal',
    'Technical Scouting',
    'Football Data Intelligence',
    'Footylytics Graduate',
    'AFCAS Certified Scout',
    'Web Development Kathmandu',
    'Freelance Software Developer',
  ],
  authors: [{ name: 'Rijan Regmi', url: SITE_URL }],
  creator: 'Rijan Regmi',
  publisher: 'Rijan Regmi',
  category: 'technology',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Rijan Regmi Portfolio',
    title: 'Rijan Regmi | Full-Stack Developer & Software Engineer',
    description:
      'Explore live web applications, accredited certifications, and technical case studies by Rijan Regmi — Full-Stack Developer & Software Engineer.',
    images: [
      {
        url: '/assets/imgs/header.jpeg',
        width: 740,
        height: 727,
        alt: 'Rijan Regmi - Full-Stack Developer & Software Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rijan Regmi | Full-Stack Developer & Software Engineer',
    description:
      'Full-Stack Developer & Software Engineer specializing in Next.js, Node.js, Python, TypeScript, and scalable web systems.',
    site: '@rijanregmi_',
    creator: '@rijanregmi_',
    images: ['/assets/imgs/header.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/assets/imgs/RJNnobg.png',
    shortcut: '/assets/imgs/RJNnobg.png',
    apple: '/assets/imgs/RJNnobg.png',
  },
};

// JSON-LD Structured Data Schema for Google Rich Snippets & Knowledge Graph
const jsonLdData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Rijan Regmi',
      alternateName: ['Rijan', 'Regmi Rijan'],
      url: SITE_URL,
      image: `${SITE_URL}/assets/imgs/header.jpeg`,
      jobTitle: 'Full-Stack Developer & Software Engineer',
      description:
        'Full-Stack Developer, UI/UX Engineer, and Football Technical Scout specializing in Next.js, Node.js, React, Python, and scalable web architectures.',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Kathmandu',
        addressCountry: 'NP',
      },
      sameAs: [
        'https://github.com/RijanRegmi',
        'https://www.linkedin.com/in/rijan-regmi-a720372b3',
        'https://x.com/rijanregmi_',
        'https://www.instagram.com/rijanregmi_',
        'https://www.facebook.com/rijan.regmi.946',
      ],
      knowsAbout: [
        'React',
        'Next.js',
        'TypeScript',
        'Node.js',
        'Express.js',
        'Python',
        'MongoDB',
        'SQL',
        'UI/UX Design',
        'Full Stack Web Development',
        'Technical Football Scouting',
        'Data Analysis',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Rijan Regmi Portfolio',
      description:
        'Official personal portfolio and software engineering showcase of Rijan Regmi.',
      publisher: {
        '@id': `${SITE_URL}/#person`,
      },
      inLanguage: 'en-US',
    },
    {
      '@type': 'ProfilePage',
      '@id': `${SITE_URL}/#profilepage`,
      url: SITE_URL,
      name: 'Rijan Regmi Profile',
      isPartOf: {
        '@id': `${SITE_URL}/#website`,
      },
      about: {
        '@id': `${SITE_URL}/#person`,
      },
      mainEntity: {
        '@id': `${SITE_URL}/#person`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body className="antialiased min-h-screen selection:bg-purple-500 selection:text-white bg-[#F8FAFC] text-slate-900">
        {children}
      </body>
    </html>
  );
}
