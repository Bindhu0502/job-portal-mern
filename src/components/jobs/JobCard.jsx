import React from "react";
import { Link } from "react-router-dom";
import {
  FaBookmark,
  FaMapMarkerAlt,
  FaBriefcase,
  FaMoneyBillWave,
  FaClock,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";

import { getCompanyLogo } from "../../utils/companyLogos";
import "./jobCard.css";

const JobCard = ({ job }) => {
  return (
    <div className="job-card">
      {/* Bookmark */}

      <button className="bookmark-btn">
        <FaBookmark />
      </button>

      {/* Company */}

      <div className="job-company">

        <div className="job-logo">
          <img
            src={getCompanyLogo(job.company)}
            alt={job.company}
          />
        </div>

        <div>

          <h4>{job.company}</h4>

          <span className="verified">
            <FaCheckCircle />
            Verified Company
          </span>

        </div>

      </div>

      {/* Title */}

      <h2 className="job-title">
        {job.title}
      </h2>

      {/* Details */}

      <div className="job-details">

        <div>
          <FaMapMarkerAlt />
          <span>{job.location}</span>
        </div>

        <div>
          <FaBriefcase />
          <span>{job.jobType}</span>
        </div>

        <div>
          <FaMoneyBillWave />
          <span>{job.salary}</span>
        </div>

        <div>
          <FaClock />
          <span>{job.experience}</span>
        </div>

      </div>

      {/* Tags */}

      <div className="job-tags">

        <span className="tag blue">
          {job.jobType}
        </span>

        <span className="tag green">
          Hiring
        </span>

      </div>

      {/* Footer */}

      <div className="job-footer">

        <span className="posted">
          Posted Recently
        </span>

        <Link
          to={`/jobs/${job._id}`}
          className="details-btn"
        >
          View Details
          <FaArrowRight />
        </Link>

      </div>

    </div>
  );
};

export default JobCard;