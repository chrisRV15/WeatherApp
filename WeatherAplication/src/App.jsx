import { useState } from 'react'
import './styles.css';


export default function App() {
  return (
    <>
    <div>
      <Weather />
    </div>
    </>
  );
}

function Weather() {
  return (
    <>
    <div className='weather'>
      <div className='search-bar'>
        <input type='text' className='seach-city' placeholder='Search the city name...'></input>
        <button type="submit">Search</button>
      </div>
      <div className='weather-data'>
        <img className="weather-icon" alt="Weather icon" />
        <h1 className="cityName">New York</h1>
        <h2 className="temperature"> 20&deg;C</h2>
          <div className='col'>
          <p className="humidity">humidity</p>
          <p className="windSpeed">wind speed</p>
          <p className="feelsLike">feels like</p>
          <p className="clouds">clouds</p>
          </div>
      </div>
    </div>
    </>
  );
}


