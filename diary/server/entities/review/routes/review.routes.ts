import { Router } from 'express';
import { reviewController } from '../controller/review.controller';
import { asyncHandler } from '../../../shared/lib/asyncHandler';

const reviewRoutes = Router();

reviewRoutes.get('/', asyncHandler(reviewController.getAll));
reviewRoutes.get('/:id', asyncHandler(reviewController.getById));
reviewRoutes.post('/', asyncHandler(reviewController.create));
reviewRoutes.put('/:id', asyncHandler(reviewController.update));
reviewRoutes.delete('/:id', asyncHandler(reviewController.remove));

export default reviewRoutes;