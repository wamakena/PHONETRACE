"use client";
import { useEffect, useState } from "react";

export default function ToastNotification({ alerts }) {
  const [visibleAlerts, setVisibleAlerts] = useState([]);

  useEffect(() => {
    if (alerts.length === 0) return;
    const newAlert = alerts[0];
    setVisibleAlerts(prev => [newAlert, ...prev]);
    const timer = setTimeout(() => setVisibleAlerts(prev => prev.filter(a => a.id !== newAlert.id)), 5000);
    return () => clearTimeout(timer);
  }, [alerts]);

  return (
    <div style={{ position: "fixed", top: 20, right: 20, zIndex: 1000 }}>
      {visibleAlerts.map(alert => (
        <div key={alert.id} style={{
          backgroundColor: "#d9534f",
          color: "#fff",
          padding: "10px 15px",
          marginBottom: "10px",
          borderRadius: "6px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
        }}>
          {alert.message}
        </div>
      ))}
    </div>
  );
}
