export interface CertificateSlide {
  label: string;
  title: string;
  image: string;
  serialNo?: string;
}

export interface CertificateItem {
  id: string;
  title: string;
  subtitle: string;
  issuer: string;
  endorsement?: string;
  issueDate: string;
  enrolledDate?: string;
  completedDate?: string;
  credentialId: string;
  verificationUrl: string;
  orientation: 'portrait' | 'landscape';
  slides: CertificateSlide[];
  summary: string;
  director: string;
  tags: string[];
  highlights: { label: string; value: string }[];
  actionLabel?: string;
  skillsLabel?: string;
}

export const CERTIFICATES: CertificateItem[] = [
  {
    id: 'footylytics-graduate',
    title: 'Footylytics Graduate',
    subtitle: 'Footylytics Football Intelligence Programme',
    issuer: 'Footylytics Academy',
    endorsement: 'Institute of Analytics Endorsed Course',
    issueDate: 'July 17, 2026',
    enrolledDate: 'June 3, 2026',
    completedDate: 'July 16, 2026',
    credentialId: 'cmrmzg85k000u2b6i2whfzzso',
    verificationUrl: 'https://footylytics.academy/certificate/cmrmzg85k000u2b6i2whfzzso?theme=solarized',
    orientation: 'portrait',
    slides: [
      {
        label: 'Graduate Certificate',
        title: 'Footylytics Football Intelligence Programme',
        image: '/assets/Certificate/footylytics.academy.png',
        serialNo: 'cmrmzg85k000u2b6i2whfzzso',
      },
    ],
    summary: 'Successfully completed all 17 comprehensive courses (56 days) of the Footylytics Football Intelligence Programme, mastering data science on real match data, mathematical models, tactical analysis, tools & dashboard engineering.',
    director: 'Manoj Shrestha (Programme Director)',
    skillsLabel: 'Analytics & Intelligence Stack',
    tags: [
      'Football Intelligence',
      'Data Science',
      'Python & Code on Real Data',
      'Mathematics & Metrics',
      'Tools & Dashboards',
      'Tactical Analysis',
    ],
    highlights: [
      { label: 'Curriculum', value: '17 Courses (56 Days)' },
      { label: 'Issued Date', value: 'July 17, 2026' },
      { label: 'Endorsement', value: 'Institute of Analytics' },
      { label: 'Verification', value: 'Live & Authenticated' },
    ],
    actionLabel: 'View Official Certificate',
  },
  {
    id: 'afcas-scouting',
    title: 'A.F.C.A.S. Technical Scouting & Talent ID',
    subtitle: 'Football Fundamentals & Technical Scouting (Levels 1 – 3)',
    issuer: 'The Association of Football Coaches & Scouts (A.F.C.A.S.)',
    endorsement: 'S4 Scouting Professional Football Accredited',
    issueDate: 'July 17, 2026',
    credentialId: 'CERT_10103 / CERT_20068 / CERT_30039',
    verificationUrl: 'https://afcas.teachable.com/',
    orientation: 'landscape',
    slides: [
      {
        label: 'Level 1',
        title: 'Level 1: Football Fundamentals & Talent ID',
        image: '/assets/Certificate/level1-afcas.png',
        serialNo: 'CERT_10103',
      },
      {
        label: 'Level 2',
        title: 'Level 2: Technical Scouting Course',
        image: '/assets/Certificate/level2-afcas.png',
        serialNo: 'CERT_20068',
      },
      {
        label: 'Level 3',
        title: 'Level 3: Technical Scouting & Advanced Talent ID',
        image: '/assets/Certificate/level3-afcas.png',
        serialNo: 'CERT_30039',
      },
    ],
    summary: 'Comprehensive 3-tier professional technical scouting and talent identification certification series from A.F.C.A.S. and S4 Scouting. Covers foundational to advanced player evaluation, tactical match scouting, opposition reporting, and recruitment metrics.',
    director: 'Ged Searson (Technical Lead & MD)',
    skillsLabel: 'Scouting Modules & Match Tools',
    tags: [
      'Talent Identification',
      'Technical Scouting',
      'Player Assessment',
      'Tactical Analysis',
      'Match Reporting',
      'Opposition Scouting',
      'Recruitment Strategy',
    ],
    highlights: [
      { label: 'Accreditation', value: 'Levels 1, 2 & 3 Complete' },
      { label: 'Issued Date', value: 'July 17, 2026' },
      { label: 'Governing Body', value: 'A.F.C.A.S. & S4 Scouting' },
      { label: 'Verification', value: 'Official Teachable Portal' },
    ],
    actionLabel: 'Visit Official Portal',
  },
  {
    id: 'afcas-positional-scouting',
    title: 'A.F.C.A.S. Positional Scouting & Recruitment',
    subtitle: 'Professional Football Workshop Series (Modules 1 – 3)',
    issuer: 'A.F.C.A.S. & CIMSPA Partner',
    endorsement: 'CIMSPA Education Partner & S4 Scouting Accredited',
    issueDate: 'January – February 2026',
    credentialId: 'AFCAS Workshop Modules 1, 2 & 3',
    verificationUrl: 'https://afcas.teachable.com/',
    orientation: 'landscape',
    slides: [
      {
        label: 'Module 1',
        title: 'Module 1: Positional Scouting & Recruitment Workshop',
        image: '/assets/Certificate/module1-afcas.png',
        serialNo: 'Issued: 1st of January 2026',
      },
      {
        label: 'Module 2',
        title: 'Module 2: Positional Scouting & Recruitment Workshop',
        image: '/assets/Certificate/module2-afcas.png',
        serialNo: 'Issued: 16th of January 2026',
      },
      {
        label: 'Module 3',
        title: 'Module 3: Positional Scouting & Recruitment Workshop',
        image: '/assets/Certificate/module3-afcas.png',
        serialNo: 'Issued: 19th of February 2026',
      },
    ],
    summary: 'Interactive professional football webinar workshop series delivered directly by Managing Director Ged Searson. Focuses on in-depth positional role profiling, position-specific key performance indicators, live match recruitment analysis, and modern scouting workflows endorsed by CIMSPA.',
    director: 'Ged Searson (Workshop Director)',
    skillsLabel: 'Recruitment & Tactical Domains',
    tags: [
      'Positional Scouting',
      'Player Recruitment',
      'Role Profiling',
      'Position-Specific KPIs',
      'Tactical Analysis',
      'Webinar Masterclass',
      'CIMSPA Endorsed',
      'S4 Scouting',
    ],
    highlights: [
      { label: 'Curriculum', value: 'Modules 1, 2 & 3 Complete' },
      { label: 'Instructor', value: 'Ged Searson (Director)' },
      { label: 'Accreditation', value: 'CIMSPA Education Partner' },
      { label: 'Format', value: 'Interactive Live Masterclasses' },
    ],
    actionLabel: 'Visit Official Portal',
  },
];
