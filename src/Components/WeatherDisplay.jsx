import React from 'react';

function WeatherDisplay({ data }) {
  return (
    <div className="top">
      <div className="location">
        <p>{data.name}</p>
      </div>
      <div className="temp">
        {data.main ? <h1>{(data.main.temp - 273.15).toFixed(2)} C°</h1> : null}
      </div>
      <div className="description">
        {data.weather ? <p>{data.weather[0].main}</p> : null}
      </div>
    </div>
  );
}

export default WeatherDisplay;
