"use client";

import LiveMap from '../../components/LiveMap';
import useDevices from '../../hooks/useDevices';
import useAlerts from '../../hooks/useAlerts';
import DeviceCard from '../../components/DeviceCard';

export default function Dashboard() {
  const devices = useDevices();
  const alerts = useAlerts();

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "36px", marginBottom: "20px" }}>
        SIMTRACE Command Center
      </h1>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div style={{ marginBottom: "20px", color: "#d9534f" }}>
          <h2>⚠️ Recent Alerts</h2>
          {alerts.slice(0, 5).map(alert => (
            <p key={alert.id}>{alert.created_at.toLocaleString()} - {alert.message}</p>
          ))}
        </div>
      )}

      {/* Device Cards */}
      <div style={{
        display: "grid",
        gap: "20px",
        marginBottom: "40px",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))"
      }}>
        {devices.map(device => (
          <DeviceCard key={device.id} device={device} />
        ))}
      </div>

      {/* LiveMap */}
      <div style={{ height: "600px", border: "1px solid #ccc", borderRadius: "8px" }}>
        <LiveMap devices={devices} />
      </div>
    </div>
  );
}
