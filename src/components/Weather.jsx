import React, { useState } from "react";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bf4ea225c41bcf2fa853656e323fc38f&units=metric`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("City not found");
        }
        return response.json();
      })
      .then((data) => setWeather(data))
      .catch((error) => alert(error.message));
  };

  return (
    <div className="min-h-screen  flex flex-col justify-center items-center bg-gradient-to-b from-blue-400 to-blue-600">
      <h1 className="text-4xl font-bold text-white mb-8">Weather App</h1>
      <div className="flex mb-6">
        <input
          type="text"
          value={city}
          onChange={handleChange}
          className="border p-2 rounded-md bg-white text-gray-600"
          placeholder="Enter city"
        />
        <button
          onClick={handleSearch}
          className="ml-2 bg-blue-500 text-white p-2 rounded-md"
        >
          Search
        </button>
      </div>
      {weather && (
        <div className="bg-blue-200  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 rounded-lg shadow-lg p-6 w-80">
          <div className="text-center">
            {/* Tampilkan Icon Cuaca */}
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
              alt="weather icon"
              className="mx-auto mb-4"
            />
            <h2 className="text-4xl text-gray-200 font-bold">{weather.name}</h2>
            <p className="text-xl text-gray-200 mt-2">
              {weather.weather[0].description}
            </p>
            <p className="text-2xl text-gray-200 font-semibold mt-2">
              {weather.main.temp}°C
            </p>
          </div>
          <div className="flex justify-between mt-4 text-gray-200">
            <div>
              <p className="font-bold">Humidity</p>
              <p>{weather.main.humidity}%</p>
            </div>
            <div>
              <p className="font-bold">Wind</p>
              <p>{weather.wind.speed} m/s</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
