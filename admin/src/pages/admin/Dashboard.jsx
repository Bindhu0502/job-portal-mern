import { useEffect, useState } from "react";

import {
  Users,
  UserCheck,
  ShieldCheck,
  Briefcase,
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  RefreshCw,
  MapPin,
  BarChart3,
  AlertCircle,
} from "lucide-react";

import axios from "axios";


// ============================================================
// API
// ============================================================

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";


// ============================================================
// DEFAULT DASHBOARD DATA
// ============================================================

const defaultDashboard = {
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

  applicationStatus: {
    Applied: 0,
    Reviewed: 0,
    Shortlisted: 0,
    Interview: 0,
    Selected: 0,
    Rejected: 0,
    Hired: 0,
  },

  jobCategories: [],
  jobLocations: [],

  recentUsers: [],
  recentJobs: [],
  recentApplications: [],
};


// ============================================================
// DASHBOARD
// ============================================================

function Dashboard() {

  const [dashboard, setDashboard] =
    useState(defaultDashboard);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [refreshing, setRefreshing] =
    useState(false);


  // ==========================================================
  // FETCH DASHBOARD
  // ==========================================================

  const fetchDashboard = async (
    showRefresh = false
  ) => {

    try {

      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");


      const token =
        localStorage.getItem(
          "adminToken"
        ) ||
        localStorage.getItem(
          "token"
        );


      const response =
        await axios.get(
          `${API_URL}/admin/dashboard`,
          {
            headers: token
              ? {
                  Authorization:
                    `Bearer ${token}`,
                }
              : {},
          }
        );


      if (
        response.data?.success
      ) {

        setDashboard({
          ...defaultDashboard,
          ...(response.data.dashboard || {}),
          applicationStatus: {
            ...defaultDashboard.applicationStatus,
            ...(response.data.dashboard
              ?.applicationStatus || {}),
          },
        });

      } else {

        throw new Error(
          response.data?.message ||
          "Failed to load dashboard"
        );

      }

    } catch (err) {

      console.error(
        "DASHBOARD ERROR:",
        err
      );


      const message =
        err.response?.data?.message ||
        err.message ||
        "Unable to load dashboard";


      setError(message);

    } finally {

      setLoading(false);
      setRefreshing(false);

    }

  };


  // ==========================================================
  // INITIAL LOAD
  // ==========================================================

  useEffect(() => {

    fetchDashboard();

  }, []);


  // ==========================================================
  // REFRESH
  // ==========================================================

  const handleRefresh = () => {
    fetchDashboard(true);
  };


  // ==========================================================
  // FORMAT NUMBER
  // ==========================================================

  const formatNumber = (
    value
  ) => {

    const number =
      Number(value) || 0;

    return number.toLocaleString(
      "en-IN"
    );

  };


  // ==========================================================
  // FORMAT DATE
  // ==========================================================

  const formatDate = (
    date
  ) => {

    if (!date) {
      return "—";
    }


    const parsed =
      new Date(date);


    if (
      Number.isNaN(
        parsed.getTime()
      )
    ) {

      return "—";

    }


    return parsed.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );

  };


  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {

    return (
      <div className="
        flex
        min-h-[400px]
        items-center
        justify-center
      ">

        <div className="
          text-center
        ">

          <RefreshCw
            size={30}
            className="
              mx-auto
              animate-spin
              text-blue-600
            "
          />

          <p className="
            mt-3
            text-sm
            font-medium
            text-gray-600
          ">
            Loading dashboard...
          </p>

        </div>

      </div>
    );

  }


  // ==========================================================
  // PAGE
  // ==========================================================

  return (

    <div className="
      w-full
      min-w-0
    ">

      {/* ======================================================
          HEADER
          ====================================================== */}

      <div className="
        mb-6
        flex
        flex-col
        gap-4
        sm:flex-row
        sm:items-center
        sm:justify-between
      ">

        <div>

          <h1 className="
            text-2xl
            font-bold
            text-gray-900
            sm:text-3xl
          ">
            Dashboard
          </h1>

          <p className="
            mt-1
            text-sm
            text-gray-500
          ">
            Overview of your CareerHub platform.
          </p>

        </div>


        <button
          type="button"
          onClick={handleRefresh}
          disabled={refreshing}
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            self-start
            rounded-lg
            border
            border-gray-200
            bg-white
            px-4
            py-2.5
            text-sm
            font-medium
            text-gray-700
            transition
            hover:bg-gray-50
            disabled:cursor-not-allowed
            disabled:opacity-60
            sm:self-auto
          "
        >

          <RefreshCw
            size={16}
            className={
              refreshing
                ? "animate-spin"
                : ""
            }
          />

          Refresh

        </button>

      </div>


      {/* ======================================================
          ERROR
          ====================================================== */}

      {error && (

        <div className="
          mb-6
          flex
          items-start
          gap-3
          rounded-xl
          border
          border-red-200
          bg-red-50
          p-4
        ">

          <AlertCircle
            size={20}
            className="
              mt-0.5
              shrink-0
              text-red-600
            "
          />

          <div>

            <p className="
              text-sm
              font-semibold
              text-red-800
            ">
              Unable to load dashboard
            </p>

            <p className="
              mt-1
              text-xs
              text-red-700
            ">
              {error}
            </p>

          </div>

        </div>

      )}


      {/* ======================================================
          USER STATISTICS
          ====================================================== */}

      <div className="
        grid
        grid-cols-1
        gap-4
        sm:grid-cols-2
        xl:grid-cols-4
      ">

        <StatCard
          title="Total Candidates"
          value={dashboard.totalUsers}
          icon={Users}
        />

        <StatCard
          title="Recruiters"
          value={dashboard.totalRecruiters}
          icon={UserCheck}
        />

        <StatCard
          title="Administrators"
          value={dashboard.totalAdmins}
          icon={ShieldCheck}
        />

        <StatCard
          title="Total Jobs"
          value={dashboard.totalJobs}
          icon={Briefcase}
        />

      </div>


      {/* ======================================================
          JOB + APPLICATION CARDS
          ====================================================== */}

      <div className="
        mt-4
        grid
        grid-cols-1
        gap-4
        sm:grid-cols-2
        xl:grid-cols-4
      ">

        <StatCard
          title="Active Jobs"
          value={dashboard.activeJobs}
          icon={CheckCircle}
        />

        <StatCard
          title="Inactive Jobs"
          value={dashboard.inactiveJobs}
          icon={XCircle}
        />

        <StatCard
          title="Applications"
          value={dashboard.totalApplications}
          icon={FileText}
        />

        <StatCard
          title="Pending Users"
          value={dashboard.pendingUsers}
          icon={Clock}
        />

      </div>


      {/* ======================================================
          USER STATUS + JOB STATUS
          ====================================================== */}

      <div className="
        mt-6
        grid
        grid-cols-1
        gap-6
        xl:grid-cols-2
      ">

        {/* USER STATUS */}

        <DashboardCard
          title="User Status"
          icon={Users}
        >

          <div className="
            grid
            grid-cols-1
            gap-3
            sm:grid-cols-3
          ">

            <StatusBox
              label="Pending"
              value={dashboard.pendingUsers}
              className="
                bg-yellow-50
                text-yellow-700
              "
            />

            <StatusBox
              label="Approved"
              value={dashboard.approvedUsers}
              className="
                bg-green-50
                text-green-700
              "
            />

            <StatusBox
              label="Rejected"
              value={dashboard.rejectedUsers}
              className="
                bg-red-50
                text-red-700
              "
            />

          </div>

        </DashboardCard>


        {/* JOB STATUS */}

        <DashboardCard
          title="Job Status"
          icon={Briefcase}
        >

          <div className="
            grid
            grid-cols-1
            gap-3
            sm:grid-cols-2
          ">

            <StatusBox
              label="Active Jobs"
              value={dashboard.activeJobs}
              className="
                bg-green-50
                text-green-700
              "
            />

            <StatusBox
              label="Inactive Jobs"
              value={dashboard.inactiveJobs}
              className="
                bg-gray-100
                text-gray-700
              "
            />

          </div>

        </DashboardCard>

      </div>


      {/* ======================================================
          APPLICATION STATUS
          ====================================================== */}

      <div className="mt-6">

        <DashboardCard
          title="Application Status"
          icon={FileText}
        >

          <div className="
            grid
            grid-cols-2
            gap-3
            sm:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-7
          ">

            <StatusBox
              label="Applied"
              value={
                dashboard.applicationStatus
                  ?.Applied
              }
              className="
                bg-blue-50
                text-blue-700
              "
            />

            <StatusBox
              label="Reviewed"
              value={
                dashboard.applicationStatus
                  ?.Reviewed
              }
              className="
                bg-purple-50
                text-purple-700
              "
            />

            <StatusBox
              label="Shortlisted"
              value={
                dashboard.applicationStatus
                  ?.Shortlisted
              }
              className="
                bg-indigo-50
                text-indigo-700
              "
            />

            <StatusBox
              label="Interview"
              value={
                dashboard.applicationStatus
                  ?.Interview
              }
              className="
                bg-yellow-50
                text-yellow-700
              "
            />

            <StatusBox
              label="Selected"
              value={
                dashboard.applicationStatus
                  ?.Selected
              }
              className="
                bg-green-50
                text-green-700
              "
            />

            <StatusBox
              label="Rejected"
              value={
                dashboard.applicationStatus
                  ?.Rejected
              }
              className="
                bg-red-50
                text-red-700
              "
            />

            <StatusBox
              label="Hired"
              value={
                dashboard.applicationStatus
                  ?.Hired
              }
              className="
                bg-emerald-50
                text-emerald-700
              "
            />

          </div>

        </DashboardCard>

      </div>


      {/* ======================================================
          CATEGORIES + LOCATIONS
          ====================================================== */}

      <div className="
        mt-6
        grid
        grid-cols-1
        gap-6
        xl:grid-cols-2
      ">

        {/* CATEGORIES */}

        <DashboardCard
          title="Top Job Categories"
          icon={BarChart3}
        >

          {dashboard.jobCategories?.length ? (

            <div className="
              space-y-3
            ">

              {dashboard.jobCategories.map(
                (item, index) => (

                  <div
                    key={`${item.name}-${index}`}
                    className="
                      flex
                      items-center
                      justify-between
                      gap-4
                    "
                  >

                    <div className="
                      min-w-0
                      flex-1
                    ">

                      <p className="
                        truncate
                        text-sm
                        font-medium
                        text-gray-700
                      ">
                        {item.name}
                      </p>

                    </div>


                    <span className="
                      shrink-0
                      rounded-full
                      bg-blue-50
                      px-3
                      py-1
                      text-xs
                      font-semibold
                      text-blue-700
                    ">
                      {formatNumber(
                        item.value
                      )}
                    </span>

                  </div>

                )
              )}

            </div>

          ) : (

            <EmptyText text="No job categories available." />

          )}

        </DashboardCard>


        {/* LOCATIONS */}

        <DashboardCard
          title="Top Job Locations"
          icon={MapPin}
        >

          {dashboard.jobLocations?.length ? (

            <div className="
              space-y-3
            ">

              {dashboard.jobLocations.map(
                (item, index) => (

                  <div
                    key={`${item.name}-${index}`}
                    className="
                      flex
                      items-center
                      justify-between
                      gap-4
                    "
                  >

                    <div className="
                      flex
                      min-w-0
                      items-center
                      gap-2
                    ">

                      <MapPin
                        size={15}
                        className="
                          shrink-0
                          text-gray-400
                        "
                      />

                      <p className="
                        truncate
                        text-sm
                        font-medium
                        text-gray-700
                      ">
                        {item.name}
                      </p>

                    </div>


                    <span className="
                      shrink-0
                      rounded-full
                      bg-gray-100
                      px-3
                      py-1
                      text-xs
                      font-semibold
                      text-gray-700
                    ">
                      {formatNumber(
                        item.value
                      )}
                    </span>

                  </div>

                )
              )}

            </div>

          ) : (

            <EmptyText text="No job locations available." />

          )}

        </DashboardCard>

      </div>


      {/* ======================================================
          RECENT USERS
          ====================================================== */}

      <div className="
        mt-6
        grid
        grid-cols-1
        gap-6
        xl:grid-cols-2
      ">

        <DashboardCard
          title="Recent Users"
          icon={Users}
        >

          {dashboard.recentUsers?.length ? (

            <div className="
              overflow-x-auto
            ">

              <table className="
                w-full
                min-w-[500px]
              ">

                <thead>

                  <tr className="
                    border-b
                    border-gray-100
                  ">

                    <th className="
                      px-2
                      py-3
                      text-left
                      text-xs
                      font-semibold
                      text-gray-500
                    ">
                      User
                    </th>

                    <th className="
                      px-2
                      py-3
                      text-left
                      text-xs
                      font-semibold
                      text-gray-500
                    ">
                      Role
                    </th>

                    <th className="
                      px-2
                      py-3
                      text-right
                      text-xs
                      font-semibold
                      text-gray-500
                    ">
                      Date
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {dashboard.recentUsers.map(
                    (user) => (

                      <tr
                        key={user._id}
                        className="
                          border-b
                          border-gray-50
                          last:border-0
                        "
                      >

                        <td className="
                          px-2
                          py-3
                        ">

                          <div className="
                            flex
                            min-w-0
                            items-center
                            gap-3
                          ">

                            <div className="
                              flex
                              h-8
                              w-8
                              shrink-0
                              items-center
                              justify-center
                              rounded-full
                              bg-blue-50
                              text-xs
                              font-bold
                              text-blue-600
                            ">

                              {String(
                                user.name ||
                                "U"
                              )
                                .charAt(0)
                                .toUpperCase()}

                            </div>


                            <div className="
                              min-w-0
                            ">

                              <p className="
                                truncate
                                text-sm
                                font-semibold
                                text-gray-800
                              ">
                                {user.name ||
                                  "Unknown"}
                              </p>

                              <p className="
                                truncate
                                text-xs
                                text-gray-400
                              ">
                                {user.email ||
                                  "—"}
                              </p>

                            </div>

                          </div>

                        </td>


                        <td className="
                          px-2
                          py-3
                        ">

                          <span className="
                            rounded-full
                            bg-gray-100
                            px-2.5
                            py-1
                            text-[11px]
                            font-semibold
                            capitalize
                            text-gray-600
                          ">
                            {user.role ||
                              "candidate"}
                          </span>

                        </td>


                        <td className="
                          whitespace-nowrap
                          px-2
                          py-3
                          text-right
                          text-xs
                          text-gray-500
                        ">
                          {formatDate(
                            user.createdAt
                          )}
                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          ) : (

            <EmptyText text="No recent users found." />

          )}

        </DashboardCard>


        {/* ==================================================
            RECENT JOBS
            ================================================== */}

        <DashboardCard
          title="Recent Jobs"
          icon={Briefcase}
        >

          {dashboard.recentJobs?.length ? (

            <div className="
              space-y-3
            ">

              {dashboard.recentJobs.map(
                (job) => (

                  <div
                    key={job._id}
                    className="
                      rounded-lg
                      border
                      border-gray-100
                      p-3
                    "
                  >

                    <div className="
                      flex
                      items-start
                      justify-between
                      gap-3
                    ">

                      <div className="
                        min-w-0
                      ">

                        <p className="
                          truncate
                          text-sm
                          font-semibold
                          text-gray-800
                        ">
                          {job.title ||
                            "Untitled Job"}
                        </p>

                        <p className="
                          mt-1
                          truncate
                          text-xs
                          text-gray-500
                        ">
                          {job.company ||
                            "Company not specified"}
                        </p>

                      </div>


                      <span
                        className={`
                          shrink-0
                          rounded-full
                          px-2.5
                          py-1
                          text-[11px]
                          font-semibold
                          ${
                            job.isActive
                              ? "bg-green-50 text-green-700"
                              : "bg-gray-100 text-gray-600"
                          }
                        `}
                      >
                        {job.isActive
                          ? "Active"
                          : "Inactive"}
                      </span>

                    </div>


                    <div className="
                      mt-2
                      flex
                      items-center
                      justify-between
                    ">

                      <span className="
                        text-xs
                        text-gray-400
                      ">
                        {job.location ||
                          "Location not specified"}
                      </span>

                      <span className="
                        text-xs
                        text-gray-400
                      ">
                        {formatDate(
                          job.createdAt
                        )}
                      </span>

                    </div>

                  </div>

                )
              )}

            </div>

          ) : (

            <EmptyText text="No recent jobs found." />

          )}

        </DashboardCard>

      </div>


      {/* ======================================================
          RECENT APPLICATIONS
          ====================================================== */}

      <div className="mt-6">

        <DashboardCard
          title="Recent Applications"
          icon={FileText}
        >

          {dashboard.recentApplications?.length ? (

            <div className="
              overflow-x-auto
            ">

              <table className="
                w-full
                min-w-[700px]
              ">

                <thead>

                  <tr className="
                    border-b
                    border-gray-100
                  ">

                    <th className="
                      px-3
                      py-3
                      text-left
                      text-xs
                      font-semibold
                      text-gray-500
                    ">
                      Candidate
                    </th>

                    <th className="
                      px-3
                      py-3
                      text-left
                      text-xs
                      font-semibold
                      text-gray-500
                    ">
                      Job
                    </th>

                    <th className="
                      px-3
                      py-3
                      text-left
                      text-xs
                      font-semibold
                      text-gray-500
                    ">
                      Status
                    </th>

                    <th className="
                      px-3
                      py-3
                      text-right
                      text-xs
                      font-semibold
                      text-gray-500
                    ">
                      Date
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {dashboard.recentApplications.map(
                    (application) => (

                      <tr
                        key={
                          application._id
                        }
                        className="
                          border-b
                          border-gray-50
                          last:border-0
                        "
                      >

                        <td className="
                          px-3
                          py-3
                        ">

                          <p className="
                            text-sm
                            font-semibold
                            text-gray-800
                          ">
                            {
                              application.user
                                ?.name ||
                              "Unknown"
                            }
                          </p>

                          <p className="
                            mt-0.5
                            text-xs
                            text-gray-400
                          ">
                            {
                              application.user
                                ?.email ||
                              "—"
                            }
                          </p>

                        </td>


                        <td className="
                          px-3
                          py-3
                        ">

                          <p className="
                            text-sm
                            font-medium
                            text-gray-700
                          ">
                            {
                              application.job
                                ?.title ||
                              "Unknown Job"
                            }
                          </p>

                          <p className="
                            mt-0.5
                            text-xs
                            text-gray-400
                          ">
                            {
                              application.job
                                ?.company ||
                              "—"
                            }
                          </p>

                        </td>


                        <td className="
                          px-3
                          py-3
                        ">

                          <ApplicationStatus
                            status={
                              application.status
                            }
                          />

                        </td>


                        <td className="
                          whitespace-nowrap
                          px-3
                          py-3
                          text-right
                          text-xs
                          text-gray-500
                        ">
                          {formatDate(
                            application.createdAt
                          )}
                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          ) : (

            <EmptyText text="No recent applications found." />

          )}

        </DashboardCard>

      </div>

    </div>
  );
}


// ============================================================
// STAT CARD
// ============================================================

function StatCard({
  title,
  value,
  icon: Icon,
}) {

  return (
    <div className="
      rounded-xl
      border
      border-gray-200
      bg-white
      p-5
    ">

      <div className="
        flex
        items-center
        justify-between
        gap-4
      ">

        <div className="
          min-w-0
        ">

          <p className="
            text-xs
            font-medium
            text-gray-500
          ">
            {title}
          </p>

          <p className="
            mt-1
            text-2xl
            font-bold
            text-gray-900
          ">
            {Number(value || 0).toLocaleString(
              "en-IN"
            )}
          </p>

        </div>


        <div className="
          flex
          h-11
          w-11
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-blue-50
          text-blue-600
        ">

          <Icon size={21} />

        </div>

      </div>

    </div>
  );
}


// ============================================================
// DASHBOARD CARD
// ============================================================

function DashboardCard({
  title,
  icon: Icon,
  children,
}) {

  return (
    <section className="
      min-w-0
      rounded-xl
      border
      border-gray-200
      bg-white
      p-5
    ">

      <div className="
        mb-5
        flex
        items-center
        gap-3
      ">

        <div className="
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center
          rounded-lg
          bg-blue-50
          text-blue-600
        ">

          <Icon size={18} />

        </div>


        <h2 className="
          text-base
          font-bold
          text-gray-900
        ">
          {title}
        </h2>

      </div>


      {children}

    </section>
  );
}


// ============================================================
// STATUS BOX
// ============================================================

function StatusBox({
  label,
  value,
  className,
}) {

  return (
    <div className={`
      rounded-lg
      p-4
      ${className}
    `}>

      <p className="
        text-xs
        font-medium
      ">
        {label}
      </p>

      <p className="
        mt-1
        text-xl
        font-bold
      ">
        {Number(value || 0).toLocaleString(
          "en-IN"
        )}
      </p>

    </div>
  );
}


// ============================================================
// APPLICATION STATUS
// ============================================================

function ApplicationStatus({
  status,
}) {

  const statusStyles = {
    Applied:
      "bg-blue-50 text-blue-700",

    Reviewed:
      "bg-purple-50 text-purple-700",

    Shortlisted:
      "bg-indigo-50 text-indigo-700",

    Interview:
      "bg-yellow-50 text-yellow-700",

    Selected:
      "bg-green-50 text-green-700",

    Rejected:
      "bg-red-50 text-red-700",

    Hired:
      "bg-emerald-50 text-emerald-700",
  };


  return (
    <span className={`
      inline-flex
      rounded-full
      px-2.5
      py-1
      text-[11px]
      font-semibold
      ${
        statusStyles[status] ||
        "bg-gray-100 text-gray-600"
      }
    `}>
      {status || "Unknown"}
    </span>
  );
}


// ============================================================
// EMPTY TEXT
// ============================================================

function EmptyText({
  text,
}) {

  return (
    <div className="
      rounded-lg
      bg-gray-50
      px-4
      py-8
      text-center
    ">

      <p className="
        text-sm
        text-gray-500
      ">
        {text}
      </p>

    </div>
  );
}


export default Dashboard;