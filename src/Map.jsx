import { MapContainer, TileLayer, Marker, useMap, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Loader from "./Loader";

function Map({ latitude, longitude, locationName }) {
  if (!latitude || !longitude) {
    return <Loader />;
  }
  return (
    <div className="map">
      <MapContainer
        center={[latitude, longitude]}
        zoom={13}
        style={{ height: "400px" }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude, longitude]}>
          <Popup>
            <div style={{ color: "blue", fontSize: "16px" }}>
              {locationName}
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Map;
