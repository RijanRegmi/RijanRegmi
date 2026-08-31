import { z } from 'zod';

export const CreateBlogSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  slug: z.string().min(2, 'Slug is required'),
  excerpt: z.string().min(5, 'Excerpt is required'),
  content: z.string().min(10, 'Content is required'),
  author: z.string().default('Rijan Regmi'),
  imageUrl: z.string().min(1, 'Image URL is required'),
  tags: z.array(z.string()).default([]),
  published: z.boolean().default(true),
});

export const QueryBlogSchema = z.object({
  tag: z.string().optional(),
  limit: z.preprocess((val) => (val ? parseInt(String(val), 10) : undefined), z.number().positive().optional()),
  page: z.preprocess((val) => (val ? parseInt(String(val), 10) : undefined), z.number().positive().optional()),
});

export type CreateBlogDto = z.infer<typeof CreateBlogSchema>;
export type QueryBlogDto = z.infer<typeof QueryBlogSchema>;
