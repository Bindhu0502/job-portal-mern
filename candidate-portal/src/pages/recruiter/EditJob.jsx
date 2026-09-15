import {
  useEffect,
  useState
} from "react";

import {
  useNavigate,
  useParams
} from "react-router-dom";

import {
  Briefcase,
  MapPin,
  DollarSign,
  LoaderCircle
} from "lucide-react";

import api from "../../services/api";

import RecruiterLayout from "../../components/recruiter/RecruiterLayout";





function EditJob() {

  const { id } = useParams();

  const navigate = useNavigate();





  // ============================================================
  // STATE
  // ============================================================

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");





  const [formData, setFormData] = useState({

    title: "",

    company: "",

    category: "",

    location: "",

    jobType: "Full Time",

    workMode: "On-site",

    experience: "Fresher",

    salary: "",

    openings: 1,

    deadline: "",

    skills: "",

    description: "",

    requirements: ""

  });





  // ============================================================
  // FETCH JOB
  // ============================================================

  useEffect(() => {

    if (!id) {

      setError("Invalid Job ID");

      setLoading(false);

      return;

    }

    fetchJob();

  }, [id]);





  const fetchJob = async () => {

    try {

      setLoading(true);

      setError("");





      const res = await api.get(
        `/recruiter/jobs/${id}`
      );





      const job = res.data.job;





      if (!job) {

        setError("Job not found");

        return;

      }





      setFormData({

        title: job.title || "",

        company: job.company || "",

        category: job.category || "",

        location: job.location || "",

        jobType: job.jobType || "Full Time",

        workMode: job.workMode || "On-site",

        experience: job.experience || "Fresher",

        salary: job.salary || "",

        openings: job.openings || 1,

        deadline: job.deadline

          ? new Date(job.deadline)
              .toISOString()
              .split("T")[0]

          : "",

        skills:

          Array.isArray(job.skills)

            ? job.skills.join(", ")

            : job.skills || "",

        description:
          job.description || "",

        requirements:
          job.requirements || ""

      });

    }

    catch (error) {

      console.log(
        "EDIT JOB FETCH ERROR:",
        error.response?.data || error
      );





      setError(

        error.response?.data?.message ||

        "Unable to load job"

      );

    }

    finally {

      setLoading(false);

    }

  };





  // ============================================================
  // HANDLE CHANGE
  // ============================================================

  const handleChange = (e) => {

    const {
      name,
      value
    } = e.target;





    setFormData(prev => ({

      ...prev,

      [name]: value

    }));

  };





  // ============================================================
  // UPDATE JOB
  // ============================================================

  const handleSubmit = async (e) => {

    e.preventDefault();





    if (!formData.title.trim()) {

      alert(
        "Please enter job title"
      );

      return;

    }





    if (!formData.company.trim()) {

      alert(
        "Please enter company name"
      );

      return;

    }





    if (!formData.location.trim()) {

      alert(
        "Please enter location"
      );

      return;

    }





    if (!formData.description.trim()) {

      alert(
        "Please enter job description"
      );

      return;

    }





    try {

      setSaving(true);

      setError("");





      const payload = {

  ...formData,

  // Job schema expects String
  skills:
    formData.skills
      .split(",")
      .map(skill => skill.trim())
      .filter(Boolean)
      .join(", "),

  openings:
    Number(formData.openings) || 1,

  deadline:
    formData.deadline || null

};





      await api.put(

        `/recruiter/jobs/${id}`,

        payload

      );





      alert(
        "Job updated successfully ✅"
      );





      navigate(
        "/recruiter/jobs"
      );

    }

    catch (error) {

      console.log(
        "UPDATE JOB ERROR:",
        error.response?.data || error
      );





      setError(

        error.response?.data?.message ||

        "Unable to update job"

      );

    }

    finally {

      setSaving(false);

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

          <LoaderCircle
            size={40}
            className="
              animate-spin
              text-blue-600
            "
          />

          <p className="
            mt-4
            text-gray-500
          ">

            Loading job details...

          </p>

        </div>

      </RecruiterLayout>

    );

  }





  // ============================================================
  // ERROR
  // ============================================================

  if (error && !formData.title) {

    return (

      <RecruiterLayout>

        <div className="
          max-w-3xl
          mx-auto
          bg-white
          rounded-xl
          shadow
          p-10
          text-center
        ">

          <h2 className="
            text-2xl
            font-bold
            text-red-600
          ">

            {error}

          </h2>

          <button

            onClick={() =>
              navigate("/recruiter/jobs")
            }

            className="
              mt-6
              bg-blue-600
              text-white
              px-5
              py-2
              rounded-lg
            "

          >

            Back to My Jobs

          </button>

        </div>

      </RecruiterLayout>

    );

  }





  // ============================================================
  // UI
  // ============================================================

  return (

    <RecruiterLayout>

      <div className="
        max-w-4xl
        mx-auto
      ">





        <div className="mb-8">

          <h1 className="
            text-3xl
            font-bold
            text-gray-900
          ">

            Edit Job

          </h1>

          <p className="
            text-gray-500
            mt-1
          ">

            Update your job posting details.

          </p>

        </div>





        {error && (

          <div className="
            bg-red-50
            border
            border-red-200
            text-red-700
            p-4
            rounded-xl
            mb-6
          ">

            {error}

          </div>

        )}






        <form

          onSubmit={handleSubmit}

          className="
            bg-white
            rounded-xl
            shadow
            p-8
            space-y-6
          "

        >





          {/* ==================================================
              BASIC DETAILS
          ================================================== */}

          <div>

            <h2 className="
              text-xl
              font-bold
              mb-5
            ">

              Basic Details

            </h2>





            <div className="
              grid
              md:grid-cols-2
              gap-6
            ">





              {/* JOB TITLE */}

              <div>

                <label className="
                  font-semibold
                  text-gray-700
                ">

                  Job Title

                </label>

                <div className="
                  relative
                  mt-2
                ">

                  <Briefcase
                    size={19}
                    className="
                      absolute
                      left-3
                      top-3
                      text-gray-400
                    "
                  />

                  <input

                    name="title"

                    value={formData.title}

                    onChange={handleChange}

                    required

                    className="
                      w-full
                      border
                      rounded-lg
                      p-3
                      pl-10
                      outline-none
                      focus:ring-2
                      focus:ring-blue-500
                    "

                  />

                </div>

              </div>





              {/* COMPANY */}

              <div>

                <label className="
                  font-semibold
                  text-gray-700
                ">

                  Company

                </label>

                <input

                  name="company"

                  value={formData.company}

                  onChange={handleChange}

                  required

                  className="
                    w-full
                    border
                    rounded-lg
                    p-3
                    mt-2
                    outline-none
                    focus:ring-2
                    focus:ring-blue-500
                  "

                />

              </div>





              {/* CATEGORY */}

              <div>

                <label className="
                  font-semibold
                  text-gray-700
                ">

                  Category

                </label>

                <input

                  name="category"

                  value={formData.category}

                  onChange={handleChange}

                  placeholder="Software Development"

                  className="
                    w-full
                    border
                    rounded-lg
                    p-3
                    mt-2
                    outline-none
                    focus:ring-2
                    focus:ring-blue-500
                  "

                />

              </div>





              {/* LOCATION */}

              <div>

                <label className="
                  font-semibold
                  text-gray-700
                ">

                  Location

                </label>

                <div className="
                  relative
                  mt-2
                ">

                  <MapPin
                    size={19}
                    className="
                      absolute
                      left-3
                      top-3
                      text-gray-400
                    "
                  />

                  <input

                    name="location"

                    value={formData.location}

                    onChange={handleChange}

                    required

                    className="
                      w-full
                      border
                      rounded-lg
                      p-3
                      pl-10
                      outline-none
                      focus:ring-2
                      focus:ring-blue-500
                    "

                  />

                </div>

              </div>





              {/* SALARY */}

              <div>

                <label className="
                  font-semibold
                  text-gray-700
                ">

                  Salary

                </label>

                <div className="
                  relative
                  mt-2
                ">

                  <DollarSign
                    size={19}
                    className="
                      absolute
                      left-3
                      top-3
                      text-gray-400
                    "
                  />

                  <input

                    name="salary"

                    value={formData.salary}

                    onChange={handleChange}

                    placeholder="6-10 LPA"

                    className="
                      w-full
                      border
                      rounded-lg
                      p-3
                      pl-10
                      outline-none
                      focus:ring-2
                      focus:ring-blue-500
                    "

                  />

                </div>

              </div>





              {/* OPENINGS */}

              <div>

                <label className="
                  font-semibold
                  text-gray-700
                ">

                  Number of Openings

                </label>

                <input

                  type="number"

                  name="openings"

                  min="1"

                  value={formData.openings}

                  onChange={handleChange}

                  className="
                    w-full
                    border
                    rounded-lg
                    p-3
                    mt-2
                    outline-none
                    focus:ring-2
                    focus:ring-blue-500
                  "

                />

              </div>





            </div>

          </div>





          {/* ==================================================
              JOB OPTIONS
          ================================================== */}

          <div>

            <h2 className="
              text-xl
              font-bold
              mb-5
            ">

              Job Options

            </h2>





            <div className="
              grid
              md:grid-cols-2
              gap-6
            ">





              <div>

                <label className="
                  font-semibold
                  text-gray-700
                ">

                  Job Type

                </label>

                <select

                  name="jobType"

                  value={formData.jobType}

                  onChange={handleChange}

                  className="
                    w-full
                    border
                    rounded-lg
                    p-3
                    mt-2
                  "

                >

                  <option>
                    Full Time
                  </option>

                  <option>
                    Part Time
                  </option>

                  <option>
                    Internship
                  </option>

                  <option>
                    Contract
                  </option>

                </select>

              </div>





              <div>

                <label className="
                  font-semibold
                  text-gray-700
                ">

                  Work Mode

                </label>

                <select

                  name="workMode"

                  value={formData.workMode}

                  onChange={handleChange}

                  className="
                    w-full
                    border
                    rounded-lg
                    p-3
                    mt-2
                  "

                >

                  <option>
                    On-site
                  </option>

                  <option>
                    Remote
                  </option>

                  <option>
                    Hybrid
                  </option>

                </select>

              </div>





              <div>

                <label className="
                  font-semibold
                  text-gray-700
                ">

                  Experience

                </label>

                <select

                  name="experience"

                  value={formData.experience}

                  onChange={handleChange}

                  className="
                    w-full
                    border
                    rounded-lg
                    p-3
                    mt-2
                  "

                >

                  <option>
                    Fresher
                  </option>

                  <option>
                    0-2 Years
                  </option>

                  <option>
                    1-2 Years
                  </option>

                  <option>
                    1-3 Years
                  </option>

                  <option>
                    2-4 Years
                  </option>

                  <option>
                    3-5 Years
                  </option>

                  <option>
                    5+ Years
                  </option>

                </select>

              </div>





              <div>

                <label className="
                  font-semibold
                  text-gray-700
                ">

                  Application Deadline

                </label>

                <input

                  type="date"

                  name="deadline"

                  value={formData.deadline}

                  onChange={handleChange}

                  className="
                    w-full
                    border
                    rounded-lg
                    p-3
                    mt-2
                  "

                />

              </div>





            </div>

          </div>





          {/* ==================================================
              SKILLS
          ================================================== */}

          <div>

            <label className="
              font-semibold
              text-gray-700
            ">

              Skills

            </label>

            <input

              name="skills"

              value={formData.skills}

              onChange={handleChange}

              placeholder="
                React, JavaScript, Node.js, MongoDB
              "

              className="
                w-full
                border
                rounded-lg
                p-3
                mt-2
              "

            />

            <p className="
              text-xs
              text-gray-500
              mt-1
            ">

              Separate skills using commas.

            </p>

          </div>





          {/* ==================================================
              DESCRIPTION
          ================================================== */}

          <div>

            <label className="
              font-semibold
              text-gray-700
            ">

              Job Description

            </label>

            <textarea

              name="description"

              value={formData.description}

              onChange={handleChange}

              required

              rows="7"

              className="
                w-full
                border
                rounded-lg
                p-3
                mt-2
                outline-none
                resize-y
              "

            />

          </div>





          {/* ==================================================
              REQUIREMENTS
          ================================================== */}

          <div>

            <label className="
              font-semibold
              text-gray-700
            ">

              Requirements

            </label>

            <textarea

              name="requirements"

              value={formData.requirements}

              onChange={handleChange}

              rows="6"

              placeholder="
                Required qualifications, skills and experience...
              "

              className="
                w-full
                border
                rounded-lg
                p-3
                mt-2
                outline-none
                resize-y
              "

            />

          </div>





          {/* ==================================================
              BUTTONS
          ================================================== */}

          <div className="
            flex
            flex-col
            sm:flex-row
            gap-3
            pt-4
            border-t
          ">

            <button

              type="submit"

              disabled={saving}

              className="
                bg-blue-600
                hover:bg-blue-700
                disabled:bg-blue-300
                text-white
                px-8
                py-3
                rounded-lg
                font-semibold
              "

            >

              {saving
                ? "Saving Changes..."
                : "Save Changes"
              }

            </button>





            <button

              type="button"

              onClick={() =>
                navigate("/recruiter/jobs")
              }

              disabled={saving}

              className="
                bg-gray-100
                hover:bg-gray-200
                text-gray-700
                px-8
                py-3
                rounded-lg
                font-semibold
              "

            >

              Cancel

            </button>

          </div>

        </form>

      </div>

    </RecruiterLayout>

  );

}





export default EditJob;