import { useEffect, useMemo, useState } from "react";

import {
  FileText,
  Search,
  RefreshCw,
  Eye,
  Trash2,
  X,
  CheckCircle,
  Clock,
  Users,
  Briefcase,
  AlertCircle,
} from "lucide-react";

import api from "../../services/api";

// ============================================================
// APPLICATION STATUS
// ============================================================

const APPLICATION_STATUSES = [
  "Applied",
  "Reviewed",
  "Shortlisted",
  "Interview",
  "Selected",
  "Rejected",
  "Hired",
];

// ============================================================
// STATUS STYLE
// ============================================================

const getStatusClass = (status) => {
  switch (status) {
    case "Applied":
      return "bg-blue-50 text-blue-700";

    case "Reviewed":
      return "bg-purple-50 text-purple-700";

    case "Shortlisted":
      return "bg-yellow-50 text-yellow-700";

    case "Interview":
      return "bg-orange-50 text-orange-700";

    case "Selected":
      return "bg-green-50 text-green-700";

    case "Hired":
      return "bg-emerald-50 text-emerald-700";

    case "Rejected":
      return "bg-red-50 text-red-700";

    default:
      return "bg-gray-100 text-gray-700";
  }
};

// ============================================================
// GET USER NAME
// ============================================================

const getUserName = (application) => {
  if (
    application?.user &&
    typeof application.user === "object"
  ) {
    return (
      application.user.name ||
      application.user.email ||
      "Unknown User"
    );
  }

  return "Unknown User";
};

// ============================================================
// GET USER EMAIL
// ============================================================

const getUserEmail = (application) => {
  if (
    application?.user &&
    typeof application.user === "object"
  ) {
    return application.user.email || "—";
  }

  return "—";
};

// ============================================================
// GET JOB TITLE
// ============================================================

const getJobTitle = (application) => {
  if (
    application?.job &&
    typeof application.job === "object"
  ) {
    return application.job.title || "Unknown Job";
  }

  return "Unknown Job";
};

// ============================================================
// GET COMPANY
// ============================================================

const getCompany = (application) => {
  if (
    application?.job &&
    typeof application.job === "object"
  ) {
    return application.job.company || "—";
  }

  return "—";
};

// ============================================================
// FORMAT DATE
// ============================================================

