import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const loggedInUser = JSON.parse(
    localStorage.getItem("loggedInUser")
  );

  if (!loggedInUser) {
    return <Navigate to="/login" replace />;
  }

  if (loggedInUser.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}

export default AdminRoute;