import React, { useEffect, useState, useContext } from "react";
import { SubscriptionContext } from "../contexts/SubscriptionContext";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import AnalyticsCard from "../components/AnalyticsCard";
import AnalyticsChart from "../components/AnalyticsChart";
import AdBoard from "../components/AdBoard";
import CheckoutButton from "../components/CheckoutButton";

const Dashboard = () => {
  const { subscription } = useContext(SubscriptionContext);
  const [data, setData] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  // Fetch dashboard data
  const fetchData = async () => {
    const res = await fetch("/api/dashboard");
    const json = await res.json();
    setData(json);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  if (!data)
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>
        Loading dashboard...
      </div>
    );

  const ads = [
    { text: "Upgrade to Pro for advanced analytics!", link: "/pricing" },
    { text: "Check out our partner SaaS integrations", link: "https://partners.example.com" },
  ];

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <Sidebar className={sidebarVisible ? "show" : ""} />
      <div
        style={{
          marginLeft: "220px",
          flex: 1,
          transition: "margin-left 0.3s",
        }}
      >
        {/* Navbar */}
        <Navbar toggleSidebar={() => setSidebarVisible(!sidebarVisible)} />

        <div style={{ padding: "20px" }}>
          {/* Ad Board */}
          <AdBoard ads={ads} />

          {/* KPI Cards */}
          <div className="dashboard-container">
            {data.kpis.map((kpi, idx) => (
              <AnalyticsCard
                key={idx}
                title={kpi.title}
                value={kpi.value.toLocaleString()}
                trend={kpi.trend}
              />
            ))}
          </div>

          {/* Charts */}
          <div style={{ marginTop: "20px" }}>
            <AnalyticsChart data={data.chartData} title="Monthly Active Users Trend" />
          </div>

          {/* Core Modules */}
          <div className="dashboard-container" style={{ marginTop: "20px" }}>
            <Card
              title="📡 Devices"
              description="Monitor registered devices"
              buttons={data.devices.map((device) => ({
                label: `${device.name} (${device.status})`,
                link: "/devices",
                icon: device.status === "Active" ? "✅" : "⚠️",
              }))}
            />
            <Card
              title="👥 Users"
              description="Manage system users"
              buttons={data.users.map((user) => ({
                label: `${user.name} (${user.role})`,
                link: "/users",
                icon: user.role === "Admin" ? "⭐" : "👤",
              }))}
            />
          </div>

          {/* Premium Modules */}
          {subscription.plan === "premium" && (
            <div className="dashboard-container" style={{ marginTop: "20px" }}>
              <Card
                title="📦 Inventory Pro"
                description="Advanced inventory management"
                buttons={[
                  { label: "All Items", link: "/inventory", icon: "📋" },
                  { label: "Add Item", link: "/inventory/add", icon: "➕" },
                ]}
              />
              <Card
                title="📈 Sales Analytics Pro"
                description="Advanced sales insights"
                buttons={[
                  { label: "View Reports", link: "/sales-reports", icon: "📑" },
                  { label: "Generate Report", link: "/sales-reports/new", icon: "➕" },
                ]}
              />
            </div>
          )}

          {/* Upgrade CTA for Free Users */}
          {subscription.plan === "free" && (
            <div
              style={{
                marginTop: "20px",
                padding: "15px",
                backgroundColor: "#fef3c7",
                borderRadius: "12px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                gap: "10px",
              }}
            >
              🌟 Upgrade to **Premium** to access Inventory Pro and Sales Analytics Pro modules!
              <CheckoutButton plan="premium" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
