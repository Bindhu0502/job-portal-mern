import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaBriefcase,
  FaFileUpload,
} from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../api/api";
import "../styles/applyJob.css";

function ApplyJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      const res = await api.get(`/jobs/${id}`);

      if (res.data.success) {
        setJob(res.data.job);
      }
    } catch (error) {
      console.error(error);
      toast.error("Unable to load job.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resume) {
      toast.error("Please upload your resume.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("resume", resume);
      formData.append("coverLetter", coverLetter);

      const res = await api.post(
        `/applications/apply/${id}`,
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      toast.success(res.data.message);
      navigate("/applied-jobs");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to submit application."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!job) {
    return (
      <div className="apply-loading">
        <h2>Loading Job...</h2>
      </div>
    );
  }

  return (
    <div className="apply-page">

      <div className="apply-card">

        <h1>
          Apply for <span>{job.title}</span>
        </h1>

        <div className="job-summary">

          <div className="summary-item">
            <FaBuilding />
            <div>
              <h4>Company</h4>
              <p>{job.company}</p>
            </div>
          </div>

          <div className="summary-item">
            <FaMapMarkerAlt />
            <div>
              <h4>Location</h4>
              <p>{job.location}</p>
            </div>
          </div>

          <div className="summary-item">
            <FaMoneyBillWave />
            <div>
              <h4>Salary</h4>
              <p>{job.salary}</p>
            </div>
          </div>

          <div className="summary-item">
            <FaBriefcase />
            <div>
              <h4>Experience</h4>
              <p>{job.experience}</p>
            </div>
          </div>

        </div>

        <div className="job-description-box">

          <h3>Job Description</h3>

          <p>{job.description}</p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="apply-form"
        >

          <div className="form-group">

            <label>
              <FaFileUpload />
              Upload Resume
            </label>

            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={(e) =>
                setResume(e.target.files[0])
              }
            />

          </div>

          <div className="form-group">

            <label>Cover Letter</label>

            <textarea
              rows="7"
              value={coverLetter}
              onChange={(e) =>
                setCoverLetter(e.target.value)
              }
              placeholder="Tell the recruiter why you're a good fit for this position..."
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="submit-btn"
          >
            {loading
              ? "Submitting..."
              : "Submit Application"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default ApplyJob;