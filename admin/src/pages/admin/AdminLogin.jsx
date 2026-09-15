import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Mail, Lock } from "lucide-react";
import api from "../../services/api";

function AdminLogin() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    if (!formData.email || !formData.password) {

      setError("Please enter email and password.");

      return;
    }

    try {

      setLoading(true);

      const response = await api.post(
        "/auth/admin-login",
        formData
      );

      const data = response.data;

      if (!data.success) {

        setError(
          data.message ||
          "Admin login failed."
        );

        return;
      }

      // Store admin authentication

      localStorage.setItem(
        "adminToken",
        data.token
      );

      localStorage.setItem(
        "adminUser",
        JSON.stringify(data.user)
      );

      // Go to dashboard

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
        "Unable to login as admin."
      );

    } finally {

      setLoading(false);

    }

  };


  return (

    <div
      className="
        min-h-screen
        bg-slate-950
        flex
        items-center
        justify-center
        px-4
      "
    >

      <div
        className="
          w-full
          max-w-md
          bg-white
          rounded-2xl
          shadow-2xl
          p-8
        "
      >

        {/* LOGO */}

        <div
          className="
            flex
            flex-col
            items-center
            mb-8
          "
        >

          <div
            className="
              w-16
              h-16
              rounded-2xl
              bg-blue-600
              text-white
              flex
              items-center
              justify-center
              mb-4
            "
          >

            <ShieldCheck size={32} />

          </div>


          <h1
            className="
              text-2xl
              font-bold
              text-gray-900
            "
          >
            CareerHub Admin
          </h1>


          <p
            className="
              text-gray-500
              mt-1
            "
          >
            Sign in to administration panel
          </p>

        </div>


        {/* ERROR */}

        {error && (

          <div
            className="
              bg-red-50
              border
              border-red-200
              text-red-700
              rounded-lg
              p-3
              mb-5
              text-sm
            "
          >
            {error}
          </div>

        )}


        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* EMAIL */}

          <div>

            <label
              className="
                block
                text-sm
                font-semibold
                text-gray-700
                mb-2
              "
            >
              Admin Email
            </label>


            <div
              className="
                relative
              "
            >

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
                placeholder="admin@example.com"
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-lg
                  p-3
                  pl-10
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
              />

            </div>

          </div>


          {/* PASSWORD */}

          <div>

            <label
              className="
                block
                text-sm
                font-semibold
                text-gray-700
                mb-2
              "
            >
              Password
            </label>


            <div
              className="
                relative
              "
            >

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
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter admin password"
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-lg
                  p-3
                  pl-10
                  outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
              />

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
              rounded-lg
              font-semibold
              transition
            "
          >

            {loading
              ? "Signing in..."
              : "Sign In as Admin"
            }

          </button>

        </form>


        {/* SECURITY MESSAGE */}

        <div
          className="
            mt-6
            bg-gray-50
            rounded-lg
            p-3
            text-center
            text-xs
            text-gray-500
          "
        >

          🔒 Admin access is restricted to authorized
          administrator accounts.

        </div>

      </div>

    </div>

  );

}

export default AdminLogin;