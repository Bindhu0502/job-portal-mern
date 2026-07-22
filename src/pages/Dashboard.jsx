import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBriefcase,
  FaBookmark,
  FaUserCircle,
  FaSearch,
  FaPaperPlane,
  FaMapMarkerAlt,
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";
import api from "../api/api";
import Loader from "../components/common/Loader";
import "../styles/dashboard.css";

function Dashboard() {
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [savedJobs, setSavedJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    if (user) {
      loadDashboard();
    }
  }, [user]);

  const loadDashboard = async () => {
    try {
      const [savedRes, appliedRes] = await Promise.all([
        api.get(`/saved-jobs/${user._id}`),
        api.get("/applications/my"),
      ]);

      setSavedJobs(savedRes.data.jobs || []);
      setApplications(appliedRes.data.applications || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="dashboard-page">

      <div className="dashboard-header">

        <div>
          <h1>Welcome back, {user?.name} 👋</h1>

          <p>
            Track applications, manage saved jobs,
            and continue your career journey.
          </p>
        </div>

        <div className="profile-icon">
          <FaUserCircle />
        </div>

      </div>

      {/* Statistics */}

      <div className="stats-grid">

        <div className="stat-card">

          <FaPaperPlane />

          <h2>{applications.length}</h2>

          <p>Applied Jobs</p>

        </div>

        <div className="stat-card">

          <FaBookmark />

          <h2>{savedJobs.length}</h2>

          <p>Saved Jobs</p>

        </div>

        <div className="stat-card">

          <FaBriefcase />

          <h2>{savedJobs.length + applications.length}</h2>

          <p>Total Activity</p>

        </div>

        <div className="stat-card">

          <FaSearch />

          <h2>24/7</h2>

          <p>Job Search</p>

        </div>

      </div>

      {/* Quick Actions */}

      <div className="quick-actions">

        <Link to="/jobs" className="action-card">
          <FaSearch />
          <span>Browse Jobs</span>
        </Link>

        <Link to="/saved-jobs" className="action-card">
          <FaBookmark />
          <span>Saved Jobs</span>
        </Link>

        <Link to="/applied-jobs" className="action-card">
          <FaPaperPlane />
          <span>Applied Jobs</span>
        </Link>

        <Link to="/profile" className="action-card">
          <FaUserCircle />
          <span>Profile</span>
        </Link>

      </div>

      {/* Recent Applications */}

      <div className="dashboard-section">

        <div className="section-header">
          <h2>Recent Applications</h2>
        </div>

        {applications.length === 0 ? (

          <div className="empty-state">

            <FaBriefcase />

            <h3>No Applications Yet</h3>

            <p>
              Start applying to jobs and your
              applications will appear here.
            </p>

            <Link to="/jobs" className="primary-btn">
              Explore Jobs
            </Link>

          </div>

        ) : (

          applications.slice(0, 5).map((application) => (

            <div
              className="application-card"
              key={application._id}
            >

              <div>

                <h3>{application.job?.title}</h3>

                <p>{application.job?.company}</p>

                <div className="location">

                  <FaMapMarkerAlt />

                  {application.job?.location}

                </div>

              </div>

              <div className="application-right">

                <span className="status">
                  {application.status}
                </span>

                <small>
                  {new Date(
                    application.createdAt
                  ).toLocaleDateString()}
                </small>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default Dashboard;