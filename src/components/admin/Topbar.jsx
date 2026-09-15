import { useAuth } from "../../context/authcontext";
import { useNavigate } from "react-router-dom";

function Topbar() {
  const { logout, user } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="h-16 bg-white shadow flex justify-between items-center px-8">
      <h2 className="text-2xl font-semibold">
        Welcome {user?.name}
      </h2>

      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}
export default Topbar;