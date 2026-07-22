import JobCard from "./JobCard";

function JobList({
  jobs,
  appliedJobIds,
}) {
  return (
    <div className="job-list">
      {jobs.map((job) => (
        <JobCard
          key={job._id}
          job={job}
          appliedJobIds={appliedJobIds}
        />
      ))}
    </div>
  );
}

export default JobList;