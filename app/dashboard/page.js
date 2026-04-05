"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/devices/list")
      .then((res) => res.json())
      .then((data) => {
        setDevices(data.devices || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching devices:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>SIMTRACE Command Center</h1>

      <div
        style={{
          display: "grid",
          gap: "20px",
          marginTop: "20px",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        }}
      >
        {/* DEVICES CARD */}
        <div className="card">
          <h3>📡 Devices</h3>
          <p>Monitor registered devices</p>

          {loading ? (
            <p>Loading...</p>
          ) : devices.length === 0 ? (
            <p>No devices found</p>
          ) : (
            <div style={{ marginTop: "10px" }}>
              {devices.slice(0, 3).map((device, index) => (
                <div key={index} style={{ fontSize: "14px" }}>
                  • {device.name || "Unnamed"} ({device.status || "unknown"})
                </div>
              ))}
            </div>
          )}
        </div>

        {/* LIVE TRACKING */}
        <div className="card">
          <h3>📍 Live Tracking</h3>
          <p>Real-time location tracking</p>
        </div>

        {/* THREAT */}
        <div className="card">
          <h3>⚠️ Threat Detection</h3>
          <p>SIM swap & anomaly alerts</p>
        </div>

        {/* SECURITY */}
        <div className="card">
          <h3>🔒 Security Control</h3>
          <button className="button">Lock Device</button>
        </div>
      </div>
    </div>
  );
}
