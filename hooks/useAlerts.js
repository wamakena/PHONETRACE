import { useState, useEffect } from 'react';
import { sql } from '@neondatabase/serverless';

export default function useAlerts() {
  const [alerts, setAlerts] = useState([]);

  const fetchAlerts = async () => {
    const res = await sql`SELECT * FROM alerts ORDER BY created_at DESC LIMIT 50`;
    setAlerts(res);
  };

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 5000);
    return () => clearInterval(interval);
  }, []);

  return alerts;
}
