// подключение express
const express = require('express');
// создаем объект приложения
const app = express();
const port = 3001;

// определяем обработчик для маршрута "/"
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
}); 

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});