import express, { Application, Request, Response } from 'express';
import { corsMiddleware } from './middlewares/cors.middleware';
import { requestLogger } from './middlewares/logger.middleware';
import { errorHandler } from './middlewares/error.middleware';
import routes from './routes';
import { NotFoundError } from './errors';

const app: Application = express();

// Security & Parsing Middlewares
app.use(corsMiddleware);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(requestLogger);

// API Base Routes
app.use('/api', routes);

// Root Welcome Route
app.get('/', (_req: Request, res: Response) => {
  res.json({
    name: 'Rijan Regmi Portfolio & API Backend',
    version: '1.0.0',
    status: 'running',
    docs: '/api/health',
  });
});

// Catch-all 404 handler for undefined API routes
app.use((_req: Request, _res: Response, next) => {
  next(new NotFoundError('API endpoint not found'));
});

// Global Error Handler Middleware
app.use(errorHandler);

export default app;
