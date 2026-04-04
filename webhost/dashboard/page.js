"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import DashboardHeader from "@/components/DashboardHeader";
import Sidebar from "@/components/Sidebar";
import DashboardStats from "@/components/DashboardStats";
import LiveMap from "@/components/LiveMap";

import { supabase } from "@/lib/supabaseClient";

export default function WebhostDashboard() {
  const { data: session } = useSession();
  const router = useRouter();
  const [devices, setDevices] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    if (!session) return router.push("/auth/signin");
    fetchDevices();

    // Real-time subscription
    const deviceSub = supabase
      .from("devices")
      .on("*", () => fetchDevices())
      .subscribe();

    const alertSub = supabase
      .from("alerts")
      .on("INSERT", payload => {
        setAlerts(prev => [payload.new, ...prev]);
      })
      .subscribe();

    return () => {
      supabase.removeSubscription(deviceSub);
      supabase.removeSubscription(alertSub);
    };
  }, [session]);

  const fetchDevices = async () => {
    const { data } = await supabase
      .from("devices")
      .select("*, owner:users(name)")
      .eq("assigned_to_id", session.user.id); // role-based
    setDevices(data || []);
  };

  const cards = [
    { title: "📡 Devices", href: "/webhost/devices" },
    { title: "📍 Live Tracking", href: "/webhost/tracking" },
    { title: "⚠️ Threat Detection", href: "/webhost/alerts" },
    { title: "🔒 Security Control", href: "/webhost/security" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f0f2f5" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <DashboardHeader />
        <main style={{ padding: "30px", maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>SIMTRACE Command Center</h2>

          {/* Stats */}
          <DashboardStats devices={devices} />

          {/* Cards */}
          <div style={{
            display: "grid",
            gap: "20px",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            marginBottom: "30px"
          }}>
            {cards.map(card => (
              <a key={card.title} href={card.href} style={cardStyle}>{card.title}</a>
            ))}
          </div>

          {/* Alerts */}
          {alerts.length > 0 && (
            <div style={{ marginBottom: "30px" }}>
              <h3>Real-Time Alerts</h3>
              {alerts.map((alert, idx) => (
                <div key={idx} style={{ background: "#ffe0e0", padding: "12px", marginBottom: "10px", borderRadius: "8px" }}>
                  <strong>{alert.device_name}</strong>: {alert.message}
                </div>
              ))}
            </div>
          )}

          {/* Live Map */}
          <h3>Live Device Locations</h3>
          <LiveMap devices={devices} />
        </main>
      </div>
    </div>
  );
}

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
