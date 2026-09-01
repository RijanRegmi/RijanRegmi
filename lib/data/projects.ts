export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  url: string;
  displayUrl: string;
  image: string;
  logo: string;
  tags: string[];
  desc: string;
  actionText: string;
  isUnderDevelopment?: boolean;
}

export const PROJECTS: ProjectItem[] = [
  {
    id: 'ropewallet',
    title: 'Ropewallet',
    category: 'Web3 Platform & Mobile App',
    url: 'https://www.ropewallet.com/',
    displayUrl: 'www.ropewallet.com',
    image: '/assets/webiste/ropewallet.png',
    logo: '/assets/brand/ropewallet_logo.png',
    tags: ['Next.js', 'Mobile App', 'TypeScript', 'Web3', 'Tailwind'],
    desc: 'Modern non-custodial multi-chain crypto wallet web platform and mobile application with smooth fluid animations and secure transaction flow.',
    actionText: 'VISIT WEBSITE',
  },
  {
    id: 'rilogram',
    title: 'Rilogram',
    category: 'Royale Gaming & Mobile App',
    url: 'https://www.royalegamingg.com/',
    displayUrl: 'www.royalegamingg.com',
    image: '/assets/webiste/rilogram.png',
    logo: '/assets/brand/rilogram_logo.png',
    tags: ['React', 'Mobile App', 'Node.js', 'Express', 'Gaming UI'],
    desc: 'High-engagement digital royale gaming portal and mobile application with real-time leaderboards, interactive matchmaking, and tournament flows.',
    actionText: 'VISIT WEBSITE',
  },
  {
    id: 'regmiplastictraders',
    title: 'Regmi Plastic Traders',
    category: 'E-Commerce & Enterprise',
    url: 'https://www.regmiplastictraders.com.np/',
    displayUrl: 'www.regmiplastictraders.com.np',
    image: '/assets/webiste/regmiplastictraders.png',
    logo: '/assets/brand/regmiplastictraders_logo.png',
    tags: ['Next.js', 'E-Commerce', 'Express', 'MongoDB'],
    desc: 'Comprehensive industrial & commercial plastic trading enterprise portal with dynamic categorized product catalog and inquiry system.',
    actionText: 'VISIT WEBSITE',
  },
  {
    id: 'pppfootball',
    title: 'PPP Football',
    category: 'Sports & Tournament Hub',
    url: 'https://pppfootball.vercel.app/',
    displayUrl: 'pppfootball.vercel.app',
    image: '/assets/webiste/pppfootball.png',
    logo: '/assets/brand/pppfootball_logo.png',
    tags: ['Next.js', 'Sports Analytics', 'Tailwind', 'Vercel'],
    desc: 'Football tournament hub for live league fixtures, team management, match scorecards, and tournament player statistics.',
    actionText: 'VIEW LIVE DEMO',
  },
  {
    id: 'evefest',
    title: 'EveFest',
    category: 'Events & Ticketing',
    url: 'https://evefest.vercel.app/',
    displayUrl: 'evefest.vercel.app',
    image: '/assets/webiste/evefest.png',
    logo: '/assets/brand/evefest_logo.ico',
    tags: ['React', 'Event Booking', 'UI/UX', 'Vercel'],
    desc: 'Event ticketing, concert discovery, and festival celebration management platform with seamless ticket booking and artist lineups.',
    actionText: 'VIEW LIVE DEMO',
  },
  {
    id: 'hamropadhai',
    title: 'Hamro Padhai',
    category: 'EdTech Platform',
    url: '#',
    displayUrl: 'hamropadhai.com',
    image: '/assets/webiste/hamropadhai.png',
    logo: '/assets/brand/hamropadhai_logo.png',
    tags: ['EdTech', 'Learning Platform', 'Upcoming'],
    desc: 'Interactive digital education and learning platform for students across Nepal. Currently under active development.',
    actionText: 'COMING SOON',
    isUnderDevelopment: true,
  },
];
