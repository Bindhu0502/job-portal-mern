import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import {
  ShieldCheck,
  Mail,
  Lock,
  Eye,
  EyeOff
} from "lucide-react";

import api from "../../services/api";
import { useAuth } from "../../context/authcontext.jsx";


function AdminLogin() {

  const navigate = useNavigate();

  const { login } = useAuth();


  // ============================================================
  // STATE
  // ============================================================

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");


  // ============================================================
  // ADMIN LOGIN
  // ============================================================

  const handleSubmit = async (event) => {

    event.preventDefault();

    setError("");

    setLoading(true);


    try {

      // IMPORTANT:
      // This is ADMIN ONLY.
      // User/recruiter login is untouched.

      const response = await api.post(
        "/auth/admin-login",
        {
          email:
            email.trim().toLowerCase(),

          password
        }
      );


      console.log(
        "ADMIN LOGIN RESPONSE:",
        response.data
      );


      const user =
        response.data?.user;


      const token =
        response.data?.token;


      // ========================================================
      // VALIDATE RESPONSE
      // ========================================================

      if (!user) {

        setError(
          "Admin login succeeded, but admin information was not returned."
        );

        return;

      }


      if (!token) {

        setError(
          "Admin login succeeded, but authentication token was not returned."
        );

        return;

      }


      // ========================================================
      // EXTRA SECURITY CHECK
      // ========================================================

      if (user.role !== "admin") {

        setError(
          "Access denied. This account is not an administrator."
        );

        return;

      }


      // ========================================================
      // SAVE ADMIN SESSION
      // ========================================================

      login(
        user,
        token
      );


      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(user)
      );


      console.log(
        "ADMIN LOGGED IN:",
        user
      );


      // ========================================================
      // ADMIN DASHBOARD
      // ========================================================

      navigate(
        "/admin/dashboard",
        {
          replace: true
        }
      );

    }

    catch (error) {

      console.error(
        "ADMIN LOGIN ERROR:",
        error.response?.data || error
      );


      setError(

        error.response?.data?.message ||

        "Invalid admin email or password."

      );

    }

    finally {

      setLoading(false);

    }

  };


  // ============================================================
  // UI
  // ============================================================

  return (

    <div className="
      min-h-screen
      bg-slate-100
      flex
      items-center
      justify-center
      px-4
      py-10
    ">


      <div className="
        w-full
        max-w-md
      ">


        {/* ====================================================
            ADMIN BRAND
        ==================================================== */}

        <div className="
          text-center
          mb-7
        ">

          <div className="
            w-14
            h-14
            mx-auto
            rounded-2xl
            bg-blue-600
            text-white
            flex
            items-center
            justify-center
            shadow-lg
          ">

            <ShieldCheck
              size={30}
            />

          </div>


          <h1 className="
            text-2xl
            font-bold
            text-slate-900
            mt-4
          ">

            CareerHub Admin

          </h1>


          <p className="
            text-sm
            text-slate-500
            mt-1
          ">

            Secure administrator portal

          </p>

        </div>


        {/* ====================================================
            CARD
        ==================================================== */}

        <div className="
          bg-white
          rounded-2xl
          shadow-lg
          border
          border-slate-200
          p-6
          sm:p-7
        ">


          <div className="
            mb-6
          ">

            <h2 className="
              text-xl
              font-bold
              text-slate-900
            ">

              Admin Login

            </h2>


            <p className="
              text-sm
              text-slate-500
              mt-1
            ">

              Sign in to manage CareerHub

            </p>

          </div>


          {/* ==================================================
              ERROR
          ================================================== */}

          {error && (

            <div className="
              bg-red-50
              border
              border-red-200
              text-red-600
              rounded-lg
              px-4
              py-3
              text-sm
              mb-5
            ">

              {error}

            </div>

          )}


          {/* ==================================================
              FORM
          ================================================== */}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >


            {/* EMAIL */}

            <div>

              <label className="
                block
                text-sm
                font-semibold
                text-slate-700
                mb-2
              ">

                Admin Email

              </label>


              <div className="
                relative
              ">

                <Mail
                  size={17}
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />


                <input
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(
                      event.target.value
                    )
                  }
                  placeholder="Enter admin email"
                  autoComplete="email"
                  required
                  className="
                    w-full
                    border
                    border-slate-300
                    rounded-lg
                    pl-10
                    pr-4
                    py-3
                    outline-none
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-100
                  "
                />

              </div>

            </div>


            {/* PASSWORD */}

            <div>

              <label className="
                block
                text-sm
                font-semibold
                text-slate-700
                mb-2
              ">

                Password

              </label>


              <div className="
                relative
              ">

                <Lock
                  size={17}
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />


                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={password}
                  onChange={(event) =>
                    setPassword(
                      event.target.value
                    )
                  }
                  placeholder="Enter admin password"
                  autoComplete="current-password"
                  required
                  className="
                    w-full
                    border
                    border-slate-300
                    rounded-lg
                    pl-10
                    pr-11
                    py-3
                    outline-none
                    focus:border-blue-500
                    focus:ring-2
                    focus:ring-blue-100
                  "
                />


                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                    hover:text-slate-700
                  "
                >

                  {showPassword
                    ? <EyeOff size={18} />
                    : <Eye size={18} />
                  }

                </button>

              </div>

            </div>


            {/* LOGIN */}

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
                ? "Signing in..."
                : "Login as Admin"
              }

            </button>

          </form>


          {/* ==================================================
              BACK TO USER LOGIN
          ================================================== */}

          <div className="
            border-t
            border-slate-200
            mt-6
            pt-5
            text-center
          ">

            <Link
              to="/login"
              className="
                text-sm
                text-blue-600
                hover:text-blue-700
                font-medium
              "
            >

              ← Back to User Login

            </Link>

          </div>

        </div>


        {/* ====================================================
            SECURITY MESSAGE
        ==================================================== */}

        <p className="
          text-center
          text-xs
          text-slate-400
          mt-4
        ">

          🔒 Authorized administrators only

        </p>

      </div>

    </div>

  );

}


export default AdminLogin;