import { Request, Response } from 'express';
import { blogService, BlogService } from '../services/blog.service';
import { ApiResponse } from '../utils/response';
import { asyncHandler } from '../utils/async-handler';

export class BlogController {
  constructor(private readonly blogServ: BlogService = blogService) {}

  getBlogs = asyncHandler(async (_req: Request, res: Response) => {
    const blogs = await this.blogServ.getBlogs();
    return ApiResponse.success(res, blogs, 'Blog posts retrieved successfully');
  });

  getBlogBySlugOrId = asyncHandler(async (req: Request, res: Response) => {
    const blog = await this.blogServ.getBlogBySlugOrId(req.params.slugOrId);
    return ApiResponse.success(res, blog);
  });

  createBlog = asyncHandler(async (req: Request, res: Response) => {
    const blog = await this.blogServ.createBlog(req.body);
    return ApiResponse.created(res, blog, 'Blog post created successfully');
  });

  likeBlog = asyncHandler(async (req: Request, res: Response) => {
    const blog = await this.blogServ.likeBlog(req.params.id);
    return ApiResponse.success(res, blog, 'Blog liked');
  });
}

export const blogController = new BlogController();
