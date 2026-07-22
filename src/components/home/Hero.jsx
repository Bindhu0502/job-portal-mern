import React from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaBriefcase,
  FaBuilding,
  FaUsers,
  FaSearch,
} from "react-icons/fa";
import "./hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-container">

        {/* Left Content */}
        <div className="hero-left">

          <span className="hero-badge">
            🚀 #1 Job Portal for Freshers & Professionals
          </span>

          <h1>
            Find Your
            <span> Dream Job </span>
            Faster Than Ever
          </h1>

          <p>
            Explore thousands of verified opportunities from India's leading
            companies. Build your career with confidence and land your next job
            effortlessly.
          </p>

          <div className="hero-buttons">
            <Link to="/jobs" className="primary-btn">
              Browse Jobs
              <FaArrowRight />
            </Link>

            <Link to="/register" className="secondary-btn">
              Create Account
            </Link>
          </div>

          {/* Statistics */}

          <div className="hero-stats">

            <div className="stat-card">
              <FaBriefcase className="stat-icon" />
              <div>
                <h3>25K+</h3>
                <p>Live Jobs</p>
              </div>
            </div>

            <div className="stat-card">
              <FaBuilding className="stat-icon" />
              <div>
                <h3>800+</h3>
                <p>Companies</p>
              </div>
            </div>

            <div className="stat-card">
              <FaUsers className="stat-icon" />
              <div>
                <h3>120K+</h3>
                <p>Candidates</p>
              </div>
            </div>

          </div>

        </div>

        {/* Right Section */}

        <div className="hero-right">

          <div className="hero-image-card">

            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900"
              alt="Job Portal"
            />

            <div className="floating-card floating-one">
              <FaSearch />
              <span>Software Engineer</span>
            </div>

            <div className="floating-card floating-two">
              <FaBriefcase />
              <span>15,000+ Jobs Today</span>
            </div>

            <div className="floating-card floating-three">
              <FaBuilding />
              <span>Top MNC Hiring</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default Hero;