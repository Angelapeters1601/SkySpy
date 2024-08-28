import { FaMapMarkerAlt } from "react-icons/fa";

function Button() {
  return (
    <div className="button">
      <button>
        Get my location
        <FaMapMarkerAlt className="button-icon" />
      </button>
    </div>
  );
}

export default Button;
