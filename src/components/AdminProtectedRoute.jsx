import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "100px" }}>
        Loading...
      </h2>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default AdminProtectedRoute;