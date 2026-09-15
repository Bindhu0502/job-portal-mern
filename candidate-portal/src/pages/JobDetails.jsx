import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
  useNavigate,
  Link,
} from "react-router-dom";

import {
  MapPin,
  Briefcase,
  DollarSign,
  Clock,
  Building2,
  Bookmark,
  Users,
  CalendarDays,
  CheckCircle,
  ArrowLeft,
  Send,
  Globe,
  Tag,
} from "lucide-react";

import api from "../services/api";

import Loader from "../components/ui/Loader";


// ============================================================
// BACKEND URL
// ============================================================

const BACKEND_URL = "http://localhost:5000";


// ============================================================
// BUILD COMPANY LOGO URL
// ============================================================

const getImageUrl = (imagePath) => {
  if (!imagePath) {
    return "";
  }

  if (
    imagePath.startsWith("http://") ||
    imagePath.startsWith("https://")
  ) {
    return imagePath;
  }

  if (imagePath.startsWith("/")) {
    return `${BACKEND_URL}${imagePath}`;
  }

  return `${BACKEND_URL}/${imagePath}`;
};


// ============================================================
// COMPONENT
// ============================================================

function JobDetails() {

  const { id } = useParams();

  const navigate = useNavigate();


  // ==========================================================
  // STATE
  // ==========================================================

  const [job, setJob] = useState(null);

  const [similarJobs, setSimilarJobs] = useState([]);

  const [loading, setLoading] = useState(true);

  const [saved, setSaved] = useState(false);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const [logoError, setLogoError] = useState(false);


  // ==========================================================
  // LOAD JOB
  // ==========================================================

  useEffect(() => {

    if (!id) {

      setError("Invalid Job ID");

      setLoading(false);

      return;
    }

    fetchJob();

  }, [id]);


  // ==========================================================
  // FETCH JOB
  // ==========================================================

  const fetchJob = async () => {

    try {

      setLoading(true);

      setError("");


      // ======================================================
      // JOB DETAILS
      // ======================================================

      const response =
        await api.get(
          `/jobs/${id}`
        );


      const jobData =
        response.data?.job;


      if (!jobData) {

        setError(
          "Job not found"
        );

        return;
      }


      setJob(jobData);


      // ======================================================
      // SAVED JOB
      // ======================================================

      try {

        const savedResponse =
          await api.get(
            "/saved-jobs/my"
          );


        const savedList =
          savedResponse.data?.savedJobs || [];


        const isSaved =
          savedList.some(
            (item) =>
              String(
                item.job?._id ||
                item.job
              ) === String(id)
          );


        setSaved(isSaved);

      } catch (savedError) {

        console.log(
          "Saved job check skipped:",
          savedError.response?.data ||
            savedError.message
        );

      }


      // ======================================================
      // SIMILAR JOBS
      // ======================================================

      try {

        const jobsResponse =
          await api.get(
            "/jobs?limit=20"
          );


        const allJobs =
          jobsResponse.data?.jobs || [];


        const relatedJobs =
          allJobs
            .filter(
              (item) =>
                String(item._id) !== String(id)
            )
            .filter((item) => {

              if (!jobData.category) {
                return true;
              }

              return (
                item.category ===
                jobData.category
              );

            })
            .slice(0, 3);


        setSimilarJobs(
          relatedJobs
        );

      } catch (similarError) {

        console.log(
          "Similar jobs error:",
          similarError.message
        );

        setSimilarJobs([]);

      }

    } catch (error) {

      console.error(
        "JOB DETAILS ERROR:",
        error.response?.data ||
          error
      );


      setError(
        error.response?.data?.message ||
          "Unable to load job details"
      );

    } finally {

      setLoading(false);

    }

  };


  // ==========================================================
  // SAVE / UNSAVE JOB
  // ==========================================================

  const handleSave = async () => {

    if (!id) {
      return;
    }


    try {

      setSaving(true);


      if (saved) {

        await api.delete(
          `/saved-jobs/${id}`
        );

        setSaved(false);

      } else {

        await api.post(
          `/saved-jobs/${id}`
        );

        setSaved(true);

      }

    } catch (error) {

      console.error(
        "SAVE JOB ERROR:",
        error.response?.data ||
          error
      );


      alert(
        error.response?.data?.message ||
          "Unable to update saved job"
      );

    } finally {

      setSaving(false);

    }

  };


  // ==========================================================
  // GET COMPANY NAME
  // ==========================================================

  const getCompanyName = () => {

    if (
      typeof job?.company ===
      "object"
    ) {

      return (
        job.company?.name ||
        "Company"
      );

    }

    return (
      job?.company ||
      "Company"
    );

  };


  // ==========================================================
  // GET COMPANY LOGO
  // ==========================================================

  const getCompanyLogo = () => {

    if (
      typeof job?.company ===
      "object"
    ) {

      return (
        job.company?.logo ||
        job.company?.companyLogo ||
        ""
      );

    }

    return (
      job?.companyLogo ||
      ""
    );

  };


  // ==========================================================
  // GET SKILLS
  // ==========================================================

  const getSkills = () => {

    if (!job?.skills) {
      return [];
    }


    if (
      Array.isArray(job.skills)
    ) {

      return job.skills;

    }


    return String(job.skills)
      .split(",")
      .map(
        (skill) =>
          skill.trim()
      )
      .filter(Boolean);

  };


  // ==========================================================
  // GET LIST
  // ==========================================================

  const getList = (value) => {

    if (!value) {
      return [];
    }


    if (Array.isArray(value)) {
      return value;
    }


    return String(value)
      .split("\n")
      .map(
        (item) =>
          item
            .replace(/^[-•*]\s*/, "")
            .trim()
      )
      .filter(Boolean);

  };


  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {

    return <Loader />;

  }


  // ==========================================================
  // ERROR
  // ==========================================================

  if (error || !job) {

    return (

      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">

        <div className="bg-white rounded-2xl shadow p-10 text-center max-w-lg w-full">

          <h2 className="text-3xl font-bold text-gray-900">

            {error || "Job not found"}

          </h2>


          <p className="text-gray-500 mt-3">

            The job you're looking for may have been removed or is no longer available.

          </p>


          <Link
            to="/jobs"
            className="
              inline-flex
              items-center
              gap-2
              mt-6
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-6
              py-3
              rounded-lg
              font-semibold
            "
          >

            <ArrowLeft size={18} />

            Back To Jobs

          </Link>

        </div>

      </div>

    );

  }


  // ==========================================================
  // VARIABLES
  // ==========================================================

  const companyName =
    getCompanyName();

  const companyLogo =
    getCompanyLogo();

  const skills =
    getSkills();

  const responsibilities =
    getList(
      job.responsibilities
    );

  const requirements =
    getList(
      job.requirements
    );


  // ==========================================================
  // PAGE
  // ==========================================================

  return (

    <div className="min-h-screen bg-gray-50 py-8">

      <div className="max-w-7xl mx-auto px-4 md:px-6">


        {/* ====================================================
            BACK BUTTON
        ==================================================== */}

        <button
          onClick={() =>
            navigate("/jobs")
          }
          className="
            flex
            items-center
            gap-2
            text-gray-600
            hover:text-blue-600
            font-medium
            mb-6
          "
        >

          <ArrowLeft size={18} />

          Back to Jobs

        </button>


        {/* ====================================================
            MAIN GRID
        ==================================================== */}

        <div className="grid lg:grid-cols-3 gap-8">


          {/* ==================================================
              LEFT CONTENT
          ================================================== */}

          <div className="lg:col-span-2 space-y-8">


            {/* ==================================================
                JOB HEADER
            ================================================== */}

            <div className="bg-white rounded-2xl shadow-sm border p-6 md:p-8">

              <div className="flex flex-col md:flex-row justify-between gap-6">


                {/* COMPANY + TITLE */}

                <div className="flex gap-5">


                  {/* LOGO */}

                  <div className="
                    w-20
                    h-20
                    rounded-2xl
                    bg-blue-50
                    flex
                    items-center
                    justify-center
                    overflow-hidden
                    border
                    flex-shrink-0
                  ">

                    {companyLogo &&
                    !logoError ? (

                      <img
                        src={getImageUrl(
                          companyLogo
                        )}
                        alt={`${companyName} logo`}
                        className="
                          w-full
                          h-full
                          object-cover
                        "
                        onError={() =>
                          setLogoError(true)
                        }
                      />

                    ) : (

                      <Building2
                        size={38}
                        className="text-blue-600"
                      />

                    )}

                  </div>


                  {/* TITLE */}

                  <div>

                    <h1 className="
                      text-3xl
                      md:text-4xl
                      font-bold
                      text-gray-900
                    ">

                      {job.title}

                    </h1>


                    <p className="
                      text-lg
                      text-gray-600
                      mt-2
                      flex
                      items-center
                      gap-2
                    ">

                      <Building2 size={19} />

                      {companyName}

                    </p>


                    {job.location && (

                      <p className="
                        text-gray-500
                        mt-2
                        flex
                        items-center
                        gap-2
                      ">

                        <MapPin size={17} />

                        {job.location}

                      </p>

                    )}

                  </div>

                </div>


                {/* SAVE */}

                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="
                    flex
                    items-center
                    justify-center
                    gap-2
                    border
                    rounded-lg
                    px-4
                    py-2
                    h-fit
                    hover:bg-gray-50
                    transition
                    disabled:opacity-50
                  "
                >

                  <Bookmark
                    size={21}
                    className={
                      saved
                        ? "text-blue-600 fill-blue-600"
                        : "text-gray-500"
                    }
                  />

                  {saved
                    ? "Saved"
                    : "Save Job"}

                </button>

              </div>


              {/* BADGES */}

              <div className="
                flex
                flex-wrap
                gap-2
                mt-7
              ">

                {job.workMode && (

                  <span className="
                    bg-green-100
                    text-green-700
                    px-3
                    py-1.5
                    rounded-full
                    text-sm
                    font-medium
                  ">

                    {job.workMode}

                  </span>

                )}


                {job.category && (

                  <span className="
                    bg-purple-100
                    text-purple-700
                    px-3
                    py-1.5
                    rounded-full
                    text-sm
                    font-medium
                  ">

                    {job.category}

                  </span>

                )}


                {job.jobType && (

                  <span className="
                    bg-blue-100
                    text-blue-700
                    px-3
                    py-1.5
                    rounded-full
                    text-sm
                    font-medium
                  ">

                    {job.jobType}

                  </span>

                )}

              </div>


              {/* JOB META */}

              <div className="
                grid
                sm:grid-cols-2
                lg:grid-cols-3
                gap-5
                mt-8
                pt-7
                border-t
              ">


                <div className="flex gap-3">

                  <MapPin
                    className="text-blue-600"
                    size={20}
                  />

                  <div>

                    <p className="text-xs text-gray-500">
                      Location
                    </p>

                    <p className="font-semibold">
                      {job.location || "Not specified"}
                    </p>

                  </div>

                </div>


                <div className="flex gap-3">

                  <Briefcase
                    className="text-blue-600"
                    size={20}
                  />

                  <div>

                    <p className="text-xs text-gray-500">
                      Job Type
                    </p>

                    <p className="font-semibold">
                      {job.jobType || "Full Time"}
                    </p>

                  </div>

                </div>


                <div className="flex gap-3">

                  <DollarSign
                    className="text-blue-600"
                    size={20}
                  />

                  <div>

                    <p className="text-xs text-gray-500">
                      Salary
                    </p>

                    <p className="font-semibold">
                      {job.salary || "Not disclosed"}
                    </p>

                  </div>

                </div>


                <div className="flex gap-3">

                  <Clock
                    className="text-blue-600"
                    size={20}
                  />

                  <div>

                    <p className="text-xs text-gray-500">
                      Experience
                    </p>

                    <p className="font-semibold">
                      {job.experience || "Fresher"}
                    </p>

                  </div>

                </div>


                <div className="flex gap-3">

                  <Users
                    className="text-blue-600"
                    size={20}
                  />

                  <div>

                    <p className="text-xs text-gray-500">
                      Openings
                    </p>

                    <p className="font-semibold">
                      {job.openings || 1}
                    </p>

                  </div>

                </div>


                <div className="flex gap-3">

                  <CalendarDays
                    className="text-blue-600"
                    size={20}
                  />

                  <div>

                    <p className="text-xs text-gray-500">
                      Posted
                    </p>

                    <p className="font-semibold">

                      {job.createdAt
                        ? new Date(
                            job.createdAt
                          ).toLocaleDateString()
                        : "Recently"}

                    </p>

                  </div>

                </div>

              </div>

            </div>


            {/* =================================================
                DESCRIPTION
            ================================================= */}

            <div className="bg-white rounded-2xl shadow-sm border p-6 md:p-8">

              <h2 className="
                text-2xl
                font-bold
                text-gray-900
                mb-5
              ">

                Job Description

              </h2>


              <p className="
                text-gray-700
                leading-7
                whitespace-pre-line
              ">

                {job.description ||
                  "No job description provided."}

              </p>

            </div>


            {/* =================================================
                RESPONSIBILITIES
            ================================================= */}

            {responsibilities.length > 0 && (

              <div className="
                bg-white
                rounded-2xl
                shadow-sm
                border
                p-6
                md:p-8
              ">

                <h2 className="
                  text-2xl
                  font-bold
                  mb-5
                ">

                  Responsibilities

                </h2>


                <ul className="space-y-3">

                  {responsibilities.map(
                    (item, index) => (

                      <li
                        key={index}
                        className="
                          flex
                          gap-3
                          text-gray-700
                        "
                      >

                        <CheckCircle
                          size={20}
                          className="
                            text-green-600
                            mt-0.5
                            flex-shrink-0
                          "
                        />

                        <span>
                          {item}
                        </span>

                      </li>

                    )
                  )}

                </ul>

              </div>

            )}


            {/* =================================================
                REQUIREMENTS
            ================================================= */}

            {requirements.length > 0 && (

              <div className="
                bg-white
                rounded-2xl
                shadow-sm
                border
                p-6
                md:p-8
              ">

                <h2 className="
                  text-2xl
                  font-bold
                  mb-5
                ">

                  Requirements

                </h2>


                <ul className="space-y-3">

                  {requirements.map(
                    (item, index) => (

                      <li
                        key={index}
                        className="
                          flex
                          gap-3
                          text-gray-700
                        "
                      >

                        <CheckCircle
                          size={20}
                          className="
                            text-blue-600
                            mt-0.5
                            flex-shrink-0
                          "
                        />

                        <span>
                          {item}
                        </span>

                      </li>

                    )
                  )}

                </ul>

              </div>

            )}


            {/* =================================================
                SKILLS
            ================================================= */}

            {skills.length > 0 && (

              <div className="
                bg-white
                rounded-2xl
                shadow-sm
                border
                p-6
                md:p-8
              ">

                <h2 className="
                  text-2xl
                  font-bold
                  mb-5
                  flex
                  items-center
                  gap-2
                ">

                  <Tag
                    size={22}
                    className="text-blue-600"
                  />

                  Skills Required

                </h2>


                <div className="
                  flex
                  flex-wrap
                  gap-3
                ">

                  {skills.map(
                    (skill, index) => (

                      <span
                        key={index}
                        className="
                          bg-blue-50
                          text-blue-700
                          border
                          border-blue-100
                          px-4
                          py-2
                          rounded-full
                          font-medium
                        "
                      >

                        {skill}

                      </span>

                    )
                  )}

                </div>

              </div>

            )}


            {/* =================================================
                ADDITIONAL INFORMATION
            ================================================= */}

            <div className="
              bg-white
              rounded-2xl
              shadow-sm
              border
              p-6
              md:p-8
            ">

              <h2 className="
                text-2xl
                font-bold
                mb-5
              ">

                Additional Information

              </h2>


              <div className="space-y-4">


                <div className="
                  flex
                  items-center
                  gap-3
                  text-gray-700
                ">

                  <CalendarDays
                    className="text-blue-600"
                  />

                  <span>

                    Posted on{" "}

                    {job.createdAt
                      ? new Date(
                          job.createdAt
                        ).toLocaleDateString()
                      : "Recently"}

                  </span>

                </div>


                <div className="
                  flex
                  items-center
                  gap-3
                  text-green-700
                ">

                  <CheckCircle />

                  <span>
                    Currently Hiring
                  </span>

                </div>


                {job.companyWebsite && (

                  <a
                    href={
                      job.companyWebsite
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="
                      flex
                      items-center
                      gap-3
                      text-blue-600
                      hover:underline
                    "
                  >

                    <Globe />

                    Company Website

                  </a>

                )}

              </div>

            </div>

          </div>


          {/* ==================================================
              RIGHT SIDEBAR
          ================================================== */}

          <div className="space-y-6">


            {/* APPLY CARD */}

            <div className="
              bg-white
              rounded-2xl
              shadow-sm
              border
              p-6
              sticky
              top-6
            ">

              <h2 className="
                text-xl
                font-bold
                mb-3
              ">

                Interested in this job?

              </h2>


              <p className="
                text-gray-500
                text-sm
                mb-6
              ">

                Apply now and take the next step in your career.

              </p>


              <button
                onClick={() =>
                  navigate(
                    `/jobs/${job._id}/apply`
                  )
                }
                className="
                  w-full
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  py-3.5
                  rounded-xl
                  font-bold
                  flex
                  items-center
                  justify-center
                  gap-2
                  transition
                "
              >

                <Send size={19} />

                Apply Now

              </button>


              <button
                onClick={handleSave}
                disabled={saving}
                className="
                  w-full
                  mt-3
                  border
                  border-gray-300
                  hover:bg-gray-50
                  py-3.5
                  rounded-xl
                  font-semibold
                  flex
                  items-center
                  justify-center
                  gap-2
                  transition
                  disabled:opacity-50
                "
              >

                <Bookmark
                  size={19}
                  className={
                    saved
                      ? "fill-blue-600 text-blue-600"
                      : ""
                  }
                />

                {saved
                  ? "Saved Job"
                  : "Save Job"}

              </button>

            </div>


            {/* COMPANY CARD */}

            <div className="
              bg-white
              rounded-2xl
              shadow-sm
              border
              p-6
            ">

              <h2 className="
                text-xl
                font-bold
                mb-5
              ">

                About the Company

              </h2>


              <div className="flex items-center gap-4">


                <div className="
                  w-14
                  h-14
                  rounded-xl
                  bg-blue-50
                  flex
                  items-center
                  justify-center
                  overflow-hidden
                ">

                  {companyLogo &&
                  !logoError ? (

                    <img
                      src={getImageUrl(
                        companyLogo
                      )}
                      alt=""
                      className="
                        w-full
                        h-full
                        object-cover
                      "
                    />

                  ) : (

                    <Building2
                      className="text-blue-600"
                      size={28}
                    />

                  )}

                </div>


                <div>

                  <h3 className="font-bold">
                    {companyName}
                  </h3>

                  <p className="
                    text-sm
                    text-gray-500
                  ">

                    Employer

                  </p>

                </div>

              </div>


              {job.companyDescription && (

                <p className="
                  text-gray-600
                  text-sm
                  leading-6
                  mt-5
                ">

                  {job.companyDescription}

                </p>

              )}

            </div>


            {/* SIMILAR JOBS */}

            <div className="
              bg-white
              rounded-2xl
              shadow-sm
              border
              p-6
            ">

              <h2 className="
                text-xl
                font-bold
                mb-5
              ">

                Similar Jobs

              </h2>


              {similarJobs.length === 0 ? (

                <p className="
                  text-gray-500
                  text-sm
                ">

                  No similar jobs available.

                </p>

              ) : (

                <div className="space-y-4">

                  {similarJobs.map(
                    (item) => (

                      <div
                        key={item._id}
                        className="
                          border
                          rounded-xl
                          p-4
                          hover:border-blue-300
                          transition
                        "
                      >

                        <h3 className="
                          font-semibold
                        ">

                          {item.title}

                        </h3>


                        <p className="
                          text-sm
                          text-gray-500
                          mt-1
                        ">

                          {typeof item.company ===
                          "object"
                            ? item.company?.name
                            : item.company ||
                              "Company"}

                        </p>


                        <p className="
                          text-sm
                          text-gray-500
                          mt-2
                          flex
                          items-center
                          gap-1
                        ">

                          <MapPin size={14} />

                          {item.location ||
                            "Location"}

                        </p>


                        <Link
                          to={`/jobs/${item._id}`}
                          className="
                            inline-block
                            mt-3
                            text-blue-600
                            text-sm
                            font-semibold
                            hover:underline
                          "
                        >

                          View Job →

                        </Link>

                      </div>

                    )
                  )}

                </div>

              )}

            </div>

          </div>

        </div>

      </div>

    </div>

  );

}


export default JobDetails;