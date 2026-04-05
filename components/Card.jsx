import React from "react";
import "./Card.css";

const Card = ({ title, description, buttons }) => (
  <div className="card">
    <h3>{title}</h3>
    <p>{description}</p>
    {buttons.map((btn, idx) => (
      <a key={idx} href={btn.link}>
        <button className="button">{btn.icon} {btn.label}</button>
      </a>
    ))}
  </div>
);

export default Card;
