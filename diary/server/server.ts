import dotenv from 'dotenv';
import app from './app'; // наше приложение (Express instance)
 // подключение к БД
import { initModels } from './app/init-models'; // инициализация моделей
import { sequelize } from './shared/db/sequelize';

dotenv.config();

const PORT = process.env.PORT || 3001;

const start = async () => {
  try {
    // Инициализация всех моделей и связей
    initModels();

    // Проверка подключения к БД
    await sequelize.authenticate();
    await sequelize.sync();

    console.log('DB connected & models synced');

    // Запуск сервера
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error while starting server:', error);
  }
};

start();
