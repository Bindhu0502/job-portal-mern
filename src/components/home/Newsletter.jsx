function Newsletter() {
  return (
    <section
      style={{
        backgroundColor: "#1e293b",
        color: "white",
        textAlign: "center",
        padding: "60px 20px",
        marginTop: "40px",
      }}
    >
      <h2>Stay Updated</h2>

      <p>Subscribe to receive the latest job updates.</p>

      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <input
          type="email"
          placeholder="Enter your email"
          style={{
            padding: "12px",
            width: "300px",
            borderRadius: "5px",
            border: "none",
          }}
        />

        <button
          style={{
            padding: "12px 20px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Subscribe
        </button>
      </div>
    </section>
  );
}

export default Newsletter;