import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaBriefcase,
} from "react-icons/fa";
import "./searchBar.css";

const SearchBar = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (search) params.append("search", search);
    if (location) params.append("location", location);
    if (jobType) params.append("jobType", jobType);

    navigate(`/jobs?${params.toString()}`);
  };

  return (
    <section className="search-section">
      <div className="search-container">

        {/* Job Title */}

        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Job title or keyword"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Location */}

        <div className="search-box">
          <FaMapMarkerAlt className="search-icon" />

          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">All Locations</option>
            <option>Hyderabad</option>
            <option>Bangalore</option>
            <option>Chennai</option>
            <option>Pune</option>
            <option>Mumbai</option>
            <option>Delhi</option>
            <option>Remote</option>
          </select>
        </div>

        {/* Job Type */}

        <div className="search-box">
          <FaBriefcase className="search-icon" />

          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
          >
            <option value="">Job Type</option>
            <option>Full Time</option>
            <option>Part Time</option>
            <option>Internship</option>
            <option>Remote</option>
            <option>Contract</option>
          </select>
        </div>

        {/* Search Button */}

        <button
          className="search-btn"
          onClick={handleSearch}
        >
          Search Jobs
        </button>

      </div>
    </section>
  );
};

export default SearchBar;