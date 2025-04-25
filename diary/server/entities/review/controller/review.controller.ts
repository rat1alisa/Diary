import { Request, Response } from 'express';
import { reviewService } from '../service/review.service';

export const reviewController = {
  async getAll(req: Request, res: Response) {
    const reviews = await reviewService.getAll();
    res.json(reviews);
  },

  async getById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const review = await reviewService.getById(id);
    if (!review) return res.status(404).json({ message: 'Not found' });
    res.json(review);
  },

  async create(req: Request, res: Response) {
    const review = await reviewService.create(req.body);
    res.status(201).json(review);
  },

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    await reviewService.update(id, req.body);
    res.json({ message: 'Review updated' });
  },

  async remove(req: Request, res: Response) {
    const id = Number(req.params.id);
    await reviewService.remove(id);
    res.json({ message: 'Review deleted' });
  },
};