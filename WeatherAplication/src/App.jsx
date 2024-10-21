import { useState, useEffect, useRef } from 'react'
import './styles.css';
import windimage from './assets/wind.png';
import humidityimage from './assets/humidity.png';
import thermometerimage from './assets/thermometer.png';
import visibiltyimage from './assets/visibility.png';
import clearsky from './assets/sun.png';
import fewclouds from './assets/weather.png';
import scatteredclouds from './assets/cloud.png';
import brokenclouds from './assets/clouds (1).png';
import showerrain from './assets/shower.png';
import rain from './assets/cloudy.png';
import thunderstorm from './assets/thunder.png';
import snow from './assets/snowy.png';
import mist from './assets/fog.png';


export default function App() {
  const inputRef = useRef()
  const [inputValue, setInputValue] = useState('');
  const [weatherData, setWeatherData] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const allIcons = {
    "01d": clearsky,
    "01n": clearsky,
    "02d": fewclouds,
    "02n": fewclouds,
    "03d": scatteredclouds,
    "03n": scatteredclouds,
    "04d": brokenclouds,
    "04n": brokenclouds,
    "09d": showerrain,
    "09n": showerrain,
    "10d": rain,
    "10n": rain,
    "11d": thunderstorm,
    "11n": thunderstorm,
    "13d": snow,
    "13n": snow,
    "50d": mist,
    "50n": mist, 
  }


    const fetchWeatherData = async (city) => {
      if(city === ""){
        alert("Enter City Name");
        return;
      }
      setSuggestions([]);

      try{
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_WEATHER_API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        
        if(!response.ok){
          alert(data.message);
          return;
        }
        
        console.log(data);
        const icon = allIcons[data.weather[0].icon] || clearsky;
        setWeatherData({
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          feelsLike: data.main.feels_like,
          visibility: data.visibility,
          temperature: Math.floor(data.main.temp),
          description: data.weather[0].description,
          location: data.name,
          icon: icon
        })
      } catch(error){
        setWeatherData(false);
        console.error('Error fetching the weather data:', error);
      }
    };

    const debounce = (func, delay) =>{
      let timer;
      return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    };

    const fetchCities = async (query) => {
      
      if(!query){
        setSuggestions([]);
        return;
      }


      const url = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities';
      const API_KEY_City = import.meta.env.VITE_CITIES_API_KEY;
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': API_KEY_City,
          'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
        }
      };

      try {
        const response = await fetch(`${url}?minPopulation=100000&namePrefix=${query}`, options);
        const result = await response.json();

        if(response.status === 429){
          setSuggestions([]);
          return;
        }
        console.log(result);

        if (result.data){
          setSuggestions(result.data.map(city => city.city));
        }
        else{
          setSuggestions([]);
        }
      } catch (error) {
        console.error(error);
        setSuggestions([]);
      }
    };

    const debounceFetchCities = debounce(fetchCities, 300);

    const handleInputChange = (e) => {
      const query = e.target.value;
      setInputValue(query);
      if(query.length > 3){
        debounceFetchCities(query);
      }
      else{
        setSuggestions([]);
      }
    };

    const handleSuggestionClick = (city) => {
      setInputValue(city);
      setSuggestions([]);
      fetchWeatherData(city);
    }

  return (
    <>
    <div className='weather'>
      <div className='search-bar'>
        <input 
        ref={inputRef} 
        type='text' 
        className='seach-city' 
        placeholder='Search the city name...'
        value={inputValue}
        onChange={handleInputChange}/>
        <button type="submit" onClick={()=>fetchWeatherData(inputValue)}>Search</button>
      </div>

      
      {suggestions.length > 0 && (
        <div className='suggestions-container'>
          <ul className='suggestions-list'>
            {suggestions.map((city,index) => (
              <li key={index} onClick={() => handleSuggestionClick(city)}>
                {city}
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {weatherData?<>
        <div className='weather-data'>
          <h1 className="cityName">{weatherData.location}</h1>
          <img src={weatherData.icon} className="weather-icon" alt="Weather icon" />
          <h3 className='description'>{weatherData.description}</h3>
          <h2 className="temperature">{weatherData.temperature}&deg;C</h2>
        <div className='weather-info'>
            <div className='col'>
              <div>
                <img src={humidityimage} alt=""/>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className='col'>
              <div>
                <img src={windimage} alt=""/>
                <p>{weatherData.windSpeed} km/h</p>
                <span>Wind</span>
              </div>
            </div>
            <div className='col'>
              <div>
                <img src={thermometerimage} alt=""/>
                <p>{~~(weatherData.feelsLike)}&deg;C</p>
                <span>Feels like</span>
              </div>
            </div>
            <div className='col'>
              <div>
                <img src={visibiltyimage} alt=""/>
                <p>{weatherData.visibility / 10000} mi</p>
                <span>Visibility</span>
              </div>
            </div>
          </div>
      </div>
      </>:<></>}
    </div>
    </>
  );
}



