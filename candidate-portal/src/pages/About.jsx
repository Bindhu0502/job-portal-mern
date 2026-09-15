function About() {
  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <h1 style={{ textAlign: "center" }}>
        About Job Portal
      </h1>

      <p
        style={{
          marginTop: "30px",
          lineHeight: "30px",
          fontSize: "18px",
        }}
      >
        Job Portal is a MERN Stack web application
        developed to help job seekers find jobs and
        apply online.

        Users can register, login, browse jobs,
        apply for jobs, and manage their profiles.

        Recruiters and administrators can post jobs,
        manage applications, and monitor hiring
        activities.

        This project is built using React.js,
        Node.js, Express.js and MongoDB.
      </p>
    </div>
  );
}

export default About;