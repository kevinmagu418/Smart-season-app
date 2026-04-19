import { Router } from 'express';
import { UpdateController } from '../controllers/update.controller';
import { requireAuth } from '../middleware/auth.middleware';

const router = Router({ mergeParams: true });

router.use(requireAuth);

router.post('/', UpdateController.addUpdate);
router.get('/', UpdateController.getUpdates);

export default router;
