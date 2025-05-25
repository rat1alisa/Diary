import { Router } from 'express';
import { loginController } from '../controller/login.controller';


const loginRouter = Router();

// Маршрут для логина: POST /api/login
loginRouter.post('/login', loginController);
export { loginRouter as authRouter };