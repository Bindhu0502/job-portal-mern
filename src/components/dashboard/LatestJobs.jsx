import { Link } from "react-router-dom";

function LatestJobs({ jobs }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-5">
        Latest Jobs
      </h2>

      {jobs?.length === 0 ? (
        <p className="text-gray-500">
          No jobs available.
        </p>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="border rounded-lg p-4 hover:bg-gray-50"
            >
              <h3 className="font-semibold text-lg">
                {job.title}
              </h3>

              <p className="text-gray-600">
                {job.company}
              </p>

              <p className="text-gray-500">
                {job.location}
              </p>

              <Link
                to={`/jobs/${job._id}`}
                className="inline-block mt-3 text-blue-600 hover:underline"
              >
                View Details →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LatestJobs;