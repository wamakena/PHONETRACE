"use client";

import LiveMap from '../../components/LiveMap';
import DeviceCard from '../../components/DeviceCard';
import ToastNotification from '../../components/ToastNotification';
import AnalyticsPanel from '../../components/AnalyticsPanel';
import useDevices from '../../hooks/useDevices';
import useAlerts from '../../hooks/useAlerts';
import useAnalytics from '../../hooks/useAnalytics';

export default function Dashboard() {
  const devices = useDevices();
  const alerts = useAlerts();
  const analyticsData = useAnalytics();

  return (
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "36px", marginBottom: "20px" }}>
        SIMTRACE Command Center
      </h1>

      <ToastNotification alerts={alerts} />

      <AnalyticsPanel data={analyticsData} />

      <div style={{
        display: "grid",
        gap: "20px",
        marginBottom: "40px",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))"
      }}>
        {devices.map(device => (
          <DeviceCard key={device.id} device={device} />
        ))}
      </div>

      <LiveMap devices={devices} />
    </div>
  );
}
