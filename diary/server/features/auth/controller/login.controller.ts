import { Request, Response } from 'express';
import { login as loginService } from '../service/login.service';// Импортируем функцию логина из сервиса

// Определяем интерфейсы для типизации тела запроса
interface LoginBody {
  email: string;
  password: string;
}

// Расширяем Request из Express, чтобы body имел тип LoginBody
interface TypedRequestBody<T> extends Request {
  body: T;
}

/**
 * Контроллер для обработки POST /api/login
 */
export async function loginController(req: TypedRequestBody<LoginBody>, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;
    // Вызываем сервис для проверки учетных данных и получения токена
    const token = await loginService(email, password);

    if (!token) {
      // Неверный email или пароль — отправляем 401 Unauthorized
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    // Успешный вход — возвращаем JWT-токен клиенту
    res.json({
      message: 'Login successful',
      token: token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}