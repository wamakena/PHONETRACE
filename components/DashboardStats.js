"use client";
import { useEffect, useState } from "react";

export default function DashboardStats({ userId }) {
  const [stats, setStats] = useState({ total: 0, active: 0, alerts: 0 });

  useEffect(() => {
    fetch(`/api/devices/list${userId ? `?userId=${userId}` : ""}`)
      .then(res => res.json())
      .then(devices => {
        const total = devices.length;
        const active = devices.filter(d => d.is_active).length;
        const alerts = devices.filter(d => d.alert_triggered).length;
        setStats({ total, active, alerts });
      });
  }, [userId]);

  return (
    <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
      <div style={{ flex: 1, background: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 4px 10px rgba(0,0,0,0.08)" }}>
        <h3>Total Devices</h3>
        <p style={{ fontSize: "24px", margin: 0 }}>{stats.total}</p>
      </div>
      <div style={{ flex: 1, background: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 4px 10px rgba(0,0,0,0.08)" }}>
        <h3>Active Devices</h3>
        <p style={{ fontSize: "24px", margin: 0 }}>{stats.active}</p>
      </div>
      <div style={{ flex: 1, background: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 4px 10px rgba(0,0,0,0.08)" }}>
        <h3>Alerts</h3>
        <p style={{ fontSize: "24px", margin: 0 }}>{stats.alerts}</p>
      </div>
    </div>
  );
}
