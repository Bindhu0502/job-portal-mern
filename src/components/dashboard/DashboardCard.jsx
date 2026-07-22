import "../../styles/dashboard.css";

function DashboardCard({
  icon,
  title,
  value,
  color,
}) {
  return (
    <div
      className="dashboard-card"
      style={{
        borderTop: `5px solid ${color}`,
      }}
    >
      <div
        className="dashboard-card-icon"
        style={{
          background: color,
        }}
      >
        {icon}
      </div>

      <div className="dashboard-card-content">
        <h5>{title}</h5>

        <h2>{value}</h2>
      </div>
    </div>
  );
}

export default DashboardCard;