// app/layout.js
import '../styles/globals.css';
import Image from 'next/image';
import Link from 'next/link';

// Logo
const logoSrc = '/logo.png';

// Map user roles to nav classes
const roleStyles = {
  superadmin: 'superadmin-nav',
  admin: 'admin-nav',
  manager: 'manager-nav',
  tenant: 'tenant-nav',
};

// Map user roles to links
const roleLinks = {
  superadmin: [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/admin', label: 'Admin Portal' },
    { href: '/manager', label: 'Manager Portal' },
    { href: '/tenant', label: 'Tenant Portal' },
  ],
  admin: [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/manager', label: 'Manager Portal' },
    { href: '/tenant', label: 'Tenant Portal' },
  ],
  manager: [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/tenant', label: 'Tenant Portal' },
  ],
  tenant: [
    { href: '/dashboard', label: 'Dashboard' },
  ],
};

export const metadata = {
  title: 'SIMTrace',
  description: 'Device tracking system with multi-portal support',
};

export default function RootLayout({ children, userRole = 'tenant' }) {
  const navClass = roleStyles[userRole] || 'tenant-nav';
  const links = roleLinks[userRole] || roleLinks['tenant'];

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-gray-50 text-gray-900">
        {/* Header */}
        <header className={`flex items-center justify-between p-4 ${navClass}`}>
          <div className="flex items-center gap-4">
            <Image src={logoSrc} alt="SIMTrace Logo" width={40} height={40} />
            <h1 className="text-xl font-bold">{userRole.toUpperCase()} Portal</h1>
          </div>

          {/* Navigation */}
          <nav className="flex gap-4">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="hover:opacity-80">
                {link.label}
              </Link>
            ))}
          </nav>
        </header>

        {/* Main Content */}
        <main className="p-6">
          {/* Example: dynamic buttons/cards for this portal */}
          <div className="flex flex-wrap gap-4">
            <button className={userRole}>New Task</button>
            <button className={userRole}>View Reports</button>

            <div className={`card ${userRole}`}>
              <h2 className="font-bold">Welcome to {userRole} portal</h2>
              <p>This card is styled based on your portal theme color.</p>
            </div>
          </div>

          {children}
        </main>

        {/* Footer */}
        <footer className="bg-white shadow-inner p-4 text-center text-gray-500">
          © {new Date().getFullYear()} SIMTrace. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
