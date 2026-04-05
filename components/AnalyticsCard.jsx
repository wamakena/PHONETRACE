import React from "react";
import "./Card.css";

const AnalyticsCard = ({ title, value, trend }) => (
  <div className="card">
    <h3>{title}</h3>
    <p style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{value}</p>
    <p style={{ color: trend >= 0 ? "#16a34a" : "#dc2626" }}>
      {trend >= 0 ? `▲ +${trend}%` : `▼ ${Math.abs(trend)}%`} from last period
    </p>
  </div>
);

export default AnalyticsCard;
