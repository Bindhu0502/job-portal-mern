import JobRow from "./JobRow";

function JobTable({ jobs, deleteJob }) {
  return (
    <div className="job-table-wrapper">

      <div className="table-title">
        <h3>
          Total Jobs ({jobs.length})
        </h3>
      </div>

      <div className="job-table-container">

        <table className="job-table">

          <thead>
            <tr>
              <th>Job Title</th>
              <th>Company</th>
              <th>Location</th>
              <th>Salary</th>
              <th>Experience</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {jobs.map((job) => (
              <JobRow
                key={job._id}
                job={job}
                deleteJob={deleteJob}
              />
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}

export default JobTable;