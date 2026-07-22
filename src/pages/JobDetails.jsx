import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaBriefcase,
  FaBuilding,
  FaTools,
  FaArrowLeft,
} from "react-icons/fa";
import api from "../api/api";
import Loader from "../components/common/Loader";
import "../styles/jobDetails.css";

function JobDetails() {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    setLoading(true);

    try {
      const response = await api.get(`/jobs/${id}`);
      setJob(response.data.job);
    } catch (error) {
      console.error("Error fetching job:", error);
      setJob(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  if (!job) {
    return (
      <div className="job-not-found">
        <h2>Job Not Found</h2>

        <Link to="/jobs">
          <button>Back to Jobs</button>
        </Link>
      </div>
    );
  }

  return (
    <div className="job-details-page">

      <div className="job-details-card">

        <div className="job-header">

          <img
            src={
              job.companyLogo ||
              "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            }
            alt={job.company}
            className="details-company-logo"
          />

          <div>

            <h1>{job.title}</h1>

            <h3>{job.company}</h3>

            <div className="details-tags">

              <span>{job.type || "Full Time"}</span>

              <span>{job.category || "IT"}</span>

            </div>

          </div>

        </div>

        <div className="details-grid">

          <div className="detail-item">
            <FaMapMarkerAlt />
            <div>
              <h4>Location</h4>
              <p>{job.location}</p>
            </div>
          </div>

          <div className="detail-item">
            <FaMoneyBillWave />
            <div>
              <h4>Salary</h4>
              <p>{job.salary}</p>
            </div>
          </div>

          <div className="detail-item">
            <FaBriefcase />
            <div>
              <h4>Experience</h4>
              <p>{job.experience || "Fresher"}</p>
            </div>
          </div>

          <div className="detail-item">
            <FaBuilding />
            <div>
              <h4>Company</h4>
              <p>{job.company}</p>
            </div>
          </div>

        </div>

        <div className="details-section">

          <h2>Job Description</h2>

          <p>{job.description}</p>

        </div>

        <div className="details-section">

          <h2>
            <FaTools />
            Required Skills
          </h2>

          <p>{job.skills || "Not Available"}</p>

        </div>

        <div className="details-actions">

          <Link to={`/apply/${job._id}`}>
            <button className="apply-btn-large">
              Apply Now
            </button>
          </Link>

          <Link to="/jobs">
            <button className="back-btn">
              <FaArrowLeft />
              Back to Jobs
            </button>
          </Link>

        </div>

      </div>
    </div>
  );
}

export default JobDetails;