import { BaseRepository } from './base.repository';
import { Blog, IBlog } from '../models/blog.model';

export class BlogRepository extends BaseRepository<IBlog> {
  constructor() {
    super(Blog);
  }

  async findBySlug(slug: string): Promise<IBlog | null> {
    return this.findOne({ slug, published: true });
  }

  async findPublished(): Promise<IBlog[]> {
    return this.find({ published: true }, { sort: { createdAt: -1 } });
  }

  async incrementLikes(id: string): Promise<IBlog | null> {
    return this.model.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true }).exec();
  }
}

export const blogRepository = new BlogRepository();
