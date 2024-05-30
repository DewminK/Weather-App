import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [backgroundimg, setBackground] = useState('default.jpg');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=e9d88807681acd51e6d83db796f6223d`;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios
        .get(url)
        .then((response) => {
          setData(response.data);
          setBackgroundImage(response.data.weather[0].main.toLowerCase());
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            alert('City Not Found. Check Your Spellings!');
          } else {
            alert('An Error Occurred. Please Try Again.');
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
    };

   // setBackground(weatherToImage[description] || 'default.jpg'); // Set default if no match
    const imageUrl = weatherToImage[description] || 'default.jpg';
    console.log('Background image URL:', imageUrl);
    setBackground(imageUrl);
  };

  return (
    <div className="app" style={{ backgroundImage: `url(${backgroundimg})`, backgroundRepeat:'no-repeat',backgroundSize: 'cover' }}>
     <div className="app search">
      <input
       value={location}
       onChange={event=>setLocation(event.target.value)}
       onKeyDown={searchLocation}
       placeholder='Enter a City'
       type="text"/>
     </div>
     <div className="container">
      <div className="top">
        <div className="location">
          <p>{data.name}</p>
        </div>
        <div className="temp">
          {data.main? <h1>{(data.main.temp- 273.15).toFixed(2)} C°</h1>:null}
          
        </div>
        <div className="description">
        {data.weather ? <p>{data.weather[0].main}</p> : null}
          
        </div>
      </div>
      {data.name!=undefined&&
      <div className="bottom">
        <div className="feelslike">
          <p>Feels Like</p>
          {data.main? <p className='bold'>{(data.main.feels_like- 273.15).toFixed(2)}C°</p>:null}
        </div>
        <div className="humitidy">
          <p>Humitidy</p>
          {data.main? <p className='bold'>{data.main.humidity}%</p>:null}
        </div>
        <div className="cloudiness">
          <p>Cloudiness</p>
          {data.main? <p className='bold'>{data.clouds.all}%</p>:null}
        </div>
        <div className="wind">
          <p>Wind Speed</p>
          {data.main ? <p className='bold'>{(data.wind.speed).toFixed(2)} m/s</p> : null}
        </div>

        <div className="pressure">
          <p>Air Pressure</p>
          {data.main? <p className='bold'>{data.main.pressure} hPa</p>:null}
        </div>
      </div>
      }
     </div>
    
   </div>
  );
}

export default App
