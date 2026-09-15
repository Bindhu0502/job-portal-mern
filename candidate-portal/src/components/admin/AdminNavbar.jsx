import { useAuth } from "../../context/authcontext";

const AdminNavbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm h-16 px-8 flex items-center justify-between">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">
          Admin Dashboard
        </h2>

        <p className="text-sm text-gray-500">
          Welcome, {user?.name || "Admin"}
        </p>
      </div>

      <button
        onClick={logout}
        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
      >
        Logout
      </button>
    </header>
  );
};

export default AdminNavbar;