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
    'Rijan Regmi is a Full-Stack Developer & Software Engineer in Nepal specializing in React, Next.js, Node.js, TypeScript, and scalable API architecture. View projects, blogs, and portfolio.',
  keywords: [
    'Rijan Regmi',
    'Rijan Regmi Portfolio',
    'Rijan Regmi Developer',
    'Rijan Regmi Nepal',
    'Rijan Regmi Software Engineer',
    'Rijan Regmi Projects',
    'Rijan Regmi Blogs',
    'projects done by Rijan Regmi',
    'websites built by Rijan Regmi',
    'Full-Stack Developer Nepal',
    'Software Engineer Kathmandu',
    'React Developer Nepal',
    'Next.js Full Stack Engineer',
    'Node.js & Express Specialist',
    'Python Developer Nepal',
    'TypeScript Architecture',
    'UI/UX Designer Nepal',
    'Technical Scouting',
    'Football Data Intelligence',
    'Footylytics Graduate',
    'AFCAS Certified Scout',
    'Web Development Kathmandu',
    'Freelance Software Developer Nepal',
    'Ropewallet developer',
    'Rilogram developer',
    'Regmi Plastic Traders website',
    'PPP Football website',
    'EveFest developer',
    'Hamro Padhai platform',
    'RijanRegmi GitHub',
    'rijanregmi_ Instagram',
    'rijan.regmi Facebook',
    'Rijan Regmi LinkedIn',
    'Rijan Regmi YouTube',
    'Rijan Regmi Kathmandu developer',
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
      'Explore live web applications, accredited certifications, and technical case studies by Rijan Regmi — Full-Stack Developer & Software Engineer based in Kathmandu, Nepal.',
    images: [
      {
        url: '/assets/imgs/header.jpeg',
        width: 740,
        height: 727,
        alt: 'Rijan Regmi - Full-Stack Developer & Software Engineer from Kathmandu, Nepal',
      },
      {
        url: '/assets/imgs/profile.jpg',
        width: 800,
        height: 800,
        alt: 'Rijan Regmi - Software Developer Profile Photo',
      },
      {
        url: '/assets/imgs/RJN.png',
        width: 512,
        height: 512,
        alt: 'Rijan Regmi Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rijan Regmi | Full-Stack Developer & Software Engineer',
    description:
      'Full-Stack Developer & Software Engineer specializing in Next.js, Node.js, Python, TypeScript, and scalable web systems. Based in Kathmandu, Nepal.',
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
  verification: {
    google: 'rijanregmi-portfolio-verification',
  },
};

// JSON-LD Structured Data Schema for Google Rich Snippets & Knowledge Graph
const jsonLdData = {
  '@context': 'https://schema.org',
  '@graph': [
    // ─── PERSON ───────────────────────────────────────────────────────────────
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Rijan Regmi',
      alternateName: ['Rijan', 'Regmi Rijan', 'rijanregmi_', 'RijanRegmi'],
      url: SITE_URL,
      image: [
        {
          '@type': 'ImageObject',
          '@id': `${SITE_URL}/#photo-main`,
          url: `${SITE_URL}/assets/imgs/header.jpeg`,
          contentUrl: `${SITE_URL}/assets/imgs/header.jpeg`,
          width: 740,
          height: 727,
          name: 'Rijan Regmi - Full-Stack Developer & Software Engineer',
          description: 'Professional profile photo of Rijan Regmi, Full-Stack Developer from Kathmandu, Nepal',
          author: { '@id': `${SITE_URL}/#person` },
          representativeOfPage: true,
        },
        {
          '@type': 'ImageObject',
          '@id': `${SITE_URL}/#photo-profile`,
          url: `${SITE_URL}/assets/imgs/profile.jpg`,
          contentUrl: `${SITE_URL}/assets/imgs/profile.jpg`,
          width: 800,
          height: 800,
          name: 'Rijan Regmi Profile Photo',
          description: 'Rijan Regmi — Software Engineer and Developer based in Kathmandu, Nepal',
          author: { '@id': `${SITE_URL}/#person` },
        },
        {
          '@type': 'ImageObject',
          '@id': `${SITE_URL}/#photo-rjn`,
          url: `${SITE_URL}/assets/imgs/RJN.png`,
          contentUrl: `${SITE_URL}/assets/imgs/RJN.png`,
          width: 512,
          height: 512,
          name: 'Rijan Regmi RJN Brand Photo',
          description: 'Rijan Regmi personal brand photo and logo',
          author: { '@id': `${SITE_URL}/#person` },
        },
        {
          '@type': 'ImageObject',
          '@id': `${SITE_URL}/#photo-rjnnobg`,
          url: `${SITE_URL}/assets/imgs/RJNnobg.png`,
          contentUrl: `${SITE_URL}/assets/imgs/RJNnobg.png`,
          width: 512,
          height: 512,
          name: 'Rijan Regmi Transparent Logo',
          description: 'Rijan Regmi personal logo without background',
          author: { '@id': `${SITE_URL}/#person` },
        },
      ],
      jobTitle: 'Full-Stack Developer & Software Engineer',
      description:
        'Rijan Regmi is a Full-Stack Developer, UI/UX Engineer, and Football Technical Scout from Kathmandu, Nepal. He specializes in Next.js, Node.js, React, Python, TypeScript, and scalable web architectures. Creator of projects like Ropewallet, Rilogram, PPP Football, EveFest, Regmi Plastic Traders, and Hamro Padhai.',
      nationality: 'Nepali',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Kathmandu',
        addressRegion: 'Bagmati Province',
        addressCountry: 'NP',
      },
      // All verified social media profiles
      sameAs: [
        'https://github.com/RijanRegmi',
        'https://www.linkedin.com/in/rijan-regmi-a720372b3',
        'https://x.com/rijanregmi_',
        'https://twitter.com/rijanregmi_',
        'https://www.instagram.com/rijanregmi_',
        'https://www.facebook.com/rijan.regmi.946',
        'https://www.facebook.com/profile.php?id=rijan.regmi.946',
        'https://www.youtube.com/@rijanregmi',
        `${SITE_URL}`,
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
        'Web3',
        'Mobile App Development',
        'SaaS Architecture',
        'E-Commerce Development',
        'Real-time Communication (WebSockets)',
      ],
      hasOccupation: {
        '@type': 'Occupation',
        name: 'Full-Stack Developer',
        occupationLocation: {
          '@type': 'City',
          name: 'Kathmandu',
        },
        skills: 'React, Next.js, Node.js, TypeScript, Python, MongoDB',
      },
    },

    // ─── WEBSITE ──────────────────────────────────────────────────────────────
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Rijan Regmi Portfolio',
      alternateName: 'Rijan Regmi | Full-Stack Developer & Software Engineer',
      description:
        'Official personal portfolio, project showcase, engineering blogs, and software engineering case studies of Rijan Regmi — Full-Stack Developer from Kathmandu, Nepal.',
      publisher: { '@id': `${SITE_URL}/#person` },
      author: { '@id': `${SITE_URL}/#person` },
      inLanguage: 'en-US',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${SITE_URL}/?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },

    // ─── PROFILE PAGE ─────────────────────────────────────────────────────────
    {
      '@type': 'ProfilePage',
      '@id': `${SITE_URL}/#profilepage`,
      url: SITE_URL,
      name: 'Rijan Regmi — Full-Stack Developer Portfolio',
      description: 'Personal portfolio page of Rijan Regmi, a Full-Stack Developer and Software Engineer based in Kathmandu, Nepal.',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#person` },
      mainEntity: { '@id': `${SITE_URL}/#person` },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: SITE_URL,
          },
        ],
      },
    },

    // ─── PROJECTS ITEM LIST ───────────────────────────────────────────────────
    {
      '@type': 'ItemList',
      '@id': `${SITE_URL}/#projects`,
      name: 'Projects by Rijan Regmi',
      description: 'A curated list of live web applications, SaaS products, and software projects built by Rijan Regmi.',
      url: `${SITE_URL}/#portfolio`,
      author: { '@id': `${SITE_URL}/#person` },
      numberOfItems: 6,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@type': 'SoftwareApplication',
            name: 'Ropewallet',
            description: 'Modern non-custodial multi-chain crypto wallet web platform and mobile application with smooth fluid animations and secure transaction flow.',
            url: 'https://www.ropewallet.com/',
            applicationCategory: 'FinanceApplication',
            creator: { '@id': `${SITE_URL}/#person` },
            image: `${SITE_URL}/assets/webiste/ropewallet.png`,
            keywords: 'crypto wallet, Web3, Next.js, TypeScript, Fintech',
          },
        },
        {
          '@type': 'ListItem',
          position: 2,
          item: {
            '@type': 'SoftwareApplication',
            name: 'Rilogram',
            description: 'Invite-Only Chat SaaS and mobile app originally built for Royale Gaming.',
            url: 'https://www.royalegamingg.com/',
            applicationCategory: 'CommunicationApplication',
            creator: { '@id': `${SITE_URL}/#person` },
            image: `${SITE_URL}/assets/webiste/rilogram.png`,
            keywords: 'chat SaaS, real-time messaging, Socket.IO, React, Node.js',
          },
        },
        {
          '@type': 'ListItem',
          position: 3,
          item: {
            '@type': 'SoftwareApplication',
            name: 'Regmi Plastic Traders',
            description: 'E-Commerce enterprise portal for Nepal plastic trading company with dynamic product catalog.',
            url: 'https://www.regmiplastictraders.com.np/',
            applicationCategory: 'BusinessApplication',
            creator: { '@id': `${SITE_URL}/#person` },
            image: `${SITE_URL}/assets/webiste/regmiplastictraders.png`,
            keywords: 'e-commerce Nepal, Next.js, MongoDB, B2B portal',
          },
        },
        {
          '@type': 'ListItem',
          position: 4,
          item: {
            '@type': 'SoftwareApplication',
            name: 'PPP Football',
            description: 'Football tournament hub for live league fixtures, team management, match scorecards, and statistics.',
            url: 'https://pppfootball.vercel.app/',
            applicationCategory: 'SportsApplication',
            creator: { '@id': `${SITE_URL}/#person` },
            image: `${SITE_URL}/assets/webiste/pppfootball.png`,
            keywords: 'football tournament, sports analytics, Next.js, Nepal',
          },
        },
        {
          '@type': 'ListItem',
          position: 5,
          item: {
            '@type': 'SoftwareApplication',
            name: 'EveFest',
            description: 'Event ticketing, concert discovery, and festival management platform.',
            url: 'https://evefest.vercel.app/',
            applicationCategory: 'EntertainmentApplication',
            creator: { '@id': `${SITE_URL}/#person` },
            image: `${SITE_URL}/assets/webiste/evefest.png`,
            keywords: 'event ticketing, concert, festival, React',
          },
        },
        {
          '@type': 'ListItem',
          position: 6,
          item: {
            '@type': 'SoftwareApplication',
            name: 'Hamro Padhai',
            description: 'Interactive digital education and learning platform for students across Nepal. Under active development.',
            url: 'https://hamropadhai.com',
            applicationCategory: 'EducationalApplication',
            creator: { '@id': `${SITE_URL}/#person` },
            image: `${SITE_URL}/assets/webiste/hamropadhai.png`,
            keywords: 'EdTech Nepal, learning platform, education',
          },
        },
      ],
    },

    // ─── PROJECT SCREENSHOTS IMAGE GALLERY ────────────────────────────────────
    {
      '@type': 'ImageGallery',
      '@id': `${SITE_URL}/#project-gallery`,
      name: 'Projects by Rijan Regmi — Screenshot Gallery',
      description: 'Screenshots and visuals of web applications and software projects built by Rijan Regmi.',
      url: `${SITE_URL}/#portfolio`,
      author: { '@id': `${SITE_URL}/#person` },
      image: [
        {
          '@type': 'ImageObject',
          url: `${SITE_URL}/assets/webiste/ropewallet.png`,
          contentUrl: `${SITE_URL}/assets/webiste/ropewallet.png`,
          name: 'Ropewallet - Crypto Wallet Platform by Rijan Regmi',
          description: 'Screenshot of Ropewallet, a non-custodial multi-chain crypto wallet built by Rijan Regmi using Next.js and TypeScript.',
          author: { '@id': `${SITE_URL}/#person` },
          license: SITE_URL,
          acquireLicensePage: SITE_URL,
        },
        {
          '@type': 'ImageObject',
          url: `${SITE_URL}/assets/webiste/rilogram.png`,
          contentUrl: `${SITE_URL}/assets/webiste/rilogram.png`,
          name: 'Rilogram - Invite-Only Chat SaaS by Rijan Regmi',
          description: 'Screenshot of Rilogram, an invite-only chat SaaS and mobile app built by Rijan Regmi using React, Node.js and Socket.IO.',
          author: { '@id': `${SITE_URL}/#person` },
          license: SITE_URL,
          acquireLicensePage: SITE_URL,
        },
        {
          '@type': 'ImageObject',
          url: `${SITE_URL}/assets/webiste/regmiplastictraders.png`,
          contentUrl: `${SITE_URL}/assets/webiste/regmiplastictraders.png`,
          name: 'Regmi Plastic Traders - E-Commerce Website by Rijan Regmi',
          description: 'Screenshot of Regmi Plastic Traders enterprise portal built by Rijan Regmi using Next.js and MongoDB.',
          author: { '@id': `${SITE_URL}/#person` },
          license: SITE_URL,
          acquireLicensePage: SITE_URL,
        },
        {
          '@type': 'ImageObject',
          url: `${SITE_URL}/assets/webiste/pppfootball.png`,
          contentUrl: `${SITE_URL}/assets/webiste/pppfootball.png`,
          name: 'PPP Football - Sports Tournament Hub by Rijan Regmi',
          description: 'Screenshot of PPP Football tournament hub built by Rijan Regmi using Next.js.',
          author: { '@id': `${SITE_URL}/#person` },
          license: SITE_URL,
          acquireLicensePage: SITE_URL,
        },
        {
          '@type': 'ImageObject',
          url: `${SITE_URL}/assets/webiste/evefest.png`,
          contentUrl: `${SITE_URL}/assets/webiste/evefest.png`,
          name: 'EveFest - Event Ticketing Platform by Rijan Regmi',
          description: 'Screenshot of EveFest event ticketing platform built by Rijan Regmi using React.',
          author: { '@id': `${SITE_URL}/#person` },
          license: SITE_URL,
          acquireLicensePage: SITE_URL,
        },
        {
          '@type': 'ImageObject',
          url: `${SITE_URL}/assets/webiste/hamropadhai.png`,
          contentUrl: `${SITE_URL}/assets/webiste/hamropadhai.png`,
          name: 'Hamro Padhai - EdTech Platform by Rijan Regmi',
          description: 'Screenshot of Hamro Padhai, an EdTech learning platform for Nepal built by Rijan Regmi.',
          author: { '@id': `${SITE_URL}/#person` },
          license: SITE_URL,
          acquireLicensePage: SITE_URL,
        },
      ],
    },

    // ─── BLOG / CASE STUDY LIST ───────────────────────────────────────────────
    {
      '@type': 'Blog',
      '@id': `${SITE_URL}/#blog`,
      name: 'Engineering Blog & Case Studies by Rijan Regmi',
      description: 'Technical engineering case studies, software architecture deep-dives, and project breakdowns written by Rijan Regmi.',
      url: `${SITE_URL}/#blog`,
      author: { '@id': `${SITE_URL}/#person` },
      blogPost: [
        {
          '@type': 'BlogPosting',
          headline: 'Architecting RopeWallet: High-Throughput Digital Settlements, 256-Bit Audit Security & Web3 Motion',
          url: `${SITE_URL}/blog/ropewallet`,
          image: `${SITE_URL}/assets/webiste/ropewallet.png`,
          datePublished: '2026-08-01',
          author: { '@id': `${SITE_URL}/#person` },
          description: 'An in-depth engineering breakdown of RopeWallet: automated receipt verification, 80/20 host profit distributions, and high-performance fluid spring physics.',
          keywords: 'Ropewallet, Fintech, Web3, Next.js, TypeScript, Security Architecture',
        },
        {
          '@type': 'BlogPosting',
          headline: 'Building Rilogram: How an Event Chat for Royale Gaming Evolved into an Invite-Only SaaS & Mobile App',
          url: `${SITE_URL}/blog/rilogram`,
          image: `${SITE_URL}/assets/webiste/rilogram.png`,
          datePublished: '2026-07-01',
          author: { '@id': `${SITE_URL}/#person` },
          description: 'Originally built as a direct host chat for Royale Gaming, rebuilt into Rilogram with an invite-link system and mobile app.',
          keywords: 'Rilogram, SaaS, Real-Time Chat, Socket.IO, Mobile App, React',
        },
        {
          '@type': 'BlogPosting',
          headline: 'Modernizing Commercial E-Commerce: Dynamic Catalog & Fast Quotation Architecture for Regmi Plastic Traders',
          url: `${SITE_URL}/blog/regmi-plastic-traders`,
          image: `${SITE_URL}/assets/webiste/regmiplastictraders.png`,
          datePublished: '2026-06-01',
          author: { '@id': `${SITE_URL}/#person` },
          description: 'Digitizing Nepal premier plastic enterprise: 500+ product catalog with instantaneous search indexing and high-performance SEO.',
          keywords: 'E-Commerce, Next.js, MongoDB, Nepal, Regmi Plastic Traders, B2B',
        },
      ],
    },

    // ─── SOCIAL MEDIA PROFILES ────────────────────────────────────────────────
    {
      '@type': 'ItemList',
      '@id': `${SITE_URL}/#social-profiles`,
      name: 'Rijan Regmi Social Media Profiles',
      description: 'Official social media profiles and accounts of Rijan Regmi — Full-Stack Developer from Kathmandu, Nepal.',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@type': 'ProfilePage',
            name: 'Rijan Regmi on GitHub',
            url: 'https://github.com/RijanRegmi',
            description: 'GitHub profile of Rijan Regmi — open source projects and code repositories.',
          },
        },
        {
          '@type': 'ListItem',
          position: 2,
          item: {
            '@type': 'ProfilePage',
            name: 'Rijan Regmi on LinkedIn',
            url: 'https://www.linkedin.com/in/rijan-regmi-a720372b3',
            description: 'LinkedIn professional profile of Rijan Regmi, Full-Stack Developer & Software Engineer.',
          },
        },
        {
          '@type': 'ListItem',
          position: 3,
          item: {
            '@type': 'ProfilePage',
            name: 'Rijan Regmi on Instagram (@rijanregmi_)',
            url: 'https://www.instagram.com/rijanregmi_',
            description: 'Instagram profile of Rijan Regmi — photos, reels and developer life from Kathmandu, Nepal.',
          },
        },
        {
          '@type': 'ListItem',
          position: 4,
          item: {
            '@type': 'ProfilePage',
            name: 'Rijan Regmi on Facebook',
            url: 'https://www.facebook.com/rijan.regmi.946',
            description: 'Facebook profile of Rijan Regmi from Kathmandu, Nepal.',
          },
        },
        {
          '@type': 'ListItem',
          position: 5,
          item: {
            '@type': 'ProfilePage',
            name: 'Rijan Regmi on X / Twitter (@rijanregmi_)',
            url: 'https://x.com/rijanregmi_',
            description: 'X (Twitter) profile of Rijan Regmi — developer thoughts and updates.',
          },
        },
        {
          '@type': 'ListItem',
          position: 6,
          item: {
            '@type': 'ProfilePage',
            name: 'Rijan Regmi on YouTube',
            url: 'https://www.youtube.com/@rijanregmi',
            description: 'YouTube channel of Rijan Regmi.',
          },
        },
      ],
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
        {/* Preload critical LCP hero image */}
        <link rel="preload" as="image" href="/assets/imgs/header.jpeg" fetchPriority="high" />
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
