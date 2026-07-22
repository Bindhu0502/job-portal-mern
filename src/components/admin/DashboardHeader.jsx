import { Link } from "react-router-dom";
import { FaBriefcase } from "react-icons/fa";
import "../../styles/adminDashboard.css";

function DashboardHeader() {
  return (
    <div className="dashboard-header-card">

      <div>
        <h1 className="dashboard-title">
          Admin Dashboard
        </h1>

        <p className="dashboard-subtitle">
          Welcome back 👋 Manage your recruitment platform efficiently.
        </p>
      </div>

      <Link to="/admin/jobs">
        <button className="manage-job-btn">
          <FaBriefcase />
          <span>Manage Jobs</span>
        </button>
      </Link>

    </div>
  );
}

export default DashboardHeader;