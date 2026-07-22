import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../api/api";
import Loader from "../components/common/Loader";

function AppliedJobs() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await api.get("/applications/my");

      if (response.data.success) {
        setApplications(response.data.applications);
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load applications"
      );
    } finally {
      setLoading(false);
    }
  };

  const withdrawApplication = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to withdraw this application?"
    );

    if (!confirmDelete) return;

    try {
      const res = await api.delete(`/applications/${id}`);

      toast.success(res.data.message);

      fetchApplications();
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Unable to withdraw application"
      );
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Accepted":
      case "Hired":
        return {
          background: "#dcfce7",
          color: "#15803d",
        };

      case "Rejected":
        return {
          background: "#fee2e2",
          color: "#dc2626",
        };

      case "Reviewed":
      case "Shortlisted":
        return {
          background: "#dbeafe",
          color: "#2563eb",
        };

      default:
        return {
          background: "#fef3c7",
          color: "#d97706",
        };
    }
  };

  if (loading) return <Loader />;

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <h1
        style={{
          marginBottom: "30px",
        }}
      >
        My Applications
      </h1>

      {applications.length === 0 ? (
        <h3>You haven't applied for any jobs yet.</h3>
      ) : (
        applications.map((application) => (
          <div
            key={application._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "12px",
              padding: "20px",
              marginBottom: "20px",
              boxShadow:
                "0 5px 15px rgba(0,0,0,0.08)",
              background: "#fff",
            }}
          >
            <h2>{application.job?.title}</h2>

            <p>
              <strong>Company:</strong>{" "}
              {application.job?.company}
            </p>

            <p>
              <strong>Location:</strong>{" "}
              {application.job?.location}
            </p>

            <p>
              <strong>Salary:</strong>{" "}
              {application.job?.salary}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              <span
                style={{
                  ...getStatusStyle(
                    application.status
                  ),
                  padding: "6px 14px",
                  borderRadius: "20px",
                  fontWeight: "600",
                }}
              >
                {application.status}
              </span>
            </p>

            <p>
              <strong>Applied On:</strong>{" "}
              {new Date(
                application.createdAt
              ).toLocaleDateString()}
            </p>

            {application.resume && (
              <button
                style={{
                  marginTop: "15px",
                  marginRight: "10px",
                  padding: "10px 18px",
                  background: "#2563eb",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
                onClick={() =>
                  window.open(
                    application.resume,
                    "_blank"
                  )
                }
              >
                📄 View Resume
              </button>
            )}

            {application.coverLetter && (
              <button
                style={{
                  marginTop: "15px",
                  marginRight: "10px",
                  padding: "10px 18px",
                  background: "#7c3aed",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
                onClick={() =>
                  alert(application.coverLetter)
                }
              >
                📝 Cover Letter
              </button>
            )}

            {(application.status === "Pending" ||
              application.status === "Applied") && (
              <button
                onClick={() =>
                  withdrawApplication(
                    application._id
                  )
                }
                style={{
                  marginTop: "15px",
                  padding: "10px 18px",
                  background: "#dc2626",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                🗑 Withdraw
              </button>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default AppliedJobs;