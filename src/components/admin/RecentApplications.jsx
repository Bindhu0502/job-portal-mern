import {
  FaUser,
  FaBriefcase,
  FaBuilding,
  FaCalendarAlt,
} from "react-icons/fa";
import "../../styles/adminDashboard.css";

function RecentApplications({ applications }) {
  const getStatusClass = (status) => {
    switch (status) {
      case "Applied":
        return "status applied";

      case "Reviewed":
        return "status reviewed";

      case "Shortlisted":
        return "status shortlisted";

      case "Rejected":
        return "status rejected";

      case "Hired":
        return "status hired";

      default:
        return "status";
    }
  };

  return (
    <div className="dashboard-section">

      <div className="section-header">
        <h2>Recent Applications</h2>
      </div>

      {applications.length === 0 ? (
        <div className="empty-card">
          <p>No applications found.</p>
        </div>
      ) : (
        <div className="application-grid">

          {applications.map((application) => (
            <div
              className="application-card"
              key={application._id}
            >
              <h3>
                <FaUser className="me-2" />
                {application.user?.name || "Unknown User"}
              </h3>

              <p>
                <FaBriefcase className="me-2" />
                <strong>Job:</strong>{" "}
                {application.job?.title || "N/A"}
              </p>

              <p>
                <FaBuilding className="me-2" />
                <strong>Company:</strong>{" "}
                {application.job?.company || "N/A"}
              </p>

              <p>
                <FaCalendarAlt className="me-2" />
                <strong>Applied:</strong>{" "}
                {new Date(
                  application.createdAt
                ).toLocaleDateString()}
              </p>

              <div className="application-footer">

                <span
                  className={getStatusClass(
                    application.status
                  )}
                >
                  {application.status}
                </span>

              </div>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}

export default RecentApplications;