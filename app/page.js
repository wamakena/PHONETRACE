export default function Home() {
  return (
    <div style={{ padding: "40px" }}>
      <header style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <img src="/logo.png" width="50" />
        <h1>SIMTRACE</h1>
      </header>

      <section style={{ marginTop: "60px", maxWidth: "600px" }}>
        <h2 style={{ fontSize: "42px", lineHeight: "1.2" }}>
          Connect. Protect. Recover.
        </h2>

        <p style={{ marginTop: "20px", opacity: 0.8 }}>
          The global smart network that tracks devices, detects SIM fraud,
          and helps recover stolen phones in real time.
        </p>

        <button className="button" style={{ marginTop: "30px" }}>
          Launch Dashboard
        </button>
      </section>
    </div>
  );
}
