function JobCategories() {

  const categories = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Java Developer",
    "Python Developer",
    "Data Analyst",
    "Power BI Developer",
    "UI/UX Designer"
  ];

  return (
    <div
      style={{
        textAlign: "center",
        padding: "60px",
      }}
    >
      <h2>Popular Job Categories</h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {categories.map((category, index) => (
          <div
            key={index}
            style={{
              border: "1px solid gray",
              padding: "20px",
              borderRadius: "10px",
              width: "220px",
            }}
          >
            <h3>{category}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JobCategories;