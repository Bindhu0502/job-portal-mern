import { Link } from "react-router-dom";

function RecentApplications({ applications }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-5">
        Recent Applications
      </h2>

      {applications?.length === 0 ? (
        <p className="text-gray-500">
          No applications yet.
        </p>
      ) : (
        <div className="space-y-4">
          {applications.map((application) => (
            <div
              key={application._id}
              className="border rounded-lg p-4 hover:bg-gray-50"
            >
              <h3 className="font-semibold text-lg">
                {application.job?.title}
              </h3>

              <p className="text-gray-600">
                {application.job?.company}
              </p>

              <p className="text-sm text-blue-600 mt-1">
                Status: {application.status}
              </p>

              <Link
                to={`/jobs/${application.job?._id}`}
                className="inline-block mt-3 text-blue-600 hover:underline"
              >
                View Job →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecentApplications;