"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import DashboardHeader from "@/components/DashboardHeader";
import Sidebar from "@/components/Sidebar";
import DashboardStats from "@/components/DashboardStats";
import LiveMap from "@/components/LiveMap";

export default function WebhostDashboard() {
  const { data: session } = useSession();
  const router = useRouter();
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    if (!session) router.push("/auth/signin");
    else fetchDevices();
  }, [session]);

  const fetchDevices = async () => {
    const res = await fetch(`/api/devices/list?userId=${session.user.id}`);
    const data = await res.json();
    setDevices(data);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f0f2f5" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <DashboardHeader />
        <main style={{ padding: "30px", maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>SIMTRACE Command Center</h2>

          {/* Stats */}
          <DashboardStats userId={session?.user.id} />

          {/* Cards */}
          <div style={{
            display: "grid",
            gap: "20px",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            marginBottom: "30px"
          }}>
            <a href="/webhost/devices" style={{ ...cardStyle }}>📡 Devices</a>
            <a href="/webhost/tracking" style={{ ...cardStyle }}>📍 Live Tracking</a>
            <a href="/webhost/alerts" style={{ ...cardStyle }}>⚠️ Threat Detection</a>
            <a href="/webhost/security" style={{ ...cardStyle }}>🔒 Security Control</a>
          </div>

          {/* Live Map */}
          <h3>Live Device Locations</h3>
          <LiveMap devices={devices} />
        </main>
      </div>
    </div>
  );
}

// Card inline styles
const cardStyle = {
  padding: "20px",
  backgroundColor: "#fff",
  borderRadius: "12px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  textDecoration: "none",
  color: "#000",
  transition: "transform 0.2s, box-shadow 0.2s",
  textAlign: "center",
  fontSize: "18px",
  fontWeight: "500",
};
