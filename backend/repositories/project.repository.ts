import { BaseRepository } from './base.repository';
import { Project, IProject } from '../models/project.model';

export class ProjectRepository extends BaseRepository<IProject> {
  constructor() {
    super(Project);
  }

  async findByCategory(category: string): Promise<IProject[]> {
    return this.find({ category }, { sort: { order: 1, createdAt: -1 } });
  }

  async findFeatured(): Promise<IProject[]> {
    return this.find({ featured: true }, { sort: { order: 1 } });
  }

  async findAllSorted(): Promise<IProject[]> {
    return this.find({}, { sort: { order: 1, createdAt: -1 } });
  }
}

export const projectRepository = new ProjectRepository();
