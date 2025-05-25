import React, { useState, useEffect } from 'react';
import './WeatherPage.scss';
import { WeatherCard } from '@features/weather/weatherInfo';
import { WeatherDetailsModal } from '@features/weather/WeatherDetailsModal';

interface WeatherData {
  id: number;
  name: string;
  weather: { description: string; icon: string }[];
  main: { temp: number; humidity: number };
  wind: { speed: number };
}

const API_KEY = '1d7cd15d062ae243657b965928090c2b'; 

const daytimeImg = 'https://i0.pickpik.com/photos/725/326/450/sky-blue-clouds-nature-preview.jpg';
const eveningImg = 'https://static.vecteezy.com/system/resources/thumbnails/024/892/056/small_2x/vibrant-sunset-sky-over-idyllic-landscape-a-moody-backdrop-generated-by-ai-free-photo.jpg';
const nightImg = 'https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L2Zyc2t5X3N0YXJzX25pZ2h0X3NwYWNlLWltYWdlLWt5YmNwMmJmLmpwZw.jpg';
const morningImg = 'https://img.freepik.com/premium-photo/abstract-background-sky-gradient-shade-from-orange-color-blue-color_50039-331.jpg';

export const WeatherPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [cities, setCities] = useState<WeatherData[]>([]);
  const [selectedCityData, setSelectedCityData] = useState<WeatherData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [favorites, setFavorites] = useState<number[]>(() => {
    // Считываем избранные из localStorage
    const saved = localStorage.getItem('weather-favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(getBackgroundImageByTime());

  function getBackgroundImageByTime(): string {
    const hour = new Date().getHours();
  
    if (hour >= 11 && hour <= 17) {
      return daytimeImg;
    } else if (hour > 17 && hour <= 23) {
      return eveningImg;
    } else if (hour > 23 || hour <= 5) {
      return nightImg;
    } else if (hour > 5 && hour < 11) {
      return morningImg;
    }
    return daytimeImg;
  }
  
  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundImage(getBackgroundImageByTime());
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const fetchWeather = async (cityName: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          cityName
        )}&appid=${API_KEY}&units=metric&lang=ru`
      );
      if (!response.ok) {
        throw new Error('Город не найден');
      }
      const data: WeatherData = await response.json();

      // Проверка, что город еще не в списке
      if (!cities.find(c => c.id === data.id)) {
        setCities(prev => [...prev, data]);
      }
    } catch (err: any) {
      setError(err.message || 'Ошибка при загрузке погоды');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim().length === 0) return;
    fetchWeather(query.trim());
    setQuery('');
  };

  const handleShowDetails = async (cityId: number) => {
    try {
      const city = cities.find(c => c.id === cityId);
      if (!city) return;

      // Для детальной информации снова запрашиваем с доп данными
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${API_KEY}&units=metric&lang=ru`,
      );
      if (!res.ok) throw new Error('Ошибка получения детальной информации');
      const data: WeatherData = await res.json();

      setSelectedCityData(data);
      setModalOpen(true);
    } catch (err: any) {
      setError(err.message || 'Ошибка загрузки детальной информации');
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedCityData(null);
  };

  const toggleFavorite = (cityId: number) => {
    setFavorites(prev => {
      let updated: number[];
      if (prev.includes(cityId)) {
        updated = prev.filter(id => id !== cityId);
      } else {
        updated = [...prev, cityId];
      }
      localStorage.setItem('weather-favorites', JSON.stringify(updated));
      return updated;
    });
  };

  // Разделение городов на избранные и остальные
  const favoriteCities = cities.filter(city => favorites.includes(city.id));
  const otherCities = cities.filter(city => !favorites.includes(city.id));

  return (
    <div 
      className="weather-page"
      //style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <h1 className="weather-page__title">Weather</h1>
      <form onSubmit={handleSearch} className="weather-page__search-form">
        <input
          type="text"
          placeholder="City name"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="weather-page__search-input"
          aria-label="Поиск по городу"
          autoComplete="off"
        />
        <button type="submit" className="weather-page__search-button" disabled={loading}>
          {loading ? 'Загрузка...' : 'Поиск'}
        </button>
      </form>

      {error && <div className="weather-page__error">{error}</div>}

      {favoriteCities.length > 0 && (
        <section className="weather-page__favorites">
          <h2>Favoutite cities</h2>
          <div className="weather-page__cards">
            {favoriteCities.map(city => (
              <WeatherCard
                key={city.id}
                data={city}
                favorite={true}
                onToggleFavorite={() => toggleFavorite(city.id)}
                onShowDetails={handleShowDetails}
              />
            ))}
          </div>

          {modalOpen && selectedCityData && (
        <WeatherDetailsModal data={selectedCityData} onClose={closeModal} />
        )}

        </section>
      )}

      <section className="weather-page__all-cities">
        <h2>Other cities</h2>
        <div className="weather-page__cards">
          {otherCities.length === 0 && cities.length !== 0 && (
            <div>
              <p>No other cities</p>
            </div>
          )}
          {otherCities.map(city => (
            <WeatherCard
              key={city.id}
              data={city}
              favorite={false}
              onToggleFavorite={() => toggleFavorite(city.id)}
              onShowDetails={handleShowDetails}
            />
          ))}
        </div>
      </section>
</div>
  );
};

/*import { useSelector } from 'react-redux';
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
};*/