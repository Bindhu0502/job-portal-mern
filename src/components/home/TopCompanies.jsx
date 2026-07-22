function TopCompanies() {
  const companies = [
    {
      name: "Microsoft",
      jobs: "120 Jobs",
      location: "Hyderabad"
    },
    {
      name: "Google",
      jobs: "95 Jobs",
      location: "Bangalore"
    },
    {
      name: "Amazon",
      jobs: "150 Jobs",
      location: "Chennai"
    },
    {
      name: "Infosys",
      jobs: "200 Jobs",
      location: "Pune"
    }
  ];

  return (
    <section
      style={{
        padding: "60px",
        textAlign: "center"
      }}
    >
      <h2>Top Companies Hiring</h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "30px"
        }}
      >
        {companies.map((company, index) => (
          <div
            key={index}
            style={{
              width: "220px",
              padding: "20px",
              border: "1px solid gray",
              borderRadius: "10px"
            }}
          >
            <h3>{company.name}</h3>

            <p>{company.jobs}</p>

            <p>{company.location}</p>

            <button>View Jobs</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default TopCompanies;