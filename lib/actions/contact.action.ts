'use server';

import { contactService } from '@/backend/services';
import { CreateContactSchema } from '@/backend/dtos';
import { connectDatabase } from '@/backend/database/connection';

export interface ActionResponse {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

/**
 * Next.js Server Action for handling Contact Form submissions
 */
export async function submitContactAction(
  prevState: any,
  formData: FormData
): Promise<ActionResponse> {
  const rawData = {
    name: formData.get('name')?.toString() || '',
    email: formData.get('email')?.toString() || '',
    subject: formData.get('subject')?.toString() || '',
    message: formData.get('message')?.toString() || '',
  };

  const validation = CreateContactSchema.safeParse(rawData);

  if (!validation.success) {
    return {
      success: false,
      message: 'Validation failed. Please verify your inputs.',
      errors: validation.error.flatten().fieldErrors,
    };
  }

  try {
    await connectDatabase();
    await contactService.createContact(validation.data);
    return {
      success: true,
      message: 'Thank you! Your message has been sent successfully.',
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || 'Failed to submit message. Please try again later.',
    };
  }
}
