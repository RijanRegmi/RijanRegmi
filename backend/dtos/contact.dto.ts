import { z } from 'zod';

export const CreateContactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().max(150, 'Subject is too long').optional().default('General Inquiry'),
  message: z.string().min(5, 'Message must be at least 5 characters').max(2000, 'Message is too long'),
});

export type CreateContactDto = z.infer<typeof CreateContactSchema>;
