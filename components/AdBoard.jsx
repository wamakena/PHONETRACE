import React from "react";
import "./Card.css";

const AdBoard = ({ ads }) => (
  <div className="card" style={{ marginBottom: "20px" }}>
    <h3>📢 Announcements & Ads</h3>
    <ul style={{ paddingLeft: "20px" }}>
      {ads.map((ad, i) => (
        <li key={i}>
          <a href={ad.link} target="_blank" rel="noopener noreferrer">{ad.text}</a>
        </li>
      ))}
    </ul>
  </div>
);

export default AdBoard;
