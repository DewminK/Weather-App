import React from 'react';

function WeatherDetails({ data }) {
  return (
    <div className="bottom">
      <div className="feelslike">
        <p>Feels Like</p>
        {data.main ? <p className="bold">{(data.main.feels_like - 273.15).toFixed(2)}C°</p> : null}
      </div>
      <div className="humidity">
        <p>Humidity</p>
        {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
      </div>
      <div className="cloudiness">
        <p>Cloudiness</p>
        {data.clouds ? <p className="bold">{data.clouds.all}%</p> : null}
      </div>
      <div className="wind">
        <p>Wind Speed</p>
        {data.wind ? <p className="bold">{(data.wind.speed).toFixed(2)} m/s</p> : null}
      </div>
      <div className="pressure">
        <p>Air Pressure</p>
        {data.main ? <p className="bold">{data.main.pressure} hPa</p> : null}
      </div>
    </div>
  );
}

export default WeatherDetails;
