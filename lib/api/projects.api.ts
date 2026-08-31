import { apiClient, ApiResponse } from './client';

export interface ProjectItem {
  _id?: string;
  id?: string;
  title: string;
  category: 'web' | 'advertising' | 'branding';
  description?: string;
  imageUrl: string;
  link?: string;
  tags?: string[];
  featured?: boolean;
}

export const projectsApi = {
  /**
   * Get all portfolio projects with optional category filter
   */
  async getProjects(category?: string): Promise<ApiResponse<ProjectItem[]>> {
    const query = category && category !== 'all' ? `?category=${category}` : '';
    return apiClient<ProjectItem[]>(`/api/v1/projects${query}`, {
      method: 'GET',
    });
  },

  /**
   * Get single project by ID
   */
  async getProjectById(id: string): Promise<ApiResponse<ProjectItem>> {
    return apiClient<ProjectItem>(`/api/v1/projects/${id}`, {
      method: 'GET',
    });
  },
};
