import { FaSearch } from "react-icons/fa";
import { useSpring, animated } from "@react-spring/web";
import "./App.css";

function Input({ location, setLocation }) {
  const inputAnimation = useSpring({
    from: { opacity: 0, transform: "translateY(100px)" },
    to: { opacity: 1, transform: "translateY(0px)" },
    config: { duration: 1200 },
  });

  return (
    <animated.div style={inputAnimation} className="input">
      <input
        type="text"
        value={location}
        placeholder="Search for a location...."
        onChange={(e) => setLocation(e.target.value)}
      />
      <FaSearch className="search-icon" />
    </animated.div>
  );
}

export default Input;
