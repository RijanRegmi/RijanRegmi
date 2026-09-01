export interface SkillItem {
  name: string;
  level: string;
  iconSrc: string;
  whiteBg?: boolean;
}

export const SKILLS: SkillItem[] = [
  { name: 'TypeScript', level: 'Advanced', iconSrc: '/assets/skills/typescript.svg' },
  { name: 'JavaScript', level: 'Expert', iconSrc: '/assets/skills/javascript.svg' },
  { name: 'React', level: 'Advanced', iconSrc: '/assets/skills/react.svg' },
  { name: 'Node.js', level: 'Proficient', iconSrc: '/assets/skills/nodejs.svg' },
  { name: 'Flutter', level: 'Advanced', iconSrc: '/assets/skills/flutter.svg' },
  { name: 'Python', level: 'Advanced', iconSrc: '/assets/skills/python.svg' },
  { name: 'R Language', level: 'Proficient', iconSrc: '/assets/skills/r.svg' },
  { name: 'Figma', level: 'Advanced', iconSrc: '/assets/skills/figma.svg' },
  { name: 'Docker', level: 'Proficient', iconSrc: '/assets/skills/docker.svg' },
  { name: 'Firebase', level: 'Advanced', iconSrc: '/assets/skills/firebase.svg' },
  { name: 'MongoDB', level: 'Proficient', iconSrc: '/assets/skills/mongodb.svg' },
  { name: 'SQL, noSQL', level: 'Advanced', iconSrc: '/assets/skills/postgresql.svg' },
  { name: 'Tailwind CSS', level: 'Expert', iconSrc: '/assets/skills/tailwindcss.svg' },
  { name: 'Java', level: 'Proficient', iconSrc: '/assets/skills/java.svg', whiteBg: true },
  { name: 'PHP', level: 'Basic', iconSrc: '/assets/skills/php.svg' },
];
