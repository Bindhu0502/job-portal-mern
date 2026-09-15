import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function SuccessModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="success-overlay">
      <div className="success-modal">

        <FaCheckCircle className="success-icon" />

        <h2>Application Submitted!</h2>

        <p>
          Your application has been submitted successfully.
          We wish you the best of luck!
        </p>

        <div className="success-buttons">

          <button
            className="primary-btn"
            onClick={() => navigate("/applied-jobs")}
          >
            View Applications
          </button>

          <button
            className="secondary-btn"
            onClick={() => navigate("/")}
          >
            Go Home
          </button>

        </div>

      </div>
    </div>
  );
}

export default SuccessModal;