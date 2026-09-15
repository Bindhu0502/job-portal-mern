import { Link } from "react-router-dom";

function SimilarJobs({ jobs }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold mb-5">
        Similar Jobs
      </h2>

      <div className="space-y-4">
        {jobs.slice(0, 5).map((job) => (
          <Link
            key={job._id}
            to={`/jobs/${job._id}`}
            className="block border rounded-lg p-4 hover:bg-gray-50"
          >
            <h3 className="font-semibold">
              {job.title}
            </h3>

            <p className="text-gray-500">
              {job.companyName}
            </p>

            <p className="text-sm text-blue-600">
              {job.location}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SimilarJobs;