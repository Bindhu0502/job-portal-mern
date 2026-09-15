import { useEffect, useState } from "react";

import {
  FaUsers,
  FaBriefcase,
  FaFileAlt,
  FaUserTie,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaChartPie,
} from "react-icons/fa";

import api from "../../services/api";


function AdminDashboard() {

  // ============================================================
  // STATE
  // ============================================================

  const [dashboard, setDashboard] = useState({

    totalUsers: 0,

    totalRecruiters: 0,

    totalAdmins: 0,

    pendingUsers: 0,

    approvedUsers: 0,

    rejectedUsers: 0,

    totalJobs: 0,

    activeJobs: 0,

    inactiveJobs: 0,

    totalApplications: 0,

    applicationStatus: {},

    jobCategories: [],

    jobLocations: [],

    recentUsers: [],

    recentJobs: [],

    recentApplications: [],

  });


  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  // ============================================================
  // FETCH ADMIN DASHBOARD
  // ============================================================

  useEffect(() => {

    fetchDashboard();

  }, []);


  const fetchDashboard = async () => {

    try {

      setLoading(true);

      setError("");


      const res = await api.get(
        "/admin/dashboard"
      );


      console.log(
        "ADMIN DASHBOARD:",
        res.data
      );


      setDashboard(
        res.data.dashboard || {}
      );

    }

    catch (error) {

      console.log(
        "ADMIN DASHBOARD ERROR:",
        error.response?.data || error
      );


      setError(
        error.response?.data?.message ||
        "Unable to load admin dashboard"
      );

    }

    finally {

      setLoading(false);

    }

  };


  // ============================================================
  // APPLICATION STATUS
  // ============================================================

  const applicationStatus =
    dashboard.applicationStatus || {};


  // ============================================================
  // DASHBOARD CARDS
  // ============================================================

  const cards = [

    {
      title: "Total Users",
      value: dashboard.totalUsers || 0,
      icon: <FaUsers />,
      color: "bg-blue-600",
    },

    {
      title: "Recruiters",
      value: dashboard.totalRecruiters || 0,
      icon: <FaUserTie />,
      color: "bg-purple-600",
    },

    {
      title: "Total Jobs",
      value: dashboard.totalJobs || 0,
      icon: <FaBriefcase />,
      color: "bg-green-600",
    },

    {
      title: "Applications",
      value: dashboard.totalApplications || 0,
      icon: <FaFileAlt />,
      color: "bg-orange-600",
    },

  ];


  // ============================================================
  // APPLICATION STATUS CARDS
  // ============================================================

  const statusCards = [

    {
      title: "Applied",
      value: applicationStatus.Applied || 0,
      icon: <FaClock />,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },

    {
      title: "Reviewed",
      value: applicationStatus.Reviewed || 0,
      icon: <FaFileAlt />,
      color: "text-yellow-600",
      bg: "bg-yellow-50",
    },

    {
      title: "Shortlisted",
      value: applicationStatus.Shortlisted || 0,
      icon: <FaUserTie />,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },

    {
      title: "Selected",
      value: applicationStatus.Selected || 0,
      icon: <FaCheckCircle />,
      color: "text-green-600",
      bg: "bg-green-50",
    },

    {
      title: "Rejected",
      value: applicationStatus.Rejected || 0,
      icon: <FaTimesCircle />,
      color: "text-red-600",
      bg: "bg-red-50",
    },

  ];


  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {

    return (

      <div className="
        min-h-[500px]
        flex
        flex-col
        items-center
        justify-center
      ">

        <div className="
          w-12
          h-12
          border-4
          border-blue-200
          border-t-blue-600
          rounded-full
          animate-spin
        " />

        <p className="
          mt-4
          text-gray-500
        ">

          Loading Admin Dashboard...

        </p>

      </div>

    );

  }


  // ============================================================
  // MAIN UI
  // ============================================================

  return (

    <div className="space-y-8">


      {/* ========================================================
          HEADER
      ======================================================== */}

      <div>

        <h1 className="
          text-3xl
          font-bold
          text-gray-800
        ">

          Admin Dashboard

        </h1>


        <p className="
          text-gray-500
          mt-2
        ">

          Manage and monitor the CareerHub platform.

        </p>

      </div>


      {/* ========================================================
          ERROR
      ======================================================== */}

      {error && (

        <div className="
          bg-red-50
          border
          border-red-200
          text-red-700
          rounded-xl
          p-4
        ">

          {error}

        </div>

      )}


      {/* ========================================================
          MAIN STATISTICS
      ======================================================== */}

      <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-4
        gap-6
      ">

        {cards.map((card) => (

          <div
            key={card.title}
            className="
              bg-white
              rounded-xl
              shadow-sm
              border
              border-gray-100
              p-6
              flex
              justify-between
              items-center
            "
          >

            <div>

              <p className="
                text-gray-500
                text-sm
              ">

                {card.title}

              </p>


              <h2 className="
                text-3xl
                font-bold
                mt-2
                text-gray-800
              ">

                {card.value}

              </h2>

            </div>


            <div
              className={`
                ${card.color}
                text-white
                w-14
                h-14
                rounded-full
                flex
                items-center
                justify-center
                text-xl
              `}
            >

              {card.icon}

            </div>

          </div>

        ))}

      </div>


      {/* ========================================================
          JOB STATUS
      ======================================================== */}

      <div className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-6
      ">


        <div className="
          bg-white
          rounded-xl
          shadow-sm
          border
          p-6
        ">

          <p className="text-gray-500">
            Active Jobs
          </p>


          <h2 className="
            text-3xl
            font-bold
            text-green-600
            mt-2
          ">

            {dashboard.activeJobs || 0}

          </h2>

        </div>


        <div className="
          bg-white
          rounded-xl
          shadow-sm
          border
          p-6
        ">

          <p className="text-gray-500">
            Inactive Jobs
          </p>


          <h2 className="
            text-3xl
            font-bold
            text-red-600
            mt-2
          ">

            {dashboard.inactiveJobs || 0}

          </h2>

        </div>


        <div className="
          bg-white
          rounded-xl
          shadow-sm
          border
          p-6
        ">

          <p className="text-gray-500">
            Pending Users
          </p>


          <h2 className="
            text-3xl
            font-bold
            text-yellow-600
            mt-2
          ">

            {dashboard.pendingUsers || 0}

          </h2>

        </div>

      </div>


      {/* ========================================================
          APPLICATION STATUS
      ======================================================== */}

      <div>

        <div className="
          flex
          items-center
          gap-2
          mb-4
        ">

          <FaChartPie className="text-blue-600" />

          <h2 className="
            text-xl
            font-bold
            text-gray-800
          ">

            Application Status

          </h2>

        </div>


        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-5
          gap-4
        ">

          {statusCards.map((card) => (

            <div
              key={card.title}
              className="
                bg-white
                rounded-xl
                shadow-sm
                border
                p-5
              "
            >

              <div className="
                flex
                justify-between
                items-center
              ">

                <div>

                  <p className="
                    text-gray-500
                    text-sm
                  ">

                    {card.title}

                  </p>


                  <h3 className={`
                    text-2xl
                    font-bold
                    mt-2
                    ${card.color}
                  `}>

                    {card.value}

                  </h3>

                </div>


                <div className={`
                  ${card.bg}
                  ${card.color}
                  w-10
                  h-10
                  rounded-full
                  flex
                  items-center
                  justify-center
                `}>

                  {card.icon}

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>


      {/* ========================================================
          RECENT JOBS + RECENT USERS
      ======================================================== */}

      <div className="
        grid
        lg:grid-cols-2
        gap-6
      ">


        {/* ======================================================
            RECENT JOBS
        ====================================================== */}

        <div className="
          bg-white
          rounded-xl
          shadow-sm
          border
          p-6
        ">

          <div className="
            flex
            justify-between
            items-center
            mb-5
          ">

            <h2 className="
              text-xl
              font-bold
            ">

              Recent Jobs

            </h2>


            <FaBriefcase className="text-green-600" />

          </div>


          {dashboard.recentJobs?.length > 0 ? (

            <div className="space-y-4">

              {dashboard.recentJobs.map((job) => (

                <div
                  key={job._id}
                  className="
                    border-b
                    pb-4
                    last:border-b-0
                  "
                >

                  <div className="
                    flex
                    justify-between
                    gap-3
                  ">

                    <div>

                      <h3 className="
                        font-semibold
                        text-gray-800
                      ">

                        {job.title || "Job"}

                      </h3>


                      <p className="
                        text-sm
                        text-gray-500
                        mt-1
                      ">

                        {job.company || "Company"}

                      </p>


                      <p className="
                        text-xs
                        text-gray-400
                        mt-1
                      ">

                        {job.location || "Location"}

                      </p>

                    </div>


                    <span className={`
                      h-fit
                      px-3
                      py-1
                      rounded-full
                      text-xs
                      font-semibold
                      ${
                        job.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }
                    `}>

                      {job.isActive
                        ? "Active"
                        : "Inactive"
                      }

                    </span>

                  </div>

                </div>

              ))}

            </div>

          ) : (

            <p className="
              text-gray-500
              text-center
              py-8
            ">

              No jobs found.

            </p>

          )}

        </div>


        {/* ======================================================
            RECENT USERS
        ====================================================== */}

        <div className="
          bg-white
          rounded-xl
          shadow-sm
          border
          p-6
        ">

          <div className="
            flex
            justify-between
            items-center
            mb-5
          ">

            <h2 className="
              text-xl
              font-bold
            ">

              Recent Users

            </h2>


            <FaUsers className="text-blue-600" />

          </div>


          {dashboard.recentUsers?.length > 0 ? (

            <div className="space-y-4">

              {dashboard.recentUsers.map((user) => (

                <div
                  key={user._id}
                  className="
                    flex
                    justify-between
                    items-center
                    border-b
                    pb-4
                    last:border-b-0
                  "
                >

                  <div className="
                    flex
                    items-center
                    gap-3
                  ">

                    <div className="
                      w-10
                      h-10
                      rounded-full
                      bg-blue-100
                      text-blue-600
                      flex
                      items-center
                      justify-center
                      font-bold
                    ">

                      {(user.name || "U")
                        .charAt(0)
                        .toUpperCase()
                      }

                    </div>


                    <div>

                      <h3 className="
                        font-semibold
                        text-gray-800
                      ">

                        {user.name || "User"}

                      </h3>


                      <p className="
                        text-xs
                        text-gray-500
                      ">

                        {user.email || "Email unavailable"}

                      </p>

                    </div>

                  </div>


                  <span className="
                    bg-gray-100
                    text-gray-700
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    capitalize
                  ">

                    {user.role || "candidate"}

                  </span>

                </div>

              ))}

            </div>

          ) : (

            <p className="
              text-gray-500
              text-center
              py-8
            ">

              No users found.

            </p>

          )}

        </div>

      </div>


      {/* ========================================================
          RECENT APPLICATIONS
      ======================================================== */}

      <div className="
        bg-white
        rounded-xl
        shadow-sm
        border
        p-6
      ">

        <div className="
          flex
          justify-between
          items-center
          mb-5
        ">

          <h2 className="
            text-xl
            font-bold
          ">

            Recent Applications

          </h2>


          <FaFileAlt className="text-orange-600" />

        </div>


        {dashboard.recentApplications?.length > 0 ? (

          <div className="
            overflow-x-auto
          ">

            <table className="
              w-full
              text-left
            ">

              <thead>

                <tr className="
                  border-b
                  text-gray-500
                  text-sm
                ">

                  <th className="p-3">
                    Candidate
                  </th>

                  <th className="p-3">
                    Job
                  </th>

                  <th className="p-3">
                    Company
                  </th>

                  <th className="p-3">
                    Status
                  </th>

                  <th className="p-3">
                    Date
                  </th>

                </tr>

              </thead>


              <tbody>

                {dashboard.recentApplications.map(
                  (application) => (

                    <tr
                      key={application._id}
                      className="
                        border-b
                        last:border-b-0
                        hover:bg-gray-50
                      "
                    >

                      <td className="p-3">

                        <div>

                          <p className="
                            font-semibold
                            text-gray-800
                          ">

                            {application.user?.name ||
                              "Candidate"
                            }

                          </p>


                          <p className="
                            text-xs
                            text-gray-500
                          ">

                            {application.user?.email ||
                              "Email unavailable"
                            }

                          </p>

                        </div>

                      </td>


                      <td className="
                        p-3
                        text-gray-700
                      ">

                        {application.job?.title ||
                          "Job"
                        }

                      </td>


                      <td className="
                        p-3
                        text-gray-600
                      ">

                        {application.job?.company ||
                          "Company"
                        }

                      </td>


                      <td className="p-3">

                        <span className={`
                          px-3
                          py-1
                          rounded-full
                          text-xs
                          font-semibold
                          ${
                            application.status ===
                            "Selected"

                              ? "bg-green-100 text-green-700"

                              : application.status ===
                                "Rejected"

                              ? "bg-red-100 text-red-700"

                              : application.status ===
                                "Shortlisted"

                              ? "bg-purple-100 text-purple-700"

                              : "bg-blue-100 text-blue-700"
                          }
                        `}>

                          {application.status ||
                            "Applied"
                          }

                        </span>

                      </td>


                      <td className="
                        p-3
                        text-sm
                        text-gray-500
                      ">

                        {application.createdAt

                          ? new Date(
                              application.createdAt
                            ).toLocaleDateString()

                          : "-"
                        }

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        ) : (

          <p className="
            text-gray-500
            text-center
            py-10
          ">

            No applications found.

          </p>

        )}

      </div>


      {/* ========================================================
          JOB CATEGORIES
      ======================================================== */}

      <div className="
        grid
        lg:grid-cols-2
        gap-6
      ">


        {/* JOB CATEGORIES */}

        <div className="
          bg-white
          rounded-xl
          shadow-sm
          border
          p-6
        ">

          <h2 className="
            text-xl
            font-bold
            mb-5
          ">

            Job Categories

          </h2>


          {dashboard.jobCategories?.length > 0 ? (

            <div className="space-y-4">

              {dashboard.jobCategories.map(
                (category) => (

                  <div
                    key={category.name}
                    className="
                      flex
                      justify-between
                      items-center
                    "
                  >

                    <span className="
                      text-gray-700
                    ">

                      {category.name}

                    </span>


                    <span className="
                      bg-blue-100
                      text-blue-700
                      px-3
                      py-1
                      rounded-full
                      text-sm
                      font-semibold
                    ">

                      {category.value}

                    </span>

                  </div>

                )
              )}

            </div>

          ) : (

            <p className="
              text-gray-500
            ">

              No category data available.

            </p>

          )}

        </div>


        {/* JOB LOCATIONS */}

        <div className="
          bg-white
          rounded-xl
          shadow-sm
          border
          p-6
        ">

          <h2 className="
            text-xl
            font-bold
            mb-5
          ">

            Job Locations

          </h2>


          {dashboard.jobLocations?.length > 0 ? (

            <div className="space-y-4">

              {dashboard.jobLocations.map(
                (location) => (

                  <div
                    key={location.name}
                    className="
                      flex
                      justify-between
                      items-center
                    "
                  >

                    <span className="
                      text-gray-700
                    ">

                      {location.name}

                    </span>


                    <span className="
                      bg-green-100
                      text-green-700
                      px-3
                      py-1
                      rounded-full
                      text-sm
                      font-semibold
                    ">

                      {location.value}

                    </span>

                  </div>

                )
              )}

            </div>

          ) : (

            <p className="
              text-gray-500
            ">

              No location data available.

            </p>

          )}

        </div>

      </div>


    </div>

  );

}


export default AdminDashboard;