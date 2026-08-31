import { Request, Response } from 'express';
import { projectService, ProjectService } from '../services/project.service';
import { ApiResponse } from '../utils/response';
import { asyncHandler } from '../utils/async-handler';

export class ProjectController {
  constructor(private readonly projectServ: ProjectService = projectService) {}

  getProjects = asyncHandler(async (req: Request, res: Response) => {
    const projects = await this.projectServ.getProjects(req.query as any);
    return ApiResponse.success(res, projects, 'Projects retrieved successfully');
  });

  getProjectById = asyncHandler(async (req: Request, res: Response) => {
    const project = await this.projectServ.getProjectById(req.params.id);
    return ApiResponse.success(res, project);
  });

  createProject = asyncHandler(async (req: Request, res: Response) => {
    const project = await this.projectServ.createProject(req.body);
    return ApiResponse.created(res, project, 'Project created successfully');
  });

  updateProject = asyncHandler(async (req: Request, res: Response) => {
    const project = await this.projectServ.updateProject(req.params.id, req.body);
    return ApiResponse.success(res, project, 'Project updated successfully');
  });

  deleteProject = asyncHandler(async (req: Request, res: Response) => {
    await this.projectServ.deleteProject(req.params.id);
    return ApiResponse.success(res, null, 'Project deleted successfully');
  });
}

export const projectController = new ProjectController();
