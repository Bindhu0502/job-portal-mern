import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Search,
  Users,
  FileText,
  Mail,
  Phone,
  CalendarDays,
  Briefcase,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
} from "lucide-react";

import api from "../../services/api";

import RecruiterLayout from "../../components/recruiter/RecruiterLayout";


function Applications() {

  // ============================================================
  // STATE
  // ============================================================

  const [applications, setApplications] = useState([]);

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [updatingId, setUpdatingId] = useState("");

  const [error, setError] = useState("");


  // ============================================================
  // FETCH APPLICATIONS
  // ============================================================

  useEffect(() => {
    fetchApplications();
  }, []);


  const fetchApplications = async () => {

    try {

      setError("");

      setRefreshing(true);

      const res = await api.get(
        "/recruiter/applications"
      );

      setApplications(
        res.data.applications || []
      );

    } catch (error) {

      console.log(
        "RECRUITER APPLICATION ERROR:",
        error.response?.data || error
      );

      setError(
        error.response?.data?.message ||
        "Unable to load applications"
      );

    } finally {

      setLoading(false);

      setRefreshing(false);

    }

  };


  // ============================================================
  // UPDATE APPLICATION STATUS
  // IMPORTANT:
  // Backend route:
  // PUT /api/recruiter/applications/:id/status
  // ============================================================

  const updateStatus = async (
    applicationId,
    status
  ) => {

    try {

      setUpdatingId(applicationId);

      const res = await api.put(
        `/recruiter/applications/${applicationId}/status`,
        {
          status,
        }
      );

      const updatedApplication =
        res.data.application;


      setApplications((prev) =>
        prev.map((application) =>
          application._id === applicationId
            ? {
                ...application,
                status:
                  updatedApplication?.status ||
                  status,
              }
            : application
        )
      );

    } catch (error) {

      console.log(
        "UPDATE APPLICATION STATUS ERROR:",
        error.response?.data || error
      );

      alert(
        error.response?.data?.message ||
        "Unable to update application status"
      );

    } finally {

      setUpdatingId("");

    }

  };


  // ============================================================
  // SEARCH + FILTER
  // ============================================================

  const filteredApplications = useMemo(() => {

    const text =
      search.trim().toLowerCase();


    return applications.filter(
      (application) => {

        const candidate =
          application.user || {};


        const name =
          application.fullName ||
          candidate.name ||
          "";


        const email =
          application.email ||
          candidate.email ||
          "";


        const jobTitle =
          application.job?.title ||
          "";


        const company =
          typeof application.job?.company === "object"
            ? application.job?.company?.name || ""
            : application.job?.company || "";


        const skills =
          typeof application.skills === "string"
            ? application.skills
            : Array.isArray(application.skills)
              ? application.skills.join(" ")
              : "";


        const searchMatch =
          !text ||
          name.toLowerCase().includes(text) ||
          email.toLowerCase().includes(text) ||
          jobTitle.toLowerCase().includes(text) ||
          company.toLowerCase().includes(text) ||
          skills.toLowerCase().includes(text);


        const statusMatch =
          statusFilter === "All" ||
          application.status === statusFilter;


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


  // ============================================================
  // STATS
  // ============================================================

  const totalApplications =
    applications.length;


  const appliedCount =
    applications.filter(
      (app) => app.status === "Applied"
    ).length;


  const reviewedCount =
    applications.filter(
      (app) => app.status === "Reviewed"
    ).length;


  const shortlistedCount =
    applications.filter(
      (app) => app.status === "Shortlisted"
    ).length;


  const selectedCount =
    applications.filter(
      (app) => app.status === "Selected"
    ).length;


  const rejectedCount =
    applications.filter(
      (app) => app.status === "Rejected"
    ).length;


  // ============================================================
  // COMPANY NAME
  // ============================================================

  const getCompanyName = (job) => {

    if (!job) {
      return "Company";
    }


    if (
      typeof job.company === "object"
    ) {

      return (
        job.company?.name ||
        "Company"
      );

    }


    return (
      job.company ||
      "Company"
    );

  };


  // ============================================================
  // RESUME URL
  // ============================================================

  const getResumeUrl = (resume) => {

    if (!resume) {
      return "";
    }


    if (
      typeof resume === "object"
    ) {

      if (resume.url) {
        return resume.url;
      }

      if (resume.path) {
        resume = resume.path;
      }

    }


    if (
      typeof resume === "string"
    ) {

      if (
        resume.startsWith("http")
      ) {

        return resume;

      }


      return `http://localhost:5000/${resume.replace(
        /^\/+/,
        ""
      )}`;

    }


    return "";

  };


  // ============================================================
  // STATUS STYLE
  // ============================================================

  const getStatusStyle = (status) => {

    switch (status) {

      case "Selected":

        return "bg-green-100 text-green-700";


      case "Shortlisted":

        return "bg-purple-100 text-purple-700";


      case "Rejected":

        return "bg-red-100 text-red-700";


      case "Reviewed":

        return "bg-yellow-100 text-yellow-700";


      case "Interview":

        return "bg-indigo-100 text-indigo-700";


      case "Hired":

        return "bg-green-200 text-green-800";


      default:

        return "bg-blue-100 text-blue-700";

    }

  };


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

            Loading applications...

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

      <div className="space-y-8">


        {/* =====================================================
            HEADER
        ===================================================== */}

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

              Applications

            </h1>

            <p className="
              text-gray-500
              mt-1
            ">

              Review candidates and manage their applications.

            </p>

          </div>


          <button
            onClick={fetchApplications}
            disabled={refreshing}
            className="
              flex
              items-center
              justify-center
              gap-2
              border
              border-gray-300
              px-4
              py-3
              rounded-lg
              hover:bg-gray-50
              disabled:opacity-50
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

        </div>


        {/* =====================================================
            ERROR
        ===================================================== */}

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


        {/* =====================================================
            STAT CARDS
        ===================================================== */}

        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-6
          gap-4
        ">

          <StatCard
            title="Total"
            value={totalApplications}
          />

          <StatCard
            title="Applied"
            value={appliedCount}
            textColor="text-blue-600"
          />

          <StatCard
            title="Reviewed"
            value={reviewedCount}
            textColor="text-yellow-600"
          />

          <StatCard
            title="Shortlisted"
            value={shortlistedCount}
            textColor="text-purple-600"
          />

          <StatCard
            title="Selected"
            value={selectedCount}
            textColor="text-green-600"
          />

          <StatCard
            title="Rejected"
            value={rejectedCount}
            textColor="text-red-600"
          />

        </div>


        {/* =====================================================
            SEARCH + FILTER
        ===================================================== */}

        <div className="
          bg-white
          shadow-sm
          border
          rounded-xl
          p-5
        ">

          <div className="
            flex
            flex-col
            md:flex-row
            gap-4
          ">

            <div className="
              border
              rounded-lg
              flex
              items-center
              px-3
              flex-1
            ">

              <Search
                size={19}
                className="text-gray-400"
              />

              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="
                  Search candidate, job, company or skills...
                "
                className="
                  p-3
                  outline-none
                  w-full
                "
              />

            </div>


            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(
                  e.target.value
                )
              }
              className="
                border
                rounded-lg
                px-4
                py-3
              "
            >

              <option value="All">
                All Status
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

              <option value="Hired">
                Hired
              </option>

            </select>

          </div>

        </div>


        {/* =====================================================
            RESULT COUNT
        ===================================================== */}

        <p className="text-gray-600">

          Showing{" "}

          <span className="
            font-semibold
            text-gray-900
          ">

            {filteredApplications.length}

          </span>

          {" "}of{" "}

          <span className="
            font-semibold
            text-gray-900
          ">

            {totalApplications}

          </span>

          {" "}applications

        </p>


        {/* =====================================================
            NO APPLICATIONS
        ===================================================== */}

        {filteredApplications.length === 0 ? (

          <div className="
            bg-white
            shadow-sm
            border
            rounded-xl
            p-12
            text-center
          ">

            <Users
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

              {search ||
              statusFilter !== "All"

                ? "No matching applications"

                : "No applications yet"

              }

            </h2>

            <p className="
              text-gray-500
              mt-2
            ">

              Applications from candidates will
              appear here.

            </p>

          </div>

        ) : (

          /* ===================================================
             APPLICATION CARDS
          =================================================== */

          <div className="space-y-6">

            {filteredApplications.map(
              (application) => {

                const candidate =
                  application.user || {};


                const candidateName =
                  application.fullName ||
                  candidate.name ||
                  "Candidate";


                const candidateEmail =
                  application.email ||
                  candidate.email ||
                  "Email not available";


                const resumeUrl =
                  getResumeUrl(
                    application.resume ||
                    candidate.resume
                  );


                const isUpdating =
                  updatingId ===
                  application._id;


                return (

                  <div
                    key={application._id}
                    className="
                      bg-white
                      shadow-sm
                      border
                      border-gray-100
                      rounded-xl
                      p-6
                    "
                  >


                    {/* TOP */}

                    <div className="
                      flex
                      flex-col
                      lg:flex-row
                      lg:justify-between
                      lg:items-start
                      gap-5
                    ">

                      <div className="
                        flex
                        gap-4
                      ">

                        <div className="
                          w-14
                          h-14
                          rounded-full
                          bg-blue-100
                          text-blue-600
                          flex
                          items-center
                          justify-center
                          text-xl
                          font-bold
                          flex-shrink-0
                        ">

                          {candidateName
                            .charAt(0)
                            .toUpperCase()
                          }

                        </div>


                        <div>

                          <h2 className="
                            text-xl
                            font-bold
                            text-gray-900
                          ">

                            {candidateName}

                          </h2>

                          <p className="
                            text-gray-500
                            mt-1
                          ">

                            {getCompanyName(
                              application.job
                            )}

                          </p>

                        </div>

                      </div>


                      <span className={`
                        ${getStatusStyle(
                          application.status
                        )}
                        px-4
                        py-2
                        rounded-full
                        text-sm
                        font-semibold
                        w-fit
                      `}>

                        {application.status ||
                          "Applied"
                        }

                      </span>

                    </div>


                    {/* JOB */}

                    <div className="
                      mt-6
                      bg-gray-50
                      rounded-xl
                      p-4
                    ">

                      <div className="
                        flex
                        items-center
                        gap-2
                        text-gray-700
                      ">

                        <Briefcase
                          size={18}
                        />

                        <span className="
                          font-semibold
                        ">

                          {application.job?.title ||
                            "Job"
                          }

                        </span>

                      </div>

                    </div>


                    {/* DETAILS */}

                    <div className="
                      grid
                      sm:grid-cols-2
                      lg:grid-cols-4
                      gap-4
                      mt-5
                      text-sm
                    ">


                      <div className="
                        flex
                        gap-2
                        items-center
                        text-gray-600
                      ">

                        <Mail size={17} />

                        <span className="truncate">

                          {candidateEmail}

                        </span>

                      </div>


                      <div className="
                        flex
                        gap-2
                        items-center
                        text-gray-600
                      ">

                        <Phone size={17} />

                        {application.phone ||
                          candidate.phone ||
                          "Not provided"
                        }

                      </div>


                      <div className="
                        flex
                        gap-2
                        items-center
                        text-gray-600
                      ">

                        <Briefcase size={17} />

                        {application.experience ||
                          candidate.experience ||
                          "Fresher"
                        }

                      </div>


                      <div className="
                        flex
                        gap-2
                        items-center
                        text-gray-600
                      ">

                        <CalendarDays
                          size={17}
                        />

                        {application.createdAt

                          ? new Date(
                              application.createdAt
                            ).toLocaleDateString()

                          : "Date unavailable"

                        }

                      </div>

                    </div>


                    {/* SKILLS */}

                    {application.skills && (

                      <div className="mt-5">

                        <p className="
                          text-sm
                          font-semibold
                          text-gray-700
                          mb-2
                        ">

                          Skills

                        </p>

                        <div className="
                          flex
                          flex-wrap
                          gap-2
                        ">

                          {(

                            typeof application.skills ===
                            "string"

                              ? application.skills.split(",")

                              : Array.isArray(
                                  application.skills
                                )
                                ? application.skills
                                : []

                          )
                            .slice(0, 10)
                            .map(
                              (skill, index) => (

                                <span
                                  key={index}
                                  className="
                                    bg-blue-50
                                    text-blue-700
                                    px-3
                                    py-1
                                    rounded-full
                                    text-xs
                                  "
                                >

                                  {String(
                                    skill
                                  ).trim()}

                                </span>

                              )
                            )}

                        </div>

                      </div>

                    )}


                    {/* COVER LETTER */}

                    {application.coverLetter && (

                      <div className="mt-5">

                        <p className="
                          text-sm
                          font-semibold
                          text-gray-700
                          mb-2
                        ">

                          Cover Letter

                        </p>

                        <p className="
                          text-sm
                          text-gray-600
                          bg-gray-50
                          rounded-lg
                          p-4
                          whitespace-pre-line
                        ">

                          {application.coverLetter}

                        </p>

                      </div>

                    )}


                    {/* ACTIONS */}

                    <div className="
                      flex
                      flex-wrap
                      gap-3
                      mt-6
                      pt-5
                      border-t
                    ">


                      {/* RESUME */}

                      {resumeUrl && (

                        <a
                          href={resumeUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="
                            flex
                            items-center
                            gap-2
                            bg-blue-100
                            hover:bg-blue-200
                            text-blue-700
                            px-4
                            py-2
                            rounded-lg
                          "
                        >

                          <FileText
                            size={17}
                          />

                          View Resume

                        </a>

                      )}


                      {/* REVIEWED */}

                      <button
                        disabled={isUpdating}
                        onClick={() =>
                          updateStatus(
                            application._id,
                            "Reviewed"
                          )
                        }
                        className="
                          flex
                          items-center
                          gap-2
                          bg-yellow-100
                          hover:bg-yellow-200
                          text-yellow-700
                          px-4
                          py-2
                          rounded-lg
                          disabled:opacity-50
                        "
                      >

                        <Clock
                          size={17}
                        />

                        Reviewed

                      </button>


                      {/* SHORTLIST */}

                      <button
                        disabled={isUpdating}
                        onClick={() =>
                          updateStatus(
                            application._id,
                            "Shortlisted"
                          )
                        }
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
                          disabled:opacity-50
                        "
                      >

                        <Users
                          size={17}
                        />

                        Shortlist

                      </button>


                      {/* INTERVIEW */}

                      <button
                        disabled={isUpdating}
                        onClick={() =>
                          updateStatus(
                            application._id,
                            "Interview"
                          )
                        }
                        className="
                          flex
                          items-center
                          gap-2
                          bg-indigo-100
                          hover:bg-indigo-200
                          text-indigo-700
                          px-4
                          py-2
                          rounded-lg
                          disabled:opacity-50
                        "
                      >

                        <Clock
                          size={17}
                        />

                        Interview

                      </button>


                      {/* SELECT */}

                      <button
                        disabled={isUpdating}
                        onClick={() =>
                          updateStatus(
                            application._id,
                            "Selected"
                          )
                        }
                        className="
                          flex
                          items-center
                          gap-2
                          bg-green-100
                          hover:bg-green-200
                          text-green-700
                          px-4
                          py-2
                          rounded-lg
                          disabled:opacity-50
                        "
                      >

                        <CheckCircle
                          size={17}
                        />

                        Select

                      </button>


                      {/* REJECT */}

                      <button
                        disabled={isUpdating}
                        onClick={() =>
                          updateStatus(
                            application._id,
                            "Rejected"
                          )
                        }
                        className="
                          flex
                          items-center
                          gap-2
                          bg-red-100
                          hover:bg-red-200
                          text-red-700
                          px-4
                          py-2
                          rounded-lg
                          disabled:opacity-50
                        "
                      >

                        <XCircle
                          size={17}
                        />

                        Reject

                      </button>

                    </div>


                    {isUpdating && (

                      <p className="
                        text-sm
                        text-gray-500
                        mt-3
                      ">

                        Updating application status...

                      </p>

                    )}

                  </div>

                );

              }
            )}

          </div>

        )}

      </div>

    </RecruiterLayout>

  );

}


// ============================================================
// STAT CARD COMPONENT
// ============================================================

function StatCard({
  title,
  value,
  textColor = "text-gray-900",
}) {

  return (

    <div className="
      bg-white
      shadow-sm
      border
      rounded-xl
      p-5
    ">

      <p className="
        text-sm
        text-gray-500
      ">

        {title}

      </p>

      <h2 className={`
        text-3xl
        font-bold
        mt-2
        ${textColor}
      `}>

        {value}

      </h2>

    </div>

  );

}


export default Applications;