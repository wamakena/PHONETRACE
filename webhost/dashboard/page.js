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

  // Fetch devices
  const fetchDevices = async () => {
    if (!session) return;
    const res = await fetch(`/api/devices/list?userId=${session.user.id}`);
    const data = await res.json();
    setDevices(data);
  };

  // On load
  useEffect(() => {
    if (!session) router.push("/auth/signin");
    else fetchDevices();

    // Poll every 10 seconds
    const interval = setInterval(() => {
      fetchDevices();
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, [session]);

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f0f2f5" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <DashboardHeader />
        <main style={{ padding: "30px", maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>SIMTRACE Command Center</h2>

          {/* Real-Time Stats */}
          <DashboardStats userId={session?.user.id} devices={devices} />

          {/* Main Cards */}
          <div style={{
            display: "grid",
            gap: "20px",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            marginBottom: "30px"
          }}>
            {cards.map(card => (
              <a key={card.title} href={card.href} style={cardStyle}>
                {card.title}
              </a>
            ))}
          </div>

          {/* Live Map */}
          <h3>Live Device Locations</h3>
          <LiveMap devices={devices} />
        </main>
      </div>
    </div>
  );
}

// Cards
const cards = [
  { title: "📡 Devices", href: "/webhost/devices" },
  { title: "📍 Live Tracking", href: "/webhost/tracking" },
  { title: "⚠️ Threat Detection", href: "/webhost/alerts" },
  { title: "🔒 Security Control", href: "/webhost/security" },
];

// Card styles
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
