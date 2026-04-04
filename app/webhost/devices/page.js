"use client";
import { useEffect, useState } from "react";
import RegisterDeviceForm from "@/components/RegisterDeviceForm";

export default function WebhostDevicesPage() {
  const [owners, setOwners] = useState([]);
  const [stations, setStations] = useState([]);
  const [assignees, setAssignees] = useState([]);

  useEffect(() => {
    fetch("/api/users/assignable")
      .then(res => res.json())
      .then(data => {
        setOwners(data.owners);
        setStations(data.stations);
        setAssignees(data.assignees);
      });
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1>Register & Assign Device</h1>
      <RegisterDeviceForm owners={owners} stations={stations} assignees={assignees} />
    </div>
  );
}
