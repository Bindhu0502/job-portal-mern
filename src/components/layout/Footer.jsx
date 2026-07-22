import { Link } from "react-router-dom";
import "../../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <h2>💼 Job Portal</h2>

      <p>Find your dream job with us.</p>

      <div className="footer-links">
        <Link to="/">Home</Link>

        <Link to="/jobs">Jobs</Link>

        <Link to="/companies">Companies</Link>

        <Link to="/about">About</Link>

        <Link to="/contact">Contact</Link>
      </div>

      <p
        style={{
          marginTop: "20px",
        }}
      >
        © 2026 Job Portal. All Rights Reserved.
      </p>
    </footer>
  );
}

export default Footer;