import React from 'react';
import "./HourlyWeatherWidget.scss"

interface HourlyData {
  dt: number; // unix timestamp, сек
  temp: number; // температура в К (нужно перевести в С)
}

interface DailyData {
  sunrise: number;
  sunset: number;
}

interface Props {
  hourly: HourlyData[];
  daily: DailyData[];
  timezoneOffset: number; // сдвиг в секундах от UTC
}

const timestampToHour = (timestamp: number, offset: number): number => {
  const date = new Date((timestamp + offset) * 1000);
  return date.getUTCHours();
};

const timestampToTime = (timestamp: number, offset: number): string => {
  const date = new Date((timestamp + offset) * 1000);
  const h = date.getUTCHours().toString().padStart(2, '0');
  const m = date.getUTCMinutes().toString().padStart(2, '0');
  return `${h}:${m}`;
};

const HourlyWeatherWidget: React.FC<Props> = ({ hourly, daily, timezoneOffset }) => {
  const hoursToShow = hourly.slice(0, 72);

  // Создадим множества с часами рассвета и заката для пометки
  // Для каждого дня — получаем час рассвета/заката с учётом timezoneOffset
  const suns: { sunriseHours: Set<number>; sunsetHours: Set<number> } = {
    sunriseHours: new Set(),
    sunsetHours: new Set(),
  };

  daily.forEach(day => {
    suns.sunriseHours.add(timestampToHour(day.sunrise, timezoneOffset));
    suns.sunsetHours.add(timestampToHour(day.sunset, timezoneOffset));
  });

  return (
    <div className="hourly-weather-widget">
      <div className="hours-row">
        {hoursToShow.map(hourData => {
          const hour = timestampToHour(hourData.dt, timezoneOffset);
          const tempC = Math.round(hourData.temp - 273.15); // K -> C
          const isSunrise = suns.sunriseHours.has(hour);
          const isSunset = suns.sunsetHours.has(hour);
          return (
            <div key={hourData.dt} className="hour-cell">
              <div className="hour">{hour.toString().padStart(2, '0')}</div>
              <div className="temp">{tempC}°</div>
              {isSunrise && <div className="sun-event sun-event--sunrise">☀️ {timestampToTime(hoursToShow.find(h => h.dt === hourData.dt)!.dt, timezoneOffset)} рассвет</div>}
              {isSunset && <div className="sun-event sun-event--sunset">🌇 {timestampToTime(hoursToShow.find(h => h.dt === hourData.dt)!.dt, timezoneOffset)} закат</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HourlyWeatherWidget;

