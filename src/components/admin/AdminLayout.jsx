import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {
  LayoutDashboard,
  Users,
  UserCheck,
  Building2,
  Briefcase,
  FileText,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

import { useAuth } from "../../context/authcontext.jsx";


function AdminLayout({ children }) {

  const navigate = useNavigate();

  const {
    user,
    logout,
  } = useAuth();

  const [sidebarOpen, setSidebarOpen] =
    useState(false);


  // ============================================================
  // ADMIN MENU
  // IMPORTANT:
  // Admin runs on http://localhost:5175
  // Therefore we DON'T use /admin/... here.
  // ============================================================

  const menuItems = [

    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },

    {
      name: "Users",
      path: "/users",
      icon: Users,
    },

    {
      name: "Recruiters",
      path: "/recruiters",
      icon: UserCheck,
    },

    {
      name: "Companies",
      path: "/companies",
      icon: Building2,
    },

    {
      name: "Jobs",
      path: "/jobs",
      icon: Briefcase,
    },

    {
      name: "Applications",
      path: "/applications",
      icon: FileText,
    },

    {
      name: "Notifications",
      path: "/notifications",
      icon: Bell,
    },

    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
    },

  ];


  // ============================================================
  // LOGOUT
  // ============================================================

  const handleLogout = () => {

    logout();

    setSidebarOpen(false);

    // Admin login on localhost:5175
    navigate(
      "/login",
      {
        replace: true,
      }
    );

  };


  // ============================================================
  // SIDEBAR MENU ITEM
  // ============================================================

  const renderMenuItem = (item) => {

    const Icon = item.icon;

    return (

      <NavLink
        key={item.path}
        to={item.path}
        onClick={() =>
          setSidebarOpen(false)
        }
        className={({ isActive }) => `
          group
          flex
          items-center
          justify-between
          px-4
          py-3
          rounded-xl
          transition-all
          duration-200

          ${
            isActive
              ? "bg-blue-600 text-white shadow-md"
              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          }
        `}
      >

        {({ isActive }) => (

          <>

            {/* LEFT */}

            <div className="
              flex
              items-center
              gap-3
            ">

              <Icon
                size={19}
                strokeWidth={
                  isActive
                    ? 2.5
                    : 2
                }
              />

              <span className="
                text-sm
                font-medium
              ">

                {item.name}

              </span>

            </div>


            {/* ACTIVE ARROW */}

            {isActive && (

              <ChevronRight
                size={16}
              />

            )}

          </>

        )}

      </NavLink>

    );

  };


  // ============================================================
  // ADMIN LAYOUT
  // ============================================================

  return (

    <div className="
      min-h-screen
      bg-slate-50
    ">


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
            bg-black/40
            z-40
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
          top-0
          left-0
          z-50
          h-screen
          w-72
          bg-white
          border-r
          border-slate-200
          flex
          flex-col
          transition-transform
          duration-300

          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          lg:translate-x-0
        `}
      >


        {/* ====================================================
            BRAND
        ==================================================== */}

        <div className="
          h-20
          px-6
          border-b
          border-slate-200
          flex
          items-center
          justify-between
        ">


          <div className="
            flex
            items-center
            gap-3
          ">


            {/* LOGO */}

            <div className="
              w-10
              h-10
              rounded-xl
              bg-blue-600
              text-white
              flex
              items-center
              justify-center
              shadow-sm
            ">

              <ShieldCheck
                size={23}
              />

            </div>


            {/* NAME */}

            <div>

              <h1 className="
                text-lg
                font-bold
                text-slate-900
              ">

                CareerHub

              </h1>


              <p className="
                text-xs
                text-slate-400
              ">

                Admin Portal

              </p>

            </div>

          </div>


          {/* MOBILE CLOSE */}

          <button
            type="button"
            onClick={() =>
              setSidebarOpen(false)
            }
            className="
              lg:hidden
              text-slate-500
              hover:text-slate-900
            "
          >

            <X size={22} />

          </button>

        </div>


        {/* ====================================================
            ADMIN PROFILE
        ==================================================== */}

        <div className="
          px-5
          py-5
        ">

          <div className="
            bg-slate-50
            border
            border-slate-200
            rounded-xl
            p-4
          ">


            <div className="
              flex
              items-center
              gap-3
            ">


              {/* AVATAR */}

              <div className="
                w-10
                h-10
                rounded-full
                bg-blue-100
                text-blue-700
                flex
                items-center
                justify-center
                font-bold
              ">

                {(
                  user?.name ||
                  "A"
                )
                  .charAt(0)
                  .toUpperCase()}

              </div>


              {/* USER DETAILS */}

              <div className="
                min-w-0
              ">

                <p className="
                  text-sm
                  font-semibold
                  text-slate-900
                  truncate
                ">

                  {user?.name ||
                    "Administrator"}

                </p>


                <p className="
                  text-xs
                  text-slate-500
                  truncate
                ">

                  Administrator

                </p>

              </div>

            </div>

          </div>

        </div>


        {/* ====================================================
            NAVIGATION
        ==================================================== */}

        <nav className="
          flex-1
          px-4
          overflow-y-auto
        ">


          <p className="
            px-4
            mb-3
            text-xs
            font-semibold
            uppercase
            tracking-wider
            text-slate-400
          ">

            Management

          </p>


          <div className="
            space-y-1
          ">

            {menuItems.map(
              renderMenuItem
            )}

          </div>

        </nav>


        {/* ====================================================
            LOGOUT
        ==================================================== */}

        <div className="
          p-4
          border-t
          border-slate-200
        ">

          <button
            type="button"
            onClick={handleLogout}
            className="
              w-full
              flex
              items-center
              gap-3
              px-4
              py-3
              rounded-xl
              text-red-600
              hover:bg-red-50
              transition
            "
          >

            <LogOut
              size={19}
            />

            <span className="
              text-sm
              font-medium
            ">

              Logout

            </span>

          </button>

        </div>

      </aside>


      {/* ======================================================
          MAIN AREA
      ====================================================== */}

      <div className="
        lg:ml-72
        min-h-screen
      ">


        {/* ====================================================
            TOP HEADER
        ==================================================== */}

        <header className="
          h-20
          bg-white
          border-b
          border-slate-200
          px-4
          sm:px-6
          lg:px-8
          flex
          items-center
          justify-between
          sticky
          top-0
          z-30
        ">


          {/* MOBILE MENU */}

          <button
            type="button"
            onClick={() =>
              setSidebarOpen(true)
            }
            className="
              lg:hidden
              w-10
              h-10
              rounded-lg
              bg-slate-100
              text-slate-700
              flex
              items-center
              justify-center
            "
          >

            <Menu
              size={21}
            />

          </button>


          {/* DESKTOP TITLE */}

          <div className="
            hidden
            lg:block
          ">

            <p className="
              text-sm
              text-slate-500
            ">

              CareerHub Administration

            </p>

          </div>


          {/* RIGHT SIDE */}

          <div className="
            flex
            items-center
            gap-4
          ">


            {/* =================================================
                NOTIFICATION BUTTON
                IMPORTANT:
                /notifications instead of /admin/notifications
            ================================================= */}

            <button
              type="button"
              onClick={() =>
                navigate(
                  "/notifications"
                )
              }
              className="
                relative
                w-10
                h-10
                rounded-lg
                hover:bg-slate-100
                text-slate-600
                flex
                items-center
                justify-center
              "
              aria-label="Notifications"
            >

              <Bell
                size={20}
              />


              {/* NOTIFICATION DOT */}

              <span className="
                absolute
                top-2
                right-2
                w-2
                h-2
                bg-red-500
                rounded-full
              " />

            </button>


            {/* =================================================
                ADMIN NAME
            ================================================= */}

            <div className="
              hidden
              sm:flex
              items-center
              gap-3
            ">


              <div className="
                text-right
              ">

                <p className="
                  text-sm
                  font-semibold
                  text-slate-800
                ">

                  {user?.name ||
                    "Administrator"}

                </p>


                <p className="
                  text-xs
                  text-slate-500
                ">

                  Admin

                </p>

              </div>


              {/* HEADER AVATAR */}

              <div className="
                w-10
                h-10
                rounded-full
                bg-blue-600
                text-white
                flex
                items-center
                justify-center
                font-semibold
              ">

                {(
                  user?.name ||
                  "A"
                )
                  .charAt(0)
                  .toUpperCase()}

              </div>

            </div>

          </div>

        </header>


        {/* ====================================================
            PAGE CONTENT
        ==================================================== */}

        <main className="
          p-4
          sm:p-6
          lg:p-8
        ">

          {children}

        </main>

      </div>

    </div>

  );

}


export default AdminLayout;