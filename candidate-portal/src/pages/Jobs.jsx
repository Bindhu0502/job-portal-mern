import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  useSearchParams,
} from "react-router-dom";

import {
  Briefcase,
  RefreshCw,
  Search,
  SlidersHorizontal,
  X,
  AlertCircle,
} from "lucide-react";

import api from "../services/api";

import SearchBar from "../components/jobs/SearchBar";
import JobFilters from "../components/jobs/JobFilters";
import JobList from "../components/jobs/JobList";
import JobPagination from "../components/jobs/JobPagination";

import Loader from "../components/ui/Loader";

// ============================================================
// JOBS PAGE
// ============================================================

function Jobs() {
  const [
    searchParams,
  ] = useSearchParams();

  const categoryFromUrl =
    searchParams.get("category") || "";

  // ==========================================================
  // STATE
  // ==========================================================

  const [
    jobs,
    setJobs,
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
    error,
    setError,
  ] = useState("");

  const [
    totalJobs,
    setTotalJobs,
  ] = useState(0);

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    filters,
    setFilters,
  ] = useState({
    location: "",
    jobType: "",
    experience: "",
    workMode: "",
    category: "",
    sort: "",
  });

  const [
    page,
    setPage,
  ] = useState(1);

  const [
    totalPages,
    setTotalPages,
  ] = useState(1);

  const [
    savingJobId,
    setSavingJobId,
  ] = useState(null);

  const jobsPerPage = 6;

  // ==========================================================
  // RESET PAGE WHEN SEARCH/FILTER CHANGES
  // ==========================================================

  useEffect(() => {
    setPage(1);
  }, [
    search,
    filters.location,
    filters.jobType,
    filters.experience,
    filters.workMode,
    filters.category,
    filters.sort,
    categoryFromUrl,
  ]);

  // ==========================================================
  // FETCH JOBS
  // ==========================================================

  const fetchJobs = useCallback(
    async (isRefresh = false) => {
      try {
        setError("");

        if (isRefresh) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        const params =
          new URLSearchParams();

        params.append(
          "page",
          page
        );

        params.append(
          "limit",
          jobsPerPage
        );

        // ----------------------------------------------------
        // SEARCH
        // ----------------------------------------------------

        if (search.trim()) {
          params.append(
            "search",
            search.trim()
          );
        }

        // ----------------------------------------------------
        // FILTERS
        // ----------------------------------------------------

        Object.entries(filters).forEach(
          ([key, value]) => {
            if (
              value !== undefined &&
              value !== null &&
              String(value).trim() !== ""
            ) {
              params.append(
                key,
                value
              );
            }
          }
        );

        // ----------------------------------------------------
        // CATEGORY FROM URL
        // ----------------------------------------------------

        if (categoryFromUrl) {
          params.set(
            "category",
            categoryFromUrl
          );
        }

        // ----------------------------------------------------
        // GET JOBS
        // ----------------------------------------------------

        const response =
          await api.get(
            `/jobs?${params.toString()}`
          );

        const jobsData =
          Array.isArray(
            response.data?.jobs
          )
            ? response.data.jobs
            : [];

        setTotalJobs(
          Number(
            response.data?.totalJobs ||
              0
          )
        );

        setTotalPages(
          Math.max(
            1,
            Number(
              response.data?.totalPages ||
                1
            )
          )
        );

        // ----------------------------------------------------
        // GET SAVED JOBS
        // ----------------------------------------------------

        let savedIds = [];

        try {
          const savedResponse =
            await api.get(
              "/saved-jobs/my"
            );

          const savedList =
            Array.isArray(
              savedResponse.data
                ?.savedJobs
            )
              ? savedResponse.data
                  .savedJobs
              : [];

          savedIds =
            savedList
              .map(
                (item) =>
                  item.job?._id ||
                  item.job
              )
              .filter(Boolean)
              .map(String);

        } catch (savedError) {
          // User may not have saved jobs.
          // Do not break the Jobs page.
          console.log(
            "Saved jobs check skipped:",
            savedError.response
              ?.data ||
              savedError.message
          );
        }

        // ----------------------------------------------------
        // ADD SAVED STATUS
        // ----------------------------------------------------

        const updatedJobs =
          jobsData.map(
            (job) => ({
              ...job,
              saved:
                savedIds.includes(
                  String(job._id)
                ),
            })
          );

        setJobs(
          updatedJobs
        );

      } catch (err) {
        console.error(
          "FETCH JOBS ERROR:",
          err.response?.data ||
            err
        );

        setJobs([]);
        setTotalJobs(0);
        setTotalPages(1);

        setError(
          err.response?.data
            ?.message ||
            "Unable to load jobs. Please try again."
        );

      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [
      page,
      search,
      filters,
      categoryFromUrl,
    ]
  );

  // ==========================================================
  // FETCH WHEN PAGE/FILTER CHANGES
  // ==========================================================

  useEffect(() => {
    fetchJobs();
  }, [
    fetchJobs,
  ]);

  // ==========================================================
  // SAVE / UNSAVE JOB
  // ==========================================================

  const handleSave = async (
    jobId
  ) => {
    if (!jobId) {
      return;
    }

    const selectedJob =
      jobs.find(
        (job) =>
          String(job._id) ===
          String(jobId)
      );

    if (!selectedJob) {
      return;
    }

    try {
      setSavingJobId(jobId);
      setError("");

      // ------------------------------------------------------
      // UNSAVE
      // ------------------------------------------------------

      if (selectedJob.saved) {
        await api.delete(
          `/saved-jobs/${jobId}`
        );
      }

      // ------------------------------------------------------
      // SAVE
      // ------------------------------------------------------

      else {
        await api.post(
          `/saved-jobs/${jobId}`
        );
      }

      // ------------------------------------------------------
      // UPDATE UI
      // ------------------------------------------------------

      setJobs(
        (previous) =>
          previous.map(
            (job) =>
              String(job._id) ===
              String(jobId)
                ? {
                    ...job,
                    saved:
                      !job.saved,
                  }
                : job
          )
      );

    } catch (err) {
      console.error(
        "SAVE JOB ERROR:",
        err.response?.data ||
          err
      );

      setError(
        err.response?.data
          ?.message ||
          "Unable to update saved job."
      );

    } finally {
      setSavingJobId(null);
    }
  };

  // ==========================================================
  // CLEAR ALL FILTERS
  // ==========================================================

  const clearFilters = () => {
    setSearch("");

    setFilters({
      location: "",
      jobType: "",
      experience: "",
      workMode: "",
      category: "",
      sort: "",
    });

    setPage(1);
  };

  // ==========================================================
  // CHECK ACTIVE FILTERS
  // ==========================================================

  const hasActiveFilters =
    search.trim() !== "" ||
    Object.values(filters).some(
      (value) =>
        value !== undefined &&
        value !== null &&
        String(value).trim() !== ""
    ) ||
    categoryFromUrl !== "";

  // ==========================================================
  // INITIAL LOADING
  // ==========================================================

  if (
    loading &&
    jobs.length === 0
  ) {
    return <Loader />;
  }

  // ==========================================================
  // PAGE
  // ==========================================================

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-10">

      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 mb-7">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

            <div>

              <div className="flex items-center gap-3">

                <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">

                  <Briefcase
                    size={26}
                  />

                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Find Your Dream Job
                </h1>

              </div>

              <p className="text-gray-500 mt-3">
                Discover opportunities that match your skills, experience and career goals.
              </p>

            </div>

            <button
              type="button"
              onClick={() =>
                fetchJobs(true)
              }
              disabled={
                refreshing
              }
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
                : "Refresh Jobs"}

            </button>

          </div>

        </div>

        {/* ==================================================
            ERROR
        ================================================== */}

        {error && (
          <div className="mb-7 bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 flex items-start gap-3">

            <AlertCircle
              size={20}
              className="mt-0.5 flex-shrink-0"
            />

            <div className="flex-1">

              <p className="font-semibold">
                Unable to complete request
              </p>

              <p className="text-sm mt-1">
                {error}
              </p>

            </div>

            <button
              type="button"
              onClick={() =>
                setError("")
              }
              className="text-red-500 hover:text-red-700"
            >
              <X size={18} />
            </button>

          </div>
        )}

        {/* ==================================================
            SEARCH
        ================================================== */}

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-7">

          <div className="flex items-center gap-2 mb-4">

            <Search
              size={20}
              className="text-blue-600"
            />

            <h2 className="font-bold text-gray-900">
              Search Jobs
            </h2>

          </div>

          <SearchBar
            search={search}
            setSearch={setSearch}
          />

        </div>

        {/* ==================================================
            MAIN CONTENT
        ================================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-7">

          {/* ==================================================
              FILTERS
          ================================================== */}

          <aside className="lg:col-span-1">

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 lg:sticky lg:top-24">

              <div className="flex items-center justify-between mb-5">

                <div className="flex items-center gap-2">

                  <SlidersHorizontal
                    size={20}
                    className="text-blue-600"
                  />

                  <h2 className="font-bold text-gray-900">
                    Filters
                  </h2>

                </div>

                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={
                      clearFilters
                    }
                    className="text-sm text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    Clear
                  </button>
                )}

              </div>

              <JobFilters
                filters={filters}
                setFilters={
                  setFilters
                }
              />

            </div>

          </aside>

          {/* ==================================================
              JOB RESULTS
          ================================================== */}

          <main className="lg:col-span-3">

            {/* RESULTS HEADER */}

            <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-4 mb-5">

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                <div>

                  <p className="text-gray-700 font-medium">

                    Showing{" "}

                    <span className="font-bold text-gray-900">
                      {jobs.length}
                    </span>{" "}

                    of{" "}

                    <span className="font-bold text-gray-900">
                      {totalJobs}
                    </span>{" "}

                    jobs

                  </p>

                  {hasActiveFilters && (
                    <p className="text-sm text-blue-600 mt-1">
                      Filters are active
                    </p>
                  )}

                </div>

                <p className="text-sm text-gray-500">

                  Page{" "}
                  <span className="font-semibold text-gray-800">
                    {page}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-gray-800">
                    {totalPages}
                  </span>

                </p>

              </div>

            </div>

            {/* JOB LIST */}

            {jobs.length === 0 ? (

              <div className="bg-white rounded-2xl border shadow-sm p-10 md:p-14 text-center">

                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto">

                  <Search
                    size={38}
                    className="text-gray-400"
                  />

                </div>

                <h2 className="text-2xl font-bold text-gray-900 mt-6">
                  No Jobs Found
                </h2>

                <p className="text-gray-500 mt-2 max-w-md mx-auto">
                  We couldn't find jobs matching your current search and filters.
                </p>

                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={
                      clearFilters
                    }
                    className="mt-6 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
                  >
                    <X size={18} />
                    Clear Filters
                  </button>
                )}

              </div>

            ) : (

              <>

                <JobList
                  jobs={jobs}
                  onSave={
                    handleSave
                  }
                  savingJobId={
                    savingJobId
                  }
                />

                {/* ==================================================
                    PAGINATION
                ================================================== */}

                {totalPages > 1 && (
                  <div className="mt-8 bg-white rounded-xl border shadow-sm p-4">

                    <JobPagination
                      page={page}
                      totalPages={
                        totalPages
                      }
                      setPage={
                        setPage
                      }
                    />

                  </div>
                )}

              </>
            )}

          </main>

        </div>

      </div>
    </div>
  );
}

export default Jobs;