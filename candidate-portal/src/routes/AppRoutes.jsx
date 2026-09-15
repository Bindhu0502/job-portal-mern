import { Routes, Route, Navigate } from "react-router-dom";

// ============================================================
// ROUTE GUARDS
// ============================================================

import PublicRoute from "../components/auth/PublicRoute";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import RoleRoute from "../components/auth/RoleRoute";

// ============================================================
// CANDIDATE PAGES
// ============================================================

import Home from "../pages/Home";
import Jobs from "../pages/Jobs";
import JobDetails from "../pages/JobDetails";
import ApplyJob from "../pages/ApplyJob";

import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import SavedJobs from "../pages/SavedJobs";
import MyApplications from "../pages/MyApplications";

import Companies from "../pages/Companies";
import About from "../pages/About";
import Contact from "../pages/Contact";

// ============================================================
// CANDIDATE AUTH
// ============================================================

import Login from "../pages/Login";
import Register from "../pages/Register";
import GithubSuccess from "../pages/GithubSuccess";

// ============================================================
// RECRUITER
// ============================================================

import RecruiterLogin from "../pages/recruiter/RecruiterLogin";
import RecruiterRegister from "../pages/recruiter/Register";

import RecruiterDashboard from "../pages/recruiter/Dashboard";
import CreateJob from "../pages/recruiter/CreateJob";
import MyJobs from "../pages/recruiter/MyJobs";
import EditJob from "../pages/recruiter/EditJob";
import RecruiterApplications from "../pages/recruiter/Applications";
import RecruiterProfile from "../pages/recruiter/Profile";

// ============================================================
// ADMIN
// ============================================================

import AdminLogin from "../pages/admin/AdminLogin";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminUsers from "../pages/admin/Users";
import AdminRecruiters from "../pages/admin/Recruiters";

import AdminLayout from "../components/admin/AdminLayout";

// ============================================================
// PORTAL
// ============================================================

const PORTAL =
  import.meta.env.VITE_PORTAL || "candidate";


// ============================================================
// CANDIDATE ROUTES
// ============================================================

function CandidateRoutes() {

  return (

    <Routes>

      {/* HOME */}

      <Route
        path="/"
        element={<Home />}
      />


      {/* PUBLIC PAGES */}

      <Route
        path="/companies"
        element={<Companies />}
      />

      <Route
        path="/about"
        element={<About />}
      />

      <Route
        path="/contact"
        element={<Contact />}
      />


      {/* LOGIN */}

      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />


      {/* REGISTER */}

      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />


      {/* GITHUB */}

      <Route
        path="/github-success"
        element={<GithubSuccess />}
      />


      {/* JOBS */}

      <Route
        path="/jobs"
        element={
          <ProtectedRoute>
            <RoleRoute role="candidate">
              <Jobs />
            </RoleRoute>
          </ProtectedRoute>
        }
      />


      {/* JOB DETAILS */}

      <Route
        path="/jobs/:id"
        element={
          <ProtectedRoute>
            <RoleRoute role="candidate">
              <JobDetails />
            </RoleRoute>
          </ProtectedRoute>
        }
      />


      {/* APPLY */}

      <Route
        path="/jobs/:id/apply"
        element={
          <ProtectedRoute>
            <RoleRoute role="candidate">
              <ApplyJob />
            </RoleRoute>
          </ProtectedRoute>
        }
      />


      {/* DASHBOARD */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <RoleRoute role="candidate">
              <Dashboard />
            </RoleRoute>
          </ProtectedRoute>
        }
      />


      {/* PROFILE */}

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <RoleRoute role="candidate">
              <Profile />
            </RoleRoute>
          </ProtectedRoute>
        }
      />


      {/* SAVED JOBS */}

      <Route
        path="/saved-jobs"
        element={
          <ProtectedRoute>
            <RoleRoute role="candidate">
              <SavedJobs />
            </RoleRoute>
          </ProtectedRoute>
        }
      />


      {/* MY APPLICATIONS */}

      <Route
        path="/my-applications"
        element={
          <ProtectedRoute>
            <RoleRoute role="candidate">
              <MyApplications />
            </RoleRoute>
          </ProtectedRoute>
        }
      />


      {/* ANY WRONG CANDIDATE URL */}

      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />

    </Routes>

  );

}


// ============================================================
// RECRUITER ROUTES
// ============================================================

