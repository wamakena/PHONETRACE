"use client";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

export default function DashboardHeader() {
  const { data: session } = useSession();

  return (
    <header style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "20px",
      borderBottom: "1px solid #ccc",
      backgroundColor: "#f7f9fc"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <Image src="/logo.png" alt="SIMTRACE Logo" width={60} height={60} />
        <div>
          <h1 style={{ margin: 0, fontSize: "28px", fontWeight: "bold" }}>SIMTRACE</h1>
          <p style={{ margin: 0, color: "#555", fontSize: "14px" }}>Connect. Protect. Recover.</p>
        </div>
      </div>

      {session && (
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ color: "#333" }}>{session.user.name} ({session.user.role})</span>
          <button 
            style={{
              backgroundColor: "#0070f3",
              color: "#fff",
              border: "none",
              padding: "8px 12px",
              borderRadius: "6px",
              cursor: "pointer"
            }}
            onClick={() => signOut()}
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}
