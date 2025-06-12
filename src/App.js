import { useState,useEffect} from "react";
import "./App.css";
import PropTypes from "prop-types";
import searchIcon from "./Assets/search.png";
import clearIcon from "./Assets/clear.png";
import cloudIcon from "./Assets/cloud.png";
import drizzleIcon from "./Assets/drizzle.png";
import rainIcon from "./Assets/rain.png";
import snowIcon from "./Assets/snow.png";
import windIcon from "./Assets/wind.png";
import humidityIcon from "./Assets/humidity.png"
const WeatherDetails = ({ icon, temp, city,country,lat,log,humidity,wind}) => {
  return (
    <>
    <div className="image">
      <img src={icon} alt="Weather Icon" />
    </div>
    <div className="temp">{temp}℃</div>
    <div className="location">{city}</div>
    <div className="country">{country}</div>
    <div className="cord">
      <div>
        <span className="lat">Latitude</span>
        <span>{lat}</span>
        
      </div>
      <div>
        <span className="log">Longitude</span>
        <span>{log}</span>
      </div>
    </div>
    <div className="datacontainer">
      <div className="element">
        <img src={humidityIcon} alt="humidity" className="icon"/>
        <div className="data">{humidity}%</div>
        <div className="text">Humidity</div>
      </div>
         <div className="element">
        <img src={windIcon} alt="wind" className="icon" />
        <div className="windpercent">{wind}km/h</div>
        <div className="text">Wind Speed</div>
      </div>
    </div>
    </>
  );
};
WeatherDetails.propTypes = {
  icon: PropTypes.string.isRequired,
  temp: PropTypes.number.isRequired,
  city: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  lat: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  log: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  humidity: PropTypes.number.isRequired,
  wind: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};



function App() {

let apikey = "91e4f2548b21e0a806eac716b75478c7";
   const [text,setText] = useState("chennai");

  const [icon, setIcon] = useState("");
   const [temp, setTemp] = useState(0);
    const [city, setCity] = useState("");
     const [country, setCountry] = useState("");
      const [lat, setLat] = useState(0);
       const [log, setLog] = useState(0);
       const [humidity, setHumidity] = useState(0);
       const [wind, setWind] = useState(0);
       const [cityNotFound, setCityNotFound] = useState(false);
       const[loading, setLoading] = useState(false);
       const [error, setError] = useState(null);
     

       const weatherIconMap = {
        "01d": clearIcon,
        "01n": clearIcon,
        "02d": cloudIcon,
        "02n": cloudIcon,
        "03d": drizzleIcon,
        "03n": drizzleIcon,
        "04d": drizzleIcon,
        "04n": drizzleIcon,
        "09d": rainIcon,
        "09n": rainIcon,
        "10d": rainIcon,
        "10n": rainIcon,
        "11d": windIcon,
        "11n": windIcon,
        "13d": snowIcon,
        "13n": snowIcon,
        "50d": drizzleIcon,
        "50n": drizzleIcon,
       }
       const search = async ()=> {
        setLoading(true);
  let url = `https:api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apikey}&units=metric`
;
try {
  let res = await fetch(url);
  let data = await res.json();
  if (data.cod === "404") {
    console.error("City not found");
    setCityNotFound(true);
    setLoading(false);
    return;
  }
  setHumidity(data.main.humidity);
  setWind(data.wind.speed);
  setTemp(Math.floor(data.main.temp));
  setCity(data.name);
  setCountry(data.sys.country);
  setLat(data.coord.lat);
  setLog(data.coord.lon);
  const iconcode = data.weather[0].icon;
  setIcon(weatherIconMap[iconcode] || clearIcon);
  setCityNotFound(false);

}
catch (error){
  console.error("Error fetching weather data:", error.message);
   setError("failed to fetch weather data. please try again later.");

}
finally {
  setLoading(false);

}

};
const handlecity = (e) => {
  setText(e.target.value);


};
const handlekeyDown = (e) => {
  if (e.key === "Enter") {
    search();

  }
}
useEffect(function () {
  search();
},[]
);


return (
  <div className="container">
    <div className="input-container">
      <input
        type="text"
        className="cityInput"
        placeholder="Search City"
        onChange={handlecity}
        value={text}
        onKeyDown={handlekeyDown}
      />
      <div className="searchIcon">
        <img src={searchIcon} alt="Search" onClick={search} />
      </div>
    </div>
   




    {loading && <div className="loadingmessage">Loading...</div>}
    {error && <div className="errormessage">{error}</div>}
    {cityNotFound && <div className="citynotfoundmessage">City not found</div>}

    {!loading && !error && !cityNotFound && (
      <WeatherDetails
        icon={icon}
        temp={temp}
        city={city}
        country={country}
        lat={lat}
        log={log}
        humidity={humidity}
        wind={wind}
      />
    )}
  </div>
);
}


export default App;