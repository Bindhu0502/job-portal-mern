import { useEffect, useState } from "react";

import RecruiterLayout from "../../components/recruiter/RecruiterLayout";

import api from "../../services/api";


// ============================================================
// RECRUITER PROFILE
// ============================================================

function RecruiterProfile() {

  // ==========================================================
  // STATE
  // ==========================================================

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({

    company: "",

    companyLogo: "",

    companyWebsite: "",

    companyLocation: "",

    companyDescription: "",

  });


  // ==========================================================
  // LOAD PROFILE
  // ==========================================================

  useEffect(() => {

    fetchProfile();

  }, []);


  // ==========================================================
  // GET LOGGED-IN RECRUITER
  // ==========================================================

  const fetchProfile = async () => {

    try {

      setLoading(true);

      setError("");

      setSuccess("");


      // ------------------------------------------------------
      // IMPORTANT
      // Use /auth/me because this endpoint already exists
      // in your backend authRoutes.js
      // ------------------------------------------------------

      const res = await api.get("/auth/me");


      console.log(
        "RECRUITER PROFILE:",
        res.data
      );


      const recruiter =
        res.data?.user;


      if (!recruiter) {

        throw new Error(
          "Recruiter information not found"
        );

      }


      // ------------------------------------------------------
      // SET FORM DATA
      // ------------------------------------------------------

      setFormData({

        company:
          recruiter.company || "",

        companyLogo:
          recruiter.companyLogo || "",

        companyWebsite:
          recruiter.companyWebsite || "",

        companyLocation:
          recruiter.companyLocation || "",

        companyDescription:
          recruiter.companyDescription || "",

      });

    }

    catch (error) {

      console.error(
        "PROFILE FETCH ERROR:",
        error.response?.data || error
      );


      setError(
        error.response?.data?.message ||
        error.message ||
        "Unable to load profile"
      );

    }

    finally {

      setLoading(false);

    }

  };


  // ==========================================================
  // HANDLE INPUT
  // ==========================================================

  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;


    setFormData((previous) => ({

      ...previous,

      [name]: value,

    }));


    // Clear messages when user edits

    setError("");

    setSuccess("");

  };


  // ==========================================================
  // UPDATE PROFILE
  // ==========================================================

  const handleSubmit = async (e) => {

    e.preventDefault();


    try {

      setSaving(true);

      setError("");

      setSuccess("");


      // ------------------------------------------------------
      // UPDATE RECRUITER COMPANY PROFILE
      // ------------------------------------------------------

      const res = await api.put(
        "/recruiter/profile",
        formData
      );


      console.log(
        "PROFILE UPDATED:",
        res.data
      );


      // ------------------------------------------------------
      // UPDATE FORM WITH RETURNED DATA IF AVAILABLE
      // ------------------------------------------------------

      const updatedRecruiter =
        res.data?.recruiter ||
        res.data?.user;


      if (updatedRecruiter) {

        setFormData({

          company:
            updatedRecruiter.company ||
            formData.company,

          companyLogo:
            updatedRecruiter.companyLogo ||
            formData.companyLogo,

          companyWebsite:
            updatedRecruiter.companyWebsite ||
            formData.companyWebsite,

          companyLocation:
            updatedRecruiter.companyLocation ||
            formData.companyLocation,

          companyDescription:
            updatedRecruiter.companyDescription ||
            formData.companyDescription,

        });

      }


      setSuccess(
        res.data?.message ||
        "Company profile updated successfully."
      );

    }

    catch (error) {

      console.error(
        "PROFILE UPDATE ERROR:",
        error.response?.data || error
      );


      setError(
        error.response?.data?.message ||
        "Unable to update profile."
      );

    }

    finally {

      setSaving(false);

    }

  };


  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {

    return (

      <RecruiterLayout>

        <div className="
          min-h-[60vh]
          flex
          items-center
          justify-center
        ">

          <div className="text-center">

            <div className="
              w-10
              h-10
              border-4
              border-blue-200
              border-t-blue-600
              rounded-full
              animate-spin
              mx-auto
            " />

            <p className="
              mt-4
              text-gray-500
              font-medium
            ">

              Loading Profile...

            </p>

          </div>

        </div>

      </RecruiterLayout>

    );

  }


  // ==========================================================
  // PROFILE PAGE
  // ==========================================================

  return (

    <RecruiterLayout>

      <div className="
        min-h-screen
        bg-gray-50
        -m-6
        p-6
      ">

        <div className="
          max-w-4xl
          mx-auto
        ">

          {/* ==================================================
              HEADER
          ================================================== */}

          <div className="mb-6">

            <p className="
              text-sm
              text-blue-600
              font-semibold
            ">

              CareerHub Recruiter Portal

            </p>


            <h1 className="
              text-3xl
              font-bold
              text-gray-900
              mt-1
            ">

              Recruiter Profile

            </h1>


            <p className="
              text-gray-500
              mt-2
            ">

              Manage your company information.

            </p>

          </div>


          {/* ==================================================
              PROFILE CARD
          ================================================== */}

          <div className="
            bg-white
            rounded-2xl
            shadow-sm
            border
            border-gray-100
            p-6
            md:p-8
          ">

            {/* =================================================
                ERROR MESSAGE
            ================================================= */}

            {error && (

              <div className="
                mb-6
                bg-red-50
                border
                border-red-200
                text-red-700
                px-4
                py-3
                rounded-lg
              ">

                <p className="font-medium">
                  {error}
                </p>

              </div>

            )}


            {/* =================================================
                SUCCESS MESSAGE
            ================================================= */}

            {success && (

              <div className="
                mb-6
                bg-green-50
                border
                border-green-200
                text-green-700
                px-4
                py-3
                rounded-lg
              ">

                <p className="font-medium">
                  {success}
                </p>

              </div>

            )}


            {/* =================================================
                COMPANY LOGO
            ================================================= */}

            {formData.companyLogo && (

              <div className="
                mb-6
                flex
                items-center
                gap-4
              ">

                <img
                  src={formData.companyLogo}
                  alt="Company Logo"
                  className="
                    h-24
                    w-24
                    rounded-xl
                    object-cover
                    border
                    border-gray-200
                  "
                  onError={(e) => {

                    e.currentTarget.style.display =
                      "none";

                  }}
                />

                <div>

                  <p className="
                    font-semibold
                    text-gray-900
                  ">

                    Company Logo

                  </p>

                  <p className="
                    text-sm
                    text-gray-500
                  ">

                    Preview of your company logo

                  </p>

                </div>

              </div>

            )}


            {/* =================================================
                FORM
            ================================================= */}

            <form onSubmit={handleSubmit}>

              <div className="
                grid
                grid-cols-1
                md:grid-cols-2
                gap-6
              ">


                {/* COMPANY */}

                <div>

                  <label className="
                    block
                    font-semibold
                    text-gray-800
                    mb-2
                  ">

                    Company Name

                  </label>

                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    placeholder="Enter company name"
                    className="
                      w-full
                      border
                      border-gray-300
                      rounded-lg
                      p-3
                      outline-none
                      focus:ring-2
                      focus:ring-blue-500
                    "
                  />

                </div>


                {/* LOGO */}

                <div>

                  <label className="
                    block
                    font-semibold
                    text-gray-800
                    mb-2
                  ">

                    Company Logo URL

                  </label>

                  <input
                    type="url"
                    name="companyLogo"
                    value={formData.companyLogo}
                    onChange={handleChange}
                    placeholder="https://example.com/logo.png"
                    className="
                      w-full
                      border
                      border-gray-300
                      rounded-lg
                      p-3
                      outline-none
                      focus:ring-2
                      focus:ring-blue-500
                    "
                  />

                </div>


                {/* WEBSITE */}

                <div>

                  <label className="
                    block
                    font-semibold
                    text-gray-800
                    mb-2
                  ">

                    Company Website

                  </label>

                  <input
                    type="url"
                    name="companyWebsite"
                    value={formData.companyWebsite}
                    onChange={handleChange}
                    placeholder="https://company.com"
                    className="
                      w-full
                      border
                      border-gray-300
                      rounded-lg
                      p-3
                      outline-none
                      focus:ring-2
                      focus:ring-blue-500
                    "
                  />

                </div>


                {/* LOCATION */}

                <div>

                  <label className="
                    block
                    font-semibold
                    text-gray-800
                    mb-2
                  ">

                    Company Location

                  </label>

                  <input
                    type="text"
                    name="companyLocation"
                    value={formData.companyLocation}
                    onChange={handleChange}
                    placeholder="Hyderabad"
                    className="
                      w-full
                      border
                      border-gray-300
                      rounded-lg
                      p-3
                      outline-none
                      focus:ring-2
                      focus:ring-blue-500
                    "
                  />

                </div>

              </div>


              {/* =================================================
                  DESCRIPTION
              ================================================= */}

              <div className="mt-6">

                <label className="
                  block
                  font-semibold
                  text-gray-800
                  mb-2
                ">

                  About Company

                </label>

                <textarea
                  name="companyDescription"
                  rows="6"
                  value={formData.companyDescription}
                  onChange={handleChange}
                  placeholder="Describe your company..."
                  className="
                    w-full
                    border
                    border-gray-300
                    rounded-lg
                    p-3
                    outline-none
                    resize-y
                    focus:ring-2
                    focus:ring-blue-500
                  "
                />

              </div>


              {/* =================================================
                  SAVE BUTTON
              ================================================= */}

              <div className="
                mt-8
                flex
                justify-end
              ">

                <button
                  type="submit"
                  disabled={saving}
                  className="
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                    px-8
                    py-3
                    rounded-lg
                    font-semibold
                    transition
                    disabled:bg-gray-400
                    disabled:cursor-not-allowed
                  "
                >

                  {saving
                    ? "Saving..."
                    : "Save Profile"
                  }

                </button>

              </div>

            </form>

          </div>

        </div>

      </div>

    </RecruiterLayout>

  );

}


export default RecruiterProfile;