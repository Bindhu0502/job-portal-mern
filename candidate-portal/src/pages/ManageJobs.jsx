import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

const ManageJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await api.get("/jobs");
      setJobs(res.data.jobs || []);
    } catch (err) {
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
      await api.delete(`/jobs/${id}`);

      toast.success("Job deleted successfully");

      setJobs((prev) => prev.filter((job) => job._id !== id));
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to delete job"
      );
    }
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-xl">
        Loading Jobs...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          Manage Jobs
        </h1>

        <Link
          to="/create-job"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
        >
          + Create Job
        </Link>
      </div>

      {jobs.length === 0 ? (
        <div className="bg-white p-10 rounded-xl shadow text-center">
          <h2 className="text-2xl font-semibold">
            No Jobs Found
          </h2>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow">

          <table className="min-w-full">

            <thead className="bg-gray-200">

              <tr>

                <th className="p-4 text-left">Title</th>

                <th className="p-4 text-left">Company</th>

                <th className="p-4 text-left">Location</th>

                <th className="p-4 text-left">Salary</th>

                <th className="p-4 text-left">Type</th>

                <th className="p-4 text-left">Actions</th>

              </tr>

            </thead>

            <tbody>

              {jobs.map((job) => (

                <tr
                  key={job._id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-4">
                    {job.title}
                  </td>

                  <td className="p-4">
                    {job.company}
                  </td>

                  <td className="p-4">
                    {job.location}
                  </td>

                  <td className="p-4">
                    ₹{job.salary}
                  </td>

                  <td className="p-4">
                    {job.jobType}
                  </td>

                  <td className="p-4 flex gap-3">

                    <Link
                      to={`/edit-job/${job._id}`}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => deleteJob(job._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>

                    <Link
                      to={`/applications/${job._id}`}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                    >
                      Applicants
                    </Link>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
};

export default ManageJobs;