import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

import { Link } from "react-router-dom";
import "../../styles/home/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">

        <div className="footer-grid">

          {/* Company Info */}

          <div className="footer-column">

            <h2 className="footer-logo">
              Job<span>Portal</span>
            </h2>

            <p>
              Find your dream job with thousands of verified opportunities from
              top companies. Build your career with confidence.
            </p>

            <div className="footer-social">

              <a href="#">
                <FaFacebookF />
              </a>

              <a href="#">
                <FaTwitter />
              </a>

              <a href="#">
                <FaLinkedinIn />
              </a>

              <a href="#">
                <FaInstagram />
              </a>

            </div>

          </div>

          {/* Quick Links */}

          <div className="footer-column">

            <h3>Quick Links</h3>

            <ul>

              <li>
                <Link to="/">Home</Link>
              </li>

              <li>
                <Link to="/jobs">Jobs</Link>
              </li>

              <li>
                <Link to="/companies">Companies</Link>
              </li>

              <li>
                <Link to="/about">About</Link>
              </li>

              <li>
                <Link to="/contact">Contact</Link>
              </li>

            </ul>

          </div>

          {/* Job Categories */}

          <div className="footer-column">

            <h3>Popular Categories</h3>

            <ul>

              <li>Software Development</li>

              <li>Data Analytics</li>

              <li>UI / UX Design</li>

              <li>Cloud Computing</li>

              <li>Digital Marketing</li>

            </ul>

          </div>

          {/* Contact */}

          <div className="footer-column">

            <h3>Contact Us</h3>

            <p>
              <FaMapMarkerAlt className="footer-icon" />
              Hyderabad, Telangana
            </p>

            <p>
              <FaEnvelope className="footer-icon" />
              support@jobportal.com
            </p>

            <p>
              <FaPhoneAlt className="footer-icon" />
              +91 98765 43210
            </p>

          </div>

        </div>

        <div className="footer-bottom">

          <p>
            © {new Date().getFullYear()} JobPortal. All Rights Reserved.
          </p>

        </div>

      </div>
    </footer>
  );
}

export default Footer;