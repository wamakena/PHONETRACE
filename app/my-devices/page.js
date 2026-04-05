"use client";

import { useEffect, useState } from "react";

export default function MyDevices() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Not logged in");
      return;
    }

    fetch(`/api/devices/list?owner_id=${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        setDevices(data || []);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Devices</h1>

      {loading ? (
        <p>Loading...</p>
      ) : devices.length === 0 ? (
        <p>No devices found</p>
      ) : (
        devices.map((device, index) => (
          <div key={index} style={{ marginBottom: "10px" }}>
            {device.device_name} ({device.sim_number})
          </div>
        ))
      )}
    </div>
  );
}
