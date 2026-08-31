import { apiClient, ApiResponse } from './client';

export interface ContactPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export const contactApi = {
  /**
   * Submit a contact inquiry
   */
  async submitContact(payload: ContactPayload): Promise<ApiResponse> {
    return apiClient('/api/v1/contact', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  /**
   * List all contact submissions (admin)
   */
  async getContacts(): Promise<ApiResponse> {
    return apiClient('/api/v1/contact', {
      method: 'GET',
    });
  },
};
