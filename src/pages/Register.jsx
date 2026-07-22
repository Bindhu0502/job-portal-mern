import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import api from "../api/api";
import "../styles/register.css";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      if (
        !name ||
        !email ||
        !phone ||
        !password ||
        !confirmPassword
      ) {
        setMessage("Please fill all fields.");
        return;
      }

      if (password !== confirmPassword) {
        setMessage("Passwords do not match.");
        return;
      }

      const response = await api.post("/users/register", {
        name,
        email,
        phone,
        password,
      });

      setMessage(response.data.message);

      setName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Server Error");
      }
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <div className="register-left">
          <h1>Create Your Account</h1>

          <p>
            Join thousands of job seekers and discover
            exciting career opportunities from top
            companies.
          </p>

          <img
            src="https://illustrations.popsy.co/blue/businessman.svg"
            alt="Register"
          />
        </div>

        <div className="register-right">
          <h2>Register</h2>

          <form onSubmit={handleRegister}>

            <div className="input-group">
              <FaUser />

              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                required
              />
            </div>

            <div className="input-group">
              <FaEnvelope />

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
              />
            </div>

            <div className="input-group">
              <FaPhone />

              <input
                type="text"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
                required
              />
            </div>

            <div className="input-group">
              <FaLock />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />

              <button
                type="button"
                className="eye-btn"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>
            </div>

            <div className="input-group">
              <FaLock />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                required
              />
            </div>

            <button
              type="submit"
              className="register-btn"
            >
              Create Account
            </button>

          </form>

          {message && (
            <p
              className={
                message.toLowerCase().includes("success")
                  ? "success-message"
                  : "error-message"
              }
            >
              {message}
            </p>
          )}

          <p className="login-link">
            Already have an account?

            <Link to="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;