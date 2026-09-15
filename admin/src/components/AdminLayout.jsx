import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  Users,
  Briefcase,
  FileText,
  Building2,
  Bell,
  Settings,
  Menu,
  X,
  LogOut,
  ChevronRight,
} from "lucide-react";

// ============================================================
// SIDEBAR ITEMS
// ============================================================

const menuItems = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: Users,
  },
  {
    name: "Jobs",
    path: "/admin/jobs",
    icon: Briefcase,
  },
  {
    name: "Applications",
    path: "/admin/applications",
    icon: FileText,
  },
  {
    name: "Companies",
    path: "/admin/companies",
    icon: Building2,
  },
  {
    name: "Notifications",
    path: "/admin/notifications",
    icon: Bell,
  },
  {
    name: "Settings",
    path: "/admin/settings",
    icon: Settings,
  },
];

// ============================================================
// ADMIN LAYOUT
// ============================================================

function AdminLayout() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  // ==========================================================
  // LOGOUT
  // ==========================================================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminToken");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("adminUser");

    navigate("/login", {
      replace: true,
    });
  };

  // ==========================================================
  // GET ADMIN USER
  // ==========================================================

  let adminUser = null;

  try {
    const storedUser =
      localStorage.getItem("adminUser") ||
      localStorage.getItem("loggedInUser");

    if (storedUser) {
      adminUser = JSON.parse(storedUser);
    }
  } catch (error) {
    console.error(
      "ADMIN USER ERROR:",
      error
    );
  }

  const adminName =
    adminUser?.name ||
    "Administrator";

  const adminEmail =
    adminUser?.email ||
    "admin@careerhub.com";

  // ==========================================================
  // CLOSE MOBILE SIDEBAR
  // ==========================================================

  const handleNavigation = () => {
    setSidebarOpen(false);
  };

  // ==========================================================
  // PAGE
  // ==========================================================

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-gray-50">

      {/* ======================================================
          MOBILE OVERLAY
          ====================================================== */}

      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() =>
            setSidebarOpen(false)
          }
          className="
            fixed
            inset-0
            z-40
            bg-black/40
            lg:hidden
          "
        />
      )}

      {/* ======================================================
          SIDEBAR
          ====================================================== */}

      <aside
        className={`
          fixed
          left-0
          top-0
          z-50
          flex
          h-screen
          w-64
          flex-col
          border-r
          border-gray-200
          bg-white
          transition-transform
          duration-300
          ease-in-out

          lg:translate-x-0

          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >

        {/* ==================================================
            LOGO
            ================================================== */}

        <div className="
          flex
          h-16
          shrink-0
          items-center
          justify-between
          border-b
          border-gray-200
          px-5
        ">

          <button
            type="button"
            onClick={() =>
              navigate(
                "/admin/dashboard"
              )
            }
            className="
              flex
              items-center
              gap-3
            "
          >

            <div className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              bg-blue-600
              text-sm
              font-bold
              text-white
            ">
              CH
            </div>

            <div className="text-left">

              <p className="
                text-base
                font-bold
                leading-tight
                text-gray-900
              ">
                CareerHub
              </p>

              <p className="
                text-[10px]
                font-medium
                uppercase
                tracking-wider
                text-gray-400
              ">
                Admin Panel
              </p>

            </div>

          </button>


          {/* MOBILE CLOSE */}

          <button
            type="button"
            onClick={() =>
              setSidebarOpen(false)
            }
            className="
              rounded-lg
              p-2
              text-gray-500
              hover:bg-gray-100
              lg:hidden
            "
          >
            <X size={19} />
          </button>

        </div>


        {/* ==================================================
            NAVIGATION
            ================================================== */}

        <nav className="
          flex-1
          overflow-y-auto
          overflow-x-hidden
          px-3
          py-5
        ">

          <p className="
            mb-3
            px-3
            text-[10px]
            font-bold
            uppercase
            tracking-wider
            text-gray-400
          ">
            Administration
          </p>


          <div className="
            space-y-1
          ">

            {menuItems.map(
              (item) => {

                const Icon =
                  item.icon;

                return (
                  <NavLink
                    key={
                      item.path
                    }
                    to={
                      item.path
                    }
                    onClick={
                      handleNavigation
                    }
                    className={({
                      isActive,
                    }) =>
                      `
                      group
                      flex
                      w-full
                      items-center
                      gap-3
                      rounded-lg
                      px-3
                      py-2.5
                      text-sm
                      font-medium
                      transition

                      ${
                        isActive
                          ? `
                            bg-blue-50
                            text-blue-700
                          `
                          : `
                            text-gray-600
                            hover:bg-gray-50
                            hover:text-gray-900
                          `
                      }
                      `
                    }
                  >

                    {({
                      isActive,
                    }) => (
                      <>
                        <Icon
                          size={18}
                          className={
                            isActive
                              ? "text-blue-600"
                              : "text-gray-400 group-hover:text-gray-600"
                          }
                        />

                        <span className="
                          min-w-0
                          flex-1
                          truncate
                        ">
                          {item.name}
                        </span>

                        {isActive && (
                          <ChevronRight
                            size={15}
                            className="
                              shrink-0
                              text-blue-500
                            "
                          />
                        )}
                      </>
                    )}

                  </NavLink>
                );
              }
            )}

          </div>

        </nav>


        {/* ==================================================
            ADMIN PROFILE
            ================================================== */}

        <div className="
          shrink-0
          border-t
          border-gray-200
          p-3
        ">

          <div className="
            mb-2
            flex
            items-center
            gap-3
            rounded-lg
            bg-gray-50
            p-3
          ">

            <div className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-blue-100
              text-sm
              font-bold
              text-blue-700
            ">
              {adminName
                .charAt(0)
                .toUpperCase()}
            </div>


            <div className="
              min-w-0
              flex-1
            ">

              <p className="
                truncate
                text-sm
                font-semibold
                text-gray-900
              ">
                {adminName}
              </p>

              <p className="
                truncate
                text-xs
                text-gray-500
              ">
                {adminEmail}
              </p>

            </div>

          </div>


          {/* LOGOUT */}

          <button
            type="button"
            onClick={
              handleLogout
            }
            className="
              flex
              w-full
              items-center
              gap-3
              rounded-lg
              px-3
              py-2.5
              text-sm
              font-medium
              text-red-600
              transition
              hover:bg-red-50
            "
          >

            <LogOut size={17} />

            Logout

          </button>

        </div>

      </aside>


      {/* ======================================================
          MAIN AREA
          ====================================================== */}

      <div className="
        min-h-screen
        w-full
        lg:pl-64
      ">

        {/* ====================================================
            TOP HEADER
            ==================================================== */}

        <header className="
          sticky
          top-0
          z-30
          flex
          h-16
          w-full
          items-center
          justify-between
          border-b
          border-gray-200
          bg-white/95
          px-4
          backdrop-blur
          sm:px-6
          lg:px-8
        ">

          {/* MOBILE MENU */}

          <button
            type="button"
            onClick={() =>
              setSidebarOpen(true)
            }
            className="
              rounded-lg
              p-2
              text-gray-600
              hover:bg-gray-100
              lg:hidden
            "
          >

            <Menu size={21} />

          </button>


          {/* DESKTOP TITLE */}

          <div className="
            hidden
            lg:block
          ">

            <p className="
              text-sm
              font-semibold
              text-gray-800
            ">
              CareerHub Administration
            </p>

            <p className="
              text-xs
              text-gray-400
            ">
              Manage your job portal
            </p>

          </div>


          {/* RIGHT SIDE */}

          <div className="
            ml-auto
            flex
            items-center
            gap-3
          ">

            <button
              type="button"
              onClick={() =>
                navigate(
                  "/admin/notifications"
                )
              }
              className="
                relative
                rounded-lg
                p-2
                text-gray-500
                hover:bg-gray-100
              "
            >

              <Bell size={19} />

            </button>


            <div className="
              hidden
              h-7
              w-px
              bg-gray-200
              sm:block
            " />


            <div className="
              hidden
              text-right
              sm:block
            ">

              <p className="
                max-w-[180px]
                truncate
                text-xs
                font-semibold
                text-gray-800
              ">
                {adminName}
              </p>

              <p className="
                text-[10px]
                text-gray-400
              ">
                Administrator
              </p>

            </div>


            <div className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-full
              bg-blue-100
              text-xs
              font-bold
              text-blue-700
            ">
              {adminName
                .charAt(0)
                .toUpperCase()}
            </div>

          </div>

        </header>


        {/* ====================================================
            PAGE CONTENT
            ==================================================== */}

        <main className="
          w-full
          min-w-0
          overflow-x-hidden
          px-4
          py-5
          sm:px-6
          sm:py-6
          lg:px-8
          lg:py-7
        ">

          <div className="
            mx-auto
            w-full
            max-w-[1600px]
            min-w-0
          ">

            <Outlet />

          </div>

        </main>

      </div>

    </div>
  );
}

export default AdminLayout;