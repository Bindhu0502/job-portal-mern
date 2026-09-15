import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/authcontext.jsx";

function PublicRoute({ children, allowedRole }) {
  const { user, loading } = useAuth();

  // ============================================================
  // WAIT FOR AUTH SESSION
  // ============================================================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="
            w-10
            h-10
            border-4
            border-blue-200
            border-t-blue-600
            rounded-full
            animate-spin
            mx-auto
          " />

          <p className="mt-4 text-gray-500">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  // ============================================================
  // NO USER
  // ============================================================

  if (!user) {
    return children;
  }

  // ============================================================
  // CANDIDATE LOGIN / REGISTER
  // ============================================================

  if (allowedRole === "candidate") {
    if (user.role === "candidate") {
      return (
        <Navigate
          to="/dashboard"
          replace
        />
      );
    }

    // If recruiter/admin is logged in,
    // don't allow them to enter candidate portal.
    if (user.role === "recruiter") {
      return (
        <Navigate
          to="/recruiter/dashboard"
          replace
        />
      );
    }

    if (user.role === "admin") {
      return (
        <Navigate
          to="/admin/dashboard"
          replace
        />
      );
    }
  }

  // ============================================================
  // RECRUITER LOGIN / REGISTER
  // ============================================================

  if (allowedRole === "recruiter") {
    if (user.role === "recruiter") {
      return (
        <Navigate
          to="/recruiter/dashboard"
          replace
        />
      );
    }

    if (user.role === "candidate") {
      return (
        <Navigate
          to="/dashboard"
          replace
        />
      );
    }

    if (user.role === "admin") {
      return (
        <Navigate
          to="/admin/dashboard"
          replace
        />
      );
    }
  }

  // ============================================================
  // ADMIN LOGIN
  // ============================================================

  if (allowedRole === "admin") {
    if (user.role === "admin") {
      return (
        <Navigate
          to="/admin/dashboard"
          replace
        />
      );
    }

    if (user.role === "candidate") {
      return (
        <Navigate
          to="/dashboard"
          replace
        />
      );
    }

    if (user.role === "recruiter") {
      return (
        <Navigate
          to="/recruiter/dashboard"
          replace
        />
      );
    }
  }

  // ============================================================
  // DEFAULT
  // ============================================================

  return children;
}

export default PublicRoute;