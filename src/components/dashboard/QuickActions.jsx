import { Link } from "react-router-dom";
import {
  FaRocket,
  FaBriefcase,
  FaHeart,
  FaFileAlt,
  FaUser,
  FaBuilding,
  FaPhoneAlt,
} from "react-icons/fa";

function QuickActions() {
  return (
    <div
      style={{
        marginTop: "50px",
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          color: "#1e293b",
        }}
      >
        <FaRocket color="#2563eb" />
        Quick Actions
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "20px",
        }}
      >
        <Link to="/jobs" style={{ textDecoration: "none" }}>
          <button style={buttonStyle}>
            <FaBriefcase />
            Browse Jobs
          </button>
        </Link>

        <Link to="/saved-jobs" style={{ textDecoration: "none" }}>
          <button style={buttonStyle}>
            <FaHeart />
            Saved Jobs
          </button>
        </Link>

        <Link to="/applied-jobs" style={{ textDecoration: "none" }}>
          <button style={buttonStyle}>
            <FaFileAlt />
            Applied Jobs
          </button>
        </Link>

        <Link to="/profile" style={{ textDecoration: "none" }}>
          <button style={buttonStyle}>
            <FaUser />
            My Profile
          </button>
        </Link>

        <Link to="/companies" style={{ textDecoration: "none" }}>
          <button style={buttonStyle}>
            <FaBuilding />
            Companies
          </button>
        </Link>

        <Link to="/contact" style={{ textDecoration: "none" }}>
          <button style={buttonStyle}>
            <FaPhoneAlt />
            Contact
          </button>
        </Link>
      </div>
    </div>
  );
}

const buttonStyle = {
  width: "100%",
  padding: "15px",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontSize: "15px",
  fontWeight: "600",
  background: "#2563eb",
  color: "#ffffff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "10px",
  transition: "all 0.3s ease",
};

export default QuickActions;