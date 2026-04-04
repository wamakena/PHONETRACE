"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function WebhostDashboard() {
  const { data: session } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (!session) router.push("/auth/signin");
    fetchUsers();
  }, [session]);

  const fetchUsers = async () => {
    const res = await fetch("/api/users/list");
    const data = await res.json();
    setUsers(data);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "36px", marginBottom: "20px" }}>
        Webhost Command Center
      </h1>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <Link href="/webhost/register-admin">
          <button>➕ Register Admin</button>
        </Link>
        <Link href="/webhost/register-agency">
          <button>🏢 Register Security Agency</button>
        </Link>
        <Link href="/webhost/register-partner">
          <button>🛒 Register Partner Shop</button>
        </Link>
        <Link href="/webhost/register-guardian">
          <button>👨‍👩‍👧 Register Guardian</button>
        </Link>
      </div>

      <h2 style={{ marginTop: "40px" }}>All Users</h2>
      <table style={{ width: "100%", marginTop: "10px", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Parent</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id} style={{ borderBottom: "1px solid #ccc" }}>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{u.parent_name || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
