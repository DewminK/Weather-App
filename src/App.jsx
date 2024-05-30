import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './Components/SearchBar.jsx';
import WeatherDisplay from './Components/WeatherDisplay';
import WeatherDetails from './Components/WeatherDetails';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [backgroundimg, setBackground] = useState('default.jpg');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=e9d88807681acd51e6d83db796f6223d`;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data);
        setBackgroundImage(response.data.weather[0].main.toLowerCase());
      }).catch((error) => {
        if (error.response && error.response.status === 404) {
          alert('City Not Found. Check Your Spellings!');
        } else {
          alert('An Error Occurred. Please Try Again.');
          console.log(error.response.status);
        }
      });
      setLocation('');
    }
  };

  const setBackgroundImage = (description) => {
    const weatherToImage = {
      clouds: './src/assets/clouds.jpg',
      rain: './src/assets/rain.jpg',
      snow: './src/assets/snow.jpg',
      mist: './src/assets/mist.jpg',
      fog: './src/assets/fog.jpg',
      haze: './src/assets/haze.jpg',
      thunderstorm: './src/assets/thunderstorm.avif',
      clear: './src/assets/clear.jpg'
    };
    const imageUrl = weatherToImage[description] || 'default.jpg';
    setBackground(imageUrl);
  };

  return (
    <div
      className="app"
      style={{
        backgroundImage: data.name ? `url(${backgroundimg})` : 'url("./src/assets/default.jpg")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
      }}
    >
      <SearchBar location={location} setLocation={setLocation} searchLocation={searchLocation} />
      <div className="container">
        <WeatherDisplay data={data} />
        {data.name && <WeatherDetails data={data} />}
      </div>
    </div>
  );
}

export default App;
