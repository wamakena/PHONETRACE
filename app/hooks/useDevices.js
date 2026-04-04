import { useState, useEffect } from 'react';
import { sql } from '@neondatabase/serverless'; // Your existing Postgres client

export default function useDevices() {
  const [devices, setDevices] = useState([]);

  const fetchDevices = async () => {
    const res = await sql`SELECT id, device_name, sim_number, status, latitude, longitude FROM devices`;
    setDevices(res);
  };

  useEffect(() => {
    fetchDevices();
    const interval = setInterval(fetchDevices, 5000); // every 5s
    return () => clearInterval(interval);
  }, []);

  return devices;
}
