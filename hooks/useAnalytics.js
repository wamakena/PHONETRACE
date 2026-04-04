import { useState, useEffect } from "react";
import { sql } from "@neondatabase/serverless";

export default function useAnalytics() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const deviceCount = await sql`SELECT COUNT(*) AS count FROM devices`;
    const alertCount = await sql`SELECT COUNT(*) AS count FROM alerts`;
    setData([
      { name: "Devices", value: parseInt(deviceCount[0].count) },
      { name: "Alerts", value: parseInt(alertCount[0].count) },
    ]);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return data;
}
