import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";
import "../../styles/home/featuredJobs.css";

function FeaturedJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchFeaturedJobs();
  }, []);

  const fetchFeaturedJobs = async () => {
    try {
      const response = await api.get("/jobs");

      // Display the first 6 jobs as featured
      const featured = (response.data.jobs || []).slice(0, 6);

      setJobs(featured);
    } catch (error) {
      console.error("Error fetching featured jobs:", error);
    }
  };

  return (
    <section className="featured-jobs">
      <div className="container">
        <div className="featured-header">
          <h2>Featured Jobs</h2>

          <p>
            Discover exciting career opportunities from top companies across
            India.
          </p>
        </div>

        <div className="featured-grid">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div className="featured-card" key={job._id}>
                <div className="card-top">
                  <div className="company-logo">
                    <img
                      src={
                        job.companyLogo ||
                        "https://cdn-icons-png.flaticon.com/512/732/732221.png"
                      }
                      alt={job.company}
                    />
                  </div>

                  <button className="save-btn">❤️</button>
                </div>

                <h3 className="job-title">{job.title}</h3>

                <p className="company-name">{job.company}</p>

                <div className="job-tags">
                  <span className="job-tag">
                    {job.type || "Full Time"}
                  </span>

                  <span className="job-tag">
                    {job.category || "IT"}
                  </span>
                </div>

                <div className="job-info">
                  <span>📍 {job.location}</span>

                  <span>
                    💼 {job.experience || "Fresher"}
                  </span>
                </div>

                <div className="card-footer">
                  <span className="salary">
                    {job.salary}
                  </span>

                  <Link to={`/jobs/${job._id}`}>
                    <button className="apply-btn">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="no-featured-jobs">
              <h3>No Featured Jobs Available</h3>

              <p>Please check back later.</p>
            </div>
          )}
        </div>

        <div className="featured-view-all">
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

export default FeaturedJobs;