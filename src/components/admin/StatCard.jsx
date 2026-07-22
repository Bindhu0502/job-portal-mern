import "../../styles/adminDashboard.css";

function StatCard({
  title,
  value,
  subtitle,
  icon,
  color,
}) {
  return (
    <div className="stat-card">

      <div
        className="stat-icon"
        style={{
          backgroundColor: color,
        }}
      >
        {icon}
      </div>

      <div className="stat-content">

        <h5>{title}</h5>

        <h2>{value}</h2>

        <p>{subtitle}</p>

      </div>

    </div>
  );
}

export default StatCard;