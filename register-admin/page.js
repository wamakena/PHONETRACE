"use client";

import RegisterUserForm from "@/components/RegisterUserForm";

export default function RegisterAdminPage() {
  // Webhost creates top-level Admins
  const allowedRoles = ["admin", "security_admin", "telco_admin"];
  return (
    <div style={{ padding: "40px" }}>
      <h1>Register Admin / Security Admin / Telco Admin</h1>
      <RegisterUserForm parentId={null} allowedRoles={allowedRoles} />
    </div>
  );
}
