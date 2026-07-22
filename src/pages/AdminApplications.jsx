import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/api";
import Loader from "../components/common/Loader";

function AdminApplicants() {
  const { jobId } = useParams();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    try {
      const response = await api.get(
        `/applications/applicants/${jobId}`
      );

      setApplications(response.data.applications);
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message ||
          "Failed to load applicants"
      );
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const response = await api.put(
        `/applications/status/${id}`,
        { status }
      );

      toast.success(response.data.message);

      fetchApplicants();
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message ||
          "Status update failed"
      );
    }
  };

  const handleStatusChange = (id, status) => {
    setApplications((prev) =>
      prev.map((app) =>
        app._id === id ? { ...app, status } : app
      )
    );
  };

  if (loading) return <Loader />;

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px",
        }}
      >
        <h1>Job Applicants</h1>

        <Link to="/admin/jobs">
          <button
            style={{
              padding: "10px 18px",
              border: "none",
              background: "#2563eb",
              color: "white",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Back
          </button>
        </Link>
      </div>

      {applications.length === 0 ? (
        <div
          style={{
            background: "#fff",
            padding: "25px",
            borderRadius: "10px",
            textAlign: "center",
            border: "1px solid #ddd",
          }}
        >
          <h3>No Applicants Yet</h3>
        </div>
      ) : (
        applications.map((application) => (
          <div
            key={application._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "20px",
              marginBottom: "20px",
              background: "#fff",
              boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
            }}
          >
            <h2>{application.fullName}</h2>

            <p>
              <strong>Email:</strong> {application.email}
            </p>

            <p>
              <strong>Phone:</strong> {application.phone}
            </p>

            <p>
              <strong>Job:</strong> {application.job?.title}
            </p>

            <p>
              <strong>Company:</strong> {application.job?.company}
            </p>

            <p>
              <strong>Applied On:</strong>{" "}
              {new Date(
                application.createdAt
              ).toLocaleDateString()}
            </p>

            <div style={{ marginTop: "15px" }}>
              <strong>Cover Letter</strong>

              <div
                style={{
                  background: "#f5f5f5",
                  padding: "15px",
                  borderRadius: "6px",
                  marginTop: "8px",
                }}
              >
                {application.coverLetter ||
                  "No cover letter provided."}
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
                marginTop: "20px",
                flexWrap: "wrap",
              }}
            >
              <a
                href={`${import.meta.env.VITE_API_URL}/uploads/${application.resume}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button
                  style={{
                    background: "#16a34a",
                    color: "white",
                    border: "none",
                    padding: "10px 18px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  View Resume
                </button>
              </a>

              <select
                value={application.status}
                onChange={(e) =>
                  handleStatusChange(
                    application._id,
                    e.target.value
                  )
                }
                style={{
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                <option value="Applied">
                  Applied
                </option>

                <option value="Reviewed">
                  Reviewed
                </option>

                <option value="Shortlisted">
                  Shortlisted
                </option>

                <option value="Rejected">
                  Rejected
                </option>

                <option value="Hired">
                  Hired
                </option>
              </select>

              <button
                onClick={() =>
                  updateStatus(
                    application._id,
                    application.status
                  )
                }
                style={{
                  background: "#2563eb",
                  color: "white",
                  border: "none",
                  padding: "10px 18px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Update Status
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminApplicants;