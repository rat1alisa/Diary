import { useEffect, useState } from 'react';

interface WeatherInfoProps {
  city: string;
}

const apiKey = '1d7cd15d062ae243657b965928090c2b';

export const WeatherWidget = ({ city }: WeatherInfoProps) => {
  const [sunrise, setSunrise] = useState<number | null>(null);
  const [sunset, setSunset] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        //const url = 'https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ru';

        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ru`);
        const data = await res.json();

        if (res.ok) {
          setSunrise(data.sys.sunrise);
          setSunset(data.sys.sunset);
          setError(null);
        } else {
          setError(data.message);
        }
      } catch (e) {
        setError('Ошибка загрузки погоды');
      }
    };

    fetchWeather();
  }, [city]);

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  };

  if (error) return <p className="text-red-500 text-sm">{error}</p>;

  return (
    <>
    <div className="widget rounded">
      <h4>Закат</h4>
      {sunset !== null && <p>{formatTime(sunset)}</p>}
      {sunrise !== null && <h4>Восход солнца в {formatTime(sunrise)}</h4>}
    </div>
    </>
  );
};