import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  // Wait until AuthContext finishes loading from localStorage
  if (loading) {
    return <h2 style={{ textAlign: "center", marginTop: "100px" }}>Loading...</h2>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;