import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  Bookmark,
  MapPin,
  Briefcase,
  Trash2,
  DollarSign,
  Clock,
  Search,
  RefreshCw,
  Building2,
  ArrowRight,
  AlertCircle,
  BookmarkX,
} from "lucide-react";

import api from "../services/api";

import Loader from "../components/ui/Loader";

// ============================================================
// SAVED JOBS
// ============================================================

function SavedJobs() {
  // ==========================================================
  // STATE
  // ==========================================================

  const [
    savedJobs,
    setSavedJobs,
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
    removingId,
    setRemovingId,
  ] = useState(null);

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    error,
    setError,
  ] = useState("");

  // ==========================================================
  // LOAD SAVED JOBS
  // ==========================================================

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  // ==========================================================
  // FETCH SAVED JOBS
  // ==========================================================

  const fetchSavedJobs =
    async () => {
      try {
        setError("");
        setRefreshing(true);

        const response =
          await api.get(
            "/saved-jobs/my"
          );

        const jobs =
          response.data
            ?.savedJobs;

        setSavedJobs(
          Array.isArray(jobs)
            ? jobs
            : []
        );

      } catch (err) {
        console.error(
          "SAVED JOB ERROR:",
          err.response?.data ||
            err
        );

        setError(
          err.response?.data
            ?.message ||
            "Unable to load saved jobs."
        );

        setSavedJobs([]);

      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    };

  // ==========================================================
  // GET JOB ID
  // ==========================================================

  const getJobId = (item) => {
    if (!item) {
      return null;
    }

    if (
      typeof item.job ===
      "object" &&
      item.job !== null
    ) {
      return item.job._id;
    }

    return item.job;
  };

  // ==========================================================
  // COMPANY NAME
  // ==========================================================

  const getCompany = (job) => {
    if (!job) {
      return "Company";
    }

    if (
      typeof job.company ===
        "object" &&
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

  // ==========================================================
  // SKILLS
  // ==========================================================

  const getSkills = (skills) => {
    if (!skills) {
      return [];
    }

    if (Array.isArray(skills)) {
      return skills;
    }

    return String(skills)
      .split(",")
      .map((skill) =>
        skill.trim()
      )
      .filter(Boolean);
  };

  // ==========================================================
  // FILTER SAVED JOBS
  // ==========================================================

  const filteredJobs =
    useMemo(() => {
      const searchText =
        search
          .trim()
          .toLowerCase();

      if (!searchText) {
        return savedJobs;
      }

      return savedJobs.filter(
        (item) => {
          const job =
            item.job;

          const title =
            job?.title
              ?.toLowerCase() ||
            "";

          const company =
            getCompany(
              job
            ).toLowerCase();

          const location =
            job?.location
              ?.toLowerCase() ||
            "";

          const category =
            job?.category
              ?.toLowerCase() ||
            "";

          return (
            title.includes(
              searchText
            ) ||
            company.includes(
              searchText
            ) ||
            location.includes(
              searchText
            ) ||
            category.includes(
              searchText
            )
          );
        }
      );
    }, [
      savedJobs,
      search,
    ]);

  // ==========================================================
  // REMOVE SAVED JOB
  // ==========================================================

  const removeJob =
    async (savedItem) => {
      const jobId =
        getJobId(savedItem);

      if (!jobId) {
        return;
      }

      const confirmed =
        window.confirm(
          "Remove this job from your saved jobs?"
        );

      if (!confirmed) {
        return;
      }

      try {
        setError("");
        setRemovingId(jobId);

        await api.delete(
          `/saved-jobs/${jobId}`
        );

        setSavedJobs(
          (previous) =>
            previous.filter(
              (item) =>
                getJobId(item) !==
                jobId
            )
        );

      } catch (err) {
        console.error(
          "REMOVE SAVED JOB ERROR:",
          err.response?.data ||
            err
        );

        setError(
          err.response?.data
            ?.message ||
            "Unable to remove saved job."
        );

      } finally {
        setRemovingId(null);
      }
    };

  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {
    return <Loader />;
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

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 mb-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

            <div>

              <div className="flex items-center gap-3 mb-2">

                <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">
                  <Bookmark
                    size={24}
                    fill="currentColor"
                  />
                </div>

                <h1 className="text-3xl font-bold text-gray-900">
                  Saved Jobs
                </h1>

              </div>

              <p className="text-gray-500">
                Keep track of jobs you want to apply for later.
              </p>

            </div>

            <button
              type="button"
              onClick={fetchSavedJobs}
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
                Something went wrong
              </p>

              <p className="text-sm mt-1">
                {error}
              </p>

            </div>

          </div>
        )}

        {/* ==================================================
            SEARCH
        ================================================== */}

        {savedJobs.length > 0 && (
          <div className="bg-white rounded-2xl border shadow-sm p-5 mb-8">

            <div className="flex flex-col md:flex-row md:items-center gap-4">

              <div className="relative flex-1">

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
                  placeholder="Search saved jobs, companies or locations..."
                  className="w-full border border-gray-300 rounded-xl py-3 pl-11 pr-4 outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />

              </div>

              <div className="text-sm text-gray-500">

                <span className="font-semibold text-gray-800">
                  {filteredJobs.length}
                </span>{" "}
                saved{" "}
                {filteredJobs.length === 1
                  ? "job"
                  : "jobs"}

              </div>

            </div>

          </div>
        )}

        {/* ==================================================
            EMPTY STATE
        ================================================== */}

        {savedJobs.length === 0 ? (

          <div className="bg-white rounded-2xl border shadow-sm p-12 text-center">

            <div className="w-20 h-20 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center mx-auto">

              <BookmarkX
                size={38}
              />

            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-6">
              No Saved Jobs Yet
            </h2>

            <p className="text-gray-500 mt-2 max-w-md mx-auto">
              Save jobs that interest you so you can easily find and apply for them later.
            </p>

            <Link
              to="/jobs"
              className="inline-flex items-center gap-2 mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              <Briefcase
                size={18}
              />

              Explore Jobs

              <ArrowRight
                size={18}
              />

            </Link>

          </div>

        ) : filteredJobs.length === 0 ? (

          /* ==================================================
             SEARCH EMPTY
          ================================================== */

          <div className="bg-white rounded-2xl border shadow-sm p-12 text-center">

            <Search
              size={48}
              className="mx-auto text-gray-400"
            />

            <h2 className="text-xl font-bold text-gray-900 mt-5">
              No Matching Jobs
            </h2>

            <p className="text-gray-500 mt-2">
              Try a different job title, company or location.
            </p>

            <button
              type="button"
              onClick={() =>
                setSearch("")
              }
              className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-semibold"
            >
              Clear Search
            </button>

          </div>

        ) : (

          /* ==================================================
             JOB GRID
          ================================================== */

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {filteredJobs.map(
              (savedItem) => {

                const job =
                  savedItem.job;

                const jobId =
                  getJobId(
                    savedItem
                  );

                const skills =
                  getSkills(
                    job?.skills
                  );

                const isRemoving =
                  removingId ===
                  jobId;

                return (
                  <div
                    key={
                      savedItem._id ||
                      jobId
                    }
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition p-6"
                  >

                    {/* ==================================================
                       JOB HEADER
                    ================================================== */}

                    <div className="flex items-start justify-between gap-4">

                      <div className="flex items-start gap-4">

                        <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">

                          <Building2
                            size={27}
                            className="text-blue-600"
                          />

                        </div>

                        <div>

                          <h2 className="text-xl font-bold text-gray-900 leading-tight">

                            {job?.title ||
                              "Job Title"}

                          </h2>

                          <p className="text-gray-500 mt-1">

                            {getCompany(
                              job
                            )}

                          </p>

                        </div>

                      </div>

                      <Bookmark
                        size={23}
                        className="text-blue-600 flex-shrink-0"
                        fill="currentColor"
                      />

                    </div>

                    {/* ==================================================
                       JOB DETAILS
                    ================================================== */}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 text-sm text-gray-600">

                      <div className="flex items-center gap-2">

                        <MapPin
                          size={17}
                          className="text-gray-400 flex-shrink-0"
                        />

                        <span>
                          {job?.location ||
                            "Location not specified"}
                        </span>

                      </div>

                      <div className="flex items-center gap-2">

                        <Briefcase
                          size={17}
                          className="text-gray-400 flex-shrink-0"
                        />

                        <span>
                          {job?.jobType ||
                            "Full Time"}
                        </span>

                      </div>

                      <div className="flex items-center gap-2">

                        <DollarSign
                          size={17}
                          className="text-gray-400 flex-shrink-0"
                        />

                        <span>
                          {job?.salary ||
                            "Salary not disclosed"}
                        </span>

                      </div>

                      <div className="flex items-center gap-2">

                        <Clock
                          size={17}
                          className="text-gray-400 flex-shrink-0"
                        />

                        <span>
                          {job?.experience ||
                            "Fresher"}
                        </span>

                      </div>

                    </div>

                    {/* ==================================================
                       BADGES
                    ================================================== */}

                    <div className="flex flex-wrap gap-2 mt-5">

                      {job?.workMode && (
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                          {job.workMode}
                        </span>
                      )}

                      {job?.category && (
                        <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">
                          {job.category}
                        </span>
                      )}

                      {job?.jobType && (
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                          {job.jobType}
                        </span>
                      )}

                    </div>

                    {/* ==================================================
                       SKILLS
                    ================================================== */}

                    {skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-5">

                        {skills
                          .slice(
                            0,
                            5
                          )
                          .map(
                            (
                              skill,
                              index
                            ) => (
                              <span
                                key={
                                  `${skill}-${index}`
                                }
                                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium"
                              >
                                {skill}
                              </span>
                            )
                          )}

                        {skills.length >
                          5 && (
                          <span className="text-xs text-gray-400 px-2 py-1">
                            +
                            {skills.length -
                              5}{" "}
                            more
                          </span>
                        )}

                      </div>
                    )}

                    {/* ==================================================
                       ACTIONS
                    ================================================== */}

                    <div className="flex flex-col sm:flex-row gap-3 mt-7 pt-5 border-t">

                      {jobId ? (

                        <Link
                          to={`/jobs/${jobId}`}
                          className="flex-1 inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-semibold transition"
                        >

                          View Job

                          <ArrowRight
                            size={17}
                          />

                        </Link>

                      ) : (

                        <span className="flex-1 text-center bg-gray-100 text-gray-400 px-5 py-3 rounded-xl">
                          Job unavailable
                        </span>

                      )}

                      <button
                        type="button"
                        onClick={() =>
                          removeJob(
                            savedItem
                          )
                        }
                        disabled={
                          isRemoving
                        }
                        className="inline-flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 disabled:bg-gray-100 text-red-600 disabled:text-gray-400 px-5 py-3 rounded-xl font-semibold transition"
                      >

                        <Trash2
                          size={17}
                        />

                        {isRemoving
                          ? "Removing..."
                          : "Remove"}

                      </button>

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

export default SavedJobs;