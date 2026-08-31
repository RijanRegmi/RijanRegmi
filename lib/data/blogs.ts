export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  logo: string;
  websiteUrl: string;
  displayUrl: string;
  excerpt: string;
  tags: string[];
  systemOverview: string;
  architectureBlueprint: string;
  challengesSolved: { title: string; desc: string }[];
  techStackBreakdown: { name: string; role: string; highlight: string }[];
  impactMetrics: { label: string; value: string; desc: string }[];
  contentSections: {
    heading: string;
    content: string;
    bulletPoints?: string[];
  }[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'ropewallet',
    title: 'Architecting RopeWallet: High-Throughput Digital Settlements, 256-Bit Audit Security & Web3 Motion',
    category: 'Fintech & Security Architecture',
    date: 'August 2026',
    readTime: '6 min read',
    image: '/assets/webiste/ropewallet.png',
    logo: '/assets/brand/ropewallet_logo.png',
    websiteUrl: 'https://www.ropewallet.com/',
    displayUrl: 'www.ropewallet.com',
    excerpt: 'An in-depth engineering breakdown of RopeWallet: how we designed sub-3s automated receipt verification, 80/20 host profit distributions, and high-performance fluid spring physics.',
    tags: ['Next.js', 'Fintech', 'TypeScript', 'Web3', 'Tailwind CSS', 'Mobile App'],
    systemOverview: 'RopeWallet is an ultra-secure digital payment gateway and settlement ecosystem. Built with Next.js App Router and high-concurrency microservices, it bridges host merchants and customers with automated card deposits, real-time ledger accounting, and encrypted audit trails.',
    architectureBlueprint: 'The platform employs a decoupled micro-architecture where transaction intake is processed through edge workers with 256-bit encryption. Payment verification happens in sub-3 seconds with bi-directional WebSocket push pipelines connecting both the web host dashboard and Android mobile APK.',
    challengesSolved: [
      {
        title: 'Instant Sub-3s Verification Pipeline',
        desc: 'Engineered an automated receipt verification engine that analyzes incoming payment payloads, validates bank signatures, and completes balance crediting with zero manual intervention.',
      },
      {
        title: 'Real-Time Bi-Directional WebSockets',
        desc: 'Constructed an event-driven sync engine between web host portals and native mobile applications, providing immediate push notifications the second money settles.',
      },
      {
        title: 'Fluid Spring-Physics UI & Micro-Animations',
        desc: 'Developed a custom design system utilizing GPU-accelerated cubic-bezier curves, glassmorphism, and responsive logo-docking animations.',
      },
      {
        title: 'Bank-Grade 256-Bit Cryptographic Security',
        desc: 'Enforced HMAC signature verification and AES-256 encrypted payload audits for every host payout, transaction request, and API hook.',
      },
    ],
    techStackBreakdown: [
      { name: 'Next.js 15 & React', role: 'Frontend & API Layer', highlight: 'App Router with server components and edge execution' },
      { name: 'TypeScript', role: 'Full Type Safety', highlight: 'Strict domain models for financial ledgers and settlement states' },
      { name: 'Tailwind CSS', role: 'Design System', highlight: 'Custom glassmorphic utilities and GPU spring animation classes' },
      { name: 'WebSocket / SSE', role: 'Real-time Telemetry', highlight: 'Sub-100ms push notification delivery to hosts and clients' },
    ],
    impactMetrics: [
      { label: 'Settlement Latency', value: '< 3.0s', desc: 'Average automated verification time' },
      { label: 'System Uptime', value: '99.99%', desc: 'Fault-tolerant distributed edge routing' },
      { label: 'Audit Trail Verification', value: '100%', desc: 'Immutable cryptographically signed logs' },
      { label: 'Processed Volume', value: '$10M+', desc: 'Cross-platform total transaction throughput' },
    ],
    contentSections: [
      {
        heading: '1. The Problem: Eliminating Payment Verification Bottlenecks',
        content: 'Traditional payment gateways often suffer from delayed confirmation cycles, high chargeback risks, and complex merchant onboarding. For RopeWallet, our objective was clear: create a zero-friction, automated digital settlement platform that handles transactions in under 3 seconds with absolute security guarantees.',
        bulletPoints: [
          'Manual receipt checking historically resulted in 5-15 minute delays per deposit.',
          'Lack of real-time mobile push notifications caused host-client miscommunication.',
          'Complex fee structures eroded merchant margins and reduced platform trust.',
        ],
      },
      {
        heading: '2. The Solution: Automated 80/20 Host-Merchant Architecture',
        content: 'We engineered an automated host network architecture. Authorized hosts register their payment endpoints, and the system automatically calculates and distributes an 80% host profit / 20% platform royalty split in real-time. Every transaction generates an immutable cryptographic receipt token.',
      },
      {
        heading: '3. Web & Native Mobile App Ecosystem',
        content: 'To maximize accessibility, RopeWallet was deployed as a responsive web platform and a dedicated Android APK. Hosts can generate 1-tap deposit links, view live ledger graphs, and manage withdrawals seamlessly across any device.',
      },
    ],
  },
  {
    slug: 'rilogram',
    title: 'Scaling Rilogram: Real-Time Royale Gaming Telemetry, Matchmaking & Companion Mobile App',
    category: 'Gaming & Real-Time Engines',
    date: 'July 2026',
    readTime: '5 min read',
    image: '/assets/webiste/rilogram.png',
    logo: '/assets/brand/rilogram_logo.png',
    websiteUrl: 'https://www.royalegamingg.com/',
    displayUrl: 'www.royalegamingg.com',
    excerpt: 'Engineering the digital royale gaming hub and mobile application: delivering low-latency matchmaking algorithms, live player leaderboards, and persistent real-time chat support.',
    tags: ['React', 'Node.js', 'Express', 'WebSockets', 'Gaming UI', 'Mobile App'],
    systemOverview: 'Rilogram powers interactive digital royale tournaments with real-time multiplayer coordination. The web platform and mobile app allow players to manage gaming credentials, track tournament standing, and access dedicated live support round-the-clock.',
    architectureBlueprint: 'A high-speed WebSocket and Express.js cluster coordinates player queueing, tournament match allocation, and real-time support chat. Client-side state is managed with lightweight stores to guarantee 60fps responsiveness across mobile viewports.',
    challengesSolved: [
      {
        title: 'Distributed Matchmaking Algorithms',
        desc: 'Implemented dynamic skill and tier-based pairing logic capable of pairing thousands of active players in under 100ms.',
      },
      {
        title: 'Real-Time Multi-Channel Support Chat',
        desc: 'Constructed an integrated live support engine with socket room isolation, admin auto-routing, and anti-spam rate limiting.',
      },
      {
        title: 'Dynamic Dark/Light Theming with Zero Layout Shift',
        desc: 'Engineered instant theme persistence with localStorage synchronization and fluid color variables matching royale game branding.',
      },
      {
        title: 'Cross-Device Mobile Performance Optimization',
        desc: 'Optimized vector asset rendering, reduced JavaScript bundle size, and implemented virtualized scrolling for massive player leaderboards.',
      },
    ],
    techStackBreakdown: [
      { name: 'React & Vite', role: 'High-Speed Client', highlight: 'Modular single-page app architecture with sub-second HMR' },
      { name: 'Node.js & Express', role: 'API Server', highlight: 'REST and WebSocket endpoints managing matchmaking queues' },
      { name: 'Socket.IO', role: 'Real-time Messaging', highlight: 'Bidirectional low-latency room communication and push events' },
      { name: 'Outfit & Inter Typography', role: 'Design Hierarchy', highlight: 'Custom gaming visual aesthetic with clear statistical readability' },
    ],
    impactMetrics: [
      { label: 'Matchmaking Latency', value: '< 100ms', desc: 'Average queue-to-match execution time' },
      { label: 'Live Socket Telemetry', value: 'Instant', desc: 'Real-time state and leaderboard updates' },
      { label: 'Active Gamers', value: '15,000+', desc: 'Registered competitive players' },
      { label: 'Support Response', value: '< 30s', desc: 'Live chat assistance resolution time' },
    ],
    contentSections: [
      {
        heading: '1. The Royale Gaming Challenge: Low Latency at Scale',
        content: 'Competitive gaming platforms require real-time responsiveness. Any lag in matchmaking, tournament status updates, or customer dispute resolution degrades user retention. Rilogram was built from the ground up to solve these synchronization challenges.',
      },
      {
        heading: '2. Real-Time Chat & Customer Support Infrastructure',
        content: 'Unlike static ticketing systems, Rilogram features an embedded real-time chat interface connecting players with administrators instantaneously. Powered by Socket.IO, administrators can resolve game verification queries live without interrupting player tournament flows.',
      },
      {
        heading: '3. Cross-Platform Responsive Mobile Experience',
        content: 'With over 70% of players accessing the platform on mobile devices, we engineered custom viewport adaptations, touch-friendly navigation dials, and fluid entry animations.',
      },
    ],
  },
  {
    slug: 'regmi-plastic-traders',
    title: 'Modernizing Commercial E-Commerce: Dynamic Catalog & Fast Quotation Architecture for Regmi Plastic Traders',
    category: 'Enterprise E-Commerce',
    date: 'June 2026',
    readTime: '5 min read',
    image: '/assets/webiste/regmiplastictraders.png',
    logo: '/assets/brand/regmiplastictraders_logo.png',
    websiteUrl: 'https://www.regmiplastictraders.com.np/',
    displayUrl: 'www.regmiplastictraders.com.np',
    excerpt: 'Digitizing Nepal’s premier plastic enterprise: crafting a 500+ product catalog with instantaneous search indexing, tailored B2B quotation pipeline, and high-performance SEO.',
    tags: ['Next.js', 'E-Commerce', 'MongoDB', 'SEO Architecture', 'B2B Portal'],
    systemOverview: 'Regmi Plastic Traders has supplied high-grade plastic household goods and industrial containers across Nepal since 1995. This modernization transformed their traditional physical trading into a dynamic online storefront with custom B2B inquiry handling.',
    architectureBlueprint: 'Built with Next.js App Router and MongoDB, the platform generates static, search-engine-optimized pages for every product category while maintaining real-time inquiry processing for commercial purchasers.',
    challengesSolved: [
      {
        title: 'High-Density 500+ Product Catalog Search',
        desc: 'Engineered a client-side search index allowing instant multi-attribute filtering across industrial drums, household containers, and crates.',
      },
      {
        title: 'B2B & B2C Unified Inquiry Pipeline',
        desc: 'Constructed an inquiry system supporting single-click WhatsApp and direct database quote requests for commercial wholesale buyers.',
      },
      {
        title: 'Dominant Regional SEO Ranking',
        desc: 'Implemented schema.org JSON-LD structured data, dynamic OpenGraph metadata, and optimized sitemaps achieving #1 Google search ranking across Nepal.',
      },
      {
        title: 'Sub-Second Page Load Optimization',
        desc: 'Applied next/image WebP conversions and responsive CDN asset delivery, reducing overall page payload by over 70%.',
      },
    ],
    techStackBreakdown: [
      { name: 'Next.js App Router', role: 'Full-Stack Framework', highlight: 'SSG + ISR architecture ensuring instant page rendering and high SEO' },
      { name: 'MongoDB', role: 'Document Database', highlight: 'Flexible schema managing hierarchical categories and product variants' },
      { name: 'Tailwind CSS', role: 'Styling & UI', highlight: 'Accessible enterprise layout tailored for fast scanning and purchasing' },
      { name: 'Vercel Edge Network', role: 'Hosting & CDN', highlight: 'Global caching delivering sub-second response times across Nepal' },
    ],
    impactMetrics: [
      { label: 'Catalog Scale', value: '500+ Items', desc: 'Categorized industrial and household goods' },
      { label: 'SEO Lighthouse Score', value: '99 / 100', desc: 'Google Lighthouse Performance & SEO' },
      { label: 'Page Load Time', value: '< 800ms', desc: 'Average DOM content loaded time' },
      { label: 'B2B Inquiries', value: '+350%', desc: 'Growth in commercial order inquiries' },
    ],
    contentSections: [
      {
        heading: '1. Transforming a 30-Year-Old Enterprise into Digital Commerce',
        content: 'Serving Nepal since 1995, Regmi Plastic Traders held a trusted offline reputation. However, commercial buyers from across the country needed a fast, reliable catalog to inspect specifications, browse container capacities, and request bulk price quotes online.',
      },
      {
        heading: '2. SEO Engineering & Regional Discovery',
        content: 'By integrating structured metadata, localized keyword mapping, and mobile-first responsive layouts, the website achieved top rankings on search engines for plastic drums, kitchen storage, and industrial containers across Nepal.',
      },
      {
        heading: '3. Fast B2B Quotation Workflow',
        content: 'Rather than forcing a rigid consumer checkout, we designed a hybrid quotation workflow where commercial buyers can assemble bulk product lists and submit instant inquiries with automatic email and WhatsApp routing.',
      },
    ],
  },
];
