import React, { useEffect, useState } from 'react';
import './WeatherDetailsModal.scss';
import { WeatherWidget } from '@features/weather/Sunrise/Sunrise';
//import { HourlyWeatherWidget } from '@widgets/ui/hourlyWidget/HourlyWeatherWidget';


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
    coord: { lat: number; lon: number };
  } | null;
  onClose: () => void;
}

interface HourlyForecastItem {
  dt: number;        // unix timestamp
  temp: number;      // температура в °C
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
  
  const [hourlyForecast, setHourlyForecast] = useState<HourlyForecastItem[]>([]);
  const [loadingForecast, setLoadingForecast] = useState(false);
  //const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
  const precipitation = data.rain?.['1h'] ?? data.rain?.['3h'] ?? data.snow?.['1h'] ?? data.snow?.['3h'] ?? 0;
  const windDirection = getWindDirection(data.wind.deg);
  const uviDescription = getUviDescription(data.uvi);

  useEffect(() => {
    if (!data) return;

    const API_KEY = '1d7cd15d062ae243657b965928090c2b';
    const fetchForecast = async () => {
      setLoadingForecast(true);
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=current,minutely,daily,alerts&units=metric&appid=${API_KEY}`
        );
        const json = await res.json();
        if (json.hourly) {
          // Берём прогноз по часам на 3 дня (пример: 24 * 3 = 72 часа)
          setHourlyForecast(json.hourly.slice(0, 72));
        }
      } catch (e) {
        console.error('Ошибка прогноза:', e);
      }
      setLoadingForecast(false);
    };

    fetchForecast();
  }, [data]);

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
            <h4>УФ-индекс</h4>
            <p style={{fontSize: '1rem', marginBottom:'10px'}}>{uviDescription}</p>
            <h4>Останентся до конца дня</h4>
          </div>

          <WeatherWidget city={data.name} />

          <div className="widget rounded">
            <h4>Облачность</h4>
            <p>{data.clouds.all}%</p>
          </div>

          <div className="widget rounded">
            <h4>Давление</h4>
            <p style={{fontSize: '1.5rem'}}>{data.main.pressure} гПа</p>
          </div>

          <div className="widget rounded">
            <h4>Ощущается как</h4>
            <p>{Math.round(data.main.temp - 2)}°C</p>
            <h4 style={{fontSize: '0.9rem'}}>Прохладнее из-за ветра</h4>
          </div>

          <div 
            className="widget rounded"
            style={{width: '250px', height: '250px'}}
          >
            <div
              className="precipitation-map-widget"
              onClick={() => {
                const lat = data.coord.lat;
                const lon = data.coord.lon;
                const url = `https://yandex.by/pogoda/maps/nowcast?ll=${lon}_${lat}&z=9`;
                window.open(url, '_blank');
              }}
              style={{ cursor: 'pointer', userSelect: 'none', textAlign: 'center' }}
            >
              <h4 style={{marginBottom: '10px'}}>Карта осадков</h4>
              <img
                //src="././assets/Map.png"
                src='https://img.vbrest.by/uploads/2022/05/25/30.jpg'
                alt="Карта осадков"
                style={{ width: '80%', height: '200px', borderRadius: '8px' }}
              />
              <h4 style={{ fontSize: '0.9rem'}}>Нажмите, чтобы открыть карту</h4>
            </div>
          </div>

          {/* Новый виджет: Прогноз по часам на 3 дня 
          <div className="widget rounded" style={{ overflowX: 'auto' }}>
            <h4>Прогноз на следующие 3 дня (по часам)</h4>
            {loadingForecast && <p>Загрузка...</p>}
            {!loadingForecast && hourlyForecast.length === 0 && <p>Данные отсутствуют</p>}
            {!loadingForecast && hourlyForecast.length > 0 && (
              <div style={{ display: 'flex', minWidth: '600px' }}>
                
                {hourlyForecast.map((hour, i) =>
                  i % 3 === 0 ? (
                    <div
                      key={hour.dt}
                      style={{
                        marginRight: 10,
                        textAlign: 'center',
                        minWidth: 50,
                        borderRight: '1px solid #ccc',
                        paddingRight: 5,
                      }}
                    >
                      <div style={{ fontSize: '0.8rem', color: '#555' }}>
                        {new Date(hour.dt * 1000).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </div>
                      <div style={{ fontWeight: 'bold', marginTop: 4 }}>
                        {Math.round(hour.temp)}°C
                      </div>
                    </div>
                  ) : null
                )}
              </div>
            )}
          </div>*/}
        </div>
      </div>
    </div>
  );
};
