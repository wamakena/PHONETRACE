"use client";
import { useState } from "react";

export default function RegisterDeviceForm({ owners = [], stations = [], assignees = [] }) {
  const [deviceName, setDeviceName] = useState("");
  const [simNumber, setSimNumber] = useState("");
  const [imei, setImei] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [stationId, setStationId] = useState("");
  const [assignedToId, setAssignedToId] = useState("");

  const submitDevice = async (e) => {
    e.preventDefault();
    await fetch("/api/device/register", {
      method: "POST",
      body: JSON.stringify({ device_name: deviceName, sim_number: simNumber, imei, owner_id: ownerId, station_id: stationId, assigned_to_id: assignedToId }),
      headers: { "Content-Type": "application/json" },
    });
    alert("Device registered!");
    setDeviceName(""); setSimNumber(""); setImei("");
  };

  return (
    <form onSubmit={submitDevice} style={{ display: "grid", gap: "10px", maxWidth: "400px" }}>
      <input placeholder="Device Name" value={deviceName} onChange={e => setDeviceName(e.target.value)} required />
      <input placeholder="SIM Number" value={simNumber} onChange={e => setSimNumber(e.target.value)} required />
      <input placeholder="IMEI" value={imei} onChange={e => setImei(e.target.value)} required />

      <select value={ownerId} onChange={e => setOwnerId(e.target.value)} required>
        <option value="">Select Owner</option>
        {owners.map(o => <option key={o.id} value={o.id}>{o.name} ({o.role})</option>)}
      </select>

      <select value={stationId} onChange={e => setStationId(e.target.value)}>
        <option value="">Assign to Station (optional)</option>
        {stations.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
      </select>

      <select value={assignedToId} onChange={e => setAssignedToId(e.target.value)}>
        <option value="">Assign to User (optional)</option>
        {assignees.map(a => <option key={a.id} value={a.id}>{a.name} ({a.role})</option>)}
      </select>

      <button type="submit">Register Device</button>
    </form>
  );
}
