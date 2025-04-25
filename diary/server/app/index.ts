import express from 'express';
import cors from 'cors';
import reviewRoutes from '../entities/reviews/routes/review.routes';
import { errorHandler } from '../shared/middleware/errorHandler';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Роуты
app.use('/api/reviews', reviewRoutes);

// Middleware - глобальная обработка ошибок 
app.use(errorHandler);

export default app;