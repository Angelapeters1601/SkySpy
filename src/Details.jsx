import { useSpring, animated } from "@react-spring/web";

function Details() {
  const props = useSpring({
    from: { transform: "translateX(-100%)" },
    to: { transform: "translateX(0%)" },
    config: { duration: 1100 },
  });

  return (
    <animated.div style={props} className="details">
      <p>
        <span>S</span>tay ahead of the weather with <span>SkySpy</span>, get
        real-time updates, detailed forecast, and discover your favorite weather
        spots with ease. <br /> Whether you are planning your day or exploring
        new locations <span>SkySpy</span> keeps you informed and ready for any
        forecast.
      </p>
    </animated.div>
  );
}

export default Details;
