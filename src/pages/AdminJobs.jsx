import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import Loader from "../components/common/Loader";

function AdminJobs() {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);

    try {
      const response = await api.get("/jobs");
      setJobs(response.data.jobs || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/jobs/${id}`);

      alert("Job Deleted Successfully");

      fetchJobs();
    } catch (error) {
      console.error(error);
      alert("Failed to delete job");
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div style={{ padding: "40px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <h1>💼 Manage Jobs</h1>

        <Link to="/admin/add-job">
          <button
            style={{
              padding: "12px 20px",
              background: "#16a34a",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            ➕ Add Job
          </button>
        </Link>
      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr
            style={{
              background: "#2563eb",
              color: "#fff",
            }}
          >
            <th style={thStyle}>Title</th>
            <th style={thStyle}>Company</th>
            <th style={thStyle}>Location</th>
            <th style={thStyle}>Type</th>
            <th style={thStyle}>Salary</th>
            <th style={thStyle}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {jobs.map((job) => (
            <tr key={job._id}>
              <td style={tdStyle}>{job.title}</td>
              <td style={tdStyle}>{job.company}</td>
              <td style={tdStyle}>{job.location}</td>
              <td style={tdStyle}>{job.type}</td>
              <td style={tdStyle}>{job.salary}</td>

              <td style={tdStyle}>
                <button
                  onClick={() => deleteJob(job._id)}
                  style={{
                    background: "#dc2626",
                    color: "#fff",
                    border: "none",
                    padding: "8px 15px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  padding: "12px",
  border: "1px solid #ddd",
};

const tdStyle = {
  padding: "12px",
  border: "1px solid #ddd",
};

export default AdminJobs;