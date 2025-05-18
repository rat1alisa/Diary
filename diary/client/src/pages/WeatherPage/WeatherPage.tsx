import { useSelector } from 'react-redux';
import { RootState } from '@shared/store';
import { WeatherInfo } from '@features/weather/weatherInfo';
import { WeatherSearch } from '@shared/ui/search/Search';

import './WeatherPage.scss'

export const WeatherPage = () => {
  const favorites = useSelector((state: RootState) => state.cities.cities);
  const searchResult = useSelector((state: RootState) => state.weather.searchResult);

  return (
    <div className="weather-page">
      <h1>Погода по городам</h1>
      <WeatherSearch />

      {searchResult && (
        <div className="search-result">
          <h2>Результат поиска:</h2>
          <WeatherInfo city={searchResult.city} />
        </div>
      )}

      {favorites.length > 0 && (
        <div className="favorites-section">
          <h2>Избранные города:</h2>
          <div className="favorites-grid">
            {favorites.map((city: string) => (
              <WeatherInfo key={city} city={city} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};