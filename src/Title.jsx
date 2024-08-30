import { useSpring, animated } from "@react-spring/web";
import { TiWeatherSunny } from "react-icons/ti";
import { IoIosMoon } from "react-icons/io";
import { FaSun } from "react-icons/fa";

function Title({ theme, onToggle }) {
  const props = useSpring({
    from: { transform: "translateY(-100%)", opacity: 0 },
    to: { transform: "translateY(0%)", opacity: 1 },
    config: { duration: 1200 },
  });

  return (
    <animated.div style={props} className="title-container">
      <button onClick={onToggle} className="theme-toggle-btn">
        {theme === "light" ? <IoIosMoon size={15} /> : <FaSun size={15} />}
      </button>
      <h1 className="title">
        SkySpy
        <TiWeatherSunny className="title-icon" />
      </h1>
      <p className="sub-title">See The Sky, Plan Your Day!</p>
    </animated.div>
  );
}

export default Title;
