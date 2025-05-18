import { RootState } from '@shared/store';
import { toggleFavorite } from '@shared/store/favoritesSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface WeatherInfoProps {
  city: string;
}

interface WeatherData {
  temp: number;
  icon: string;
  pressure: number;
  humidity: number;
  description: string;
}

export const WeatherInfo = ({ city }: WeatherInfoProps) => {
  const [data, setData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();

  const isFavorite = useSelector((state: RootState) =>
    state.cities.cities.includes(city)
  );

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = import.meta.env.VITE_OPENWEATHER_API;
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ru`
        );
        const json = await res.json();

        if (!res.ok) {
          setError(json.message || 'Ошибка загрузки');
          return;
        }

        setData({
          temp: json.main.temp,
          icon: json.weather[0].icon,
          pressure: json.main.pressure,
          humidity: json.main.humidity,
          description: json.weather[0].description,
        });
        setError(null);
      } catch {
        setError('Ошибка загрузки погоды');
      }
    };

    fetchWeather();
  }, [city]);

  if (error) return <div className="weather-card error">{city}: {error}</div>;
  if (!data) return <div className="weather-card loading">{city}: загрузка...</div>;

  return (
    <div className="weather-card">
      <div className="card-header">
        <h3>{city}</h3>
        <button className="like-btn" onClick={() => dispatch(toggleFavorite(city))}>
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>
      <img
        src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
        alt={data.description}
        className="weather-icon"
      />
      <p className="temp">{data.temp.toFixed(1)}°C — {data.description}</p>
      <p>Давление: {data.pressure} гПа</p>
      <p>Влажность: {data.humidity}%</p>
    </div>
  );
};