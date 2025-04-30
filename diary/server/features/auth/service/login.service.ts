import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, UserAttributes } from '../../../entities/user/model/Users';

/*Генерируем токен*/
/**
 * Сервисная функция для проверки учетных данных и генерации JWT.
 * @param email - Email, введенный пользователем.
 * @param password - Пароль, введенный пользователем.
 * @returns JWT-токен (строка) при успешной аутентификации или null, если логин неуспешен.
 */
export async function login(email: string, password: string): Promise<string | null> {
  // Ищем пользователя в базе данных по email
  const user = await User.findOne({ where: { email } }) as unknown as UserAttributes;
  if (!user) {
    return null;  // Пользователь с таким email не найден
  }

  // Проверяем пароль: сравниваем хеш из БД с введенным паролем (используем библиотеку bcrypt так как с ее помощью пароль мы и захэшировали)
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return null;  // Пароль неверный
  }

  // Формируем payload (ответ) для JWT (можно включить необходимые поля пользователя)
  const payload = { id: user.id, email: user.email };
  const secretKey = process.env.JWT_SECRET as string;  // секретный ключ JWT из .env
  // Генерируем JWT-токен (например, с временем жизни 1 час)
  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

  return token;
}