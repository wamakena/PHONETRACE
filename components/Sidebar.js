"use client";
import Link from "next/link";

export default function Sidebar() {
  const menuItems = [
    { name: "Dashboard", href: "/webhost/dashboard" },
    { name: "Devices", href: "/webhost/devices" },
    { name: "Tracking", href: "/webhost/tracking" },
    { name: "Alerts", href: "/webhost/alerts" },
    { name: "Security", href: "/webhost/security" },
  ];

  return (
    <aside style={{
      width: "220px",
      backgroundColor: "#fff",
      borderRight: "1px solid #ccc",
      padding: "20px",
      minHeight: "100vh"
    }}>
      <nav style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {menuItems.map(item => (
          <Link key={item.name} href={item.href} style={{
            textDecoration: "none",
            color: "#333",
            fontWeight: "500",
            padding: "10px",
            borderRadius: "6px",
            transition: "background 0.2s"
          }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = "#f0f2f5"}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = "transparent"}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
