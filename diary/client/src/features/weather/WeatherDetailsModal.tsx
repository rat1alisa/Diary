import React, { useState } from 'react';
import './WeatherDetailsModal.scss';
//import HourlyWeatherWidget from '@widgets/ui/hourlyWidget/HourlyWeatherWidget';

interface WeatherDetailsProps {
  data: {
    name: string;
    main: { temp: number; humidity: number; pressure: number };
    weather: { description: string; icon: string }[];
    wind: { speed: number; deg: number };
    rain?: { '1h'?: number; '3h'?: number };
    snow?: { '1h'?: number; '3h'?: number };
    clouds: { all: number };
    uvi: number;                               // УФ-индекс
  } | null;
  onClose: () => void;
}

const formatTime = (unixUtcSeconds: number) => {
  const date = new Date(unixUtcSeconds * 1000);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const getWindDirection = (deg: number) => {
  const directions = ['С', 'ССВ', 'СВ', 'ВСВ', 'В', 'ВЮВ', 'ЮВ', 'ЮЮВ', 'Ю', 'ЮЮЗ', 'ЮЗ', 'ЗЮЗ', 'З', 'ЗСЗ', 'СЗ', 'ССЗ'];
  const index = Math.round(deg / 22.5) % 16;
  return directions[index];
};

const getUviDescription = (uvi: number): string => {
  if (uvi <= 2) return 'Низкий';
  if (uvi <= 5) return 'Умеренный';
  if (uvi <= 7) return 'Высокий';
  if (uvi <= 10) return 'Очень высокий';
  return 'Экстремальный';
};


export const WeatherDetailsModal: React.FC<WeatherDetailsProps> = ({ data, onClose }) => {
  if (!data) return null;

  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
  const API_KEY = '1d7cd15d062ae243657b965928090c2b';
  
  const [sunrise, setSunrise] = useState<number | null>(null);
  const [sunset, setSunset] = useState<number | null>(null);
  const precipitation = data.rain?.['1h'] ?? data.rain?.['3h'] ?? data.snow?.['1h'] ?? data.snow?.['3h'] ?? 0;
  const windDirection = getWindDirection(data.wind.deg);
  const uviDescription = getUviDescription(data.uvi);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2 className="modal-name">{data.name}</h2>

        <div className="modal-main-info">
          <div>
            <div className="modal-temp">{Math.round(data.main.temp)}°C</div>
          </div>
          <div className="modal-desc">{data.weather[0].description}</div>
        </div>

        <div className="modal-widgets">

          <div className="widget rounded">
            <h4>Влажность</h4>
            <p>{data.main.humidity}%</p>
            <h4>Точка росы сейчас 11°</h4>
          </div>

          <div className="widget rounded">
            <h4>Осадки</h4>
            <p>{precipitation} мм</p>
            <h4>За последние 24 часа</h4>
          </div>

          <div className="widget rounded">
            <h4>Ветер</h4>
            <p>{data.wind.speed} м/с</p>
            <h4 style={{fontSize: '0.9rem', marginTop: '5px'}}>Направление: {windDirection}</h4>
          </div>

          <div className="widget rounded">
            <h4>Облачность</h4>
            <p>{data.clouds.all}%</p>
          </div>

          <div className="widget rounded">
            <h4>Давление</h4>
            <p>{data.main.pressure} гПа</p>
          </div>

          <div className="widget rounded">
            <h4>УФ-индекс</h4>
            <p style={{fontSize: '1rem'}}>{uviDescription}</p>
            <h4>Останентся до конца дня</h4>
          </div>

        </div>
      </div>
    </div>
  );
};
