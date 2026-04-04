"use client";

import RegisterUserForm from "@/components/RegisterUserForm";

export default function RegisterGuardianPage() {
  const allowedRoles = ["guardian", "minor"];
  return (
    <div style={{ padding: "40px" }}>
      <h1>Register Guardian / Minors</h1>
      <RegisterUserForm parentId={null} allowedRoles={allowedRoles} />
    </div>
  );
}
