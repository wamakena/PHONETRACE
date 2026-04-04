export default function Navbar() {
  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "20px"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img src="/logo.png" width="40" />
        <strong>SIMTRACE</strong>
      </div>

      <div style={{ display: "flex", gap: "20px" }}>
        <a href="/dashboard">Dashboard</a>
        <a href="/tracking">Tracking</a>
        <a href="/devices">Devices</a>
      </div>
    </nav>
  );
}
