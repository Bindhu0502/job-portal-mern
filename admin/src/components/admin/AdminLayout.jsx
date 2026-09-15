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
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";


// ============================================================
// ADMIN LAYOUT
// ============================================================

function AdminLayout() {
  const navigate = useNavigate();

  const [mobileSidebarOpen, setMobileSidebarOpen] =
    useState(false);

  const [sidebarCollapsed, setSidebarCollapsed] =
    useState(false);


  // ==========================================================
  // ADMIN USER
  // ==========================================================

  const getAdminUser = () => {
    try {
      const adminUser =
        localStorage.getItem("adminUser");

      const loggedInUser =
        localStorage.getItem("loggedInUser");

      const user =
        adminUser || loggedInUser;

      if (user) {
        const parsedUser =
          JSON.parse(user);

        return {
          name:
            parsedUser?.name ||
            "Administrator",

          email:
            parsedUser?.email ||
            "admin@careerhub.com",
        };
      }
    } catch (error) {
      console.error(
        "ADMIN USER LOAD ERROR:",
        error
      );
    }

    return {
      name: "Administrator",
      email: "admin@careerhub.com",
    };
  };


  const adminUser = getAdminUser();


  // ==========================================================
  // NAVIGATION
  // ==========================================================

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


  // ==========================================================
  // LOGOUT
  // ==========================================================

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("token");
    localStorage.removeItem("adminUser");
    localStorage.removeItem("loggedInUser");

    navigate("/login", {
      replace: true,
    });
  };


  // ==========================================================
  // SIDEBAR CONTENT
  // ==========================================================

  const SidebarContent = ({
    mobile = false,
  }) => {
    return (
      <div className="
        flex
        h-full
        flex-col
        bg-white
      ">

        {/* ==================================================
            LOGO
            ================================================== */}

        <div className="
          flex
          h-16
          shrink-0
          items-center
          border-b
          border-gray-200
          px-4
        ">

          <div className="
            flex
            w-full
            items-center
            justify-between
          ">

            <button
              type="button"
              onClick={() => {
                navigate("/admin/dashboard");
                setMobileSidebarOpen(false);
              }}
              className="
                flex
                min-w-0
                items-center
                gap-3
              "
            >

              <div className="
                flex
                h-9
                w-9
                shrink-0
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


              {(!sidebarCollapsed || mobile) && (
                <div className="
                  min-w-0
                  text-left
                ">

                  <p className="
                    truncate
                    text-base
                    font-bold
                    text-gray-900
                  ">
                    CareerHub
                  </p>

                  <p className="
                    text-[10px]
                    font-medium
                    uppercase
                    tracking-wide
                    text-gray-400
                  ">
                    Admin Panel
                  </p>

                </div>
              )}

            </button>


            {/* MOBILE CLOSE */}

            {mobile && (
              <button
                type="button"
                onClick={() =>
                  setMobileSidebarOpen(false)
                }
                className="
                  rounded-lg
                  p-2
                  text-gray-500
                  hover:bg-gray-100
                "
              >
                <X size={19} />
              </button>
            )}

          </div>

        </div>


        {/* ==================================================
            MENU
            ================================================== */}

        <nav className="
          flex-1
          overflow-y-auto
          px-3
          py-5
        ">

          {(!sidebarCollapsed || mobile) && (
            <p className="
              mb-3
              px-3
              text-[10px]
              font-bold
              uppercase
              tracking-wider
              text-gray-400
            ">
              Main Menu
            </p>
          )}


          <div className="
            space-y-1
          ">

            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  title={
                    sidebarCollapsed && !mobile
                      ? item.name
                      : undefined
                  }
                  onClick={() =>
                    setMobileSidebarOpen(false)
                  }
                  className={({ isActive }) => `
                    flex
                    h-11
                    items-center
                    gap-3
                    rounded-lg
                    px-3
                    text-sm
                    font-medium
                    transition
                    ${
                      sidebarCollapsed && !mobile
                        ? "justify-center"
                        : ""
                    }
                    ${
                      isActive
                        ? "bg-blue-600 text-white"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    }
                  `}
                >

                  {({ isActive }) => (
                    <>
                      <Icon
                        size={19}
                        className="shrink-0"
                        strokeWidth={
                          isActive ? 2.3 : 2
                        }
                      />

                      {(!sidebarCollapsed ||
                        mobile) && (
                        <span className="
                          truncate
                        ">
                          {item.name}
                        </span>
                      )}
                    </>
                  )}

                </NavLink>
              );
            })}

          </div>

        </nav>


        {/* ==================================================
            USER SECTION
            ================================================== */}

        <div className="
          shrink-0
          border-t
          border-gray-200
          p-3
        ">

          {(!sidebarCollapsed || mobile) && (
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
                {adminUser.name
                  .charAt(0)
                  .toUpperCase()}
              </div>


              <div className="
                min-w-0
              ">

                <p className="
                  truncate
                  text-xs
                  font-semibold
                  text-gray-900
                ">
                  {adminUser.name}
                </p>

                <p className="
                  truncate
                  text-[11px]
                  text-gray-500
                ">
                  {adminUser.email}
                </p>

              </div>

            </div>
          )}


          {sidebarCollapsed && !mobile && (
            <div className="
              mb-2
              flex
              justify-center
            ">

              <div className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                bg-blue-100
                text-sm
                font-bold
                text-blue-700
              ">
                {adminUser.name
                  .charAt(0)
                  .toUpperCase()}
              </div>

            </div>
          )}


          {/* LOGOUT */}

          <button
            type="button"
            onClick={handleLogout}
            title={
              sidebarCollapsed && !mobile
                ? "Logout"
                : undefined
            }
            className={`
              flex
              h-10
              w-full
              items-center
              gap-3
              rounded-lg
              px-3
              text-sm
              font-medium
              text-red-600
              transition
              hover:bg-red-50
              ${
                sidebarCollapsed && !mobile
                  ? "justify-center"
                  : ""
              }
            `}
          >

            <LogOut
              size={18}
              className="shrink-0"
            />

            {(!sidebarCollapsed || mobile) && (
              <span>
                Logout
              </span>
            )}

          </button>

        </div>

      </div>
    );
  };


  // ==========================================================
  // MAIN
  // ==========================================================

  return (
    <div className="
      min-h-screen
      w-full
      overflow-x-hidden
      bg-gray-50
    ">

      {/* ======================================================
          DESKTOP SIDEBAR
          ====================================================== */}

      <aside
        className={`
          fixed
          inset-y-0
          left-0
          z-40
          hidden
          border-r
          border-gray-200
          bg-white
          transition-all
          duration-200
          lg:block
          ${
            sidebarCollapsed
              ? "w-[76px]"
              : "w-[250px]"
          }
        `}
      >

        <SidebarContent />

        {/* COLLAPSE BUTTON */}

        <button
          type="button"
          onClick={() =>
            setSidebarCollapsed(
              (previous) => !previous
            )
          }
          className="
            absolute
            -right-3
            top-20
            flex
            h-7
            w-7
            items-center
            justify-center
            rounded-full
            border
            border-gray-200
            bg-white
            text-gray-500
            shadow-sm
            hover:bg-gray-50
          "
        >

          {sidebarCollapsed ? (
            <ChevronRight size={15} />
          ) : (
            <ChevronLeft size={15} />
          )}

        </button>

      </aside>


      {/* ======================================================
          MOBILE SIDEBAR
          ====================================================== */}

      {mobileSidebarOpen && (
        <div className="
          fixed
          inset-0
          z-[100]
          lg:hidden
        ">

          {/* BACKDROP */}

          <button
            type="button"
            aria-label="Close sidebar"
            onClick={() =>
              setMobileSidebarOpen(false)
            }
            className="
              absolute
              inset-0
              bg-black/40
            "
          />


          {/* SIDEBAR */}

          <aside className="
            absolute
            inset-y-0
            left-0
            w-[270px]
            bg-white
            shadow-xl
          ">

            <SidebarContent
              mobile
            />

          </aside>

        </div>
      )}


      {/* ======================================================
          CONTENT AREA
          ====================================================== */}

      <div
        className={`
          min-h-screen
          transition-all
          duration-200
          ${
            sidebarCollapsed
              ? "lg:pl-[76px]"
              : "lg:pl-[250px]"
          }
        `}
      >

        {/* ====================================================
            HEADER
            ==================================================== */}

        <header className="
          sticky
          top-0
          z-30
          flex
          h-16
          items-center
          justify-between
          border-b
          border-gray-200
          bg-white
          px-4
          sm:px-6
        ">

          {/* LEFT */}

          <div className="
            flex
            items-center
            gap-3
          ">

            {/* MOBILE MENU */}

            <button
              type="button"
              onClick={() =>
                setMobileSidebarOpen(true)
              }
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-lg
                text-gray-600
                hover:bg-gray-100
                lg:hidden
              "
            >
              <Menu size={21} />
            </button>


            <div className="
              hidden
              sm:block
            ">

              <p className="
                text-sm
                font-semibold
                text-gray-800
              ">
                Administration
              </p>

              <p className="
                text-[11px]
                text-gray-400
              ">
                CareerHub Management
              </p>

            </div>

          </div>


          {/* RIGHT */}

          <div className="
            flex
            items-center
            gap-2
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
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-lg
                text-gray-500
                hover:bg-gray-100
              "
              title="Notifications"
            >

              <Bell size={19} />

            </button>


            <div className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-full
              bg-blue-100
              text-sm
              font-bold
              text-blue-700
            ">

              {adminUser.name
                .charAt(0)
                .toUpperCase()}

            </div>

          </div>

        </header>


        {/* ====================================================
            PAGE
            ==================================================== */}

        <main className="
          w-full
          min-w-0
          p-4
          sm:p-6
          lg:p-7
        ">

          <div className="
            mx-auto
            w-full
            max-w-[1600px]
          ">

            <Outlet />

          </div>

        </main>

      </div>

    </div>
  );
}


export default AdminLayout;