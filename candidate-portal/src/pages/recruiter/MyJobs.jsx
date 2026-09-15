import {
  useEffect,
  useMemo,
  useState
} from "react";

import {
  Link
} from "react-router-dom";

import {
  Briefcase,
  MapPin,
  Users,
  Edit,
  Trash2,
  Power,
  Search,
  RefreshCw,
  Eye,
  Clock
} from "lucide-react";

import api from "../../services/api";

import RecruiterLayout from "../../components/recruiter/RecruiterLayout";





function MyJobs() {





  const [jobs, setJobs] = useState([]);

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const [search, setSearch] = useState("");

  const [error, setError] = useState("");





  // ============================================================
  // FETCH JOBS
  // ============================================================

  useEffect(() => {

    fetchJobs();

  }, []);





  const fetchJobs = async () => {

    try {

      setError("");

      setRefreshing(true);

      const res = await api.get(
        "/recruiter/jobs"
      );

      setJobs(
        res.data.jobs || []
      );

    }

    catch (error) {

      console.log(
        "MY JOBS ERROR:",
        error.response?.data || error
      );

      setError(
        error.response?.data?.message ||
        "Unable to load your jobs"
      );

    }

    finally {

      setLoading(false);

      setRefreshing(false);

    }

  };





  // ============================================================
  // DELETE JOB
  // ============================================================

  const deleteJob = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?\n\nThis action cannot be undone."
    );

    if (!confirmDelete) {
      return;
    }





    try {

      await api.delete(
        `/recruiter/jobs/${id}`
      );

      setJobs(prev =>
        prev.filter(
          job => job._id !== id
        )
      );

      alert(
        "Job deleted successfully"
      );

    }

    catch (error) {

      console.log(
        "DELETE JOB ERROR:",
        error.response?.data || error
      );

      alert(
        error.response?.data?.message ||
        "Unable to delete job"
      );

    }

  };





  // ============================================================
  // TOGGLE JOB STATUS
  // ============================================================

  const toggleStatus = async (job) => {

    try {

      const res = await api.put(
        `/recruiter/jobs/${job._id}/status`
      );

      const updatedJob =
        res.data.job;





      setJobs(prev =>
        prev.map(item =>

          item._id === job._id

            ? {
                ...item,
                isActive:
                  updatedJob.isActive
              }

            : item

        )
      );

    }

    catch (error) {

      console.log(
        "TOGGLE STATUS ERROR:",
        error.response?.data || error
      );

      alert(
        error.response?.data?.message ||
        "Unable to update job status"
      );

    }

  };





  // ============================================================
  // SEARCH
  // ============================================================

  const filteredJobs = useMemo(() => {

    const text =
      search.trim().toLowerCase();

    if (!text) {
      return jobs;
    }

    return jobs.filter(job => {

      const title =
        job.title?.toLowerCase() || "";

      const company =
        job.company?.toLowerCase() || "";

      const location =
        job.location?.toLowerCase() || "";

      const category =
        job.category?.toLowerCase() || "";

      const skills =
        typeof job.skills === "string"
          ? job.skills.toLowerCase()
          : Array.isArray(job.skills)
            ? job.skills.join(" ").toLowerCase()
            : "";



      return (

        title.includes(text) ||

        company.includes(text) ||

        location.includes(text) ||

        category.includes(text) ||

        skills.includes(text)

      );

    });

  }, [jobs, search]);





  // ============================================================
  // STATS
  // ============================================================

  const totalJobs =
    jobs.length;

  const activeJobs =
    jobs.filter(
      job => job.isActive
    ).length;

  const closedJobs =
    jobs.filter(
      job => !job.isActive
    ).length;

  const totalApplications =
    jobs.reduce(
      (total, job) =>
        total +
        Number(
          job.applicationCount || 0
        ),
      0
    );





  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {

    return (

      <RecruiterLayout>

        <div className="
          flex
          flex-col
          items-center
          justify-center
          py-20
        ">

          <div className="
            w-10
            h-10
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

            Loading your jobs...

          </p>

        </div>

      </RecruiterLayout>

    );

  }





  // ============================================================
  // MAIN UI
  // ============================================================

  return (

    <RecruiterLayout>

      <div className="
        space-y-8
      ">





        {/* ======================================================
            HEADER
        ====================================================== */}

        <div className="
          flex
          flex-col
          md:flex-row
          md:items-center
          md:justify-between
          gap-4
        ">

          <div>

            <h1 className="
              text-3xl
              font-bold
              text-gray-900
            ">

              My Jobs

            </h1>

            <p className="
              text-gray-500
              mt-1
            ">

              Manage your posted jobs and applications.

            </p>

          </div>





          <div className="
            flex
            gap-3
          ">

            <button

              onClick={fetchJobs}

              disabled={refreshing}

              className="
                flex
                items-center
                gap-2
                border
                border-gray-300
                px-4
                py-3
                rounded-lg
                hover:bg-gray-50
              "

            >

              <RefreshCw
                size={18}
                className={
                  refreshing
                    ? "animate-spin"
                    : ""
                }
              />

              Refresh

            </button>





            <Link

              to="/recruiter/create-job"

              className="
                bg-blue-600
                hover:bg-blue-700
                text-white
                px-5
                py-3
                rounded-lg
                font-semibold
              "

            >

              + Create Job

            </Link>

          </div>

        </div>





        {/* ======================================================
            ERROR
        ====================================================== */}

        {error && (

          <div className="
            bg-red-50
            border
            border-red-200
            text-red-700
            p-4
            rounded-xl
          ">

            {error}

          </div>

        )}






        {/* ======================================================
            STATS
        ====================================================== */}

        <div className="
          grid
          sm:grid-cols-2
          lg:grid-cols-4
          gap-5
        ">





          {/* TOTAL */}

          <div className="
            bg-white
            shadow-sm
            border
            border-gray-100
            rounded-xl
            p-5
          ">

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

                  Total Jobs

                </p>

                <h2 className="
                  text-3xl
                  font-bold
                  mt-2
                ">

                  {totalJobs}

                </h2>

              </div>

              <div className="
                w-11
                h-11
                rounded-lg
                bg-blue-100
                text-blue-600
                flex
                items-center
                justify-center
              ">

                <Briefcase size={22} />

              </div>

            </div>

          </div>





          {/* ACTIVE */}

          <div className="
            bg-white
            shadow-sm
            border
            border-gray-100
            rounded-xl
            p-5
          ">

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

                  Active Jobs

                </p>

                <h2 className="
                  text-3xl
                  font-bold
                  mt-2
                  text-green-600
                ">

                  {activeJobs}

                </h2>

              </div>

              <div className="
                w-11
                h-11
                rounded-lg
                bg-green-100
                text-green-600
                flex
                items-center
                justify-center
              ">

                <Power size={22} />

              </div>

            </div>

          </div>





          {/* CLOSED */}

          <div className="
            bg-white
            shadow-sm
            border
            border-gray-100
            rounded-xl
            p-5
          ">

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

                  Closed Jobs

                </p>

                <h2 className="
                  text-3xl
                  font-bold
                  mt-2
                  text-red-600
                ">

                  {closedJobs}

                </h2>

              </div>

              <div className="
                w-11
                h-11
                rounded-lg
                bg-red-100
                text-red-600
                flex
                items-center
                justify-center
              ">

                <Briefcase size={22} />

              </div>

            </div>

          </div>





          {/* APPLICATIONS */}

          <div className="
            bg-white
            shadow-sm
            border
            border-gray-100
            rounded-xl
            p-5
          ">

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

                  Applications

                </p>

                <h2 className="
                  text-3xl
                  font-bold
                  mt-2
                  text-purple-600
                ">

                  {totalApplications}

                </h2>

              </div>

              <div className="
                w-11
                h-11
                rounded-lg
                bg-purple-100
                text-purple-600
                flex
                items-center
                justify-center
              ">

                <Users size={22} />

              </div>

            </div>

          </div>

        </div>





        {/* ======================================================
            SEARCH
        ====================================================== */}

        <div className="
          bg-white
          shadow-sm
          border
          border-gray-100
          rounded-xl
          p-4
          flex
          items-center
          gap-3
        ">

          <Search
            size={20}
            className="text-gray-400"
          />

          <input

            value={search}

            onChange={
              e =>
                setSearch(
                  e.target.value
                )
            }

            placeholder="
              Search by job title, company,
              location, category or skills...
            "

            className="
              w-full
              outline-none
              text-gray-700
            "

          />

        </div>





        {/* ======================================================
            RESULT COUNT
        ====================================================== */}

        <div className="
          flex
          justify-between
          items-center
        ">

          <p className="
            text-gray-600
          ">

            Showing{" "}

            <span className="
              font-semibold
              text-gray-900
            ">

              {filteredJobs.length}

            </span>

            {" "}of{" "}

            <span className="
              font-semibold
              text-gray-900
            ">

              {totalJobs}

            </span>

            {" "}jobs

          </p>

        </div>





        {/* ======================================================
            NO JOBS
        ====================================================== */}

        {filteredJobs.length === 0 ? (

          <div className="
            bg-white
            shadow-sm
            border
            border-gray-100
            rounded-xl
            p-12
            text-center
          ">

            <Briefcase
              size={55}
              className="
                mx-auto
                text-gray-300
              "
            />

            <h2 className="
              text-xl
              font-bold
              mt-4
            ">

              {search
                ? "No matching jobs found"
                : "You haven't posted any jobs yet"
              }

            </h2>

            <p className="
              text-gray-500
              mt-2
            ">

              {search
                ? "Try a different search."
                : "Create your first job posting to start receiving applications."
              }

            </p>

            {!search && (

              <Link

                to="/recruiter/create-job"

                className="
                  inline-block
                  mt-5
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  px-5
                  py-2.5
                  rounded-lg
                "

              >

                Create Job

              </Link>

            )}

          </div>

        ) : (





          /* ====================================================
             JOB CARDS
          ==================================================== */

          <div className="
            grid
            md:grid-cols-2
            xl:grid-cols-2
            gap-6
          ">

            {filteredJobs.map(job => (

              <div

                key={job._id}

                className="
                  bg-white
                  shadow-sm
                  border
                  border-gray-100
                  rounded-xl
                  p-6
                  hover:shadow-md
                  transition
                "

              >





                {/* JOB HEADER */}

                <div className="
                  flex
                  justify-between
                  items-start
                  gap-4
                ">

                  <div>

                    <h2 className="
                      text-xl
                      font-bold
                      text-gray-900
                    ">

                      {job.title}

                    </h2>

                    <p className="
                      text-gray-500
                      mt-1
                    ">

                      {job.company}

                    </p>

                  </div>





                  <span

                    className={`
                      px-3
                      py-1
                      rounded-full
                      text-sm
                      font-medium
                      whitespace-nowrap
                      ${
                        job.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }
                    `}

                  >

                    {job.isActive
                      ? "Active"
                      : "Inactive"
                    }

                  </span>

                </div>





                {/* JOB DETAILS */}

                <div className="
                  mt-5
                  space-y-3
                  text-gray-600
                  text-sm
                ">

                  <div className="
                    flex
                    gap-2
                    items-center
                  ">

                    <MapPin size={18} />

                    {job.location ||
                      "Location not specified"
                    }

                  </div>





                  <div className="
                    flex
                    gap-2
                    items-center
                  ">

                    <Briefcase size={18} />

                    {job.jobType ||
                      "Full Time"
                    }

                  </div>





                  <div className="
                    flex
                    gap-2
                    items-center
                  ">

                    <Clock size={18} />

                    {job.experience ||
                      "Fresher"
                    }

                  </div>





                  <div className="
                    flex
                    gap-2
                    items-center
                  ">

                    <Users size={18} />

                    <span>

                      {job.applicationCount || 0}

                      {" "}Applications

                    </span>

                  </div>

                </div>





                {/* BADGES */}

                <div className="
                  flex
                  flex-wrap
                  gap-2
                  mt-5
                ">

                  {job.workMode && (

                    <span className="
                      bg-blue-50
                      text-blue-700
                      px-3
                      py-1
                      rounded-full
                      text-xs
                    ">

                      {job.workMode}

                    </span>

                  )}





                  {job.category && (

                    <span className="
                      bg-purple-50
                      text-purple-700
                      px-3
                      py-1
                      rounded-full
                      text-xs
                    ">

                      {job.category}

                    </span>

                  )}

                </div>





                {/* ACTIONS */}

                <div className="
                  flex
                  flex-wrap
                  gap-3
                  mt-6
                  pt-5
                  border-t
                ">





                  {/* VIEW */}

                  <Link

                    to={`/jobs/${job._id}`}

                    className="
                      flex
                      items-center
                      gap-2
                      bg-gray-100
                      hover:bg-gray-200
                      text-gray-700
                      px-4
                      py-2
                      rounded-lg
                    "

                  >

                    <Eye size={16} />

                    View

                  </Link>





                  {/* APPLICATIONS */}

                  <Link

                    to="/recruiter/applications"

                    className="
                      flex
                      items-center
                      gap-2
                      bg-purple-100
                      hover:bg-purple-200
                      text-purple-700
                      px-4
                      py-2
                      rounded-lg
                    "

                  >

                    <Users size={16} />

                    Applications

                  </Link>





                  {/* TOGGLE */}

                  <button

                    onClick={() =>
                      toggleStatus(job)
                    }

                    className="
                      flex
                      items-center
                      gap-2
                      bg-gray-100
                      hover:bg-gray-200
                      text-gray-700
                      px-4
                      py-2
                      rounded-lg
                    "

                  >

                    <Power size={16} />

                    {job.isActive
                      ? "Disable"
                      : "Enable"
                    }

                  </button>





                  {/* EDIT */}

                  <Link

                    to={`/recruiter/edit-job/${job._id}`}

                    className="
                      flex
                      items-center
                      gap-2
                      bg-blue-600
                      hover:bg-blue-700
                      text-white
                      px-4
                      py-2
                      rounded-lg
                    "

                  >

                    <Edit size={16} />

                    Edit

                  </Link>





                  {/* DELETE */}

                  <button

                    onClick={() =>
                      deleteJob(job._id)
                    }

                    className="
                      flex
                      items-center
                      gap-2
                      bg-red-600
                      hover:bg-red-700
                      text-white
                      px-4
                      py-2
                      rounded-lg
                    "

                  >

                    <Trash2 size={16} />

                    Delete

                  </button>

                </div>





              </div>

            ))}

          </div>

        )}

      </div>

    </RecruiterLayout>

  );

}





export default MyJobs;