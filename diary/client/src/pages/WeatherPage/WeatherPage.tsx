import { WeatherInfo } from '@features/weather/weatherInfo';
import { WeatherSearch } from '@shared/ui/search/Search';
import './WeatherPage.scss'

interface WeatherPageProps {
  city: string;
}

export const WeatherPage = () => {
  return (
    <div className="">
      <h1>Weather page:</h1>
      <WeatherSearch />
      <WeatherInfo city="Минск" />
    </div>
  );
};
