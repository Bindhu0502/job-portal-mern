import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../api/api";
import Loader from "../components/common/Loader";

import ApplicantSearch from "../components/admin/ApplicantSearch";
import ApplicantsTable from "../components/admin/ApplicantsTable";

import "../styles/applicants.css";

function AdminApplicants() {
  const { jobId } = useParams();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchApplicants();
  }, [jobId]);

  const fetchApplicants = async () => {
    try {
      setLoading(true);

      const { data } = await api.get(
        `/applications/job/${jobId}`
      );

      if (data.success) {
        setApplications(data.applications || []);
      }
    } catch (error) {
      console.error(error);

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
      const { data } = await api.put(
        `/applications/${id}/status`,
        {
          status,
        }
      );

      toast.success(data.message);

      setApplications((prev) =>
        prev.map((app) =>
          app._id === id
            ? { ...app, status }
            : app
        )
      );
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Unable to update status"
      );
    }
  };

  const filteredApplications = useMemo(() => {
    if (!search.trim()) return applications;

    const keyword = search.toLowerCase();

    return applications.filter((app) => {
      const name =
        app.user?.name?.toLowerCase() || "";

      const email =
        app.user?.email?.toLowerCase() || "";

      return (
        name.includes(keyword) ||
        email.includes(keyword)
      );
    });
  }, [applications, search]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="admin-applicants-page">

      <div className="page-header">
        <h2>Applicants</h2>
        <p>
          Manage candidates who applied for this
          job.
        </p>
      </div>

      <ApplicantSearch
        search={search}
        setSearch={setSearch}
      />

      {filteredApplications.length === 0 ? (
        <div className="empty-state">
          <h3>No Applicants Found</h3>

          <p>
            There are no candidates matching your
            search.
          </p>
        </div>
      ) : (
        <ApplicantsTable
          applications={filteredApplications}
          updateStatus={updateStatus}
        />
      )}
    </div>
  );
}

export default AdminApplicants;