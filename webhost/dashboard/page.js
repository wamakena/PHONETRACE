"use client";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import DashboardHeader from "@/components/DashboardHeader";
import Sidebar from "@/components/Sidebar";

export default function WebhostDashboard() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) router.push("/auth/signin");
  }, [session]);

  const cards = [
    { title: "📡 Devices", desc: "Monitor registered devices", href: "/webhost/devices" },
    { title: "📍 Live Tracking", desc: "Real-time location tracking", href: "/webhost/tracking" },
    { title: "⚠️ Threat Detection", desc: "SIM swap & anomaly alerts", href: "/webhost/alerts" },
    { title: "🔒 Security Control", desc: "Lock Device", href: "/webhost/security" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#f0f2f5" }}>
      <Sidebar />

      <div style={{ flex: 1 }}>
        <DashboardHeader />
        <main style={{ padding: "30px", maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>SIMTRACE Command Center</h2>

          <div style={{
            display: "grid",
            gap: "20px",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))"
          }}>
            {cards.map(card => (
              <a key={card.title} href={card.href} style={{
                padding: "20px",
                backgroundColor: "#fff",
                borderRadius: "12px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                transition: "transform 0.2s, box-shadow 0.2s",
                textDecoration: "none",
                color: "#000"
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "translateY(-5px)";
                  e.currentTarget.style.boxShadow = "0 6px 15px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.08)";
                }}
              >
                <h3 style={{ margin: 0, fontSize: "18px" }}>{card.title}</h3>
                <p style={{ margin: 0, color: "#555" }}>{card.desc}</p>
              </a>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
