import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

import {
  Navbar,
  Nav,
  Container,
  Button,
  NavDropdown,
} from "react-bootstrap";

import {
  FaBriefcase,
  FaUserCircle,
  FaSignOutAlt,
  FaUser,
  FaHeart,
  FaFileAlt,
  FaTachometerAlt,
  FaBuilding,
  FaInfoCircle,
  FaEnvelope,
  FaUserShield,
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";
import "../../styles/navbar.css";

function NavigationBar() {
  const navigate = useNavigate();

  const { user, logout } = useAuth();

  const [expanded, setExpanded] = useState(false);

  const closeMenu = () => setExpanded(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    closeMenu();
  };

  return (
    <Navbar
      expand="lg"
      expanded={expanded}
      sticky="top"
      className="custom-navbar"
      bg="white"
    >
      <Container>
        {/* Logo */}
        <Navbar.Brand
          as={Link}
          to="/"
          className="brand-logo"
          onClick={closeMenu}
        >
          <FaBriefcase className="brand-icon" />

          <div className="brand-text">
            <span className="brand-title">
              JobSphere
            </span>

            <small>Find Your Dream Career</small>
          </div>
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="main-navbar"
          onClick={() => setExpanded(!expanded)}
        />

        <Navbar.Collapse id="main-navbar">
          {/* Left Menu */}

          <Nav className="mx-auto">
            <Nav.Link
              as={NavLink}
              to="/"
              onClick={closeMenu}
            >
              Home
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/jobs"
              onClick={closeMenu}
            >
              Jobs
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/companies"
              onClick={closeMenu}
            >
              <FaBuilding className="me-1" />
              Companies
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/about"
              onClick={closeMenu}
            >
              <FaInfoCircle className="me-1" />
              About
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/contact"
              onClick={closeMenu}
            >
              <FaEnvelope className="me-1" />
              Contact
            </Nav.Link>
          </Nav>

          {/* Right Menu */}

          <Nav className="align-items-center">
            {user ? (
              <NavDropdown
                align="end"
                id="user-dropdown"
                title={
                  <span className="user-dropdown-title">
                    {user.profilePicture ? (
                      <img
                        src={user.profilePicture}
                        alt={user.name}
                        className="navbar-avatar"
                      />
                    ) : (
                      <FaUserCircle className="me-2" />
                    )}

                    Hi, {user.name}
                  </span>
                }
              >
                <NavDropdown.Item
                  as={Link}
                  to="/dashboard"
                  onClick={closeMenu}
                >
                  <FaTachometerAlt className="me-2" />
                  Dashboard
                </NavDropdown.Item>

                <NavDropdown.Item
                  as={Link}
                  to="/profile"
                  onClick={closeMenu}
                >
                  <FaUser className="me-2" />
                  Profile
                </NavDropdown.Item>

                <NavDropdown.Item
                  as={Link}
                  to="/saved-jobs"
                  onClick={closeMenu}
                >
                  <FaHeart className="me-2" />
                  Saved Jobs
                </NavDropdown.Item>

                <NavDropdown.Item
                  as={Link}
                  to="/applied-jobs"
                  onClick={closeMenu}
                >
                  <FaFileAlt className="me-2" />
                  Applied Jobs
                </NavDropdown.Item>

                {user.role === "admin" && (
                  <>
                    <NavDropdown.Divider />

                    <NavDropdown.Item
                      as={Link}
                      to="/admin"
                      onClick={closeMenu}
                    >
                      <FaUserShield className="me-2" />
                      Admin Dashboard
                    </NavDropdown.Item>

                    <NavDropdown.Item
                      as={Link}
                      to="/admin/jobs"
                      onClick={closeMenu}
                    >
                      <FaBriefcase className="me-2" />
                      Manage Jobs
                    </NavDropdown.Item>
                  </>
                )}

                <NavDropdown.Divider />

                <NavDropdown.Item
                  onClick={handleLogout}
                  className="text-danger"
                >
                  <FaSignOutAlt className="me-2" />
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Button
                  as={Link}
                  to="/login"
                  variant="outline-primary"
                  className="me-2"
                  onClick={closeMenu}
                >
                  Login
                </Button>

                <Button
                  as={Link}
                  to="/register"
                  variant="primary"
                  onClick={closeMenu}
                >
                  Register
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;