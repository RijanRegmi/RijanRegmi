import mongoose from 'mongoose';

export interface HealthStatus {
  status: 'UP' | 'DEGRADED' | 'DOWN';
  timestamp: string;
  uptime: number;
  environment: string;
  services: {
    database: {
      status: 'connected' | 'connecting' | 'disconnected' | 'unknown';
      readyState: number;
    };
  };
}

export class HealthService {
  getHealth(): HealthStatus {
    const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
    const dbState = mongoose.connection.readyState;
    const dbStatus = states[dbState] || 'unknown';

    return {
      status: dbState === 1 ? 'UP' : 'DEGRADED',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      services: {
        database: {
          status: dbStatus as any,
          readyState: dbState,
        },
      },
    };
  }
}

export const healthService = new HealthService();
