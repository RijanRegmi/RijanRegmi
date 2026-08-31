import { Request, Response } from 'express';
import { healthService, HealthService } from '../services/health.service';
import { ApiResponse } from '../utils/response';

export class HealthController {
  constructor(private readonly healthServ: HealthService = healthService) {}

  checkHealth = (_req: Request, res: Response) => {
    const health = this.healthServ.getHealth();
    const statusCode = health.status === 'UP' ? 200 : 503;
    return ApiResponse.success(res, health, 'Health check', statusCode);
  };
}

export const healthController = new HealthController();
