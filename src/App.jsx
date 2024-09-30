import { useState } from 'react'
import './App.css'

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState("");
  //importing from .env file 
  const key = import.meta.env.VITE_KEY;
  async function handleButtonClick() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const todayDate = date.getDate();
    const today = `${year}-${month}-${todayDate}`
    try{
      const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${today}?unitGroup=us&key=YFPJKFT4UGEYSR43AN4B6ZK9V&contentType=json`)
      const data = await response.json();
      setWeatherData(data);
      console.log(data);
    }
    catch(error){
      console.log(error);
    }
  }
  return (
    <div className="container">
      <input type='text' placeholder='Enter City Name' onChange={(e) => setCity(e.target.value)} />
      <br />
      <br />
      <button onClick={() => handleButtonClick()}>Search</button>
      <br />
      <br />
      <h1>City : {weatherData?.resolvedAddress}</h1>
      <h1>Temperature : {weatherData.currentConditions?.temp} °F</h1>
      <h1>Humidity : {weatherData.currentConditions?.humidity} %</h1>
      <h1>Conditions : {weatherData.currentConditions?.conditions}</h1>
      <h1>Description : {weatherData?.description}</h1>
    </div>
  )
}

export default App
