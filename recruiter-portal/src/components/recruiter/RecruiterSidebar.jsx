import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  PlusCircle,
  Briefcase,
  Users,
  UserCircle,
} from "lucide-react";

function RecruiterSidebar() {
  const menu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },

    {
      name: "Create Job",
      path: "/create-job",
      icon: <PlusCircle size={20} />,
    },

    {
      name: "My Jobs",
      path: "/jobs",
      icon: <Briefcase size={20} />,
    },

    {
      name: "Applications",
      path: "/applications",
      icon: <Users size={20} />,
    },

    {
      name: "Profile",
      path: "/profile",
      icon: <UserCircle size={20} />,
    },
  ];

  return (
    <aside
      className="
        w-64
        min-h-screen
        bg-white
        border-r
        p-5
      "
    >
      <h1
        className="
          text-2xl
          font-bold
          text-blue-600
          mb-8
        "
      >
        CareerHub Recruiter
      </h1>

      <nav className="space-y-2">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-lg
              transition
              ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }
              `
            }
          >
            {item.icon}

            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default RecruiterSidebar;