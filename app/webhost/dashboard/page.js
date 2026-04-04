"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import LiveMap from "@/components/LiveMap";
import { supabase } from "@/lib/supabaseClient";

export default function WebhostDashboard() {
  const { data: session } = useSession();
  const router = useRouter();

  const [devices, setDevices] = useState([]);
  const [alerts, setAlerts] = useState([]);

  // Fetch devices and alerts based on user role
  useEffect(() => {
    if (!session) return router.push("/auth/signin");

    fetchDevices();
    fetchAlerts();

    // Real-time subscription with Supabase
    const deviceSub = supabase
      .from("devices")
      .on("*", () => fetchDevices())
      .subscribe();

    const alertSub = supabase
      .from("alerts")
      .on("INSERT", payload => setAlerts(prev => [payload.new, ...prev]))
      .subscribe();

    return () => {
      supabase.removeSubscription(deviceSub);
      supabase.removeSubscription(alertSub);
    };
  }, [session]);

  const fetchDevices = async () => {
    const filter = session.user.role === "webhost"
      ? {} // Webhost sees all devices
      : { assigned_to_id: session.user.id }; // Admin/Partner/User sees assigned devices

    const query = supabase.from("devices").select("*");
    if (filter.assigned_to_id) query.eq("assigned_to_id", filter.assigned_to_id);

    const { data } = await query;
    setDevices(data || []);
  };

  const fetchAlerts = async () => {
    const { data } = await supabase.from("alerts").select("*").order("created_at", { ascending: false }).limit(50);
    setAlerts(data || []);
  };

  const lockDevice = async (device_id) => {
    await fetch("/api/devices/update", {
      method: "POST",
      body: JSON.stringify({ device_id, is_active: false }),
    });
    fetchDevices();
  };

  const triggerAlert = async (device_id, device_name) => {
    const message = prompt("Enter alert message:");
    if (!message) return;

    await fetch("/api/alerts/create", {
      method: "POST",
      body: JSON.stringify({ device_id, device_name, message }),
    });
    fetchAlerts();
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f0f2f5" }}>
      <aside style={{ width: "220px", padding: "20px", background: "#1a202c", color: "#fff" }}>
        <h2>SIMTRACE</h2>
        <p>Command Center</p>
        <nav style={{ marginTop: "30px", display: "flex", flexDirection: "column", gap: "15px" }}>
          <a href="#" style={navLinkStyle}>Dashboard</a>
          <a href="#" style={navLinkStyle}>Devices</a>
          <a href="#" style={navLinkStyle}>Tracking</a>
          <a href="#" style={navLinkStyle}>Alerts</a>
        </nav>
      </aside>

      <main style={{ flex: 1, padding: "30px" }}>
        <h1>Welcome, {session.user.name}</h1>

        {/* Device Stats */}
        <div style={{ display: "flex", gap: "20px", marginTop: "20px", flexWrap: "wrap" }}>
          <Card title="📡 Total Devices" value={devices.length} />
          <Card title="📍 Active Devices" value={devices.filter(d => d.is_active).length} />
          <Card title="⚠️ Alerts" value={alerts.length} />
        </div>

        {/* Device Actions */}
        <h2 style={{ marginTop: "40px" }}>Devices</h2>
        <div style={{ display: "grid", gap: "20px", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))" }}>
          {devices.map(device => (
            <div key={device.id} style={deviceCardStyle}>
              <h3>{device.device_name}</h3>
              <p>SIM: {device.sim_number}</p>
              <p>Status: {device.is_active ? "Active" : "Locked"}</p>
              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button onClick={() => lockDevice(device.id)} style={buttonStyle}>Lock</button>
                <button onClick={() => triggerAlert(device.id, device.device_name)} style={alertButtonStyle}>Alert</button>
              </div>
            </div>
          ))}
        </div>

        {/* Real-Time Map */}
        <h2 style={{ marginTop: "40px" }}>Live Map</h2>
        <LiveMap devices={devices} />

        {/* Alerts */}
        <h2 style={{ marginTop: "40px" }}>Recent Alerts</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {alerts.map(alert => (
            <div key={alert.id} style={{ background: "#ffe0e0", padding: "10px", borderRadius: "8px" }}>
              <strong>{alert.device_name}</strong>: {alert.message}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

// Card Component
function Card({ title, value }) {
  return (
    <div style={{ background: "#fff", padding: "20px", borderRadius: "12px", flex: 1, minWidth: "150px", boxShadow: "0 4px 10px rgba(0,0,0,0.08)" }}>
      <h3>{title}</h3>
      <p style={{ fontSize: "24px", fontWeight: "bold", marginTop: "10px" }}>{value}</p>
    </div>
  );
}

// Styles
const navLinkStyle = { color: "#fff", textDecoration: "none", fontWeight: "500" };
const deviceCardStyle = { background: "#fff", padding: "15px", borderRadius: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" };
const buttonStyle = { padding: "6px 12px", background: "#1a73e8", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" };
const alertButtonStyle = { padding: "6px 12px", background: "#e83e3e", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" };
