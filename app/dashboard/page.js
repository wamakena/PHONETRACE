"use client";

export default function Dashboard() {
  return (
    <div>
      <h1>SIMTRACE Command Center</h1>

      <div style={{
        display: "grid",
        gap: "20px",
        marginTop: "20px",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))"
      }}>

        <div className="card">
          <h3>📡 Devices</h3>
          <p>Monitor registered devices</p>
        </div>

        <div className="card">
          <h3>📍 Live Tracking</h3>
          <p>Real-time location tracking</p>
        </div>

        <div className="card">
          <h3>⚠️ Threat Detection</h3>
          <p>SIM swap & anomaly alerts</p>
        </div>

        <div className="card">
          <h3>🔒 Security Control</h3>
          <button className="button">Lock Device</button>
        </div>

      </div>
    </div>

import LiveMap from '../../components/LiveMap';
import useDevices from '../../hooks/useDevices';

export default function Dashboard() {
  const devices = useDevices();
  return <LiveMap devices={devices} />;
}
  );
}
