import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import reviewRoutes from '../entities/review/routes/review.routes';
import { errorHandler } from '../shared/middleware/errorHandler';
import { authRouter } from '../features/auth/routes/login.routes';
import registrationRoutes from '../features/auth/routes/registration.routes';
import weatherRouter from '../features/auth/weather/routes/weather.routes';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Роуты
app.use('/api/reviews', reviewRoutes);
app.use('/api', authRouter);
app.use('/api/registration', registrationRoutes);
app.use('/api/weather', weatherRouter);
app.use('/api/login', authRouter );

// Глобальная обработка ошибок
app.use(errorHandler);

export default app;