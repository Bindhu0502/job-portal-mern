import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  Briefcase,
  MapPin,
  CalendarDays,
  Search,
  FileText,
  RefreshCw,
  DollarSign,
  Clock,
  CheckCircle2,
  XCircle,
  Users,
  Eye,
  AlertCircle,
} from "lucide-react";

import api from "../services/api";

import ApplicationStatus from "../components/applications/ApplicationStatus";

// ============================================================
// BACKEND URL
// ============================================================

const BACKEND_URL = "http://localhost:5000";

// ============================================================
// BUILD FILE URL
// ============================================================

const getFileUrl = (file) => {
  if (!file) {
    return "";
  }

  let fileUrl = "";

  // ----------------------------------------------------------
  // Object resume
  // ----------------------------------------------------------

  if (typeof file === "object") {
    fileUrl =
      file.url ||
      file.path ||
      "";
  }

  // ----------------------------------------------------------
  // String resume
  // ----------------------------------------------------------

  else {
    fileUrl = file;
  }

  if (!fileUrl) {
    return "";
  }

  // Already absolute URL
  if (
    fileUrl.startsWith("http://") ||
    fileUrl.startsWith("https://")
  ) {
    return fileUrl;
  }

  // Relative URL
  if (fileUrl.startsWith("/")) {
    return `${BACKEND_URL}${fileUrl}`;
  }

  return `${BACKEND_URL}/${fileUrl}`;
};

// ============================================================
// COMPANY NAME
// ============================================================

const getCompanyName = (job) => {
  if (!job) {
    return "Company";
  }

  if (
    typeof job.company === "object" &&
    job.company !== null
  ) {
    return (
      job.company.name ||
      "Company"
    );
  }

  return (
    job.company ||
    job.companyName ||
    "Company"
  );
};

// ============================================================
// COMPANY LOGO
// ============================================================

const getCompanyLogo = (job) => {
  if (!job) {
    return "";
  }

  if (
    typeof job.company === "object" &&
    job.company !== null
  ) {
    const logo =
      job.company.logo ||
      job.company.companyLogo ||
      "";

    if (!logo) {
      return "";
    }

    if (
      logo.startsWith("http://") ||
      logo.startsWith("https://")
    ) {
      return logo;
    }

    if (logo.startsWith("/")) {
      return `${BACKEND_URL}${logo}`;
    }

    return `${BACKEND_URL}/${logo}`;
  }

  return "";
};

// ============================================================
// STATUS STYLE
// ============================================================

const getStatusStyle = (status) => {
  switch (status) {
    case "Selected":
      return {
        badge:
          "bg-green-100 text-green-700 border-green-200",
        icon: (
          <CheckCircle2
            size={16}
          />
        ),
      };

    case "Rejected":
      return {
        badge:
          "bg-red-100 text-red-700 border-red-200",
        icon: (
          <XCircle
            size={16}
          />
        ),
      };

    case "Shortlisted":
      return {
        badge:
          "bg-purple-100 text-purple-700 border-purple-200",
        icon: (
          <Users
            size={16}
          />
        ),
      };

    case "Reviewed":
      return {
        badge:
          "bg-yellow-100 text-yellow-700 border-yellow-200",
        icon: (
          <Eye
            size={16}
          />
        ),
      };

    case "Interview":
      return {
        badge:
          "bg-indigo-100 text-indigo-700 border-indigo-200",
        icon: (
          <CalendarDays
            size={16}
          />
        ),
      };

    default:
      return {
        badge:
          "bg-blue-100 text-blue-700 border-blue-200",
        icon: (
          <FileText
            size={16}
          />
        ),
      };
  }
};

// ============================================================
// FORMAT DATE
// ============================================================

const formatDate = (date) => {
  if (!date) {
    return "Date unavailable";
  }

  const parsedDate =
    new Date(date);

  if (
    Number.isNaN(
      parsedDate.getTime()
    )
  ) {
    return "Date unavailable";
  }

  return parsedDate.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
};

// ============================================================
// MAIN COMPONENT
// ============================================================

