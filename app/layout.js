// app/layout.js
import '../styles/globals.css';
import Image from 'next/image';
import Link from 'next/link';

const logoSrc = '/logo.png';

export const metadata = {
  title: 'SIMTRACE',
  description: 'Global device tracking and SIM intelligence platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ background: '#0A0F1F', color: '#E6F1FF' }}>
        
        {/* HEADER */}
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 24px',
            borderBottom: '1px solid rgba(0,194,255,0.2)',
            background: '#0F2A44',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Image src={logoSrc} alt="SIMTRACE Logo" width={40} height={40} />
            <h1 style={{ fontSize: '18px' }}>SIMTRACE</h1>
          </div>

          {/* CLEAN NAVIGATION */}
          <nav style={{ display: 'flex', gap: '20px' }}>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/tracking">Tracking</Link>
            <Link href="/devices">Devices</Link>
          </nav>
        </header>

        {/* MAIN CONTENT */}
        <main style={{ padding: '24px' }}>
          {children}
        </main>

        {/* FOOTER */}
        <footer
          style={{
            textAlign: 'center',
            padding: '16px',
            borderTop: '1px solid rgba(0,194,255,0.2)',
            marginTop: '40px',
            opacity: 0.6,
          }}
        >
          © {new Date().getFullYear()} SIMTRACE
        </footer>

      </body>
    </html>
  );
}
