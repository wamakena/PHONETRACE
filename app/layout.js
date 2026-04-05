// app/layout.js
import './globals.css';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'Enterprise SaaS',
  description: 'Professional SaaS Dashboard',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ marginLeft: '220px', flex: 1 }}>
          <Navbar />
          <main style={{ padding: '20px' }}>{children}</main>
        </div>
      </body>
    </html>
  );
}
