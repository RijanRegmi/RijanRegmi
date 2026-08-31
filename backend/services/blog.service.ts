import { blogRepository, BlogRepository } from '../repositories/blog.repository';
import { CreateBlogDto } from '../dtos/blog.dto';
import { IBlog } from '../models/blog.model';
import { NotFoundError } from '../errors';

export class BlogService {
  constructor(private readonly blogRepo: BlogRepository = blogRepository) {}

  async getBlogs(): Promise<IBlog[]> {
    return this.blogRepo.findPublished();
  }

  async getBlogBySlugOrId(identifier: string): Promise<IBlog> {
    let blog = await this.blogRepo.findBySlug(identifier);
    if (!blog && identifier.match(/^[0-9a-fA-F]{24}$/)) {
      blog = await this.blogRepo.findById(identifier);
    }
    if (!blog) {
      throw new NotFoundError(`Blog post '${identifier}' not found`);
    }
    return blog;
  }

  async createBlog(data: CreateBlogDto): Promise<IBlog> {
    return this.blogRepo.create(data);
  }

  async likeBlog(id: string): Promise<IBlog> {
    const updated = await this.blogRepo.incrementLikes(id);
    if (!updated) {
      throw new NotFoundError(`Blog post with ID ${id} not found`);
    }
    return updated;
  }
}

export const blogService = new BlogService();
