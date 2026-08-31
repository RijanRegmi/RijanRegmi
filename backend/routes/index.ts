import { Router } from 'express';
import healthRoutes from './health.routes';
import contactRoutes from './contact.routes';
import projectRoutes from './project.routes';
import blogRoutes from './blog.routes';

const rootRouter = Router();

// Health check endpoint
rootRouter.use('/health', healthRoutes);

// V1 API Routes
const v1Router = Router();
v1Router.use('/contact', contactRoutes);
v1Router.use('/projects', projectRoutes);
v1Router.use('/blogs', blogRoutes);

rootRouter.use('/v1', v1Router);

export default rootRouter;
