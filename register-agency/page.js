"use client";

import RegisterUserForm from "@/components/RegisterUserForm";

export default function RegisterAgencyPage() {
  const allowedRoles = ["station_admin"];
  return (
    <div style={{ padding: "40px" }}>
      <h1>Register Security Agency Admin / Stations</h1>
      <RegisterUserForm parentId={null} allowedRoles={allowedRoles} />
    </div>
  );
}
