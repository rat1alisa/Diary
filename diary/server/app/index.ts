import express from 'express';
import cors from 'cors';
import reviewRoutes from '../entities/review/routes/review.routes';
import { errorHandler } from '../shared/middleware/errorHandler';
import { authRouter } from '../features/auth/routes/login.routes';
import registrationRoutes from '../features/auth/routes/registration.routes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Роуты
app.use('/api/reviews', reviewRoutes);
// Подключаем маршруты авторизации под префиксом /api
app.use('/api', authRouter);
app.use('api/registation', registrationRoutes)

// Middleware - глобальная обработка ошибок 
app.use(errorHandler);

export default app;