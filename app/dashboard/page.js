"use client";

export default function Dashboard() {
  return (
    <div>
      <h1>SIMTRACE Command Center</h1>

      <div style={{
        display: "grid",
        gap: "20px",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))"
      }}>
        
        <div className="card">
          <h3>📡 Devices</h3>
          <p>3 Active Devices</p>
        </div>

        <div className="card">
          <h3>📍 Tracking</h3>
          <p>Live monitoring enabled</p>
        </div>

        <div className="card">
          <h3>⚠️ Alerts</h3>
          <p>No threats detected</p>
        </div>

      </div>
    </div>
  );
}
