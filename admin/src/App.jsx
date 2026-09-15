import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// ============================================================
// ADMIN LAYOUT
// ============================================================

import AdminLayout from "./components/admin/AdminLayout";

// ============================================================
// ADMIN PAGES
// ============================================================

import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Jobs from "./pages/admin/Jobs";
import Applications from "./pages/admin/Applications";
import Companies from "./pages/admin/Companies";
import Notifications from "./pages/admin/Notifications";
import Settings from "./pages/admin/Settings";

// ============================================================
// ADMIN LOGIN
// ============================================================

function AdminLogin() {
  const handleLogin = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const email = formData.get("email")?.trim();
    const password = formData.get("password");

    // ----------------------------------------------------------
    // VALIDATION
    // ----------------------------------------------------------

    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    try {
      // --------------------------------------------------------
      // ADMIN LOGIN API
      // --------------------------------------------------------

      const response = await fetch(
        "http://localhost:5000/api/auth/admin-login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      // --------------------------------------------------------
      // LOGIN FAILED
      // --------------------------------------------------------

      if (!response.ok || !data.success) {
        alert(
          data.message ||
            "Invalid admin email or password."
        );

        return;
      }

      // --------------------------------------------------------
      // MAKE SURE TOKEN EXISTS
      // --------------------------------------------------------

      if (!data.token) {
        alert(
          "Login failed. Server did not return an authentication token."
        );

        return;
      }

      // --------------------------------------------------------
      // MAKE SURE USER EXISTS
      // --------------------------------------------------------

      if (!data.user) {
        alert(
          "Login failed. Server did not return admin user information."
        );

        return;
      }

      // --------------------------------------------------------
      // ADMIN ROLE CHECK
      // --------------------------------------------------------

      if (data.user.role !== "admin") {
        alert(
          "Access denied. Administrator account required."
        );

        return;
      }

      // --------------------------------------------------------
      // CLEAR OLD / INVALID ADMIN DATA
      // --------------------------------------------------------

      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUser");

      // --------------------------------------------------------
      // SAVE REAL JWT
      // --------------------------------------------------------

      localStorage.setItem(
        "adminToken",
        data.token
      );

      // --------------------------------------------------------
      // SAVE ADMIN USER
      // --------------------------------------------------------

      localStorage.setItem(
        "adminUser",
        JSON.stringify(data.user)
      );

      // --------------------------------------------------------
      // OPTIONAL COMPATIBILITY VALUE
      //
      // This is only for the Admin application.
      // Candidate/Recruiter storage is NOT changed.
      // --------------------------------------------------------

      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(data.user)
      );

      // --------------------------------------------------------
      // GO TO ADMIN DASHBOARD
      // --------------------------------------------------------

      window.location.href =
        "/admin/dashboard";
    } catch (error) {
      console.error(
        "ADMIN LOGIN ERROR:",
        error
      );

      alert(
        "Unable to connect to the server. Please make sure the backend is running on port 5000."
      );
    }
  };

  return (
    <div
      className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-gray-50
        px-4
      "
    >
      <div
        className="
          w-full
          max-w-md
          rounded-2xl
          border
          border-gray-200
          bg-white
          p-6
          shadow-sm
          sm:p-8
        "
      >
        {/* ==================================================
            LOGO
        ================================================== */}

        <div
          className="
            mb-6
            flex
            flex-col
            items-center
            text-center
          "
        >
          <div
            className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-xl
              bg-blue-600
              text-lg
              font-bold
              text-white
            "
          >
            CH
          </div>

          <h1
            className="
              mt-4
              text-2xl
              font-bold
              text-gray-900
            "
          >
            CareerHub
          </h1>

          <p
            className="
              mt-1
              text-sm
              text-gray-500
            "
          >
            Admin Panel
          </p>
        </div>

        {/* ==================================================
            LOGIN FORM
        ================================================== */}

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >
          {/* ==================================================
              EMAIL
          ================================================== */}

          <div>
            <label
              className="
                mb-2
                block
                text-sm
                font-medium
                text-gray-700
              "
            >
              Email
            </label>

            <input
              type="email"
              name="email"
              placeholder="admin@careerhub.com"
              autoComplete="username"
              className="
                w-full
                rounded-lg
                border
                border-gray-200
                px-4
                py-3
                text-sm
                text-gray-800
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
              className="
                mb-2
                block
                text-sm
                font-medium
                text-gray-700
              "
            >
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              autoComplete="current-password"
              className="
                w-full
                rounded-lg
                border
                border-gray-200
                px-4
                py-3
                text-sm
                text-gray-800
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
            className="
              w-full
              rounded-lg
              bg-blue-600
              px-4
              py-3
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-blue-700
              focus:outline-none
              focus:ring-2
              focus:ring-blue-500
              focus:ring-offset-2
            "
          >
            Login to Admin Panel
          </button>
        </form>

        {/* ==================================================
            INFO
        ================================================== */}

        <div
          className="
            mt-5
            rounded-lg
            bg-blue-50
            p-3
            text-center
            text-xs
            text-blue-700
          "
        >
          Use your registered administrator
          email and password.
        </div>
      </div>
    </div>
  );
}

