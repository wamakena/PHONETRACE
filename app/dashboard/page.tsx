"use client";

export default function Dashboard() {
  return (
    <div style={{ padding: "30px" }}>
      <h1 style={{ marginBottom: "20px" }}>
        SIMTRACE Command Dashboard
      </h1>

      <div
        style={{
          display: "grid",
          gap: "20px",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        }}
      >
        {[
          { title: "📡 Device Status", text: "All devices secure" },
          { title: "📍 Live Tracking", text: "Updated 2 mins ago" },
          { title: "⚠️ Threat Alerts", text: "No threats detected" },
        ].map((item, i) => (
          <div
            key={i}
            style={{
              background: "#0F2A44",
              padding: "20px",
              borderRadius: "16px",
              border: "1px solid rgba(0,194,255,0.2)",
            }}
          >
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        ))}

        <div
          style={{
            background: "#0F2A44",
            padding: "20px",
            borderRadius: "16px",
            border: "1px solid rgba(0,194,255,0.2)",
          }}
        >
          <h3>🔒 Security Actions</h3>
          <button
            style={{
              background: "#00C2FF",
              border: "none",
              padding: "10px 15px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Lock Device
          </button>
        </div>
      </div>
    </div>
  );
}
