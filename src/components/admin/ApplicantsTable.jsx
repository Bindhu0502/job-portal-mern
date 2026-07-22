import ApplicantRow from "./ApplicantRow";

function ApplicantsTable({
  applications,
  updateStatus,
}) {
  if (!applications || applications.length === 0) {
    return (
      <div className="no-applicants">
        <h2>No Applicants Found</h2>
        <p>
          No candidates have applied for this job
          yet.
        </p>
      </div>
    );
  }

  return (
    <div className="applicants-table-wrapper">

      <div className="table-header">
        <h3>
          Applicants ({applications.length})
        </h3>
      </div>

      <div className="applicants-table-container">
        <table className="applicants-table">

          <thead>
            <tr>
              <th>Candidate</th>
              <th>Email</th>
              <th>Resume</th>
              <th>Status</th>
              <th>Applied On</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((application) => (
              <ApplicantRow
                key={application._id}
                application={application}
                updateStatus={updateStatus}
              />
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}

export default ApplicantsTable;