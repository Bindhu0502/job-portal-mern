import JobCard from "./JobCard";

function JobList({
  jobs,
  onSave,
  savingJobId,
}) {
  // ==========================================================
  // EMPTY CHECK
  // ==========================================================

  if (!jobs || jobs.length === 0) {
    return null;
  }

  // ==========================================================
  // JOB LIST
  // ==========================================================

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      {jobs.map((job) => (
        <JobCard
          key={job._id}
          job={job}
          onSave={onSave}
          savingJobId={savingJobId}
        />
      ))}

    </div>
  );
}

export default JobList;