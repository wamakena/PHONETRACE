"use client";

import RegisterUserForm from "@/components/RegisterUserForm";

export default function RegisterPartnerPage() {
  const allowedRoles = ["partner_admin", "partner_user"];
  return (
    <div style={{ padding: "40px" }}>
      <h1>Register Partner Shops / Users</h1>
      <RegisterUserForm parentId={null} allowedRoles={allowedRoles} />
    </div>
  );
}
