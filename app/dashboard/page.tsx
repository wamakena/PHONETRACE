export default function Dashboard() {
  return (
    <div style={{ padding: "30px" }}>
      <h1 style={{ marginBottom: "20px" }}>
        SIMTRACE Command Dashboard
      </h1>

      <div style={{ display: "grid", gap: "20px", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}>
        
        <div className="card">
          <h3>📡 Device Status</h3>
          <p>All registered devices are secure</p>
        </div>

        <div className="card">
          <h3>📍 Live Tracking</h3>
          <p>Last known location updated 2 mins ago</p>
        </div>

        <div className="card">
          <h3>⚠️ Threat Alerts</h3>
          <p>No active threats detected</p>
        </div>

        <div className="card">
          <h3>🔒 Security Actions</h3>
          <button className="button">Lock Device</button>
        </div>

      </div>
    </div>
  );
}
