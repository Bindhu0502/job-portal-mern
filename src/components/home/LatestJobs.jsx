import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";
import "../../styles/home/latestJobs.css";

function LatestJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchLatestJobs();
  }, []);

  const fetchLatestJobs = async () => {
    try {
      const response = await api.get("/jobs");

      const latest = (response.data.jobs || [])
        .slice()
        .reverse()
        .slice(0, 6);

      setJobs(latest);
    } catch (error) {
      console.error("Error fetching latest jobs:", error);
    }
  };

  return (
    <section className="latest-jobs">
      <div className="container">
        <div className="latest-header">
          <h2>Latest Job Openings</h2>

          <p>
            Discover the newest opportunities from top companies and apply for
            your dream career.
          </p>
        </div>

        <div className="latest-grid">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div className="latest-card" key={job._id}>
                <div className="latest-company">
                  <img
                    src={
                      job.companyLogo ||
                      "https://cdn-icons-png.flaticon.com/512/732/732221.png"
                    }
                    alt={job.company}
                  />

                  <div>
                    <h3>{job.title}</h3>
                    <p>{job.company}</p>
                  </div>
                </div>

                <div className="latest-tags">
                  <span className="latest-tag">
                    {job.type || "Full Time"}
                  </span>

                  <span className="latest-tag">
                    {job.experience || "Fresher"}
                  </span>

                  <span className="latest-tag">
                    {job.category || "IT"}
                  </span>
                </div>

                <div className="latest-info">
                  <span>📍 {job.location}</span>

                  <span>💰 {job.salary}</span>
                </div>

                <div className="latest-footer">
                  <Link to={`/jobs/${job._id}`}>
                    <button className="secondary-btn">
                      View Details
                    </button>
                  </Link>

                  <Link to={`/apply/${job._id}`}>
                    <button className="latest-btn">
                      Apply Now
                    </button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="no-jobs">
              <h3>No Jobs Available</h3>

              <p>Please check back later for new job openings.</p>
            </div>
          )}
        </div>

        <div className="latest-view-all">
          <Link to="/jobs">
            <button className="primary-btn">
              View All Jobs
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default LatestJobs;