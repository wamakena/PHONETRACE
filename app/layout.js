import '../styles/globals.css';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'SIMTRACE',
  description: 'Global device tracking system',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        
        <header className="navbar" style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "16px 24px",
          alignItems: "center"
        }}>
          
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Image src="/logo.png" width={40} height={40} alt="logo" />
            <strong>SIMTRACE</strong>
          </div>

          <nav style={{ display: "flex", gap: "20px" }}>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/devices">Devices</Link>
            <Link href="/tracking">Tracking</Link>
          </nav>

        </header>

        <main style={{ padding: "24px" }}>
          {children}
        </main>

      </body>
    </html>
  );
}