// ============================================================
// ADMIN ROUTE PROTECTION
// ============================================================

function AdminRoute({ children }) {
  // ----------------------------------------------------------
  // ADMIN MUST USE ONLY adminToken
  //
  // We intentionally DO NOT use:
  //
  // localStorage.getItem("token")
  //
  // because that could belong to Candidate/Recruiter.
  // ----------------------------------------------------------

  const token =
    localStorage.getItem("adminToken");

  const storedUser =
    localStorage.getItem("adminUser");

  // ----------------------------------------------------------
  // NO ADMIN LOGIN
  // ----------------------------------------------------------

  if (!token || !storedUser) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // ----------------------------------------------------------
  // CHECK ADMIN USER
  // ----------------------------------------------------------

  try {
    const user =
      JSON.parse(storedUser);

    // --------------------------------------------------------
    // ONLY ADMIN CAN ACCESS ADMIN PORTAL
    // --------------------------------------------------------

    if (user?.role !== "admin") {
      localStorage.removeItem(
        "adminToken"
      );

      localStorage.removeItem(
        "adminUser"
      );

      return (
        <Navigate
          to="/login"
          replace
        />
      );
    }
  } catch (error) {
    console.error(
      "ADMIN USER PARSE ERROR:",
      error
    );

    localStorage.removeItem(
      "adminToken"
    );

    localStorage.removeItem(
      "adminUser"
    );

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // ----------------------------------------------------------
  // ADMIN AUTHENTICATED
  // ----------------------------------------------------------

  return children;
}

// ============================================================
// APP
// ============================================================

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ==================================================
            ADMIN LOGIN
        ================================================== */}

        <Route
          path="/login"
          element={
            <AdminLogin />
          }
        />

        {/* ==================================================
            ADMIN PORTAL
        ================================================== */}

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          {/* ==================================================
              DEFAULT ADMIN ROUTE
          ================================================== */}

          <Route
            index
            element={
              <Navigate
                to="/admin/dashboard"
                replace
              />
            }
          />

          {/* ==================================================
              DASHBOARD
          ================================================== */}

          <Route
            path="dashboard"
            element={
              <Dashboard />
            }
          />

          {/* ==================================================
              USERS
          ================================================== */}

          <Route
            path="users"
            element={
              <Users />
            }
          />

          {/* ==================================================
              JOBS
          ================================================== */}

          <Route
            path="jobs"
            element={
              <Jobs />
            }
          />

          {/* ==================================================
              APPLICATIONS
          ================================================== */}

          <Route
            path="applications"
            element={
              <Applications />
            }
          />

          {/* ==================================================
              COMPANIES
          ================================================== */}

          <Route
            path="companies"
            element={
              <Companies />
            }
          />

          {/* ==================================================
              NOTIFICATIONS
          ================================================== */}

          <Route
            path="notifications"
            element={
              <Notifications />
            }
          />

          {/* ==================================================
              SETTINGS
          ================================================== */}

          <Route
            path="settings"
            element={
              <Settings />
            }
          />
        </Route>

        {/* ==================================================
            ROOT
        ================================================== */}

        <Route
          path="/"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

        {/* ==================================================
            UNKNOWN ROUTE
        ================================================== */}

        <Route
          path="*"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

// ============================================================
// EXPORT
// ============================================================

export default App;