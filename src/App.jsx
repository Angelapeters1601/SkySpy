import React, { useState, useEffect } from "react";
import { useSpring, animated, Controller } from "@react-spring/web";
import axios from "axios";
import "./App.css";
import Title from "./Title";
import Details from "./Details";
import Input from "./Input";
import Weather from "./Weather";
import Loader from "./Loader";
import ErrorMsg from "./ErrorMsg";
import Footer from "./Footer";

function convertToFlag(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function App() {
  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 1200 },
  });

  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [displayLocation, setDisplayLocation] = useState("");
  const [location, setLocation] = useState(() => {
    const savedLocation = localStorage.getItem("location");
    return savedLocation || "";
  });

  const [latitude, setLatitude] = useState(
    localStorage.getItem("latitude")
      ? parseFloat(localStorage.getItem("latitude"))
      : null
  );

  const [longitude, setLongitude] = useState(
    localStorage.getItem("longitude")
      ? parseFloat(localStorage.getItem("longitude"))
      : null
  );

  useEffect(() => {
    if (!location || location.length < 3) return;
    const controller = new AbortController();

    const fetchWeather = async () => {
      setLoading(true);
      setError("");
      try {
        // getting location
        const geoRes = await axios.get(
          `https://geocoding-api.open-meteo.com/v1/search?name=${location}`,
          { signal: controller.signal }
        );
        const geoData = geoRes.data;

        if (!geoData.results || geoData.results.length === 0) {
          throw new Error("Location not found");
        }

        const { country_code, longitude, latitude, timezone, name } =
          geoData.results[0];
        setDisplayLocation(`${name} ${convertToFlag(country_code)}`);
        setLatitude(latitude);
        setLongitude(longitude);

        // Save to localStorage
        localStorage.setItem("latitude", latitude);
        localStorage.setItem("longitude", longitude);
        localStorage.setItem("location", location);

        // getting weather report
        const weatherRes = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
        );

        const weatherData = await weatherRes.data;
        if (!weatherRes.data.daily) {
          throw new Error("Weather data not available");
        }

        setWeather(weatherData.daily);
      } catch (error) {
        if (err.name === "cancelled") {
          setError("");
        }
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
    console.log("rendered=== mounted");
    // clean up
    return () => {
      controller.abort();
    };
  }, [location]);

  return (
    <animated.div style={props} className="app fade-in">
      <Title />
      <Details />
      <Input location={location} setLocation={setLocation} />
      {loading && <Loader />}
      {!loading && error && <ErrorMsg error={error} />}
      {!loading && weather && weather.time && !error && (
        <>
          <Weather
            weather={weather}
            displayLocation={displayLocation}
            longitude={longitude}
            latitude={latitude}
          />
          <Footer />
        </>
      )}
    </animated.div>
  );
}

export default App;
