import React, { useState, useEffect, useCallback } from "react";
import searchIcon from "../assets/search.svg";
import axios from "axios";
import { API_KEY, API_URL } from "../assets/env";
import { Link } from "react-router-dom";

interface WeatherCondition {
  text: string;
  icon: string;
  code: number;
}

interface WeatherData {
  location: {
    name: string;
    localtime: string;
  };
  current: {
    temp_c: number;
    condition: WeatherCondition;
    is_day: number;
    humidity: number;
    wind_kph: number;
    wind_degree: number;
    pressure_mb: number;
    feelslike_c: number;
  };
}

const Weather: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [city, setCity] = useState("London");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTimeout, setSearchTimeout] = useState<number | null>(null);

  const fetchWeather = useCallback(async (searchCity: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get<WeatherData>(
        `${API_URL}?key=${API_KEY}&q=${searchCity}&aqi=no`
      );
      setWeather(response.data);
    } catch (err) {
      setError("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCity = e.target.value;
    setCity(newCity);

    // Clear any existing timeout
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // Set new timeout
    if (newCity) {
      const timeout = window.setTimeout(() => {
        fetchWeather(newCity);
      }, 3000);

      setSearchTimeout(timeout);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchWeather(city);
    // Cleanup timeout on component unmount
    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    return (
      <div className="h-screen flex w-full justify-center items-center">
        <div className="text-amber-100">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!weather) {
    return <div>No weather data available.</div>;
  }

  const localTime = new Date(weather.location.localtime);
  const formattedDate = localTime.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const formattedTime = localTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  const dayName = localTime.toLocaleDateString("en-US", { weekday: "long" });

  return (
    <div className=" flex w-full flex-col sm:flex-row ">
      <div className="bg-white sm:w-[33%] min-w-[300px] h-screen">
        <div
          id="searchbar"
          className="px-15 w-full h-25 p-4 flex items-center justify-center mx-auto"
        >
          <div className="relative w-full">
            <input
              type="text"
              value={city}
              onChange={handleCityChange}
              placeholder="Search city..."
              className="w-full px-4 py-2 rounded-full focus:outline-none pr-10 bg-gray-200 text-black"
            />
            <img
              src={searchIcon}
              alt="Search"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
            />
          </div>
        </div>
        <div id="weatherlogo" className="p-4 flex justify-center">
          <img
            src={weather.current.condition.icon.replace("//", "https://")}
            alt="Weather Logo"
            className="w-44 h-44 rounded-lg object-cover"
          />
        </div>
        <div
          id="temp"
          className="h-25 flex w-full justify-center text-gray-500 flex-col items-center"
        >
          <div className="text-[70px]">
            <p>{Math.round(weather.current.temp_c)}°C</p>
          </div>
          <div className="h-10 flex justify-center items-center text-[15px]">
            <p className="font-bold">{weather.current.condition.text}</p>
          </div>
        </div>
        <div className="mt-15 h-1 flex justify-center items-center">
          <div className="w-[60%] h-full bg-gray-300 rounded-full"></div>
        </div>
        <div
          id="date"
          className="h-20 flex justify-center items-center text-[17px] text-gray-500 flex-col mt-15 gap-2 font-bold"
        >
          <p>{formattedDate}</p>
          <p>{`${dayName}, ${formattedTime}`}</p>
          <p>{weather.current.is_day ? "Day" : "Night"}</p>
        </div>
        <div
          id="city"
          className="flex justify-center items-center mt-20 text-gray-500 text-[50px] font-bold"
        >
          <p>{weather.location.name}</p>
        </div>
      </div>

      <div className="bg-gray-200  flex-1 p-4">
        <div
          id="heading"
          className="text-4xl font-bold flex p-2 text-gray-600  gap-4"
        >
          <p>Today</p>
          <Link to="/" className="btn bg-gray-600 text-white">
            Home
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-5 ml-2">
          <div className="bg-blue-600 h-25 flex items-start justify-center rounded-2xl flex-col pl-5 py-4 gap-2">
            <p className="font-bold text-gray-200">Humidity</p>
            <p className="text-2xl font-bold">{weather.current.humidity}%</p>
          </div>
          <div className="bg-blue-600 h-25 flex items-start justify-center rounded-2xl flex-col px-5 py-4 gap-2">
            <p className="font-bold text-gray-200">Wind Speed</p>
            <p className="text-2xl font-bold">
              {weather.current.wind_kph} km/h
            </p>
          </div>
          <div className="bg-blue-600 h-25 flex items-start justify-center rounded-2xl flex-col px-5 py-4 gap-2">
            <p className="font-bold text-gray-200">Pressure: </p>
            <p className="text-2xl font-bold">
              {weather.current.pressure_mb} mb
            </p>
          </div>
          <div className="bg-blue-600 h-25 flex items-start justify-center rounded-2xl flex-col px-5 py-4 gap-2">
            <p className="font-bold text-gray-200">Feels Like: </p>
            <p className="text-2xl font-bold">
              {weather.current.feelslike_c}°C
            </p>
          </div>
          <div className="bg-blue-600 h-25 flex items-start justify-center rounded-2xl flex-col px-5 py-4 gap-2">
            <p className="font-bold text-gray-200">wind Degree: </p>
            <p className="text-2xl font-bold">{weather.current.wind_degree}°</p>
          </div>
        </div>
      </div>
    </div>
  );
};

//write code

export default Weather;