function RecruiterRoutes() {

  return (

    <Routes>

      {/* RECRUITER LOGIN */}

      <Route
        path="/"
        element={
          <PublicRoute>
            <RecruiterLogin />
          </PublicRoute>
        }
      />


      <Route
        path="/login"
        element={
          <PublicRoute>
            <RecruiterLogin />
          </PublicRoute>
        }
      />


      {/* RECRUITER REGISTER */}

      <Route
        path="/register"
        element={
          <PublicRoute>
            <RecruiterRegister />
          </PublicRoute>
        }
      />


      {/* DASHBOARD */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <RoleRoute role="recruiter">
              <RecruiterDashboard />
            </RoleRoute>
          </ProtectedRoute>
        }
      />


      {/* CREATE JOB */}

      <Route
        path="/create-job"
        element={
          <ProtectedRoute>
            <RoleRoute role="recruiter">
              <CreateJob />
            </RoleRoute>
          </ProtectedRoute>
        }
      />


      {/* MY JOBS */}

      <Route
        path="/jobs"
        element={
          <ProtectedRoute>
            <RoleRoute role="recruiter">
              <MyJobs />
            </RoleRoute>
          </ProtectedRoute>
        }
      />


      {/* EDIT JOB */}

      <Route
        path="/edit-job/:id"
        element={
          <ProtectedRoute>
            <RoleRoute role="recruiter">
              <EditJob />
            </RoleRoute>
          </ProtectedRoute>
        }
      />


      {/* APPLICATIONS */}

      <Route
        path="/applications"
        element={
          <ProtectedRoute>
            <RoleRoute role="recruiter">
              <RecruiterApplications />
            </RoleRoute>
          </ProtectedRoute>
        }
      />


      {/* PROFILE */}

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <RoleRoute role="recruiter">
              <RecruiterProfile />
            </RoleRoute>
          </ProtectedRoute>
        }
      />


      {/* WRONG URL */}

      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />

    </Routes>

  );

}


// ============================================================
// ADMIN ROUTES
// ============================================================

function AdminRoutes() {

  return (

    <Routes>

      {/* ADMIN LOGIN */}

      <Route
        path="/"
        element={
          <PublicRoute>
            <AdminLogin />
          </PublicRoute>
        }
      />


      <Route
        path="/login"
        element={
          <PublicRoute>
            <AdminLogin />
          </PublicRoute>
        }
      />


      {/* DASHBOARD */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <RoleRoute role="admin">

              <AdminLayout>

                <AdminDashboard />

              </AdminLayout>

            </RoleRoute>
          </ProtectedRoute>
        }
      />


      {/* USERS */}

      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <RoleRoute role="admin">

              <AdminLayout>

                <AdminUsers />

              </AdminLayout>

            </RoleRoute>
          </ProtectedRoute>
        }
      />


      {/* RECRUITERS */}

      <Route
        path="/recruiters"
        element={
          <ProtectedRoute>
            <RoleRoute role="admin">

              <AdminLayout>

                <AdminRecruiters />

              </AdminLayout>

            </RoleRoute>
          </ProtectedRoute>
        }
      />


      {/* COMPANIES */}

      <Route
        path="/companies"
        element={
          <ProtectedRoute>
            <RoleRoute role="admin">

              <AdminLayout>

                <div className="text-2xl font-bold">
                  Companies Management
                </div>

              </AdminLayout>

            </RoleRoute>
          </ProtectedRoute>
        }
      />


      {/* JOBS */}

      <Route
        path="/jobs"
        element={
          <ProtectedRoute>
            <RoleRoute role="admin">

              <AdminLayout>

                <div className="text-2xl font-bold">
                  Jobs Management
                </div>

              </AdminLayout>

            </RoleRoute>
          </ProtectedRoute>
        }
      />


      {/* APPLICATIONS */}

      <Route
        path="/applications"
        element={
          <ProtectedRoute>
            <RoleRoute role="admin">

              <AdminLayout>

                <div className="text-2xl font-bold">
                  Applications Management
                </div>

              </AdminLayout>

            </RoleRoute>
          </ProtectedRoute>
        }
      />


      {/* NOTIFICATIONS */}

      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <RoleRoute role="admin">

              <AdminLayout>

                <div className="text-2xl font-bold">
                  Notifications
                </div>

              </AdminLayout>

            </RoleRoute>
          </ProtectedRoute>
        }
      />


      {/* SETTINGS */}

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <RoleRoute role="admin">

              <AdminLayout>

                <div className="text-2xl font-bold">
                  Admin Settings
                </div>

              </AdminLayout>

            </RoleRoute>
          </ProtectedRoute>
        }
      />


      {/* WRONG URL */}

      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />

    </Routes>

  );

}


// ============================================================
// MAIN APP ROUTES
// ============================================================

function AppRoutes() {


  // ==========================================================
  // CANDIDATE FRONTEND
  // localhost:5173
  // ==========================================================

  if (PORTAL === "candidate") {

    return <CandidateRoutes />;

  }


  // ==========================================================
  // RECRUITER FRONTEND
  // localhost:5174
  // ==========================================================

  if (PORTAL === "recruiter") {

    return <RecruiterRoutes />;

  }


  // ==========================================================
  // ADMIN FRONTEND
  // localhost:5175
  // ==========================================================

  if (PORTAL === "admin") {

    return <AdminRoutes />;

  }


  // ==========================================================
  // INVALID PORTAL
  // ==========================================================

  return (

    <div className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-red-50
      px-6
    ">

      <div className="
        bg-white
        border
        border-red-200
        rounded-xl
        p-8
        text-center
        shadow
      ">

        <h1 className="
          text-2xl
          font-bold
          text-red-600
        ">

          Invalid Portal Configuration

        </h1>


        <p className="
          text-gray-600
          mt-3
        ">

          VITE_PORTAL must be:

        </p>


        <div className="
          mt-4
          text-left
          bg-gray-100
          rounded-lg
          p-4
          font-mono
          text-sm
        ">

          candidate
          <br />

          recruiter
          <br />

          admin

        </div>

      </div>

    </div>

  );

}


export default AppRoutes;