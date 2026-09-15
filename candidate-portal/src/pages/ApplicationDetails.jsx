import { useParams, Link } from "react-router-dom";

function ApplicationDetails() {
  const { id } = useParams();

  const appliedJobs =
    JSON.parse(localStorage.getItem("appliedJobs")) || [];

  const application = appliedJobs.find(
    (job) => job.id === Number(id)
  );

  if (!application) {
    return (
      <h2
        style={{
          textAlign: "center",
          marginTop: "50px",
        }}
      >
        Application Not Found
      </h2>
    );
  }

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "30px",
        border: "1px solid #ddd",
        borderRadius: "10px",
      }}
    >
      <h1>{application.title}</h1>

      <hr />

      <p>
        <strong>Company :</strong>{" "}
        {application.company}
      </p>

      <p>
        <strong>Location :</strong>{" "}
        {application.location}
      </p>

      <p>
        <strong>Salary :</strong>{" "}
        {application.salary}
      </p>

      <p>
        <strong>Experience :</strong>{" "}
        {application.experience}
      </p>

      <p>
        <strong>Job Type :</strong>{" "}
        {application.type}
      </p>

      <p>
        <strong>Applicant :</strong>{" "}
        {application.applicantName}
      </p>

      <p>
        <strong>Email :</strong>{" "}
        {application.applicantEmail}
      </p>

      <p>
        <strong>Phone :</strong>{" "}
        {application.applicantPhone}
      </p>

      <p>
        <strong>Resume :</strong>{" "}
        {application.resume}
      </p>

      <p>
        <strong>Joining Date :</strong>{" "}
        {application.joiningDate}
      </p>

      <p>
        <strong>Applied Date :</strong>{" "}
        {application.appliedDate}
      </p>

      <p>
        <strong>Status :</strong>

        <span
          style={{
            color: "green",
            fontWeight: "bold",
          }}
        >
          {" "}
          {application.status}
        </span>
      </p>

      <h3>Cover Letter</h3>

      <p>{application.coverLetter}</p>

      <Link to="/applied-jobs">
        <button
          style={{
            marginTop: "25px",
            padding: "10px 20px",
            background: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Back
        </button>
      </Link>
    </div>
  );
}

export default ApplicationDetails;