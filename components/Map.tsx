import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

const isBrowser = typeof window !== "undefined";

export default function Map() {
  if (!isBrowser) {
    return null;
  }
  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}
