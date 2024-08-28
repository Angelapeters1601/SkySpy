import { useSpring, animated } from "@react-spring/web";
import { TiWeatherSunny } from "react-icons/ti";

function Title() {
  const props = useSpring({
    from: { transform: "translateY(-100%)", opacity: 0 },
    to: { transform: "translateY(0%)", opacity: 1 },
    config: { duration: 1200 },
  });

  return (
    <animated.div style={props} className="title-container">
      <h1 className="title">
        SkySpy
        <TiWeatherSunny className="title-icon" />
      </h1>
      <p className="sub-title">See The Sky, Plan Your Day!</p>
    </animated.div>
  );
}

export default Title;
