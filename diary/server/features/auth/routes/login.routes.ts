import { Router } from 'express';
import { loginController } from '../controller/login.controller';


const router = Router();

// Маршрут для логина: POST /api/login
router.post('/login', loginController);
export { router as authRouter };