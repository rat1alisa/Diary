import React, { useState } from 'react';
import './WeatherDetailsModal.scss';
//import HourlyWeatherWidget from '@widgets/ui/hourlyWidget/HourlyWeatherWidget';

interface WeatherDetailsProps {
  data: {
    name: string;
    main: { temp: number; humidity: number; pressure: number };
    weather: { description: string; icon: string }[];
    wind: { speed: number };
    rain?: { '1h'?: number; '3h'?: number };
    snow?: { '1h'?: number; '3h'?: number };
    clouds: { all: number };
  } | null;
  onClose: () => void;
}


export const WeatherDetailsModal: React.FC<WeatherDetailsProps> = ({ data, onClose }) => {
  if (!data) return null;

  const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
  const API_KEY = '1d7cd15d062ae243657b965928090c2b';
  const precipitation = data.rain?.['1h'] ?? data.rain?.['3h'] ?? data.snow?.['1h'] ?? data.snow?.['3h'] ?? 0;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2 className="modal-name">{data.name}</h2>
        <div className="modal-main-info">
          <div>
            {/*<img src={iconUrl} alt={data.weather[0].description} />*/}
            <div className="modal-temp">{Math.round(data.main.temp)}°C</div>
          </div>
          <div className="modal-desc">{data.weather[0].description}</div>
        </div>
        <div className="modal-widgets">
          <div className="widget rounded">
            <h4>Влажность</h4>
            <p>{data.main.humidity}%</p>
          </div>
          <div className="widget rounded">
            <h4>Осадки</h4>
            <p>{precipitation} мм</p>
          </div>
          <div className="widget rounded">
            <h4>Ветер</h4>
            <p>{data.wind.speed} м/с</p>
          </div>
          <div className="widget rounded">
            <h4>Облачность</h4>
            <p>{data.clouds.all}%</p>
          </div>
          <div className="widget rounded">
            <h4>Давление</h4>
            <p>{data.main.pressure} гПа</p>
          </div>
          
        </div>
      </div>
    </div>
  );
};