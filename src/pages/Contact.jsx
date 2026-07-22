function Contact() {
  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        padding: "30px",
        boxShadow: "0 0 10px rgba(0,0,0,.2)",
        borderRadius: "10px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        Contact Us
      </h1>

      <p>
        📧 Email :
        support@jobportal.com
      </p>

      <p>
        📞 Phone :
        +91 9876543210
      </p>

      <p>
        📍 Address :
        Hyderabad, Telangana, India
      </p>

      <hr />

      <h3>Working Hours</h3>

      <p>
        Monday - Friday :
        9:00 AM - 6:00 PM
      </p>

      <p>
        Saturday :
        10:00 AM - 2:00 PM
      </p>

      <p>
        Sunday :
        Closed
      </p>
    </div>
  );
}

export default Contact;