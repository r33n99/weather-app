import { useState } from "react";

function App() {
  const api = {
    key: "a9db98880c22409837e89ee951a62e8b",
    base: "https://api.openweathermap.org./data/2.5/",
  };

  const [query,setQuery] = useState("")
  const [weather,setWeather] = useState({})
  const search = e => {
    if(query) {
      if(e.key === "Enter") {
        fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result)
          setQuery("")
        })
      }
    }
  }

  const handleChangeValue  = (e) => {
        setQuery(e.target.value)
  }
  
  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear()

    return `${day} ${date} ${month} ${year}`
  }

  let weatherTemp = ""

  if(weather?.main?.temp > 16) {
   weatherTemp = "app warm"
  } else if(weather?.main?.temp <= 0) {
    weatherTemp = "app snowtemp"
  } else if(8 < weather?.main?.temp < 15) {
    weatherTemp = "app cloudy"
  } else {
    weatherTemp = "app"
  }

  return (
    <div className={(typeof weather.main != "undefined") ? (weatherTemp) : "app"}>
      <main>
        <div className="search-box">
          <input onKeyPress={search} value={query} onChange={handleChangeValue}  type="text" placeholder="Search..." className="search-bar" />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box"> 
            <div className="temp">{Math.round(weather.main.temp)}°c</div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
         ) : (<div className="select-main"><h1>Select your city</h1></div>)}
      </main>
    </div>
  );
}

export default App;
