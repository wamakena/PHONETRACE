"use client";
import { MapContainer, TileLayer, Marker, Popup, CircleMarker } from "react-leaflet";

export default function LiveMap({ devices }) {
  return (
    <MapContainer center={[-1.2921, 36.8219]} zoom={12} style={{ height: "600px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {devices.map(device => (
        <CircleMarker
          key={device.id}
          center={[device.latitude, device.longitude]}
          radius={10}
          color={device.status === "locked" ? "red" : device.status === "alert" ? "orange" : "green"}
        >
          <Popup>
            <strong>{device.device_name}</strong><br/>
            SIM: {device.sim_number}<br/>
            Status: {device.status}<br/>
            Battery: {device.battery_level}%
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
