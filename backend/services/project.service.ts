import { projectRepository, ProjectRepository } from '../repositories/project.repository';
import { CreateProjectDto, QueryProjectDto } from '../dtos/project.dto';
import { IProject } from '../models/project.model';
import { NotFoundError } from '../errors';

export class ProjectService {
  constructor(private readonly projectRepo: ProjectRepository = projectRepository) {}

  async getProjects(query?: QueryProjectDto): Promise<IProject[]> {
    if (query?.category) {
      return this.projectRepo.findByCategory(query.category);
    }
    if (query?.featured) {
      return this.projectRepo.findFeatured();
    }
    return this.projectRepo.findAllSorted();
  }

  async getProjectById(id: string): Promise<IProject> {
    const project = await this.projectRepo.findById(id);
    if (!project) {
      throw new NotFoundError(`Project with ID ${id} not found`);
    }
    return project;
  }

  async createProject(data: CreateProjectDto): Promise<IProject> {
    return this.projectRepo.create(data);
  }

  async updateProject(id: string, data: Partial<CreateProjectDto>): Promise<IProject> {
    const updated = await this.projectRepo.update(id, data);
    if (!updated) {
      throw new NotFoundError(`Project with ID ${id} not found`);
    }
    return updated;
  }

  async deleteProject(id: string): Promise<void> {
    const deleted = await this.projectRepo.delete(id);
    if (!deleted) {
      throw new NotFoundError(`Project with ID ${id} not found`);
    }
  }
}

export const projectService = new ProjectService();
