import { connectDatabase, disconnectDatabase } from './connection';
import { Project } from '../models/project.model';
import { Blog } from '../models/blog.model';
import { logger } from '../utils/logger';

const seedProjects = [
  {
    title: 'Modern Web Application',
    category: 'web',
    description: 'High-performance interactive web application built with Next.js and TypeScript.',
    imageUrl: '/assets/imgs/web-1.jpg',
    link: 'https://github.com/RijanRegmi',
    tags: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    featured: true,
    order: 1,
  },
  {
    title: 'E-Commerce Platform',
    category: 'web',
    description: 'Full-stack e-commerce experience with secure payments and real-time inventory.',
    imageUrl: '/assets/imgs/web-2.jpg',
    link: 'https://github.com/RijanRegmi',
    tags: ['Node.js', 'Express', 'MongoDB', 'REST API'],
    featured: true,
    order: 2,
  },
  {
    title: 'Creative Brand Identity',
    category: 'branding',
    description: 'Complete visual identity, logo design, and branding collateral.',
    imageUrl: '/assets/imgs/branding-1.jpg',
    link: 'https://github.com/RijanRegmi',
    tags: ['Branding', 'UI/UX', 'Design System'],
    featured: true,
    order: 3,
  },
  {
    title: 'Digital Advertising Campaign',
    category: 'advertising',
    description: 'Data-driven marketing campaign with conversion-optimized creatives.',
    imageUrl: '/assets/imgs/advertising-1.jpg',
    link: 'https://github.com/RijanRegmi',
    tags: ['Advertising', 'Marketing', 'Analytics'],
    featured: false,
    order: 4,
  },
  {
    title: 'Enterprise Dashboard',
    category: 'web',
    description: 'Comprehensive business analytics and reporting dashboard.',
    imageUrl: '/assets/imgs/web-3.jpg',
    link: 'https://github.com/RijanRegmi',
    tags: ['Next.js', 'Tailwind', 'Charts'],
    featured: false,
    order: 5,
  },
  {
    title: 'Brand Strategy & Packaging',
    category: 'branding',
    description: 'Product packaging design and brand guidelines documentation.',
    imageUrl: '/assets/imgs/branding-2.jpg',
    link: 'https://github.com/RijanRegmi',
    tags: ['Packaging', 'Identity'],
    featured: false,
    order: 6,
  },
];

const seedBlogs = [
  {
    title: 'Building Scalable Full-Stack Apps with Next.js & Express',
    slug: 'building-scalable-fullstack-apps',
    excerpt: 'How to structure a clean, maintainable monorepo using layered architecture and serverless deployments.',
    content: 'Full-stack applications require thoughtful architecture. By separating the presentation layer in Next.js and the domain logic in an Express layered structure, teams can achieve high velocity and clean code separation.',
    author: 'Rijan Regmi',
    imageUrl: '/assets/imgs/blog1.png',
    tags: ['Next.js', 'Node.js', 'Architecture'],
    likes: 24,
    commentsCount: 5,
    published: true,
  },
  {
    title: 'Mastering MongoDB Layered Repository Pattern',
    slug: 'mastering-mongodb-repository-pattern',
    excerpt: 'Decouple your database queries from business logic for testable and resilient backend systems.',
    content: 'The repository pattern creates an abstraction between data access and business logic. This makes swapping databases or mocking data in unit tests effortless.',
    author: 'Rijan Regmi',
    imageUrl: '/assets/imgs/blog2.jpg',
    tags: ['MongoDB', 'TypeScript', 'Backend'],
    likes: 18,
    commentsCount: 3,
    published: true,
  },
  {
    title: 'UI/UX Principles for Modern Developer Portfolios',
    slug: 'ui-ux-principles-developer-portfolios',
    excerpt: 'Key design elements, typography choices, and micro-interactions that make your portfolio stand out.',
    content: 'First impressions matter. Smooth transitions, responsive layouts, and consistent color palettes turn visitors into clients and recruiters into interview offers.',
    author: 'Rijan Regmi',
    imageUrl: '/assets/imgs/blog3.jpg',
    tags: ['Design', 'UI/UX', 'CSS'],
    likes: 32,
    commentsCount: 8,
    published: true,
  },
];

async function runSeed() {
  try {
    await connectDatabase();
    logger.info('Seeding database...');

    await Project.deleteMany({});
    await Project.insertMany(seedProjects);
    logger.info(`Seeded ${seedProjects.length} projects.`);

    await Blog.deleteMany({});
    await Blog.insertMany(seedBlogs);
    logger.info(`Seeded ${seedBlogs.length} blogs.`);

    logger.info('Database seeding completed successfully!');
  } catch (error) {
    logger.error('Error seeding database:', error);
  } finally {
    await disconnectDatabase();
    process.exit(0);
  }
}

if (require.main === module) {
  runSeed();
}

export { seedProjects, seedBlogs };
