import React, { useState } from "react";
import "./../styles/App.css";
import axios from "axios";

const App = () => {
  const [query, setQuery] = useState("");
  const [data, setData] = useState();

  let api = "85399ddb44532cb5731eae56b0a3e893";

  function dataHandle(e) {
    e.preventDefault();
    axios
      .get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
          q: query,
          appid: api,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    e.target.reset();
  }

  return (
    <div className="top">
      <form onSubmit={dataHandle}>
        <input
          placeholder="Enter a city"
          type="text"
          className="search"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div className="bottom">
        {data && (
          <div className="weather">
            <p style={{ fontSize: "20px" }}>{data.name}</p>
            <h1>{Math.round(data.main.temp - 273.15)}°C</h1>
            <p style={{ fontSize: "18px" }}>{data.weather[0].description}</p>
            <img
              src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
              alt={data.weather[0].description}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
