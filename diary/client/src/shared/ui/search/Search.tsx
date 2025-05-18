import { useState } from 'react';
import './Search.scss'

export const WeatherSearch = () => {
  const [city, setCity] = useState('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!city.trim()) return;

    try {
      setLoading(true);
      setError('');
      setResult(null);

      const res = await fetch(`/api/weather/one?city=${encodeURIComponent(city.trim())}`);
      if (!res.ok) throw new Error();

      const data = await res.json();
      setResult(data);
    } catch {
      setError('Город не найден');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
            <div className="search-bar">
                <input type="text" className="search-input" placeholder="Search..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
                />
                <button
                    onClick={handleSearch}
                    className='searchButton'
                    >
                    <div className="search-icon">
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height={24}
                          viewBox="0 0 24 24"
                          width={24}
                      >
                          <path d="M0 0h24v24H0z" fill="none" />
                          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zM9.5 14C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                      </svg>
                    </div>
                    </button>
                </div>

      {loading && <p className="text-gray-500">Загрузка...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {result && (
        <div className="mt-4 text-center">
          <h3 className="text-xl font-semibold mb-2">{result.city}</h3>
          <img
            src={`https://openweathermap.org/img/wn/${result.icon}@2x.png`}
            alt={result.description}
            className="mx-auto"
          />
          <p className="text-lg">{result.temp.toFixed(1)}°C — {result.description}</p>
        </div>
      )}
    </div>
  );
};
