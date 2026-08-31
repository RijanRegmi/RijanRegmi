import { Router } from 'express';
import { contactController } from '../controllers/contact.controller';
import { validateRequest } from '../middlewares/validate.middleware';
import { CreateContactSchema } from '../dtos/contact.dto';

const router = Router();

router.post('/', validateRequest(CreateContactSchema), contactController.submitContact);
router.get('/', contactController.getAllContacts);
router.get('/:id', contactController.getContactById);
router.patch('/:id/read', contactController.markAsRead);

export default router;
