import { WeatherInfo } from '@features/weather/WeatherInfo';
import { createEntityAdapter } from '@reduxjs/toolkit';

interface WeatherPageProps {
  city: string;
}

export const WeatherPage = () => {
  return (
    <div className="">
      <h1>Weather page:</h1>
      <WeatherInfo city="Минск" />
    </div>
  );
};
