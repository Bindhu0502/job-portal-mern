import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

import api from "../api/api";
import Loader from "../components/common/Loader";

import ManageJobsHeader from "../components/admin/ManageJobsHeader";
import SearchBar from "../components/admin/SearchBar";
import JobTable from "../components/admin/JobTable";
import EmptyState from "../components/admin/EmptyState";

import "../styles/manageJobs.css";

function ManageJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);

      const { data } = await api.get("/jobs");

      if (data.success) {
        setJobs(data.jobs || []);
      } else {
        toast.error("Failed to load jobs");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load jobs");
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
      const { data } = await api.delete(`/jobs/${id}`);

      toast.success(data.message);

      setJobs((prev) =>
        prev.filter((job) => job._id !== id)
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete job"
      );
    }
  };

  const filteredJobs = useMemo(() => {
    if (!search.trim()) return jobs;

    const keyword = search.toLowerCase();

    return jobs.filter((job) => {
      return (
        job.title?.toLowerCase().includes(keyword) ||
        job.company?.toLowerCase().includes(keyword) ||
        job.location?.toLowerCase().includes(keyword)
      );
    });
  }, [jobs, search]);

  if (loading) return <Loader />;

  return (
    <div className="manage-jobs-page">

      <ManageJobsHeader />

      <SearchBar
        search={search}
        setSearch={setSearch}
      />

      {filteredJobs.length ? (
        <JobTable
          jobs={filteredJobs}
          deleteJob={deleteJob}
        />
      ) : (
        <EmptyState />
      )}

    </div>
  );
}

export default ManageJobs;