import Link from "next/link";

export default function Navbar() {
  return (
    <nav style={{ display: "flex", gap: "20px" }}>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/devices">Devices</Link>
      <Link href="/tracking">Tracking</Link>
    </nav>
  );
}
