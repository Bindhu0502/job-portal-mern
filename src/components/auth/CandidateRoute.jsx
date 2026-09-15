import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/authcontext";

function CandidateRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h2 className="text-lg font-semibold">Loading...</h2>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "candidate") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default CandidateRoute;