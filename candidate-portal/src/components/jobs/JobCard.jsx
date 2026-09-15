import {
  Link,
} from "react-router-dom";

import {
  Bookmark,
  MapPin,
  Briefcase,
  DollarSign,
  Clock,
  Building2,
  CalendarDays,
  ArrowRight,
  Send,
} from "lucide-react";

// ============================================================
// JOB CARD
// ============================================================

function JobCard({
  job,
  onSave,
  savingJobId,
}) {
  // ==========================================================
  // SKILLS
  // ==========================================================

  const skills = job?.skills
    ? Array.isArray(job.skills)
      ? job.skills
      : String(job.skills)
          .split(",")
          .map((skill) =>
            skill.trim()
          )
          .filter(Boolean)
    : [];

  // ==========================================================
  // COMPANY NAME
  // ==========================================================

  const companyName =
    typeof job?.company ===
      "object" &&
    job.company !== null
      ? job.company?.name
      : job?.company;

  const displayCompany =
    companyName ||
    job?.companyName ||
    "Company";

  // ==========================================================
  // COMPANY LOGO
  // ==========================================================

  const companyLogo =
    job?.companyLogo ||
    job?.company?.logo ||
    "";

  // ==========================================================
  // SAVE LOADING
  // ==========================================================

  const isSaving =
    String(savingJobId) ===
    String(job?._id);

  // ==========================================================
  // SAVE HANDLER
  // ==========================================================

  const handleSave = (
    event
  ) => {
    event.preventDefault();
    event.stopPropagation();

    if (
      isSaving ||
      !job?._id
    ) {
      return;
    }

    onSave(job._id);
  };

  // ==========================================================
  // IMAGE URL
  // ==========================================================

  const getLogoUrl = (
    logo
  ) => {
    if (!logo) {
      return "";
    }

    if (
      logo.startsWith(
        "http://"
      ) ||
      logo.startsWith(
        "https://"
      )
    ) {
      return logo;
    }

    return `http://localhost:5000${
      logo.startsWith("/")
        ? logo
        : `/${logo}`
    }`;
  };

  // ==========================================================
  // POST DATE
  // ==========================================================

  const postedDate =
    job?.createdAt
      ? new Date(
          job.createdAt
        ).toLocaleDateString(
          "en-IN",
          {
            day: "numeric",
            month: "short",
            year: "numeric",
          }
        )
      : "Recently";

  // ==========================================================
  // CARD
  // ==========================================================

  return (
    <div
      className="
        bg-white
        rounded-2xl
        border
        border-gray-100
        shadow-sm
        hover:shadow-xl
        hover:-translate-y-1
        transition-all
        duration-300
        p-6
        flex
        flex-col
      "
    >

      {/* ======================================================
          HEADER
      ====================================================== */}

      <div className="flex justify-between items-start gap-4">

        <div className="flex gap-4 min-w-0">

          {/* COMPANY LOGO */}

          <div
            className="
              w-14
              h-14
              rounded-xl
              bg-blue-50
              flex
              items-center
              justify-center
              font-bold
              text-blue-600
              text-xl
              flex-shrink-0
              overflow-hidden
            "
          >

            {companyLogo ? (

              <img
                src={getLogoUrl(
                  companyLogo
                )}
                alt={`${displayCompany} logo`}
                className="
                  w-full
                  h-full
                  object-cover
                "
                onError={(
                  event
                ) => {
                  event.currentTarget.style.display =
                    "none";
                }}
              />

            ) : (

              <span>
                {displayCompany
                  ?.charAt(0)
                  ?.toUpperCase() ||
                  "C"}
              </span>

            )}

          </div>

          {/* TITLE */}

          <div className="min-w-0">

            <h2
              className="
                text-xl
                font-bold
                text-gray-900
                line-clamp-2
              "
            >
              {job?.title ||
                "Job Title"}
            </h2>

            <p
              className="
                text-gray-500
                flex
                gap-2
                items-center
                mt-2
                text-sm
              "
            >

              <Building2
                size={16}
                className="flex-shrink-0"
              />

              <span className="truncate">
                {displayCompany}
              </span>

            </p>

          </div>

        </div>

        {/* ==================================================
            SAVE BUTTON
        ================================================== */}

        <button
          type="button"
          onClick={handleSave}
          disabled={isSaving}
          aria-label={
            job?.saved
              ? "Remove saved job"
              : "Save job"
          }
          title={
            job?.saved
              ? "Remove from saved jobs"
              : "Save job"
          }
          className="
            p-2.5
            rounded-xl
            hover:bg-blue-50
            disabled:opacity-50
            disabled:cursor-not-allowed
            transition
            flex-shrink-0
          "
        >

          <Bookmark
            size={23}
            className={
              job?.saved
                ? "text-blue-600 fill-blue-600"
                : "text-gray-400"
            }
          />

        </button>

      </div>

      {/* ======================================================
          JOB DETAILS
      ====================================================== */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          gap-3
          mt-6
          text-sm
          text-gray-600
        "
      >

        {/* LOCATION */}

        <div className="flex gap-2 items-center">

          <MapPin
            size={17}
            className="text-gray-400 flex-shrink-0"
          />

          <span className="truncate">
            {job?.location ||
              "Location not specified"}
          </span>

        </div>

        {/* JOB TYPE */}

        <div className="flex gap-2 items-center">

          <Briefcase
            size={17}
            className="text-gray-400 flex-shrink-0"
          />

          <span>
            {job?.jobType ||
              "Full Time"}
          </span>

        </div>

        {/* SALARY */}

        <div className="flex gap-2 items-center">

          <DollarSign
            size={17}
            className="text-gray-400 flex-shrink-0"
          />

          <span>
            {job?.salary ||
              "Salary not disclosed"}
          </span>

        </div>

        {/* EXPERIENCE */}

        <div className="flex gap-2 items-center">

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

      {/* ======================================================
          BADGES
      ====================================================== */}

      <div
        className="
          flex
          flex-wrap
          gap-2
          mt-5
        "
      >

        {job?.workMode && (
          <span
            className="
              bg-green-100
              text-green-700
              px-3
              py-1
              rounded-full
              text-xs
              font-semibold
            "
          >
            {job.workMode}
          </span>
        )}

        {job?.category && (
          <span
            className="
              bg-purple-100
              text-purple-700
              px-3
              py-1
              rounded-full
              text-xs
              font-semibold
            "
          >
            {job.category}
          </span>
        )}

      </div>

      {/* ======================================================
          SKILLS
      ====================================================== */}

      {skills.length > 0 && (

        <div
          className="
            flex
            flex-wrap
            gap-2
            mt-5
          "
        >

          {skills
            .slice(0, 4)
            .map(
              (
                skill,
                index
              ) => (

                <span
                  key={`${skill}-${index}`}
                  className="
                    bg-blue-50
                    text-blue-700
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    font-medium
                  "
                >
                  {skill}
                </span>

              )
            )}

          {skills.length > 4 && (

            <span
              className="
                text-xs
                text-gray-400
                px-2
                py-1
              "
            >
              +{skills.length - 4} more
            </span>

          )}

        </div>

      )}

      {/* ======================================================
          POSTED DATE
      ====================================================== */}

      <div
        className="
          flex
          items-center
          gap-2
          text-xs
          text-gray-400
          mt-5
        "
      >

        <CalendarDays
          size={15}
        />

        Posted {postedDate}

      </div>

      {/* ======================================================
          ACTION BUTTONS
      ====================================================== */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          gap-3
          mt-6
          pt-5
          border-t
        "
      >

        {/* VIEW DETAILS */}

        <Link
          to={`/jobs/${job?._id}`}
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            border
            border-blue-600
            text-blue-600
            hover:bg-blue-50
            px-4
            py-3
            rounded-xl
            font-semibold
            transition
          "
        >

          View Details

          <ArrowRight
            size={17}
          />

        </Link>

        {/* APPLY */}

        <Link
          to={`/jobs/${job?._id}/apply`}
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-4
            py-3
            rounded-xl
            font-semibold
            transition
          "
        >

          <Send
            size={17}
          />

          Apply Now

        </Link>

      </div>

    </div>
  );
}

export default JobCard;