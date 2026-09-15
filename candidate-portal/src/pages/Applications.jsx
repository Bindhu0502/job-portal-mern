import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await api.get("/applications/my");
      setApplications(res.data.applications || []);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <h2 className="text-2xl font-semibold text-blue-600">
          Loading Applications...
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto px-6">

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            My Applications
          </h1>

          <Link
            to="/jobs"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Browse Jobs
          </Link>
        </div>

        {applications.length === 0 ? (
          <div className="bg-white rounded-xl shadow p-10 text-center">
            <h2 className="text-2xl font-semibold">
              No Applications Yet
            </h2>

            <p className="text-gray-500 mt-3">
              You haven't applied for any jobs yet.
            </p>

            <Link
              to="/jobs"
              className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
            >
              Apply Now
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {applications.map((application) => (
              <div
                key={application._id}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
              >
                <div className="flex justify-between items-center">

                  <div>
                    <h2 className="text-xl font-bold text-gray-800">
                      {application.job?.title || "Job Title"}
                    </h2>

                    <p className="text-gray-600 mt-1">
                      {application.job?.company?.name ||
                        "Company"}
                    </p>

                    <p className="text-gray-500 mt-1">
                      {application.job?.location}
                    </p>
                  </div>

                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold
                      ${
                        application.status === "Accepted"
                          ? "bg-green-100 text-green-700"
                          : application.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                  >
                    {application.status || "Pending"}
                  </span>

                </div>

                <hr className="my-5" />

                <div className="flex justify-between text-sm text-gray-500">

                  <span>
                    Applied On:
                    {" "}
                    {new Date(
                      application.createdAt
                    ).toLocaleDateString()}
                  </span>

                  {application.resume && (
                    <a
                      href={`http://localhost:5000/${application.resume}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View Resume
                    </a>
                  )}

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Applications;