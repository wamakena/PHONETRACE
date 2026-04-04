export default function Home() {
  return (
    <div style={{ maxWidth: "700px", marginTop: "60px" }}>
      
      <h1 style={{ fontSize: "48px" }}>
        Connect. Protect. Recover.
      </h1>

      <p style={{ marginTop: "20px", color: "#8FA3C7" }}>
        SIMTRACE is a global device intelligence platform that tracks,
        detects SIM fraud, and helps recover stolen phones in real time.
      </p>

      <a href="/dashboard">
        <button className="button" style={{ marginTop: "30px" }}>
          Enter Command Center
        </button>
      </a>

    </div>
  );
}
