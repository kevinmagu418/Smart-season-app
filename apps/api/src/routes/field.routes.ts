import { Router } from 'express';
import { FieldController } from '../controllers/field.controller';
import { requireAuth } from '../middleware/auth.middleware';
import { requireRole } from '../middleware/role.middleware';
import updateRoutes from './update.routes';

const router = Router();

router.use(requireAuth);

router.get('/', FieldController.getAll);
router.post('/', requireRole(['ADMIN']), FieldController.create);
router.get('/:id', FieldController.getById);
router.patch('/:id', FieldController.update);

router.use('/:id/updates', updateRoutes);

export default router;
