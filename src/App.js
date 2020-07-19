import React, { useState } from 'react';

import { fetchWeather } from './api/fetchWeather';
import './App.css';

const App = () => {
    const [query, setQuery] = useState('');
    const [error, setError] = useState('');
    const [weather, setWeather] = useState({});

    const search = async () => {
      const res = await fetchWeather(query);
      if (res.status === 'success') {
        setWeather(res.data);
        setError('');
      } else {
        setError(res.data);
        setWeather({});
        setTimeout(() => setError(''), 3000);
      }
      setQuery('');
    }

    const onChange = (e) => {
      setQuery(e.target.value)
    }
  

    const onKeyPress = (e) => {
      if(e.key === 'Enter') {
        search()
      }
    }

    return (
        <div className="main-container">
            <input type="text" className="search" placeholder="Search weather..." value={query} onChange={onChange} onKeyPress={onKeyPress} autoFocus/>
            {weather.main && (
                <div className="city">
                    <h2 className="city-name">
                        <span>{weather.name}</span>
                        <sup>{weather.sys.country}</sup>
                    </h2>
                    <div className="city-temp">
                        {Math.round(weather.main.temp)}
                        <sup>&deg;C</sup>
                    </div>
                    <div className="info">
                        <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
                        <p>{weather.weather[0].description}</p>
                    </div>
                </div>
            )}
            {error && <div className="errorMsg">{error}</div>}
        </div>
    );
}

export default App;