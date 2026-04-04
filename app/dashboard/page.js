"use client";

import LiveMap from '../../components/LiveMap';
import useDevices from '../../hooks/useDevices';

export default function Dashboard() {
  const devices = useDevices();

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "20px" }}>
        SIMTRACE Command Center
      </h1>

      {/* Dashboard Cards */}
      <div style={{
        display: "grid",
        gap: "20px",
        marginBottom: "40px",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))"
      }}>
        <div className="card" style={cardStyle}>
          <h3>📡 Devices</h3>
          <p>Monitor registered devices</p>
        </div>

        <div className="card" style={cardStyle}>
          <h3>📍 Live Tracking</h3>
          <p>Real-time location tracking</p>
        </div>

        <div className="card" style={cardStyle}>
          <h3>⚠️ Threat Detection</h3>
          <p>SIM swap & anomaly alerts</p>
        </div>

        <div className="card" style={cardStyle}>
          <h3>🔒 Security Control</h3>
          <button className="button">Lock Device</button>
        </div>
      </div>

      {/* LiveMap */}
      <div style={{ height: "600px", border: "1px solid #ccc", borderRadius: "8px" }}>
        <LiveMap devices={devices} />
      </div>
    </div>
  );
}

// Optional inline card styling
const cardStyle = {
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  backgroundColor: "#f9f9f9",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
};
