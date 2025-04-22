import { Router } from 'express';
import { reviewController } from '../controller/review.controller';


const router = Router();

router.get('/', reviewController.getAll);
router.get('/:id', reviewController.getById);
router.post('/', reviewController.create);
router.put('/:id', reviewController.update);
router.delete('/:id', reviewController.remove);

export default router;