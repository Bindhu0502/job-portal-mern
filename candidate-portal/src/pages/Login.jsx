import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../services/api";
import { useAuth } from "../context/authcontext";


function Login() {

  const navigate = useNavigate();

  const { login } = useAuth();


  // ============================================================
  // STATE
  // ============================================================

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");


  // ============================================================
  // LOGIN
  // ============================================================

  const handleSubmit = async (event) => {

    event.preventDefault();

    setError("");

    setLoading(true);


    try {

      // --------------------------------------------------------
      // API REQUEST
      // --------------------------------------------------------

      const response = await api.post(
        "/auth/login",
        {
          email: email.trim().toLowerCase(),
          password: password,
        }
      );


      console.log(
        "LOGIN RESPONSE:",
        response.data
      );


      // --------------------------------------------------------
      // GET USER
      // --------------------------------------------------------

      const user =
        response.data?.user ||
        response.data?.data?.user;


      // --------------------------------------------------------
      // GET TOKEN
      // --------------------------------------------------------

      const token =
        response.data?.token ||
        response.data?.data?.token;


      // --------------------------------------------------------
      // VALIDATE USER
      // --------------------------------------------------------

      if (!user) {

        setError(
          "Login successful, but user information was not returned."
        );

        return;

      }


      // --------------------------------------------------------
      // VALIDATE TOKEN
      // --------------------------------------------------------

      if (!token) {

        setError(
          "Login successful, but authentication token was not returned."
        );

        return;

      }


      // --------------------------------------------------------
      // AUTH CONTEXT
      //
      // This stores:
      // user
      // token
      // localStorage session
      // socket connection
      // --------------------------------------------------------

      login(
        user,
        token
      );


      // --------------------------------------------------------
      // KEEP LEGACY LOGIN STORAGE
      //
      // Some existing CareerHub components may use this.
      // --------------------------------------------------------

      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(user)
      );


      // --------------------------------------------------------
      // DEBUG
      // --------------------------------------------------------

      console.log(
        "LOGGED IN USER:",
        user
      );

      console.log(
        "USER ROLE:",
        user.role
      );


      // ========================================================
      // ROLE BASED REDIRECT
      // ========================================================

      if (user.role === "admin") {

        navigate(
          "/admin/dashboard",
          {
            replace: true,
          }
        );

        return;

      }


      if (user.role === "recruiter") {

        navigate(
          "/recruiter/dashboard",
          {
            replace: true,
          }
        );

        return;

      }


      // --------------------------------------------------------
      // DEFAULT USER / CANDIDATE
      // --------------------------------------------------------

      navigate(
        "/dashboard",
        {
          replace: true,
        }
      );

    }

    catch (error) {

      console.error(
        "LOGIN ERROR:",
        error
      );


      const message =
        error.response?.data?.message ||
        "Invalid email or password.";


      setError(message);

    }

    finally {

      setLoading(false);

    }

  };


  // ============================================================
  // UI
  // ============================================================

  return (

    <div
      className="
        min-h-screen
        bg-gray-100
        flex
        items-center
        justify-center
        px-4
        py-10
      "
    >

      <div
        className="
          w-full
          max-w-md
          bg-white
          rounded-2xl
          shadow-lg
          p-8
        "
      >

        {/* ====================================================
            LOGO
        ==================================================== */}

        <div
          className="
            text-center
            mb-8
          "
        >

          <h1
            className="
              text-3xl
              font-bold
              text-blue-600
            "
          >
            CareerHub
          </h1>


          <p
            className="
              text-gray-500
              mt-2
            "
          >
            Login to your account
          </p>

        </div>


        {/* ====================================================
            ERROR MESSAGE
        ==================================================== */}

        {error && (

          <div
            className="
              bg-red-50
              border
              border-red-200
              text-red-700
              p-3
              rounded-lg
              mb-5
              text-sm
            "
          >
            {error}
          </div>

        )}


        {/* ====================================================
            LOGIN FORM
        ==================================================== */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* ==================================================
              EMAIL
          ================================================== */}

          <div>

            <label
              htmlFor="email"
              className="
                block
                text-sm
                font-medium
                text-gray-700
                mb-2
              "
            >
              Email
            </label>


            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="Enter your email"
              autoComplete="email"
              required
              className="
                w-full
                border
                border-gray-300
                rounded-lg
                px-4
                py-3
                outline-none
                transition
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-100
              "
            />

          </div>


          {/* ==================================================
              PASSWORD
          ================================================== */}

          <div>

            <label
              htmlFor="password"
              className="
                block
                text-sm
                font-medium
                text-gray-700
                mb-2
              "
            >
              Password
            </label>


            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              className="
                w-full
                border
                border-gray-300
                rounded-lg
                px-4
                py-3
                outline-none
                transition
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-100
              "
            />

          </div>


          {/* ==================================================
              LOGIN BUTTON
          ================================================== */}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-blue-600
              hover:bg-blue-700
              text-white
              font-semibold
              py-3
              rounded-lg
              transition
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >

            {loading
              ? "Logging in..."
              : "Login"
            }

          </button>

        </form>


        {/* ====================================================
            REGISTER
        ==================================================== */}

        <p
          className="
            text-center
            text-sm
            text-gray-500
            mt-6
          "
        >

          Don't have an account?{" "}

          <Link
            to="/register"
            className="
              text-blue-600
              font-semibold
              hover:underline
            "
          >
            Register
          </Link>

        </p>

      </div>

    </div>

  );

}


export default Login;