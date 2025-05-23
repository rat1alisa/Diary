interface WeatherData {
  id: number;
  name: string;
  weather: { description: string; icon: string }[];
  main: { temp: number; humidity: number };
  wind: { speed: number };
}

interface WeatherCardProps {
  data: WeatherData;
  favorite: boolean;
  onToggleFavorite: () => void;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ data, favorite, onToggleFavorite }) => {
  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  return (
    <div className={`weather-card ${favorite ? 'weather-card--favorite' : ''}`}>
      <button
        onClick={onToggleFavorite}
        className={`weather-card__favorite-btn ${favorite ? 'active' : ''}`}
        aria-label={favorite ? 'Убрать из избранного' : 'Добавить в избранное'}
      >
        {favorite ? '❤️' : '🤍'}
      </button>
      <div className="weather-card__main-info">
        <img src={iconUrl} alt={data.weather[0].description} />
        <div className="weather-card__temp">{Math.round(data.main.temp)}°C</div>
      </div>
      <h3 className="weather-card__city">{data.name}</h3>
      
      {/*<div className="weather-card__details">
        <div>Осадки: {data.weather[0].description}</div>
        <div>Влажность: {data.main.humidity}%</div>
        <div>Ветер: {data.wind.speed} м/с</div>
      </div>*/}
    </div>
  );
};

/*import { RootState } from '@shared/store';
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
};*/