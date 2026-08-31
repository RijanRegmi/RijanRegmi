import { apiClient, ApiResponse } from './client';

export interface BlogPost {
  _id?: string;
  id?: string;
  title: string;
  excerpt: string;
  content?: string;
  author: string;
  imageUrl: string;
  tags?: string[];
  likes?: number;
  commentsCount?: number;
  createdAt: string;
}

export const blogsApi = {
  /**
   * Get all blog posts
   */
  async getBlogs(): Promise<ApiResponse<BlogPost[]>> {
    return apiClient<BlogPost[]>('/api/v1/blogs', {
      method: 'GET',
    });
  },

  /**
   * Get single blog by slug or ID
   */
  async getBlogById(id: string): Promise<ApiResponse<BlogPost>> {
    return apiClient<BlogPost>(`/api/v1/blogs/${id}`, {
      method: 'GET',
    });
  },
};
