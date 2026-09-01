export interface SkillItem {
  name: string;
  level: string;
  iconSrc: string;
  whiteBg?: boolean;
}

export const SKILLS: SkillItem[] = [
  { name: 'TypeScript', level: 'Advanced', iconSrc: '/assets/skills/typescript.svg' },
  { name: 'React', level: 'Advanced', iconSrc: '/assets/skills/react.svg' },
  { name: 'Node.js', level: 'Proficient', iconSrc: '/assets/skills/nodejs.svg' },
  { name: 'Express.js', level: 'Advanced', iconSrc: '/assets/skills/express.svg' },
  { name: 'Python', level: 'Advanced', iconSrc: '/assets/skills/python.svg' },
  { name: 'SQL, noSQL', level: 'Advanced', iconSrc: '/assets/skills/postgresql.svg' },
  { name: 'Java', level: 'Proficient', iconSrc: '/assets/skills/java.svg', whiteBg: true },
  { name: 'PHP', level: 'Basic', iconSrc: '/assets/skills/php.svg' },
  { name: 'MongoDB', level: 'Proficient', iconSrc: '/assets/skills/mongodb.svg' },
  { name: 'Tailwind CSS', level: 'Expert', iconSrc: '/assets/skills/tailwindcss.svg' },
];
