import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaBriefcase,
  FaTrash,
} from "react-icons/fa";

import api from "../api/api";
import Loader from "../components/common/Loader";
import { useAuth } from "../context/AuthContext";
import getCompanyLogo from "../utils/companyLogos";

import "../styles/savedJobs.css";

function SavedJobs() {
  const { user } = useAuth();

  const [jobs, setJobs] = useState([]);
  const [appliedJobIds, setAppliedJobIds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadData();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadData = async () => {
    setLoading(true);

    try {
      await Promise.all([
        fetchSavedJobs(),
        fetchAppliedJobs(),
      ]);
    } finally {
      setLoading(false);
    }
  };

  const fetchSavedJobs = async () => {
    try {
      const { data } = await api.get(
        `/saved-jobs/${user._id}`
      );

      setJobs(data.jobs || []);
    } catch (error) {
      console.log(error);
      toast.error("Unable to load saved jobs");
    }
  };

  const fetchAppliedJobs = async () => {
    try {
      const { data } = await api.get(
        "/applications/my"
      );

      if (data.success) {
        const ids = data.applications
          .map((application) => application.job?._id)
          .filter(Boolean);

        setAppliedJobIds(ids);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeJob = async (savedJobId) => {
    try {
      await api.delete(`/saved-jobs/${savedJobId}`);

      setJobs((prev) =>
        prev.filter((job) => job._id !== savedJobId)
      );

      toast.success(
        "Job removed from saved jobs"
      );
    } catch (error) {
      console.log(error);
      toast.error("Unable to remove job");
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="saved-jobs-page">
      <div className="saved-header">
        <h1>❤️ Saved Jobs</h1>

        <p>
          {jobs.length} Job
          {jobs.length !== 1 ? "s" : ""} Saved
        </p>
      </div>

      {jobs.length === 0 ? (
        <div className="empty-saved">
          <h2>No Saved Jobs</h2>

          <p>
            Save jobs to view them here later.
          </p>

          <Link to="/jobs">
            <button className="browse-btn">
              Browse Jobs
            </button>
          </Link>
        </div>
      ) : (
        <div className="saved-jobs-list">
          {jobs.map((item) => {
            const isApplied =
              appliedJobIds.includes(
                item.jobId._id
              );

            return (
              <div
                className="saved-job-card"
                key={item._id}
              >
                <div className="saved-job-top">

                  <img
                    src={getCompanyLogo(
                      item.jobId.company
                    )}
                    alt={item.jobId.company}
                    className="saved-company-logo"
                  />

                  <div className="saved-job-info">
                    <h2>
                      {item.jobId.title}
                    </h2>

                    <h3>
                      {item.jobId.company}
                    </h3>

                    <div className="saved-meta">

                      <span>
                        <FaMapMarkerAlt />
                        {item.jobId.location}
                      </span>

                      <span>
                        <FaMoneyBillWave />
                        {item.jobId.salary}
                      </span>

                      <span>
                        <FaBriefcase />
                        {item.jobId.experience ||
                          "Fresher"}
                      </span>

                    </div>
                  </div>

                </div>

                <div className="saved-actions">

                  <Link
                    to={`/jobs/${item.jobId._id}`}
                  >
                    <button className="view-btn">
                      View Details
                    </button>
                  </Link>

                  {isApplied ? (
                    <button
                      className="applied-btn"
                      disabled
                    >
                      ✅ Applied
                    </button>
                  ) : (
                    <Link
                      to={`/apply/${item.jobId._id}`}
                    >
                      <button className="apply-btn">
                        Apply Now
                      </button>
                    </Link>
                  )}

                  <button
                    className="remove-btn"
                    onClick={() =>
                      removeJob(item._id)
                    }
                  >
                    <FaTrash />
                    Remove
                  </button>

                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SavedJobs;