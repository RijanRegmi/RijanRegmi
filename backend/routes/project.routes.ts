import { Router } from 'express';
import { projectController } from '../controllers/project.controller';
import { validateRequest } from '../middlewares/validate.middleware';
import { CreateProjectSchema, QueryProjectSchema } from '../dtos/project.dto';

const router = Router();

router.get('/', validateRequest(QueryProjectSchema, 'query'), projectController.getProjects);
router.get('/:id', projectController.getProjectById);
router.post('/', validateRequest(CreateProjectSchema), projectController.createProject);
router.put('/:id', projectController.updateProject);
router.delete('/:id', projectController.deleteProject);

export default router;
