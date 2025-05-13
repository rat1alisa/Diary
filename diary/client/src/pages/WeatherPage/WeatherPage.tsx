import { WeatherInfo } from '@features/weather/WeatherInfo';
import { Header } from '@widgets/ui/header/Header';
import { useEffect, useState } from 'react';

interface WeatherPageProps {
  city: string;
}

export const WeatherPage = ({ city }: WeatherPageProps) => {
  return (
    <div className="">
      <Header />
      <h1>Weather page:</h1>
      <WeatherInfo city={city} />
      {/*city = {city}*/}
    </div>
  );
};
