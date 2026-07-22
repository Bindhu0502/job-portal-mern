import React from "react";
import { Link } from "react-router-dom";
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaBriefcase,
  FaArrowRight,
} from "react-icons/fa";

import "./featuredCompanies.css";

const companies = [
  {
    id: 1,
    name: "Google",
    location: "Hyderabad",
    jobs: 145,
    logo:
      "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  },
  {
    id: 2,
    name: "Microsoft",
    location: "Bangalore",
    jobs: 98,
    logo:
      "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  },
  {
    id: 3,
    name: "Amazon",
    location: "Hyderabad",
    jobs: 172,
    logo:
      "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  },
  {
    id: 4,
    name: "Infosys",
    location: "Pune",
    jobs: 82,
    logo:
      "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg",
  },
  {
    id: 5,
    name: "TCS",
    location: "Chennai",
    jobs: 136,
    logo:
      "https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg",
  },
  {
    id: 6,
    name: "Accenture",
    location: "Bangalore",
    jobs: 104,
    logo:
      "https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg",
  },
];

const FeaturedCompanies = () => {
  return (
    <section className="featured-companies">

      <div className="section-header">

        <span>TOP EMPLOYERS</span>

        <h2>Featured Companies</h2>

        <p>
          Explore opportunities from India's leading companies hiring now.
        </p>

      </div>

      <div className="companies-grid">

        {companies.map((company) => (

          <div className="company-card" key={company.id}>

            <div className="company-logo">

              <img src={company.logo} alt={company.name} />

            </div>

            <h3>{company.name}</h3>

            <div className="company-info">

              <p>
                <FaMapMarkerAlt />
                {company.location}
              </p>

              <p>
                <FaBriefcase />
                {company.jobs} Open Jobs
              </p>

            </div>

            <Link
              to="/jobs"
              className="company-btn"
            >
              View Jobs
              <FaArrowRight />
            </Link>

          </div>

        ))}

      </div>

    </section>
  );
};

export default FeaturedCompanies;