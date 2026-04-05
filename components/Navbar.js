import React, { useState } from "react";
import "./Navbar.css";

const Navbar = ({ toggleSidebar }) => {
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <div className="navbar">
      <div className="navbar-left">
        <button className="mobile-toggle" onClick={() => toggleSidebar()}>
          ☰
        </button>
        <h2>Enterprise SaaS</h2>
      </div>
      <div className="navbar-right">
        <div className="notification">🔔 3</div>
        <div className="profile">👤 Admin</div>
      </div>
    </div>
  );
};

export default Navbar;
