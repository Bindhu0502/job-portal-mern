import "../../styles/home/jobStats.css";

function JobStats() {
  const stats = [
    {
      number: "10,000+",
      title: "Job Seekers",
      icon: "👨‍💼",
    },
    {
      number: "2,500+",
      title: "Active Jobs",
      icon: "💼",
    },
    {
      number: "500+",
      title: "Companies",
      icon: "🏢",
    },
    {
      number: "8,000+",
      title: "Successful Placements",
      icon: "🎯",
    },
  ];

  return (
    <section className="job-stats">
      <div className="container">

        <div className="stats-header">
          <h2>Trusted by Thousands</h2>

          <p>
            Join thousands of job seekers and companies who trust our platform
            every day.
          </p>
        </div>

        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div className="stat-card" key={index}>

              <div className="stat-icon">
                {stat.icon}
              </div>

              <h3>{stat.number}</h3>

              <p>{stat.title}</p>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default JobStats;