function Statistics() {

  const stats = [
    {
      number: "10,000+",
      title: "Jobs Available",
    },

    {
      number: "500+",
      title: "Companies",
    },

    {
      number: "25,000+",
      title: "Candidates",
    },

    {
      number: "5,000+",
      title: "Placements",
    },
  ];

  return (
    <section
      style={{
        padding: "70px",
        textAlign: "center",
      }}
    >
      <h2>Our Achievements</h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          flexWrap: "wrap",
          marginTop: "40px",
        }}
      >
        {stats.map((item, index) => (
          <div
            key={index}
            style={{
              width: "220px",
              padding: "30px",
              border: "1px solid gray",
              borderRadius: "12px",
            }}
          >
            <h1
              style={{
                color: "#2563eb",
              }}
            >
              {item.number}
            </h1>

            <h3>{item.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Statistics;