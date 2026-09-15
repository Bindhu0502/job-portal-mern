import React from "react";
import "./StatsCard.css";

function StatsCard({
  title,
  value,
  icon,
  color,
  subtitle,
}) {
  return (
    <div
      className="stats-card"
      style={{
        borderTop: `5px solid ${color}`,
      }}
    >
      <div
        className="stats-icon"
        style={{
          backgroundColor: color,
        }}
      >
        {icon}
      </div>

      <div className="stats-content">
        <h4>{title}</h4>

        <h2>{value}</h2>

        {subtitle && (
          <p>{subtitle}</p>
        )}
      </div>
    </div>
  );
}

export default StatsCard;