function MyApplications() {
  // ==========================================================
  // STATE
  // ==========================================================

  const [
    applications,
    setApplications,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    refreshing,
    setRefreshing,
  ] = useState(false);

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    statusFilter,
    setStatusFilter,
  ] = useState("All");

  const [
    error,
    setError,
  ] = useState("");

  // ==========================================================
  // LOAD APPLICATIONS
  // ==========================================================

  useEffect(() => {
    fetchApplications();
  }, []);

  // ==========================================================
  // FETCH APPLICATIONS
  // ==========================================================

  const fetchApplications =
    async () => {
      try {
        setError("");

        setRefreshing(true);

        const response =
          await api.get(
            "/applications/my"
          );

        const data =
          response.data;

        setApplications(
          Array.isArray(
            data?.applications
          )
            ? data.applications
            : []
        );
      } catch (err) {
        console.error(
          "APPLICATION ERROR:",
          err.response?.data ||
            err
        );

        setError(
          err.response?.data
            ?.message ||
            "Unable to load your applications."
        );

        setApplications([]);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    };

  // ==========================================================
  // FILTER APPLICATIONS
  // ==========================================================

  const filteredApplications =
    useMemo(() => {
      const searchText =
        search
          .trim()
          .toLowerCase();

      return applications.filter(
        (application) => {
          const job =
            application.job;

          const title =
            job?.title
              ?.toLowerCase() ||
            "";

          const company =
            getCompanyName(
              job
            ).toLowerCase();

          const searchMatch =
            !searchText ||
            title.includes(
              searchText
            ) ||
            company.includes(
              searchText
            );

          const statusMatch =
            statusFilter ===
              "All" ||
            application.status ===
              statusFilter;

          return (
            searchMatch &&
            statusMatch
          );
        }
      );
    }, [
      applications,
      search,
      statusFilter,
    ]);

  // ==========================================================
  // STATISTICS
  // ==========================================================

  const stats = useMemo(() => {
    return {
      total:
        applications.length,

      applied:
        applications.filter(
          (item) =>
            item.status ===
            "Applied"
        ).length,

      shortlisted:
        applications.filter(
          (item) =>
            item.status ===
            "Shortlisted"
        ).length,

      selected:
        applications.filter(
          (item) =>
            item.status ===
            "Selected"
        ).length,

      rejected:
        applications.filter(
          (item) =>
            item.status ===
            "Rejected"
        ).length,
    };
  }, [applications]);

  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">

          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-5" />

          <p className="text-gray-600 font-medium">
            Loading your applications...
          </p>

        </div>
      </div>
    );
  }

  // ==========================================================
  // PAGE
  // ==========================================================

  return (
    <div className="min-h-screen bg-gray-50 py-10">

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 mb-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

            <div>

              <div className="flex items-center gap-3 mb-2">

                <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">
                  <FileText size={24} />
                </div>

                <h1 className="text-3xl font-bold text-gray-900">
                  My Applications
                </h1>

              </div>

              <p className="text-gray-500">
                Track and manage all your job applications in one place.
              </p>

            </div>

            <button
              type="button"
              onClick={fetchApplications}
              disabled={refreshing}
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-5 py-3 rounded-xl font-semibold transition"
            >

              <RefreshCw
                size={18}
                className={
                  refreshing
                    ? "animate-spin"
                    : ""
                }
              />

              {refreshing
                ? "Refreshing..."
                : "Refresh"}

            </button>

          </div>

        </div>

        {/* ==================================================
            ERROR
        ================================================== */}

        {error && (
          <div className="mb-8 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 flex items-start gap-3">

            <AlertCircle
              size={20}
              className="mt-0.5 flex-shrink-0"
            />

            <div>

              <p className="font-semibold">
                Unable to load applications
              </p>

              <p className="text-sm mt-1">
                {error}
              </p>

            </div>

          </div>
        )}

        {/* ==================================================
            SUMMARY CARDS
        ================================================== */}

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">

          {/* TOTAL */}

          <div className="bg-white rounded-2xl border shadow-sm p-5">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-gray-500">
                  Total
                </p>

                <h2 className="text-3xl font-bold text-gray-900 mt-2">
                  {stats.total}
                </h2>

              </div>

              <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">
                <FileText size={22} />
              </div>

            </div>

          </div>

          {/* APPLIED */}

          <div className="bg-white rounded-2xl border shadow-sm p-5">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-gray-500">
                  Applied
                </p>

                <h2 className="text-3xl font-bold text-gray-900 mt-2">
                  {stats.applied}
                </h2>

              </div>

              <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">
                <Briefcase size={22} />
              </div>

            </div>

          </div>

          {/* SHORTLISTED */}

          <div className="bg-white rounded-2xl border shadow-sm p-5">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-gray-500">
                  Shortlisted
                </p>

                <h2 className="text-3xl font-bold text-gray-900 mt-2">
                  {stats.shortlisted}
                </h2>

              </div>

              <div className="bg-purple-100 text-purple-600 p-3 rounded-xl">
                <Users size={22} />
              </div>

            </div>

          </div>

          {/* SELECTED */}

          <div className="bg-white rounded-2xl border shadow-sm p-5">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-gray-500">
                  Selected
                </p>

                <h2 className="text-3xl font-bold text-gray-900 mt-2">
                  {stats.selected}
                </h2>

              </div>

              <div className="bg-green-100 text-green-600 p-3 rounded-xl">
                <CheckCircle2 size={22} />
              </div>

            </div>

          </div>

          {/* REJECTED */}

          <div className="bg-white rounded-2xl border shadow-sm p-5">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-gray-500">
                  Rejected
                </p>

                <h2 className="text-3xl font-bold text-gray-900 mt-2">
                  {stats.rejected}
                </h2>

              </div>

              <div className="bg-red-100 text-red-600 p-3 rounded-xl">
                <XCircle size={22} />
              </div>

            </div>

          </div>

        </div>

        {/* ==================================================
            SEARCH & FILTER
        ================================================== */}

        <div className="bg-white rounded-2xl border shadow-sm p-5 mb-8">

          <div className="flex flex-col md:flex-row gap-4">

            {/* SEARCH */}

            <div className="flex-1 relative">

              <Search
                size={19}
                className="absolute left-4 top-3.5 text-gray-400"
              />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search by job title or company..."
                className="w-full border border-gray-300 rounded-xl py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />

            </div>

            {/* STATUS */}

            <select
              value={statusFilter}
              onChange={(event) =>
                setStatusFilter(
                  event.target.value
                )
              }
              className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >

              <option value="All">
                All Statuses
              </option>

              <option value="Applied">
                Applied
              </option>

              <option value="Reviewed">
                Reviewed
              </option>

              <option value="Shortlisted">
                Shortlisted
              </option>

              <option value="Interview">
                Interview
              </option>

              <option value="Selected">
                Selected
              </option>

              <option value="Rejected">
                Rejected
              </option>

            </select>

          </div>

        </div>

        {/* ==================================================
            RESULT COUNT
        ================================================== */}

        <div className="flex justify-between items-center mb-5">

          <h2 className="text-xl font-bold text-gray-900">
            Applications
          </h2>

          <p className="text-sm text-gray-500">
            Showing{" "}
            <span className="font-semibold text-gray-700">
              {filteredApplications.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-700">
              {applications.length}
            </span>
          </p>

        </div>

        {/* ==================================================
            EMPTY STATE
        ================================================== */}

        {filteredApplications.length === 0 ? (

          <div className="bg-white rounded-2xl border shadow-sm p-12 text-center">

            <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto">

              <Briefcase size={38} />

            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-6">
              {applications.length === 0
                ? "No Applications Yet"
                : "No Applications Found"}
            </h2>

            <p className="text-gray-500 mt-2 max-w-md mx-auto">

              {applications.length === 0
                ? "Start applying for jobs and your applications will appear here."
                : "Try changing your search or status filter."}

            </p>

            {applications.length === 0 && (
              <Link
                to="/jobs"
                className="inline-flex items-center gap-2 mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
              >
                <Briefcase size={18} />
                Find Jobs
              </Link>
            )}

          </div>

        ) : (

          /* ==================================================
             APPLICATION LIST
          ================================================== */

          <div className="space-y-5">

            {filteredApplications.map(
              (application) => {

                const job =
                  application.job;

                const companyName =
                  getCompanyName(
                    job
                  );

                const companyLogo =
                  getCompanyLogo(
                    job
                  );

                const status =
                  getStatusStyle(
                    application.status
                  );

                const resumeUrl =
                  getFileUrl(
                    application.resume
                  );

                return (
                  <div
                    key={
                      application._id
                    }
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition p-6"
                  >

                    {/* ==================================================
                       TOP
                    ================================================== */}

                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">

                      <div className="flex items-start gap-4">

                        {/* COMPANY LOGO */}

                        <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center overflow-hidden flex-shrink-0">

                          {companyLogo ? (

                            <img
                              src={companyLogo}
                              alt={companyName}
                              className="w-full h-full object-cover"
                              onError={(event) => {
                                event.currentTarget.style.display =
                                  "none";
                              }}
                            />

                          ) : (

                            <Briefcase
                              size={26}
                              className="text-blue-500"
                            />

                          )}

                        </div>

                        {/* JOB */}

                        <div>

                          <h3 className="text-xl font-bold text-gray-900">
                            {job?.title ||
                              "Job No Longer Available"}
                          </h3>

                          <p className="text-gray-500 mt-1">
                            {companyName}
                          </p>

                        </div>

                      </div>

                      {/* STATUS */}

                      <span
                        className={`inline-flex items-center gap-2 w-fit px-4 py-2 rounded-full border text-sm font-semibold ${status.badge}`}
                      >
                        {status.icon}
                        {application.status ||
                          "Applied"}
                      </span>

                    </div>

                    {/* ==================================================
                       DETAILS
                    ================================================== */}

                    <div className="flex flex-wrap gap-x-6 gap-y-3 mt-6 text-sm text-gray-600">

                      <div className="flex items-center gap-2">

                        <MapPin
                          size={17}
                          className="text-gray-400"
                        />

                        {job?.location ||
                          "Location not specified"}

                      </div>

                      <div className="flex items-center gap-2">

                        <CalendarDays
                          size={17}
                          className="text-gray-400"
                        />

                        Applied{" "}
                        {formatDate(
                          application.createdAt
                        )}

                      </div>

                      <div className="flex items-center gap-2">

                        <DollarSign
                          size={17}
                          className="text-gray-400"
                        />

                        {job?.salary ||
                          "Salary not disclosed"}

                      </div>

                      <div className="flex items-center gap-2">

                        <Clock
                          size={17}
                          className="text-gray-400"
                        />

                        {job?.experience ||
                          "Fresher"}

                      </div>

                    </div>

                    {/* ==================================================
                       APPLICATION STATUS COMPONENT
                    ================================================== */}

                    <div className="mt-5">

                      <ApplicationStatus
                        status={
                          application.status
                        }
                      />

                    </div>

                    {/* ==================================================
                       ACTIONS
                    ================================================== */}

                    <div className="flex flex-wrap gap-3 mt-6 pt-5 border-t">

                      {/* VIEW RESUME */}

                      {resumeUrl && (
                        <a
                          href={
                            resumeUrl
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2.5 rounded-lg font-medium transition"
                        >

                          <FileText
                            size={17}
                          />

                          View Resume

                        </a>
                      )}

                      {/* VIEW JOB */}

                      {job?._id ? (

                        <Link
                          to={`/jobs/${job._id}`}
                          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold transition"
                        >

                          <Eye
                            size={17}
                          />

                          View Job

                        </Link>

                      ) : (

                        <span className="inline-flex items-center gap-2 bg-gray-100 text-gray-400 px-5 py-2.5 rounded-lg cursor-not-allowed">
                          <Eye size={17} />
                          Job Unavailable
                        </span>

                      )}

                    </div>

                  </div>
                );
              }
            )}

          </div>
        )}

      </div>
    </div>
  );
}

export default MyApplications;