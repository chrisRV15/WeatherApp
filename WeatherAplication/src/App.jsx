import { useState } from 'react'
import './styles.css';
import windimage from './assets/wind.png';
import humidityimage from './assets/humidity.png';
import thermometerimage from './assets/thermometer.png';
import visibiltyimage from './assets/visibility.png';


export default function App() {
  return (
    <>
    <div className='weather'>
      <div className='search-bar'>
        <input type='text' className='seach-city' placeholder='Search the city name...'></input>
        <button type="submit">Search</button>
      </div>
      <div className='weather-data'>
        <h1 className="cityName">New York</h1>
        <img className="weather-icon" alt="Weather icon" />
        <h2 className="temperature"> 20&deg;C</h2>
      <div className='weather-info'>
          <div className='col'>
            <div>
              <img src={humidityimage} alt=""/>
              <p>91%</p>
              <span>Humidity</span>
            </div>
          </div>
          <div className='col'>
            <div>
              <img src={windimage} alt=""/>
              <p>91%</p>
              <span>Wind</span>
            </div>
          </div>
          <div className='col'>
            <div>
              <img src={thermometerimage} alt=""/>
              <p>25&deg;C</p>
              <span>Feel like</span>
            </div>
          </div>
          <div className='col'>
            <div>
              <img src={visibiltyimage} alt=""/>
              <p>20%</p>
              <span>Visibility</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}



