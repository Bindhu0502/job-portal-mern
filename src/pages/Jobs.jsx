import { useEffect, useState } from "react";
import api from "../api/api";
import JobFilter from "../components/jobs/JobFilter";
import JobList from "../components/jobs/JobList";
import Loader from "../components/common/Loader";
import "../styles/jobs.css";

function Jobs() {
  const [loading, setLoading] = useState(true);

  const [jobs, setJobs] = useState([]);

  const [appliedJobIds, setAppliedJobIds] = useState([]);

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [experience, setExperience] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);

    try {
      await Promise.all([
        fetchJobs(),
        fetchAppliedJobs(),
      ]);
    } finally {
      setLoading(false);
    }
  };

  // ===========================
  // Fetch Jobs
  // ===========================

  const fetchJobs = async () => {
    try {
      const { data } = await api.get("/jobs");

      if (data.success) {
        setJobs(data.jobs || []);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // ===========================
  // Fetch Applied Jobs
  // ===========================

  const fetchAppliedJobs = async () => {
    try {
      const { data } = await api.get("/applications/my");

      if (data.success) {
        const ids = data.applications
          .map((application) => application.job?._id)
          .filter(Boolean);

        setAppliedJobIds(ids);
      }
    } catch (error) {
      // Ignore for guests
      console.log(error);
    }
  };

  // ===========================
  // Filter Jobs
  // ===========================

  const filteredJobs = jobs.filter((job) => {
    return (
      job.title
        .toLowerCase()
        .includes(search.toLowerCase()) &&
      (location === "" ||
        job.location === location) &&
      (jobType === "" ||
        job.type === jobType) &&
      (experience === "" ||
        job.experience === experience)
    );
  });

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="jobs-page">

      <div className="container">

        <div className="jobs-header">
          <h1>Find Your Dream Job</h1>

          <p>
            Browse thousands of opportunities from
            top companies.
          </p>
        </div>

        <JobFilter
          search={search}
          setSearch={setSearch}
          location={location}
          setLocation={setLocation}
          jobType={jobType}
          setJobType={setJobType}
          experience={experience}
          setExperience={setExperience}
          clearFilters={() => {
            setSearch("");
            setLocation("");
            setJobType("");
            setExperience("");
          }}
        />

        <h2 className="jobs-count">
          {filteredJobs.length} Job
          {filteredJobs.length !== 1 ? "s" : ""} Found
        </h2>

        <JobList
          jobs={filteredJobs}
          appliedJobIds={appliedJobIds}
        />

      </div>

    </div>
  );
}

export default Jobs;