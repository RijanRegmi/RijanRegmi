import { z } from 'zod';

export const CreateProjectSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  category: z.enum(['web', 'advertising', 'branding']),
  description: z.string().optional(),
  imageUrl: z.string().min(1, 'Image URL is required'),
  link: z.string().url().optional().or(z.literal('')),
  githubUrl: z.string().url().optional().or(z.literal('')),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  order: z.number().default(0),
});

export const QueryProjectSchema = z.object({
  category: z.enum(['web', 'advertising', 'branding']).optional(),
  featured: z.preprocess((val) => val === 'true' || val === true, z.boolean()).optional(),
  limit: z.preprocess((val) => (val ? parseInt(String(val), 10) : undefined), z.number().positive().optional()),
  page: z.preprocess((val) => (val ? parseInt(String(val), 10) : undefined), z.number().positive().optional()),
});

export type CreateProjectDto = z.infer<typeof CreateProjectSchema>;
export type QueryProjectDto = z.infer<typeof QueryProjectSchema>;
