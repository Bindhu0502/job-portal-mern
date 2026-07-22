import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";
import "../styles/login.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post("/users/login", {
        email,
        password,
      });

      if (data.success) {
        login(data.user, data.token);

        alert("Login Successful");

        navigate("/dashboard");
      }
    } catch (error) {
      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-left">

          <h1>Welcome Back 👋</h1>

          <p>
            Login to continue your job search,
            apply for opportunities and track
            your applications.
          </p>

          <img
            src="https://illustrations.popsy.co/blue/job-hunt.svg"
            alt="Login"
          />

        </div>

        <div className="login-right">

          <h2>Login</h2>

          <form onSubmit={handleSubmit}>

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

            <button
              type="submit"
              className="login-btn"
            >
              Login
            </button>

          </form>

          <p className="register-text">
            Don't have an account?

            <Link to="/register">
              Register
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;