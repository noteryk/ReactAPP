import React, { useState } from 'react';
import axios from 'axios';

const WEATHER_API_KEY = '418fc9c9afe10063f84ae33a70965f05'; 
export const fetchWeather = async (city: string) => {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
      params: {
        q: city,
        appid: WEATHER_API_KEY,
        units: 'metric',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};

export const fetchForecast = async (city: string) => {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
      params: {
        q: city,
        appid: WEATHER_API_KEY,
        units: 'metric',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    return null;
  }
};

const getWeatherEmoji = (description: string) => {
  if (description.includes('clear')) return '☀️';
  if (description.includes('cloud')) return '☁️';
  if (description.includes('rain')) return '🌧️';
  if (description.includes('snow')) return '❄️';
  if (description.includes('thunderstorm')) return '⛈️';
  if (description.includes('mist') || description.includes('fog')) return '🌫️';
  return '🌍'; 
};

const Weather: React.FC = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<any | null>(null);
  const [forecast, setForecast] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!city.trim()) {
      setError('Please enter a city name.');
      return;
    }
    setError(null); 
    const currentWeather = await fetchWeather(city);
    const forecastData = await fetchForecast(city);
    if (currentWeather && forecastData) {
      setWeather(currentWeather);
      const dailyForecast = forecastData.list.filter((item: any) =>
        item.dt_txt.includes('12:00:00')
      );
      setForecast(dailyForecast);
    } else {
      setError('City not found or an error occurred.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-100 text-center p-4">
      <h1 className="text-3xl font-bold text-blue-600 mb-4">Weather Search</h1>
      <input
        type="text"
        value={city}    
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name..."
        className="border border-gray-300 rounded p-2 mb-4"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Search
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {weather && (
        <div className="mt-4 p-4 bg-white rounded shadow w-full max-w-md">
          <h2 className="text-2xl font-bold text-gray-800">
            {weather.name} {getWeatherEmoji(weather.weather[0].description)}
          </h2>
          <p className="text-lg text-gray-700">Temperature: {weather.main.temp}°C</p>
          <p className="text-lg text-gray-700">
            Weather: {weather.weather[0].description} {getWeatherEmoji(weather.weather[0].description)}
          </p>
          <p className="text-lg text-gray-700">Humidity: {weather.main.humidity}%</p>
          <p className="text-lg text-gray-700">Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
      {forecast && (
        <div className="mt-4 p-4 bg-white rounded shadow w-full max-w-2xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">5-Day Forecast</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {forecast.map((day: any) => (
              <div key={day.dt} className="p-4 bg-gray-100 rounded shadow">
                <p className="text-lg font-bold text-gray-800">
                  {new Date(day.dt_txt).toLocaleDateString('en-US', {
                    weekday: 'long',
                  })}
                </p>
                <p className="text-sm text-gray-600">{day.dt_txt.split(' ')[0]}</p>
                <p className="text-lg text-gray-700">
                  {getWeatherEmoji(day.weather[0].description)} {day.weather[0].description}
                </p>
                <p className="text-lg text-gray-700">Temp: {day.main.temp}°C</p>
                <p className="text-lg text-gray-700">Humidity: {day.main.humidity}%</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
