import { useEffect, useMemo, useState } from "react";

import {
  Search,
  RefreshCw,
  Eye,
  Trash2,
  X,
  Briefcase,
  MapPin,
  Building2,
  CalendarDays,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";

import api from "../../services/api";


// ============================================================
// ADMIN JOBS
// ============================================================

function Jobs() {

  const [jobs, setJobs] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [selectedJob, setSelectedJob] =
    useState(null);

  const [actionLoading, setActionLoading] =
    useState(false);


  // ==========================================================
  // FETCH JOBS
  // ==========================================================

  const fetchJobs = async () => {

    try {

      setLoading(true);
      setError("");

      const response =
        await api.get(
          "/admin/jobs"
        );

      const data =
        response.data;

      setJobs(
        Array.isArray(data?.jobs)
          ? data.jobs
          : []
      );

    } catch (err) {

      console.error(
        "ADMIN JOBS ERROR:",
        err
      );

      setError(
        err.response?.data?.message ||
        "Failed to load jobs."
      );

    } finally {

      setLoading(false);

    }

  };


  // ==========================================================
  // INITIAL LOAD
  // ==========================================================

  useEffect(() => {

    fetchJobs();

  }, []);


  // ==========================================================
  // HELPERS
  // ==========================================================

  const getCompany = (job) => {

    if (
      typeof job?.company === "string"
    ) {

      return job.company;

    }

    return (
      job?.company?.name ||
      job?.companyName ||
      "Unknown Company"
    );

  };


  const getLocation = (job) => {

    if (
      typeof job?.location === "string"
    ) {

      return job.location;

    }

    return (
      job?.location?.city ||
      job?.location?.name ||
      "Remote / Not specified"
    );

  };


  const getTitle = (job) => {

    return (
      job?.title ||
      job?.jobTitle ||
      "Untitled Job"
    );

  };


  const formatDate = (date) => {

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
  // FILTER
  // ==========================================================

  const filteredJobs =
    useMemo(() => {

      const searchValue =
        search
          .trim()
          .toLowerCase();


      return jobs.filter(
        (job) => {

          const title =
            getTitle(job)
              .toLowerCase();

          const company =
            getCompany(job)
              .toLowerCase();

          const location =
            getLocation(job)
              .toLowerCase();

          const category =
            String(
              job?.category || ""
            ).toLowerCase();


          const matchesSearch =
            !searchValue ||
            title.includes(
              searchValue
            ) ||
            company.includes(
              searchValue
            ) ||
            location.includes(
              searchValue
            ) ||
            category.includes(
              searchValue
            );


          const isActive =
            job?.isActive !== false;


          const matchesStatus =
            statusFilter === "All" ||
            (
              statusFilter === "Active" &&
              isActive
            ) ||
            (
              statusFilter === "Inactive" &&
              !isActive
            );


          return (
            matchesSearch &&
            matchesStatus
          );

        }
      );

    }, [
      jobs,
      search,
      statusFilter,
    ]);


  // ==========================================================
  // COUNTS
  // ==========================================================

  const totalJobs =
    jobs.length;

  const activeJobs =
    jobs.filter(
      (job) =>
        job?.isActive !== false
    ).length;

  const inactiveJobs =
    totalJobs - activeJobs;


  // ==========================================================
  // UPDATE JOB STATUS
  // ==========================================================

  const updateJobStatus = async (
    job
  ) => {

    if (!job?._id) {
      return;
    }


    try {

      setActionLoading(true);
      setError("");


      const newStatus =
        job.isActive === false;


      const response =
        await api.put(
          `/admin/jobs/${job._id}/status`,
          {
            isActive:
              newStatus,
          }
        );


      const updatedJob =
        response.data?.job;


      setJobs(
        (previous) =>
          previous.map(
            (item) =>
              item._id === job._id
                ? (
                    updatedJob ||
                    {
                      ...item,
                      isActive:
                        newStatus,
                    }
                  )
                : item
          )
      );


      if (
        selectedJob?._id ===
        job._id
      ) {

        setSelectedJob(
          updatedJob ||
          {
            ...job,
            isActive:
              newStatus,
          }
        );

      }

    } catch (err) {

      console.error(
        "UPDATE JOB STATUS ERROR:",
        err
      );

      setError(
        err.response?.data?.message ||
        "Failed to update job status."
      );

    } finally {

      setActionLoading(false);

    }

  };


  // ==========================================================
  // DELETE JOB
  // ==========================================================

  const deleteJob = async (
    job
  ) => {

    if (!job?._id) {
      return;
    }


    const confirmed =
      window.confirm(
        `Delete "${getTitle(job)}"?`
      );


    if (!confirmed) {
      return;
    }


    try {

      setActionLoading(true);
      setError("");


      await api.delete(
        `/admin/jobs/${job._id}`
      );


      setJobs(
        (previous) =>
          previous.filter(
            (item) =>
              item._id !== job._id
          )
      );


      if (
        selectedJob?._id ===
        job._id
      ) {

        setSelectedJob(null);

      }

    } catch (err) {

      console.error(
        "DELETE JOB ERROR:",
        err
      );

      setError(
        err.response?.data?.message ||
        "Failed to delete job."
      );

    } finally {

      setActionLoading(false);

    }

  };


  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {

    return (

      <div className="w-full">

        <div className="
          flex
          min-h-[400px]
          items-center
          justify-center
        ">

          <div className="
            flex
            items-center
            gap-3
            text-gray-500
          ">

            <RefreshCw
              size={20}
              className="animate-spin"
            />

            <span className="text-sm">
              Loading jobs...
            </span>

          </div>

        </div>

      </div>

    );

  }


  // ==========================================================
  // PAGE
  // ==========================================================

  return (

    <div className="w-full">

      {/* ======================================================
          HEADER
          ====================================================== */}

      <div className="
        mb-6
        flex
        flex-col
        gap-4
        lg:flex-row
        lg:items-center
        lg:justify-between
      ">

        <div>

          <h1 className="
            text-2xl
            sm:text-3xl
            font-bold
            text-gray-900
          ">
            Jobs
          </h1>

          <p className="
            mt-1
            text-sm
            text-gray-500
          ">
            Manage jobs posted on CareerHub.
          </p>

        </div>


        <button
          type="button"
          onClick={fetchJobs}
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-lg
            border
            border-gray-200
            bg-white
            px-4
            py-2.5
            text-sm
            font-medium
            text-gray-700
            hover:bg-gray-50
          "
        >

          <RefreshCw size={17} />

          Refresh

        </button>

      </div>


      {/* ======================================================
          ERROR
          ====================================================== */}

      {error && (

        <div className="
          mb-5
          flex
          items-center
          justify-between
          gap-4
          rounded-xl
          border
          border-red-200
          bg-red-50
          px-4
          py-3
          text-sm
          text-red-700
        ">

          <span>
            {error}
          </span>

          <button
            type="button"
            onClick={() =>
              setError("")
            }
            className="
              rounded
              p-1
              hover:bg-red-100
            "
          >

            <X size={16} />

          </button>

        </div>

      )}


      {/* ======================================================
          STAT CARDS
          ====================================================== */}

      <div className="
        mb-6
        grid
        grid-cols-1
        gap-4
        sm:grid-cols-3
      ">

        <StatCard
          title="Total Jobs"
          value={totalJobs}
          icon={Briefcase}
        />

        <StatCard
          title="Active Jobs"
          value={activeJobs}
          icon={ToggleRight}
        />

        <StatCard
          title="Inactive Jobs"
          value={inactiveJobs}
          icon={ToggleLeft}
        />

      </div>


      {/* ======================================================
          FILTERS
          ====================================================== */}

      <div className="
        mb-5
        rounded-xl
        border
        border-gray-200
        bg-white
        p-4
      ">

        <div className="
          flex
          flex-col
          gap-3
          lg:flex-row
        ">

          <div className="
            relative
            flex-1
          ">

            <Search
              size={18}
              className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-gray-400
              "
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder="
                Search job, company, location or category...
              "
              className="
                w-full
                rounded-lg
                border
                border-gray-200
                py-2.5
                pl-10
                pr-4
                text-sm
                outline-none
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-100
              "
            />

          </div>


          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(
                event.target.value
              )
            }
            className="
              rounded-lg
              border
              border-gray-200
              bg-white
              px-4
              py-2.5
              text-sm
              text-gray-700
              outline-none
              focus:border-blue-500
            "
          >

            <option value="All">
              All Jobs
            </option>

            <option value="Active">
              Active
            </option>

            <option value="Inactive">
              Inactive
            </option>

          </select>

        </div>

      </div>


      {/* ======================================================
          TABLE
          ====================================================== */}

      <div className="
        overflow-hidden
        rounded-xl
        border
        border-gray-200
        bg-white
      ">

        {filteredJobs.length === 0 ? (

          <div className="
            flex
            min-h-[300px]
            flex-col
            items-center
            justify-center
            px-6
            text-center
          ">

            <div className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              bg-gray-100
              text-gray-500
            ">

              <Briefcase size={22} />

            </div>

            <p className="
              mt-3
              text-sm
              font-semibold
              text-gray-900
            ">
              No jobs found
            </p>

            <p className="
              mt-1
              text-xs
              text-gray-500
            ">
              Try changing your search or filter.
            </p>

          </div>

        ) : (

          <div className="
            overflow-x-auto
          ">

            <table className="
              min-w-[1000px]
              w-full
            ">

              <thead>

                <tr className="
                  border-b
                  border-gray-200
                  bg-gray-50
                ">

                  <th className="
                    px-5
                    py-3
                    text-left
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wide
                    text-gray-500
                  ">
                    Job
                  </th>

                  <th className="
                    px-5
                    py-3
                    text-left
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wide
                    text-gray-500
                  ">
                    Company
                  </th>

                  <th className="
                    px-5
                    py-3
                    text-left
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wide
                    text-gray-500
                  ">
                    Location
                  </th>

                  <th className="
                    px-5
                    py-3
                    text-left
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wide
                    text-gray-500
                  ">
                    Posted
                  </th>

                  <th className="
                    px-5
                    py-3
                    text-left
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wide
                    text-gray-500
                  ">
                    Status
                  </th>

                  <th className="
                    px-5
                    py-3
                    text-right
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wide
                    text-gray-500
                  ">
                    Actions
                  </th>

                </tr>

              </thead>


              <tbody className="
                divide-y
                divide-gray-100
              ">

                {filteredJobs.map(
                  (job) => {

                    const active =
                      job?.isActive !== false;


                    return (

                      <tr
                        key={job._id}
                        className="
                          hover:bg-gray-50
                        "
                      >

                        {/* JOB */}

                        <td className="
                          px-5
                          py-4
                        ">

                          <div className="
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

                              <Briefcase
                                size={17}
                              />

                            </div>


                            <div className="
                              min-w-0
                            ">

                              <p className="
                                max-w-[220px]
                                truncate
                                text-sm
                                font-semibold
                                text-gray-900
                              ">
                                {getTitle(job)}
                              </p>

                              <p className="
                                truncate
                                text-xs
                                text-gray-500
                              ">
                                {job?.category ||
                                  "General"}
                              </p>

                            </div>

                          </div>

                        </td>


                        {/* COMPANY */}

                        <td className="
                          px-5
                          py-4
                        ">

                          <div className="
                            flex
                            items-center
                            gap-2
                          ">

                            <Building2
                              size={16}
                              className="text-gray-400"
                            />

                            <span className="
                              max-w-[180px]
                              truncate
                              text-sm
                              text-gray-700
                            ">
                              {getCompany(job)}
                            </span>

                          </div>

                        </td>


                        {/* LOCATION */}

                        <td className="
                          px-5
                          py-4
                        ">

                          <div className="
                            flex
                            items-center
                            gap-2
                          ">

                            <MapPin
                              size={16}
                              className="text-gray-400"
                            />

                            <span className="
                              max-w-[180px]
                              truncate
                              text-sm
                              text-gray-600
                            ">
                              {getLocation(job)}
                            </span>

                          </div>

                        </td>


                        {/* DATE */}

                        <td className="
                          whitespace-nowrap
                          px-5
                          py-4
                          text-sm
                          text-gray-500
                        ">

                          {formatDate(
                            job.createdAt
                          )}

                        </td>


                        {/* STATUS */}

                        <td className="
                          px-5
                          py-4
                        ">

                          <span
                            className={`
                              inline-flex
                              rounded-full
                              px-3
                              py-1.5
                              text-xs
                              font-semibold
                              ${
                                active
                                  ? "bg-green-50 text-green-700"
                                  : "bg-red-50 text-red-700"
                              }
                            `}
                          >

                            {active
                              ? "Active"
                              : "Inactive"}

                          </span>

                        </td>


                        {/* ACTIONS */}

                        <td className="
                          px-5
                          py-4
                        ">

                          <div className="
                            flex
                            justify-end
                            gap-1
                          ">

                            <button
                              type="button"
                              onClick={() =>
                                setSelectedJob(
                                  job
                                )
                              }
                              className="
                                rounded-lg
                                p-2
                                text-gray-500
                                hover:bg-blue-50
                                hover:text-blue-600
                              "
                              title="View job"
                            >

                              <Eye size={17} />

                            </button>


                            <button
                              type="button"
                              disabled={
                                actionLoading
                              }
                              onClick={() =>
                                updateJobStatus(
                                  job
                                )
                              }
                              className="
                                rounded-lg
                                p-2
                                text-gray-500
                                hover:bg-green-50
                                hover:text-green-600
                                disabled:opacity-50
                              "
                              title={
                                active
                                  ? "Disable job"
                                  : "Activate job"
                              }
                            >

                              {active ? (
                                <ToggleLeft
                                  size={18}
                                />
                              ) : (
                                <ToggleRight
                                  size={18}
                                />
                              )}

                            </button>


                            <button
                              type="button"
                              disabled={
                                actionLoading
                              }
                              onClick={() =>
                                deleteJob(job)
                              }
                              className="
                                rounded-lg
                                p-2
                                text-gray-500
                                hover:bg-red-50
                                hover:text-red-600
                                disabled:opacity-50
                              "
                              title="Delete job"
                            >

                              <Trash2 size={17} />

                            </button>

                          </div>

                        </td>

                      </tr>

                    );

                  }
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>


      {/* ======================================================
          JOB DETAILS MODAL
          ====================================================== */}

      {selectedJob && (

        <div className="
          fixed
          inset-0
          z-[100]
          flex
          items-center
          justify-center
          bg-black/50
          p-4
        ">

          <div className="
            max-h-[90vh]
            w-full
            max-w-2xl
            overflow-y-auto
            rounded-2xl
            bg-white
            shadow-xl
          ">

            {/* HEADER */}

            <div className="
              sticky
              top-0
              z-10
              flex
              items-center
              justify-between
              border-b
              border-gray-200
              bg-white
              px-5
              py-4
            ">

              <div className="
                flex
                items-center
                gap-3
              ">

                <div className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-lg
                  bg-blue-50
                  text-blue-600
                ">

                  <Briefcase
                    size={19}
                  />

                </div>

                <div>

                  <h2 className="
                    text-lg
                    font-bold
                    text-gray-900
                  ">
                    Job Details
                  </h2>

                  <p className="
                    text-xs
                    text-gray-500
                  ">
                    Review job information
                  </p>

                </div>

              </div>


              <button
                type="button"
                onClick={() =>
                  setSelectedJob(null)
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

            </div>


            {/* BODY */}

            <div className="
              space-y-6
              p-5
            ">

              <div>

                <h3 className="
                  text-xl
                  font-bold
                  text-gray-900
                ">
                  {getTitle(
                    selectedJob
                  )}
                </h3>

                <p className="
                  mt-1
                  text-sm
                  text-gray-500
                ">
                  {getCompany(
                    selectedJob
                  )}
                </p>

              </div>


              <div className="
                grid
                grid-cols-1
                gap-3
                sm:grid-cols-2
              ">

                <InfoBox
                  icon={Building2}
                  label="Company"
                  value={getCompany(
                    selectedJob
                  )}
                />

                <InfoBox
                  icon={MapPin}
                  label="Location"
                  value={getLocation(
                    selectedJob
                  )}
                />

                <InfoBox
                  icon={Briefcase}
                  label="Category"
                  value={
                    selectedJob.category ||
                    "General"
                  }
                />

                <InfoBox
                  icon={CalendarDays}
                  label="Posted"
                  value={formatDate(
                    selectedJob.createdAt
                  )}
                />

              </div>


              <div>

                <p className="
                  mb-2
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wide
                  text-gray-500
                ">
                  Status
                </p>

                <span
                  className={`
                    inline-flex
                    rounded-full
                    px-3
                    py-1.5
                    text-xs
                    font-semibold
                    ${
                      selectedJob.isActive !== false
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-700"
                    }
                  `}
                >

                  {selectedJob.isActive !== false
                    ? "Active"
                    : "Inactive"}

                </span>

              </div>


              {selectedJob.description && (

                <div>

                  <p className="
                    mb-2
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wide
                    text-gray-500
                  ">
                    Description
                  </p>

                  <div className="
                    rounded-xl
                    border
                    border-gray-200
                    bg-gray-50
                    p-4
                  ">

                    <p className="
                      whitespace-pre-wrap
                      text-sm
                      leading-6
                      text-gray-700
                    ">
                      {selectedJob.description}
                    </p>

                  </div>

                </div>

              )}

            </div>


            {/* FOOTER */}

            <div className="
              flex
              items-center
              justify-between
              border-t
              border-gray-200
              px-5
              py-4
            ">

              <button
                type="button"
                disabled={
                  actionLoading
                }
                onClick={() =>
                  deleteJob(
                    selectedJob
                  )
                }
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-lg
                  px-4
                  py-2.5
                  text-sm
                  font-medium
                  text-red-600
                  hover:bg-red-50
                  disabled:opacity-50
                "
              >

                <Trash2 size={16} />

                Delete

              </button>


              <div className="
                flex
                gap-2
              ">

                <button
                  type="button"
                  disabled={
                    actionLoading
                  }
                  onClick={() =>
                    updateJobStatus(
                      selectedJob
                    )
                  }
                  className="
                    inline-flex
                    items-center
                    gap-2
                    rounded-lg
                    border
                    border-gray-200
                    px-4
                    py-2.5
                    text-sm
                    font-medium
                    text-gray-700
                    hover:bg-gray-50
                    disabled:opacity-50
                  "
                >

                  {selectedJob.isActive !== false
                    ? "Disable"
                    : "Activate"}

                </button>


                <button
                  type="button"
                  onClick={() =>
                    setSelectedJob(null)
                  }
                  className="
                    rounded-lg
                    bg-gray-900
                    px-4
                    py-2.5
                    text-sm
                    font-medium
                    text-white
                    hover:bg-gray-800
                  "
                >
                  Close
                </button>

              </div>

            </div>

          </div>

        </div>

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
      ">

        <div>

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
            {value}
          </p>

        </div>


        <div className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-lg
          bg-blue-50
          text-blue-600
        ">

          <Icon size={20} />

        </div>

      </div>

    </div>

  );

}


// ============================================================
// INFO BOX
// ============================================================

function InfoBox({
  icon: Icon,
  label,
  value,
}) {

  return (

    <div className="
      rounded-xl
      border
      border-gray-200
      bg-gray-50
      p-4
    ">

      <div className="
        flex
        items-center
        gap-2
      ">

        <Icon
          size={16}
          className="text-blue-600"
        />

        <span className="
          text-xs
          font-medium
          text-gray-500
        ">
          {label}
        </span>

      </div>

      <p className="
        mt-2
        text-sm
        font-semibold
        text-gray-900
      ">
        {value || "—"}
      </p>

    </div>

  );

}


export default Jobs;