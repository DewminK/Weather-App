import React,{useState} from 'react'
import axios from 'axios'
function App() {
  const[data,setData]=useState({})
  const[location,setLocation] =useState('');
  const url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=e9d88807681acd51e6d83db796f6223d`;

  const searchLocation= (event)=>{
    if(event.key==='Enter'){
      axios.get(url).then((response)=>{
        setData(response.data);
        //console.log(response.data);
      })
      .catch((error)=>{
        if(error.response && error.response.status==404){
          alert("City Not Found");
        }else{
          alert("An Error Occured, Please Try Again");
        }
      });
      setLocation('')
    }
  }
  return (
   <div className="app">
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