const formatDate = (date) => {
  if (!date) {
    return "—";
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "—";
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// ============================================================
// ADMIN APPLICATIONS
// ============================================================

function Applications() {
  const [applications, setApplications] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedApplication, setSelectedApplication] =
    useState(null);

  const [updatingId, setUpdatingId] = useState(null);

  const [deletingId, setDeletingId] = useState(null);

  // ==========================================================
  // FETCH APPLICATIONS
  // ==========================================================

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get(
        "/admin/applications"
      );

      const data = response?.data;

      if (!data?.success) {
        throw new Error(
          data?.message ||
            "Failed to fetch applications"
        );
      }

      setApplications(
        Array.isArray(data.applications)
          ? data.applications
          : []
      );
    } catch (requestError) {
      console.error(
        "ADMIN APPLICATIONS ERROR:",
        requestError
      );

      setError(
        requestError?.response?.data?.message ||
          requestError?.message ||
          "Failed to load applications"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================================
  // INITIAL LOAD
  // ==========================================================

  useEffect(() => {
    fetchApplications();
  }, []);

  // ==========================================================
  // FILTER APPLICATIONS
  // ==========================================================

  const filteredApplications = useMemo(() => {
    const searchValue = search
      .trim()
      .toLowerCase();

    return applications.filter(
      (application) => {
        const userName = getUserName(
          application
        ).toLowerCase();

        const userEmail = getUserEmail(
          application
        ).toLowerCase();

        const jobTitle = getJobTitle(
          application
        ).toLowerCase();

        const company = getCompany(
          application
        ).toLowerCase();

        const matchesSearch =
          !searchValue ||
          userName.includes(searchValue) ||
          userEmail.includes(searchValue) ||
          jobTitle.includes(searchValue) ||
          company.includes(searchValue);

        const matchesStatus =
          statusFilter === "All" ||
          application.status === statusFilter;

        return (
          matchesSearch &&
          matchesStatus
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

  const totalApplications =
    applications.length;

  const appliedCount =
    applications.filter(
      (item) =>
        item.status === "Applied"
    ).length;

  const shortlistedCount =
    applications.filter(
      (item) =>
        item.status === "Shortlisted"
    ).length;

  const selectedCount =
    applications.filter(
      (item) =>
        item.status === "Selected" ||
        item.status === "Hired"
    ).length;

  // ==========================================================
  // UPDATE STATUS
  // ==========================================================

  const handleStatusChange = async (
    applicationId,
    status
  ) => {
    if (!applicationId || !status) {
      return;
    }

    try {
      setUpdatingId(applicationId);
      setError("");

      const response = await api.put(
        `/admin/applications/${applicationId}/status`,
        {
          status,
        }
      );

      const data = response?.data;

      if (!data?.success) {
        throw new Error(
          data?.message ||
            "Failed to update application status"
        );
      }

      const updatedApplication =
        data.application;

      setApplications((previous) =>
        previous.map((application) =>
          String(application._id) ===
          String(applicationId)
            ? updatedApplication ||
              {
                ...application,
                status,
              }
            : application
        )
      );

      setSelectedApplication(
        (previous) => {
          if (
            previous &&
            String(previous._id) ===
              String(applicationId)
          ) {
            return (
              updatedApplication || {
                ...previous,
                status,
              }
            );
          }

          return previous;
        }
      );
    } catch (requestError) {
      console.error(
        "UPDATE APPLICATION STATUS ERROR:",
        requestError
      );

      setError(
        requestError?.response?.data?.message ||
          requestError?.message ||
          "Failed to update application status"
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // ==========================================================
  // DELETE APPLICATION
  // ==========================================================

  const handleDelete = async (
    applicationId
  ) => {
    if (!applicationId) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this application?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(applicationId);
      setError("");

      const response = await api.delete(
        `/admin/applications/${applicationId}`
      );

      const data = response?.data;

      if (!data?.success) {
        throw new Error(
          data?.message ||
            "Failed to delete application"
        );
      }

      setApplications((previous) =>
        previous.filter(
          (application) =>
            String(application._id) !==
            String(applicationId)
        )
      );

      setSelectedApplication(
        (previous) =>
          previous &&
          String(previous._id) ===
            String(applicationId)
            ? null
            : previous
      );
    } catch (requestError) {
      console.error(
        "DELETE APPLICATION ERROR:",
        requestError
      );

      setError(
        requestError?.response?.data?.message ||
          requestError?.message ||
          "Failed to delete application"
      );
    } finally {
      setDeletingId(null);
    }
  };

  // ==========================================================
  // VIEW APPLICATION
  // ==========================================================

  const handleView = async (
    application
  ) => {
    if (!application?._id) {
      return;
    }

    try {
      const response = await api.get(
        `/admin/applications/${application._id}`
      );

      const data = response?.data;

      if (data?.success && data?.application) {
        setSelectedApplication(
          data.application
        );

        return;
      }
    } catch (requestError) {
      console.error(
        "GET APPLICATION DETAILS ERROR:",
        requestError
      );
    }

    setSelectedApplication(application);
  };

  // ==========================================================
  // CLEAR FILTERS
  // ==========================================================

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All");
  };

  // ==========================================================
  // PAGE
  // ==========================================================

  return (
    <div className="w-full min-w-0">
      {/* ======================================================
          HEADER
          ====================================================== */}

      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <FileText size={20} />
            </div>

            <div className="min-w-0">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Applications
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Manage candidate applications and
                application status.
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={fetchApplications}
          disabled={loading}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <RefreshCw
            size={16}
            className={
              loading
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
        <div className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle
            size={18}
            className="mt-0.5 shrink-0"
          />

          <div className="min-w-0">
            <p className="font-semibold">
              Unable to complete request
            </p>

            <p className="mt-0.5 break-words">
              {error}
            </p>
          </div>
        </div>
      )}

      {/* ======================================================
          STAT CARDS
          ====================================================== */}

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Applications"
          value={totalApplications}
          icon={FileText}
        />

        <StatCard
          title="Applied"
          value={appliedCount}
          icon={Clock}
        />

        <StatCard
          title="Shortlisted"
          value={shortlistedCount}
          icon={Users}
        />

        <StatCard
          title="Selected / Hired"
          value={selectedCount}
          icon={CheckCircle}
        />
      </div>

      {/* ======================================================
          FILTERS
          ====================================================== */}

      <div className="mb-5 rounded-xl border border-gray-200 bg-white p-4">
        <div className="flex min-w-0 flex-col gap-3 lg:flex-row">
          {/* SEARCH */}

          <div className="relative min-w-0 flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder="Search by candidate, email, job or company..."
              className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
            className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="All">
              All Statuses
            </option>

            {APPLICATION_STATUSES.map(
              (status) => (
                <option
                  key={status}
                  value={status}
                >
                  {status}
                </option>
              )
            )}
          </select>

          {/* CLEAR */}

          <button
            type="button"
            onClick={clearFilters}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            <X size={16} />

            Clear
          </button>
        </div>
      </div>

      {/* ======================================================
          APPLICATION TABLE
          ====================================================== */}

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        {loading ? (
          <LoadingState />
        ) : filteredApplications.length ===
          0 ? (
          <EmptyState
            hasFilters={
              search.trim() !== "" ||
              statusFilter !== "All"
            }
            onClear={clearFilters}
          />
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Candidate
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Job
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Company
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Applied
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Status
                  </th>

                  <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredApplications.map(
                  (application) => (
                    <tr
                      key={
                        application._id
                      }
                      className="transition hover:bg-gray-50"
                    >
                      {/* CANDIDATE */}

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-600">
                            {getUserName(
                              application
                            )
                              .charAt(0)
                              .toUpperCase()}
                          </div>

                          <div className="min-w-0">
                            <p className="max-w-[180px] truncate text-sm font-semibold text-gray-900">
                              {getUserName(
                                application
                              )}
                            </p>

                            <p className="max-w-[180px] truncate text-xs text-gray-500">
                              {getUserEmail(
                                application
                              )}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* JOB */}

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <Briefcase
                            size={16}
                            className="shrink-0 text-gray-400"
                          />

                          <span className="max-w-[180px] truncate text-sm font-medium text-gray-800">
                            {getJobTitle(
                              application
                            )}
                          </span>
                        </div>
                      </td>

                      {/* COMPANY */}

                      <td className="px-5 py-4">
                        <span className="max-w-[160px] truncate text-sm text-gray-600">
                          {getCompany(
                            application
                          )}
                        </span>
                      </td>

                      {/* DATE */}

                      <td className="px-5 py-4 text-sm text-gray-500">
                        {formatDate(
                          application.createdAt ||
                            application.appliedAt
                        )}
                      </td>

                      {/* STATUS */}

                      <td className="px-5 py-4">
                        <select
                          value={
                            application.status ||
                            "Applied"
                          }
                          disabled={
                            updatingId ===
                            application._id
                          }
                          onChange={(event) =>
                            handleStatusChange(
                              application._id,
                              event.target.value
                            )
                          }
                          className={`rounded-full border-0 px-3 py-1.5 text-xs font-semibold outline-none ${getStatusClass(
                            application.status
                          )} disabled:cursor-not-allowed disabled:opacity-60`}
                        >
                          {APPLICATION_STATUSES.map(
                            (status) => (
                              <option
                                key={status}
                                value={status}
                              >
                                {status}
                              </option>
                            )
                          )}
                        </select>
                      </td>

                      {/* ACTIONS */}

                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              handleView(
                                application
                              )
                            }
                            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-blue-600 transition hover:bg-blue-50"
                          >
                            <Eye size={15} />

                            View
                          </button>

                          <button
                            type="button"
                            disabled={
                              deletingId ===
                              application._id
                            }
                            onClick={() =>
                              handleDelete(
                                application._id
                              )
                            }
                            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <Trash2 size={15} />

                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ======================================================
          RESULT COUNT
          ====================================================== */}

      {!loading &&
        filteredApplications.length > 0 && (
          <div className="mt-3 text-xs text-gray-500">
            Showing{" "}
            <span className="font-semibold text-gray-700">
              {filteredApplications.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-700">
              {applications.length}
            </span>{" "}
            applications
          </div>
        )}

      {/* ======================================================
          APPLICATION MODAL
          ====================================================== */}

      {selectedApplication && (
        <ApplicationModal
          application={
            selectedApplication
          }
          onClose={() =>
            setSelectedApplication(
              null
            )
          }
          onStatusChange={
            handleStatusChange
          }
          updating={
            updatingId ===
            selectedApplication._id
          }
        />
      )}
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
    <div className="min-w-0 rounded-xl border border-gray-200 bg-white p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-medium text-gray-500">
            {title}
          </p>

          <p className="mt-1 text-2xl font-bold text-gray-900">
            {value}
          </p>
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
          <Icon size={20} />
        </div>
      </div>
    </div>
  );
}

// ============================================================
// LOADING STATE
// ============================================================

function LoadingState() {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center">
      <RefreshCw
        size={28}
        className="animate-spin text-blue-600"
      />

      <p className="mt-3 text-sm font-medium text-gray-700">
        Loading applications...
      </p>

      <p className="mt-1 text-xs text-gray-500">
        Please wait.
      </p>
    </div>
  );
}

// ============================================================
// EMPTY STATE
// ============================================================

function EmptyState({
  hasFilters,
  onClear,
}) {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-500">
        <FileText size={22} />
      </div>

      <p className="mt-3 text-sm font-semibold text-gray-900">
        No applications found
      </p>

      <p className="mt-1 text-xs text-gray-500">
        {hasFilters
          ? "No applications match your current search or filter."
          : "There are no applications yet."}
      </p>

      {hasFilters && (
        <button
          type="button"
          onClick={onClear}
          className="mt-4 inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          <RefreshCw size={14} />

          Clear filters
        </button>
      )}
    </div>
  );
}

// ============================================================
// APPLICATION MODAL
// ============================================================

function ApplicationModal({
  application,
  onClose,
  onStatusChange,
  updating,
}) {
  const userName =
    getUserName(application);

  const userEmail =
    getUserEmail(application);

  const jobTitle =
    getJobTitle(application);

  const company =
    getCompany(application);

  const status =
    application.status ||
    "Applied";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
      onClick={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        {/* HEADER */}

        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <FileText size={19} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Application Details
              </h2>

              <p className="text-xs text-gray-500">
                Review candidate application
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100"
          >
            <X size={19} />
          </button>
        </div>

        {/* BODY */}

        <div className="space-y-5 p-5">
          {/* CANDIDATE */}

          <div className="rounded-xl border border-gray-200 p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
              Candidate
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InfoItem
                label="Name"
                value={userName}
              />

              <InfoItem
                label="Email"
                value={userEmail}
              />
            </div>
          </div>

          {/* JOB */}

          <div className="rounded-xl border border-gray-200 p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
              Job
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InfoItem
                label="Job Title"
                value={jobTitle}
              />

              <InfoItem
                label="Company"
                value={company}
              />

              <InfoItem
                label="Location"
                value={
                  application?.job
                    ?.location || "—"
                }
              />

              <InfoItem
                label="Applied On"
                value={formatDate(
                  application.createdAt ||
                    application.appliedAt
                )}
              />
            </div>
          </div>

          {/* STATUS */}

          <div className="rounded-xl border border-gray-200 p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
              Application Status
            </p>

            <select
              value={status}
              disabled={updating}
              onChange={(event) =>
                onStatusChange(
                  application._id,
                  event.target.value
                )
              }
              className={`rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-semibold outline-none ${getStatusClass(
                status
              )} disabled:cursor-not-allowed disabled:opacity-60`}
            >
              {APPLICATION_STATUSES.map(
                (item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                )
              )}
            </select>
          </div>

          {/* EXTRA INFORMATION */}

          {application.coverLetter && (
            <div className="rounded-xl border border-gray-200 p-4">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
                Cover Letter
              </p>

              <p className="whitespace-pre-wrap text-sm leading-6 text-gray-700">
                {application.coverLetter}
              </p>
            </div>
          )}

          {application.resume && (
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                Resume
              </p>

              {typeof application.resume ===
                "string" &&
              /^https?:\/\//i.test(
                application.resume
              ) ? (
                <a
                  href={
                    application.resume
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="mt-2 inline-flex text-sm font-semibold text-blue-600 hover:underline"
                >
                  View Resume
                </a>
              ) : (
                <p className="mt-2 break-all text-sm text-gray-600">
                  {String(
                    application.resume
                  )}
                </p>
              )}
            </div>
          )}
        </div>

        {/* FOOTER */}

        <div className="flex justify-end border-t border-gray-200 px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// INFO ITEM
// ============================================================

function InfoItem({
  label,
  value,
}) {
  return (
    <div className="min-w-0">
      <p className="text-xs font-medium text-gray-400">
        {label}
      </p>

      <p className="mt-1 break-words text-sm font-semibold text-gray-800">
        {value || "—"}
      </p>
    </div>
  );
}

export default Applications;