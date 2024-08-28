import React, { useState, useEffect } from "react";
import Day from "./Day";
import ErrorMsg from "./ErrorMsg";
import Map from "./Map";
import { useSpring, animated } from "@react-spring/web";
import { BiSolidRightArrow } from "react-icons/bi";
import { BiSolidLeftArrow } from "react-icons/bi";

function Weather({ weather, displayLocation, latitude, longitude }) {
  const {
    temperature_2m_max: max,
    temperature_2m_min: min,
    time: dates,
    weathercode: codes,
  } = weather;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    console.log("Weather component rendered");
  }, [weather]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) =>
      prevIndex === dates.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? dates.length - 1 : prevIndex - 1
    );
  };

  const props = useSpring({
    from: {
      transform: `translateX(${direction === 1 ? 100 : -100}%)`,
      opacity: 0,
    },
    to: {
      transform: "translateX(0%)",
      opacity: 1,
    },
    config: { tension: 170, friction: 40 },
    reset: true,
  });

  return (
    <div className="weather">
      <div className="weather-card">
        <h2>Weather in {displayLocation}</h2>

        {dates.length > 0 ? (
          <>
            <div className="carousel">
              <animated.div style={props}>
                <Day
                  date={dates[currentIndex]}
                  max={max[currentIndex]}
                  min={min[currentIndex]}
                  codes={codes[currentIndex]}
                  isToday={currentIndex === 0}
                />
              </animated.div>
            </div>

            <div className="navigation">
              <button onClick={handlePrevious} disabled={currentIndex === 0}>
                <BiSolidLeftArrow />
              </button>
              <button onClick={handleNext}>
                <BiSolidRightArrow />
              </button>
            </div>
          </>
        ) : (
          <ErrorMsg />
        )}
      </div>
      <Map
        latitude={latitude}
        longitude={longitude}
        locationName={displayLocation}
      />
    </div>
  );
}

export default Weather;
