import {
  FaClipboardCheck,
  FaSearch,
  FaUserCheck,
  FaTimesCircle,
  FaAward,
} from "react-icons/fa";
import "../../styles/adminDashboard.css";

function StatusSummary({ statusSummary }) {
  const summaryCards = [
    {
      title: "Applied",
      value: statusSummary?.applied || 0,
      icon: <FaClipboardCheck />,
      color: "#2563EB",
    },
    {
      title: "Reviewed",
      value: statusSummary?.reviewed || 0,
      icon: <FaSearch />,
      color: "#0EA5E9",
    },
    {
      title: "Shortlisted",
      value: statusSummary?.shortlisted || 0,
      icon: <FaUserCheck />,
      color: "#F59E0B",
    },
    {
      title: "Rejected",
      value: statusSummary?.rejected || 0,
      icon: <FaTimesCircle />,
      color: "#EF4444",
    },
    {
      title: "Hired",
      value: statusSummary?.hired || 0,
      icon: <FaAward />,
      color: "#16A34A",
    },
  ];

  return (
    <div className="dashboard-section">
      <div className="section-header">
        <h2>Application Status Summary</h2>
      </div>

      <div className="status-grid">
        {summaryCards.map((item) => (
          <div
            className="summary-card"
            key={item.title}
          >
            <div
              className="summary-icon"
              style={{ backgroundColor: item.color }}
            >
              {item.icon}
            </div>

            <h3>{item.title}</h3>

            <h1>{item.value}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StatusSummary;