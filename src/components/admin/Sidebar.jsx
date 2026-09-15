import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaBuilding,
  FaBriefcase,
  FaFileAlt,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

const menuItems = [
  {
    name: "Dashboard",
    icon: <FaTachometerAlt />,
    path: "/admin/dashboard",
  },
  {
    name: "Users",
    icon: <FaUsers />,
    path: "/admin/users",
  },
  {
    name: "Companies",
    icon: <FaBuilding />,
    path: "/admin/companies",
  },
  {
    name: "Jobs",
    icon: <FaBriefcase />,
    path: "/admin/jobs",
  },
  {
    name: "Applications",
    icon: <FaFileAlt />,
    path: "/admin/applications",
  },
  {
    name: "Settings",
    icon: <FaCog />,
    path: "/admin/settings",
  },
];

function Sidebar() {
  return (
    <aside className="w-72 min-h-screen bg-slate-900 text-white flex flex-col shadow-2xl">

      <div className="p-8 border-b border-slate-700">

        <h1 className="text-3xl font-bold">
          CareerNest
        </h1>

        <p className="text-sm text-slate-400 mt-2">
          Admin Panel
        </p>

      </div>

      <nav className="flex-1 mt-6">

        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-8 py-4 transition duration-300
              ${
                isActive
                  ? "bg-blue-600 text-white border-r-4 border-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`
            }
          >
            <span className="text-xl">
              {item.icon}
            </span>

            <span className="font-medium">
              {item.name}
            </span>

          </NavLink>
        ))}

      </nav>

      <div className="p-6 border-t border-slate-700">

        <button
          className="flex items-center gap-3 w-full bg-red-500 hover:bg-red-600 rounded-xl py-3 justify-center transition"
        >
          <FaSignOutAlt />

          Logout
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;