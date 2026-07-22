import { Link } from "react-router-dom";

const companies = [
  {
    id: 1,
    name: "Infosys",
    location: "Hyderabad",
    jobs: 120,
  },
  {
    id: 2,
    name: "TCS",
    location: "Bangalore",
    jobs: 98,
  },
  {
    id: 3,
    name: "Wipro",
    location: "Chennai",
    jobs: 76,
  },
];

function Companies() {
  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "1200px",
        margin: "auto",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        🏢 Companies
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(280px,1fr))",
          gap: "20px",
        }}
      >
        {companies.map((company) => (
          <Link
            key={company.id}
            to={`/companies/${company.id}`}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div
              style={{
                border: "1px solid #ddd",
                padding: "20px",
                borderRadius: "10px",
                cursor: "pointer",
                transition: "0.3s",
              }}
            >
              <h2>{company.name}</h2>

              <p>📍 {company.location}</p>

              <p>💼 {company.jobs} Open Jobs</p>

              <button
                style={{
                  marginTop: "10px",
                  padding: "8px 15px",
                  cursor: "pointer",
                }}
              >
                View Details
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Companies;