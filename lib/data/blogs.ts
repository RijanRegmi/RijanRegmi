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
  mobileScreenshots?: {
    label: string;
    caption: string;
    image: string;
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
    mobileScreenshots: [
      {
        label: 'Home Dashboard Screen',
        caption: 'Mobile wallet home interface with balance card, quick actions, and transaction history.',
        image: '/assets/blog/ropewallet/Home-screen-ropewallet.jpeg',
      },
      {
        label: 'Welcome & Login Screen',
        caption: 'Clean authentication interface for merchants and wallet users.',
        image: '/assets/blog/ropewallet/Login-screen-ropewallet.jpeg',
      },
      {
        label: 'Account Registration Screen',
        caption: 'Multi-step personal verification onboarding for new wallet accounts.',
        image: '/assets/blog/ropewallet/Signup-screen-ropewallet.jpeg',
      },
    ],
  },
  {
    slug: 'rilogram',
    title: 'Building Rilogram: How an Event Chat for Royale Gaming Evolved into an Invite-Only SaaS & Mobile App',
    category: 'SaaS & Real-Time Chat',
    date: 'July 2026',
    readTime: '5 min read',
    image: '/assets/webiste/rilogram.png',
    logo: '/assets/brand/rilogram_logo.png',
    websiteUrl: 'https://www.royalegamingg.com/',
    displayUrl: 'www.royalegamingg.com',
    excerpt: 'Originally built as a direct host chat for a gaming community client called Royale Gaming, I rebuilt the project into Rilogram adding an invite-link system to secure inboxes, and launching both a SaaS web platform and a mobile app.',
    tags: ['React', 'Mobile App', 'Node.js', 'Express', 'Socket.IO', 'SaaS'],
    systemOverview: 'Rilogram started out as a simple client project for a gaming community called Royale Gaming. At first, it was just a direct chat system where any user could message the host during events there was no invite system back then. While that worked for basic communication, leaving the host inbox wide open created clutter and privacy issues. When I decided to turn this into a full SaaS product called Rilogram, I completely overhauled the chat security by adding a host-generated invite link system. I also developed a companion mobile application. Today, the platform runs on royalegamingg.com, which is the original domain where the client project was first deployed.',
    architectureBlueprint: 'The core upgrade from the old client build to Rilogram is the invite-first inbox architecture. Instead of letting anyone ping the host directly, the host generates a unique invite link and sends it to a specific user. Both inboxes stay completely locked until the user opens the link and accepts the invite. Once accepted, a private real-time WebSocket connection is established between both parties. This invite flow runs across both the web dashboard and the native mobile app, keeping inboxes completely spam-free.',
    challengesSolved: [
      {
        title: 'From Open Chat to Invite-Only Inboxes',
        desc: 'In the original Royale Gaming build, anyone could message the host directly. When rebuilding it as Rilogram, I introduced an invite gate where neither party can start chatting until an invite link is created and accepted.',
      },
      {
        title: 'Why the Domain is royalegamingg.com',
        desc: 'The platform was originally built and launched for the Royale Gaming client on royalegamingg.com. When I rebranded the project as Rilogram and turned it into a SaaS, I kept the live deployment on that original domain to preserve live links and active users.',
      },
      {
        title: 'Companion Mobile Application',
        desc: 'Built a dedicated mobile application version of Rilogram alongside the web platform with the same secure invite-link system, giving organizers and players instant push notifications during live events.',
      },
      {
        title: 'Real-Time Socket Room Isolation',
        desc: 'Configured Socket.IO and Express to only open private chat rooms after verifying that the invite link was mutually accepted in the database, delivering messages in under 100ms.',
      },
    ],
    techStackBreakdown: [
      { name: 'React', role: 'Web Platform', highlight: 'Host dashboard for creating invite links and managing accepted chat inboxes' },
      { name: 'Mobile Application', role: 'Dedicated Mobile App', highlight: 'Native mobile version of Rilogram with push notifications and secure chat access' },
      { name: 'Node.js & Express', role: 'Backend API', highlight: 'Handles invite token generation, acceptance verification, and authentication' },
      { name: 'Socket.IO', role: 'Real-Time Messaging', highlight: 'Instant bi-directional WebSocket rooms for verified conversations' },
    ],
    impactMetrics: [
      { label: 'Inbox Spam', value: '0%', desc: 'Eliminated by requiring host invite links before any chat can open' },
      { label: 'Message Speed', value: '< 100ms', desc: 'Real-time WebSocket transmission across web and mobile' },
      { label: 'Platforms', value: 'Web + Mobile', desc: 'Shared invite logic and synchronized conversations' },
      { label: 'Live URL', value: 'Active', desc: 'Running production at royalegamingg.com' },
    ],
    contentSections: [
      {
        heading: '1. The Original Client Project: Royale Gaming\'s Direct Chat',
        content: 'I originally took on this project for a client who ran an active gaming community called Royale Gaming. They hosted regular tournaments and gaming events and needed a web-based chat tool so players could contact the host with questions or event check-ins. In that initial version, the setup was very simple: any visitor or player could open the page and send messages directly to the host. There was no invite system, no access barrier, and no verification. It solved the client\'s immediate need to talk to players, but having an open door to the host\'s inbox naturally meant anyone could send messages, creating clutter during high-pressure match days.',
      },
      {
        heading: '2. The Evolution into Rilogram: Introducing the Invite Link System',
        content: 'After seeing the shortcomings of an open direct chat, I decided to take the project further and rebuild it as a standalone SaaS product under a new name: Rilogram. The biggest feature I introduced during this transformation was the invite link system to make communication intentional and secure:',
        bulletPoints: [
          'Before Rilogram, there was no invite system—users simply sent messages straight to the host.',
          'In Rilogram, the host generates a unique, private invite link from their dashboard.',
          'The host sends that invite link directly to the specific player or participant.',
          'The recipient opens the link and accepts the invite.',
          'Only after the user accepts the host\'s invite does the chat inbox unlock for both parties.',
          'Without an accepted invite, no inbox exists and nobody can message the host, eliminating all unwanted messages.',
        ],
      },
      {
        heading: '3. Why the Domain is Still royalegamingg.com',
        content: 'People often ask why Rilogram is hosted on royalegamingg.com instead of a generic domain. The reason is straightforward: that domain was purchased and configured for the original Royale Gaming client build. When I rebranded the platform to Rilogram and added the SaaS architecture, I kept the live deployment on royalegamingg.com to preserve existing users, avoid downtime, and keep the production infrastructure intact while the product grows.',
      },
      {
        heading: '4. The Mobile Application: Chatting on the Go',
        content: 'Gaming community hosts and players don\'t just stay behind desks; they are constantly on their phones coordinating teams and checking event brackets. As part of turning Rilogram into a complete product, I built a dedicated mobile application version of Rilogram with the exact same secure invite-link chat system. Whether someone is using the web platform on a browser or the mobile app on their phone, inboxes only unlock after an invite is accepted, and messages sync in real time through WebSockets with instant push alerts.',
      },
    ],
    mobileScreenshots: [
      {
        label: 'Splash & Launch Screen',
        caption: 'Minimalist dark launch screen showing the Rilogram gradient chat icon and RJN brand mark.',
        image: '/assets/blog/rilogram/rilogram-mobile-splash.jpeg',
      },
      {
        label: 'Sign In Screen',
        caption: 'Authentication portal for returning hosts and tournament players to access their active inbox threads.',
        image: '/assets/blog/rilogram/rilogram-mobile-login.jpeg',
      },
      {
        label: 'Player Registration Screen',
        caption: 'Quick account creation form allowing new event participants to join and accept incoming host invite links.',
        image: '/assets/blog/rilogram/rilogram-mobile-signup.jpeg',
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
