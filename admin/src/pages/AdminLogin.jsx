import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Mail,
  Lock,
  Eye,
  EyeOff,
  LoaderCircle,
} from "lucide-react";

import api from "../services/api";

function AdminLogin() {
  const navigate = useNavigate();

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
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ============================================================
  // ADMIN LOGIN
  // ============================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!formData.email.trim()) {
      setError("Please enter your admin email.");
      return;
    }

    if (!formData.password) {
      setError("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post(
        "/auth/admin-login",
        {
          email: formData.email.trim(),
          password: formData.password,
        }
      );

      const data = response.data;

      if (!data.success) {
        setError(
          data.message || "Admin login failed."
        );
        return;
      }

      // ========================================================
      // SAVE ADMIN TOKEN
      // ========================================================

      localStorage.setItem(
        "adminToken",
        data.token
      );

      // ========================================================
      // SAVE ADMIN USER
      // ========================================================

      localStorage.setItem(
        "adminUser",
        JSON.stringify(data.user)
      );

      // ========================================================
      // REDIRECT
      // ========================================================

      navigate("/dashboard", {
        replace: true,
      });
    } catch (error) {
      console.error(
        "ADMIN LOGIN ERROR:",
        error.response?.data || error
      );

      setError(
        error.response?.data?.message ||
          "Unable to login. Please try again."
      );
    } finally {
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
      from-slate-950
      via-slate-900
      to-blue-950
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
            BRAND
        ==================================================== */}

        <div className="
          text-center
          mb-8
        ">

          <div className="
            w-16
            h-16
            mx-auto
            rounded-2xl
            bg-blue-600
            text-white
            flex
            items-center
            justify-center
            shadow-xl
          ">

            <ShieldCheck size={34} />

          </div>

          <h1 className="
            text-3xl
            font-bold
            text-white
            mt-5
          ">
            CareerHub
          </h1>

          <p className="
            text-slate-400
            mt-1
          ">
            Admin Portal
          </p>

        </div>

        {/* ====================================================
            LOGIN CARD
        ==================================================== */}

        <div className="
          bg-white
          rounded-2xl
          shadow-2xl
          p-7
          sm:p-8
        ">

          <div className="mb-6">

            <h2 className="
              text-2xl
              font-bold
              text-gray-900
            ">
              Admin Login
            </h2>

            <p className="
              text-gray-500
              text-sm
              mt-1
            ">
              Sign in to manage CareerHub.
            </p>

          </div>

          {/* ==================================================
              ERROR
          ================================================== */}

          {error && (
            <div className="
              mb-5
              bg-red-50
              border
              border-red-200
              text-red-700
              rounded-lg
              px-4
              py-3
              text-sm
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
                text-gray-700
                mb-2
              ">
                Admin Email
              </label>

              <div className="relative">

                <Mail
                  size={19}
                  className="
                    absolute
                    left-3
                    top-3.5
                    text-gray-400
                  "
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="admin@careerhub.com"
                  autoComplete="email"
                  className="
                    w-full
                    border
                    border-gray-300
                    rounded-lg
                    px-10
                    py-3
                    outline-none
                    focus:ring-2
                    focus:ring-blue-500
                    focus:border-blue-500
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
                    top-3.5
                    text-gray-400
                  "
                />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter admin password"
                  autoComplete="current-password"
                  className="
                    w-full
                    border
                    border-gray-300
                    rounded-lg
                    px-10
                    pr-12
                    py-3
                    outline-none
                    focus:ring-2
                    focus:ring-blue-500
                    focus:border-blue-500
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
                    top-3
                    text-gray-400
                    hover:text-gray-700
                  "
                >

                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
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
                font-semibold
                py-3
                rounded-lg
                transition
                flex
                items-center
                justify-center
                gap-2
              "
            >

              {loading ? (
                <>
                  <LoaderCircle
                    size={19}
                    className="animate-spin"
                  />

                  Signing in...
                </>
              ) : (
                "Sign In"
              )}

            </button>

          </form>

          {/* SECURITY */}

          <div className="
            mt-6
            pt-5
            border-t
            text-center
          ">

            <p className="
              text-xs
              text-gray-400
            ">
              🔒 Authorized administrators only
            </p>

          </div>

        </div>

        <p className="
          text-center
          text-xs
          text-slate-500
          mt-6
        ">
          CareerHub Administration
        </p>

      </div>

    </div>
  );
}

export default AdminLogin;