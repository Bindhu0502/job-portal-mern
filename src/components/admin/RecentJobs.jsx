import { FaBriefcase, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import "../../styles/adminDashboard.css";

function RecentJobs({ jobs }) {
  return (
    <div className="dashboard-section">

      <div className="section-header">
        <h2>Recent Jobs</h2>
      </div>

      {jobs.length === 0 ? (
        <div className="empty-card">
          <p>No jobs available.</p>
        </div>
      ) : (
        <div className="job-grid">

          {jobs.map((job) => (
            <div
              className="job-card"
              key={job._id}
            >
              <div className="job-icon">
                <FaBriefcase />
              </div>

              <h3>{job.title}</h3>

              <p className="company-name">
                {job.company}
              </p>

              <div className="job-info">

                <span>
                  <FaMapMarkerAlt />
                  {job.location}
                </span>

              </div>

              <div className="job-footer">

                <span>
                  <FaCalendarAlt />
                  {new Date(job.createdAt).toLocaleDateString()}
                </span>

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default RecentJobs;