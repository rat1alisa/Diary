import express from 'express';
import cors from 'cors';
import { sequelize } from '../shared/db/sequelize';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const users = [
  { email: 'test@example.com', password: '123456' },
];

sequelize.sync().then(() => {
  console.log('DB connected & models synced');
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});

app.post('/api/signup', (req, res) => {
  const { email, password } = req.body;
  console.log('Регистрация:', email);

  res.json({ message: 'Регистрация прошла успешно!' });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (user) {
    res.json({ message: 'Успешный вход!', token: 'fake-jwt-token' });
  } else {
    res.status(401).json({ message: 'Неверный email или пароль' });
  }
});
