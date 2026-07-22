import { useParams, Link } from "react-router-dom";
import companies from "../data/companies";

function CompanyDetails() {
  const { id } = useParams();

  const company = companies.find((item) => item.id === id);

  if (!company) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        Company Not Found
      </h2>
    );
  }

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 0 10px rgba(0,0,0,0.2)",
      }}
    >
      <h1>{company.name}</h1>

      <h3>📍 {company.location}</h3>

      <h3>💼 {company.jobs} Open Jobs</h3>

      <p style={{ marginTop: "20px", lineHeight: "1.8" }}>
        {company.description}
      </p>

      <br />

      <a
        href={company.website}
        target="_blank"
        rel="noreferrer"
      >
        Visit Official Website
      </a>

      <br />
      <br />

      <Link to="/jobs">
        <button
          style={{
            padding: "12px 20px",
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Browse Jobs
        </button>
      </Link>
    </div>
  );
}

export default CompanyDetails;