'use client';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

export default function LiveMap({ devices }) {
  return (
    <MapContainer center={[-1.2921, 36.8219]} zoom={12} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {devices.map(device => (
        <Marker
          key={device.id}
          position={[device.latitude, device.longitude]}
        >
          <Popup>
            {device.device_name} <br /> {device.sim_number} <br /> Status: {device.status}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
