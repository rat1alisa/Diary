
import { WeatherInfo } from '@features/weather/weatherInfo';
import { useEffect, useState } from 'react';

interface WeatherPageProps {
  city: string;
}

export const WeatherPage = ({ city }: WeatherPageProps) => {
 
  return (
    <div className="">
      <h1>Weather page:</h1>
      <WeatherInfo city='' />
      {/*city = {city}*/}
    </div>
  );
};