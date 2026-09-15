import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Briefcase, Mail, Lock, Eye, EyeOff } from "lucide-react";

import api from "../../services/api";
import { useAuth } from "../../context/authcontext";


function RecruiterLogin() {

  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");


  // ============================================================
  // HANDLE INPUT
  // ============================================================

  const handleChange = (e) => {

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setError("");
  };


  // ============================================================
  // LOGIN
  // ============================================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    if (!formData.email || !formData.password) {

      setError("Please enter your email and password.");

      return;
    }


    try {

      setLoading(true);


      const res = await api.post(
        "/auth/login",
        formData
      );


      console.log(
        "RECRUITER LOGIN RESPONSE:",
        res.data
      );


      const user = res.data?.user;

      const token = res.data?.token;


      if (!user || !token) {

        throw new Error(
          "Invalid login response from server."
        );
      }


      console.log(
        "Recruiter User:",
        user
      );

      console.log(
        "Recruiter Role:",
        user.role
      );


      // ========================================================
      // ROLE CHECK
      // ========================================================

      if (
        String(user.role).toLowerCase() !==
        "recruiter"
      ) {

        setError(
          "This account is not a recruiter account."
        );

        return;
      }


      // ========================================================
      // SAVE RECRUITER SESSION
      // ========================================================

      login(
        user,
        token
      );


      // ========================================================
      // GO TO RECRUITER DASHBOARD
      // ========================================================

      navigate(
        "/dashboard",
        {
          replace: true,
        }
      );

    }

    catch (error) {

      console.error(
        "RECRUITER LOGIN ERROR:",
        error
      );


      setError(
        error.response?.data?.message ||
        error.message ||
        "Unable to login. Please check your credentials."
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
      bg-gradient-to-br
      from-blue-50
      via-white
      to-blue-100
      flex
      items-center
      justify-center
      px-4
    ">

      <div className="
        w-full
        max-w-md
      ">


        {/* ======================================================
            BRAND
        ====================================================== */}

        <div className="
          text-center
          mb-8
        ">

          <div className="
            inline-flex
            items-center
            justify-center
            w-16
            h-16
            bg-blue-600
            text-white
            rounded-2xl
            shadow-lg
            mb-4
          ">

            <Briefcase size={32} />

          </div>


          <h1 className="
            text-3xl
            font-bold
            text-gray-900
          ">

            CareerHub

          </h1>


          <p className="
            text-blue-600
            font-semibold
            mt-1
          ">

            Recruiter Portal

          </p>

        </div>


        {/* ======================================================
            LOGIN CARD
        ====================================================== */}

        <div className="
          bg-white
          rounded-2xl
          shadow-xl
          border
          border-gray-100
          p-8
        ">

          <div className="mb-7">

            <h2 className="
              text-2xl
              font-bold
              text-gray-900
            ">

              Recruiter Login

            </h2>


            <p className="
              text-gray-500
              text-sm
              mt-2
            ">

              Sign in to manage your job postings
              and candidates.

            </p>

          </div>


          {/* ====================================================
              ERROR
          ==================================================== */}

          {error && (

            <div className="
              mb-5
              p-3
              rounded-lg
              bg-red-50
              border
              border-red-200
              text-red-600
              text-sm
            ">

              {error}

            </div>

          )}


          {/* ====================================================
              FORM
          ==================================================== */}

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
                text-gray-700
                mb-2
              ">

                Email Address

              </label>


              <div className="relative">

                <Mail
                  size={19}
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                />


                <input
                  name="email"
                  type="email"
                  placeholder="Enter recruiter email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                  className="
                    w-full
                    border
                    border-gray-300
                    rounded-xl
                    pl-10
                    pr-4
                    py-3
                    outline-none
                    focus:ring-2
                    focus:ring-blue-500
                    focus:border-blue-500
                    transition
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
                text-gray-700
                mb-2
              ">

                Password

              </label>


              <div className="relative">

                <Lock
                  size={19}
                  className="
                    absolute
                    left-3
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                />


                <input
                  name="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  required
                  className="
                    w-full
                    border
                    border-gray-300
                    rounded-xl
                    pl-10
                    pr-12
                    py-3
                    outline-none
                    focus:ring-2
                    focus:ring-blue-500
                    focus:border-blue-500
                    transition
                  "
                />


                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      (prev) => !prev
                    )
                  }
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                    hover:text-gray-600
                  "
                >

                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}

                </button>

              </div>

            </div>


            {/* LOGIN BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                bg-blue-600
                hover:bg-blue-700
                disabled:bg-blue-300
                text-white
                py-3
                rounded-xl
                font-semibold
                transition
                shadow-sm
              "
            >

              {loading
                ? "Signing in..."
                : "Recruiter Login"
              }

            </button>

          </form>


          {/* ====================================================
              REGISTER
          ==================================================== */}

          <div className="
            text-center
            mt-6
            pt-6
            border-t
            border-gray-100
          ">

            <p className="
              text-sm
              text-gray-500
            ">

              New recruiter?

              <Link
                to="/register"
                className="
                  ml-1
                  text-blue-600
                  font-semibold
                  hover:underline
                "
              >

                Create an account

              </Link>

            </p>

          </div>

        </div>


        {/* ======================================================
            FOOTER
        ====================================================== */}

        <p className="
          text-center
          text-xs
          text-gray-400
          mt-6
        ">

          CareerHub Recruiter Portal

        </p>

      </div>

    </div>

  );
}


export default RecruiterLogin;