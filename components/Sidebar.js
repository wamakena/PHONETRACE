import React, { useState } from "react";
import "./Sidebar.css";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { label: "Dashboard", link: "/dashboard", icon: "🏠" },
    { label: "Devices", link: "/devices", icon: "📡" },
    { label: "Reports", link: "/reports", icon: "📊" },
    { label: "Users", link: "/users", icon: "👥" },
    { label: "Settings", link: "/settings", icon: "⚙️" },
  ];

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <button className="collapse-btn" onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? "➡️" : "⬅️"}
      </button>
      <ul>
        {menuItems.map((item, idx) => (
          <li key={idx}>
            <a href={item.link}>
              <span className="icon">{item.icon}</span>
              {!collapsed && <span className="label">{item.label}</span>}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
