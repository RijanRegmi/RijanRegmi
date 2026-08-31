import { Router } from 'express';
import { blogController } from '../controllers/blog.controller';
import { validateRequest } from '../middlewares/validate.middleware';
import { CreateBlogSchema } from '../dtos/blog.dto';

const router = Router();

router.get('/', blogController.getBlogs);
router.get('/:slugOrId', blogController.getBlogBySlugOrId);
router.post('/', validateRequest(CreateBlogSchema), blogController.createBlog);
router.post('/:id/like', blogController.likeBlog);

export default router;
