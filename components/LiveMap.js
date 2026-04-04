"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function LiveMap({ devices }) {
  return (
    <MapContainer center={[0, 0]} zoom={2} style={{ height: "500px", width: "100%", borderRadius: "12px" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {devices.map(device => (
        device.lat && device.lng && (
          <Marker key={device.id} position={[device.lat, device.lng]}>
            <Popup>
              <strong>{device.device_name}</strong><br />
              Owner: {device.owner_name}<br />
              SIM: {device.sim_number}
            </Popup>
          </Marker>
        )
      ))}
    </MapContainer>
  );
}
