import { Routes, Route } from "react-router-dom";

// User Protected Route
import ProtectedRoute from "../components/ProtectedRoute";

// Admin Protected Route
import AdminProtectedRoute from "../components/AdminProtectedRoute";

// User Pages
import Home from "../pages/Home";
import Jobs from "../pages/Jobs";
import JobDetails from "../pages/JobDetails";
import ApplyJob from "../pages/ApplyJob";
import AppliedJobs from "../pages/AppliedJobs";
import SavedJobs from "../pages/SavedJobs";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import Companies from "../pages/Companies";
import CompanyDetails from "../pages/CompanyDetails";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Login from "../pages/Login";
import Register from "../pages/Register";

// Admin Pages
import AdminDashboard from "../pages/AdminDashboard";
import ManageJobs from "../pages/ManageJobs";
import AddJob from "../pages/AddJob";
import EditJob from "../pages/EditJob";
import AdminApplicants from "../pages/AdminApplicants";

// Common Page
import NotFound from "../pages/NotFound";

function AppRoutes() {
  return (
    <Routes>
      {/* ================= PUBLIC ROUTES ================= */}

      <Route path="/" element={<Home />} />

      <Route path="/jobs" element={<Jobs />} />

      <Route path="/jobs/:id" element={<JobDetails />} />

      <Route path="/companies" element={<Companies />} />

      <Route
        path="/companies/:id"
        element={<CompanyDetails />}
      />

      <Route path="/about" element={<About />} />

      <Route path="/contact" element={<Contact />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      {/* ================= USER ROUTES ================= */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/apply/:id"
        element={
          <ProtectedRoute>
            <ApplyJob />
          </ProtectedRoute>
        }
      />

      <Route
        path="/applied-jobs"
        element={
          <ProtectedRoute>
            <AppliedJobs />
          </ProtectedRoute>
        }
      />

      <Route
        path="/saved-jobs"
        element={
          <ProtectedRoute>
            <SavedJobs />
          </ProtectedRoute>
        }
      />

      {/* ================= ADMIN ROUTES ================= */}

      <Route
        path="/admin"
        element={
          <AdminProtectedRoute>
            <AdminDashboard />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admin/jobs"
        element={
          <AdminProtectedRoute>
            <ManageJobs />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admin/add-job"
        element={
          <AdminProtectedRoute>
            <AddJob />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admin/edit-job/:id"
        element={
          <AdminProtectedRoute>
            <EditJob />
          </AdminProtectedRoute>
        }
      />

      <Route
        path="/admin/applicants/:jobId"
        element={
          <AdminProtectedRoute>
            <AdminApplicants />
          </AdminProtectedRoute>
        }
      />

      {/* ================= 404 ================= */}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;