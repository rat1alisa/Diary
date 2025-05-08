import { useEffect, useState } from 'react';

interface WeatherInfoProps {
  city: string;
}

export const WeatherInfo = ({ city }: WeatherInfoProps) => {
  const [temp, setTemp] = useState<number | null>(null);
  const [icon, setIcon] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ru`
        );
        const data = await res.json();

        if (res.ok) {
          setTemp(data.main.temp);
          setIcon(data.weather[0].icon);
        } else {
          setError(data.message);
        }
      } catch (e) {
        setError('Ошибка загрузки погоды');
      }
    };

    fetchWeather();
  }, [city]);

  if (error) return <p className="text-red-500 text-sm">{error}</p>;
  if (temp === null) return <p className="text-gray-400 text-sm">Загрузка погоды...</p>;

  return (
    <div className="flex items-center gap-2 mt-2 text-sm">
      <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt="Погода"
        className="w-8 h-8"
      />
      <span>{city}: {temp.toFixed(1)}°C</span>
    </div>
  );
};