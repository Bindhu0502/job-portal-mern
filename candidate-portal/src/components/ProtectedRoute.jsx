import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authcontext";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h2 className="text-xl font-semibold">Loading...</h2>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;