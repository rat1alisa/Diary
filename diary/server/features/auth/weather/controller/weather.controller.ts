import axios from 'axios';
import { Request, Response } from 'express';

const API_KEY = process.env.OPENWEATHER_API_KEY;

export const getWeatherByCity = async (req: Request, res: Response) => {
  const city = req.query.city as string;

  if (!city) return res.status(400).json({ message: 'No city provided' });

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=ru`;
    const { data } = await axios.get(url);

    res.json({
      city: data.name,
      temp: data.main.temp,
      icon: data.weather[0].icon,
      description: data.weather[0].description,
    });
  } catch (error: any) {
    res.status(404).json({ message: 'City not found' });
  }
};
