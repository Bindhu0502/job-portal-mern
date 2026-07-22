import {
  FaSearch,
  FaMapMarkerAlt,
  FaBriefcase,
  FaUserGraduate,
  FaFilter,
} from "react-icons/fa";

function JobFilter({
  search,
  setSearch,
  location,
  setLocation,
  jobType,
  setJobType,
  experience,
  setExperience,
  clearFilters,
}) {
  return (
    <div className="job-filter">

      <div className="filter-title">
        <FaFilter />
        <span>Filter Jobs</span>
      </div>

      <div className="filter-grid">

        {/* Search */}

        <div className="filter-group">

          <FaSearch className="filter-icon" />

          <input
            type="text"
            placeholder="Search by job title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        {/* Location */}

        <div className="filter-group">

          <FaMapMarkerAlt className="filter-icon" />

          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">All Locations</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Chennai">Chennai</option>
            <option value="Pune">Pune</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Delhi">Delhi</option>
          </select>

        </div>

        {/* Job Type */}

        <div className="filter-group">

          <FaBriefcase className="filter-icon" />

          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
            <option value="Internship">Internship</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
          </select>

        </div>

        {/* Experience */}

        <div className="filter-group">

          <FaUserGraduate className="filter-icon" />

          <select
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          >
            <option value="">All Experience</option>
            <option value="Fresher">Fresher</option>
            <option value="1 Year">1 Year</option>
            <option value="2 Years">2 Years</option>
            <option value="3 Years">3 Years</option>
            <option value="5+ Years">5+ Years</option>
          </select>

        </div>

        {/* Clear */}

        <button
          className="clear-filter-btn"
          onClick={clearFilters}
        >
          Clear Filters
        </button>

      </div>

    </div>
  );
}

export default JobFilter;