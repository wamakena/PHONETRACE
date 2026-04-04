"use client";
import { useEffect, useState } from "react";

export default function DashboardStats({ devices = [] }) {
  const [stats, setStats] = useState({ total: 0, active: 0, alerts: 0 });

  useEffect(() => {
    if (devices.length) {
      const total = devices.length;
      const active = devices.filter(d => d.is_active).length;
      const alerts = devices.filter(d => d.alert_triggered).length;
      setStats({ total, active, alerts });
    }
  }, [devices]);

  return (
    <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
      <div style={statCardStyle}><h3>Total Devices</h3><p>{stats.total}</p></div>
      <div style={statCardStyle}><h3>Active Devices</h3><p>{stats.active}</p></div>
      <div style={statCardStyle}><h3>Alerts</h3><p>{stats.alerts}</p></div>
    </div>
  );
}

const statCardStyle = {
  flex: 1,
  background: "#fff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
  textAlign: "center",
  fontSize: "18px",
};
