"use client";

export default function DeviceCard({ device }) {
  return (
    <div style={{
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      backgroundColor: device.status === 'locked' ? '#ffe5e5' : '#f9f9f9'
    }}>
      <h3>{device.device_name}</h3>
      <p>SIM: {device.sim_number}</p>
      <p>IMEI: {device.imei}</p>
      <p>Battery: {device.battery_level}%</p>
      <p>Status: {device.status}</p>
      <button style={{ marginTop: "10px" }} onClick={() => lockDevice(device.id)}>
        Lock Device
      </button>
    </div>
  );
}

// Example server call
async function lockDevice(id) {
  await fetch('/api/device/lock', {
    method: 'POST',
    body: JSON.stringify({ device_id: id }),
  });
  alert('Device locked!');
}
