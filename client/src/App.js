import './App.css';
import React from 'react';
import Location from './components/Location.js';

function App() {
  
  const [location, setLocation] = React.useState({"Latitude": "N/A", "Longitude": "N/A", "Weather": "N/A"});

  function getLocation() {
    navigator.geolocation.getCurrentPosition(function(position) {
      setLocation((prevState) => ({...prevState, "Latitude": position.coords.latitude, "Longitude": position.coords.longitude}))
    });
  }

  function getWeather() {
    if (location["Latitude"] === "N/A" || location["Longitude"] === "N/A") {
      alert("Please Set Location");
      return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location["Latitude"]}&lon=${location["Longitude"]}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`)
    .then(res => res.json())
    .then(data => setLocation((prevState) => ({...prevState, "Weather": data["weather"][0]["main"]})))
  }

  return (
    <div className="App">
      <Location lat={location["Latitude"]} lon={location["Longitude"]} setLocation={setLocation}/>
      <div className="Weather">Weather: {location["Weather"]}</div>
      <button className="Button setLocation" onClick={getLocation}>Use Current Location</button>
      <button className="Button getWeather" onClick={getWeather}>Get Weather</button>
    </div>
  );
}

export default App;
