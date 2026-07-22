import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaFileAlt,
  FaBuilding,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaArrowRight,
} from "react-icons/fa";

import api from "../../api/api";
import Loader from "../common/Loader";

function RecentApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await api.get("/applications/my-applications");

      setApplications(response.data.applications || []);
    } catch (error) {
      console.error("Applications Error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="recent-applications">
      <div className="section-header">
        <h2>
          <FaFileAlt />
          Recent Applications
        </h2>

        {applications.length > 5 && (
          <Link to="/applied-jobs" className="view-all-btn">
            View All
          </Link>
        )}
      </div>

      {applications.length === 0 ? (
        <div className="empty-applications">
          <FaFileAlt className="empty-icon" />

          <h3>No Applications Yet</h3>

          <p>
            Start applying for jobs to track your application
            progress.
          </p>

          <Link to="/jobs">
            <button className="dashboard-primary-btn">
              Browse Jobs
            </button>
          </Link>
        </div>
      ) : (
        applications.slice(0, 5).map((application) => {
          const job = application.job || application.jobId;

          return (
            <div
              className="application-item"
              key={application._id}
            >
              <div className="application-info">
                <h3>{job?.title}</h3>

                <p>
                  <FaBuilding />
                  {job?.company}
                </p>

                <p>
                  <FaMapMarkerAlt />
                  {job?.location}
                </p>

                <p>
                  <FaCalendarAlt />
                  {new Date(
                    application.createdAt
                  ).toLocaleDateString()}
                </p>
              </div>

              <div className="application-actions">
                <span
                  className={`status-badge ${
                    application.status?.toLowerCase() || "pending"
                  }`}
                >
                  {application.status}
                </span>

                <Link
                  to={`/jobs/${job?._id}`}
                >
                  <button className="view-job-btn">
                    View Job
                    <FaArrowRight />
                  </button>
                </Link>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default RecentApplications;