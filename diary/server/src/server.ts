import {  Request, Response } from 'express'
import dotenv from 'dotenv';
// подключение express
const express = require('express');
// создаем объект приложения
const app = express();

dotenv.config();
const port = process.env.PORT || 3001; 

// определяем обработчик для маршрута "/"
app.get('/api', (req: Request, res: Response) => {
  res.json({ message: 'Hello from the backend!' });
}); 

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
