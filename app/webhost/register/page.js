"use client";

import RegisterUserForm from "@/components/RegisterUserForm";

export default function WebhostRegisterPage() {
  // Webhost can register Admins only at first step
  const allowedRoles = ["admin", "security_admin", "telco_admin"];

  return (
    <div style={{ padding: "40px" }}>
      <h1>Webhost – Create Admins</h1>
      <RegisterUserForm parentId={null} allowedRoles={allowedRoles} />
    </div>
  );
}
