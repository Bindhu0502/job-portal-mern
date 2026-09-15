import { useEffect, useState } from "react";

import {
  UserCircle,
  Camera,
  Save,
  MapPin,
  Phone,
  Briefcase,
  GraduationCap,
  IndianRupee,
  Globe,
  Code2,
} from "lucide-react";

import api from "../services/api";

// ============================================================
// BACKEND URL
// ============================================================

const BACKEND_URL = "http://localhost:5000";

// ============================================================
// BUILD IMAGE URL
// ============================================================

const getImageUrl = (imagePath) => {
  if (!imagePath) {
    return "";
  }

  // Already an absolute URL
  if (
    imagePath.startsWith("http://") ||
    imagePath.startsWith("https://")
  ) {
    return `${imagePath}?t=${Date.now()}`;
  }

  // Relative URL beginning with /
  if (imagePath.startsWith("/")) {
    return `${BACKEND_URL}${imagePath}?t=${Date.now()}`;
  }

  // Relative URL without /
  return `${BACKEND_URL}/${imagePath}?t=${Date.now()}`;
};

// ============================================================
// PROFILE COMPONENT
// ============================================================

function Profile() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [completion, setCompletion] = useState(0);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [imageLoadError, setImageLoadError] =
    useState(false);

  // ==========================================================
  // FORM DATA
  // ==========================================================

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    skills: "",
    experience: "",
    education: "",
    jobPreference: "",
    expectedSalary: "",
    linkedin: "",
    github: "",
    portfolio: "",
  });

  // ==========================================================
  // LOAD PROFILE
  // ==========================================================

  useEffect(() => {
    loadProfile();
  }, []);

  // ==========================================================
  // LOAD EVERYTHING
  // ==========================================================

  const loadProfile = async () => {
    setLoading(true);
    setError("");

    try {
      await Promise.all([
        fetchProfile(),
        fetchCompletion(),
      ]);
    } catch (error) {
      console.error(
        "PROFILE LOAD ERROR:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================================
  // GET PROFILE
  // ==========================================================

  const fetchProfile = async () => {
    try {
      const response = await api.get(
        "/users/profile"
      );

      console.log(
        "================================"
      );

      console.log(
        "PROFILE RESPONSE:",
        response.data
      );

      const user =
        response.data?.user || {};

      console.log(
        "PROFILE IMAGE FROM DATABASE:",
        user.profileImage
      );

      // ========================================================
      // FORM DATA
      // ========================================================

      setFormData({
        name: user.name || "",

        email: user.email || "",

        phone: user.phone || "",

        location: user.location || "",

        skills: Array.isArray(user.skills)
          ? user.skills.join(", ")
          : user.skills || "",

        experience:
          user.experience || "",

        education:
          user.education || "",

        jobPreference:
          user.jobPreference || "",

        expectedSalary:
          user.expectedSalary || "",

        linkedin:
          user.linkedin || "",

        github:
          user.github || "",

        portfolio:
          user.portfolio || "",
      });

      // ========================================================
      // SAVE USER LOCALLY
      // ========================================================

      try {
        localStorage.setItem(
          "user",
          JSON.stringify(user)
        );
      } catch (storageError) {
        console.log(
          "LOCAL STORAGE ERROR:",
          storageError
        );
      }

      // ========================================================
      // PROFILE IMAGE
      // ========================================================

      if (user.profileImage) {
        const finalImageUrl =
          getImageUrl(
            user.profileImage
          );

        console.log(
          "FINAL PROFILE IMAGE URL:",
          finalImageUrl
        );

        setImageLoadError(false);
        setImagePreview(
          finalImageUrl
        );
      } else {
        console.log(
          "NO PROFILE IMAGE FOUND IN DATABASE"
        );

        // ======================================================
        // FALLBACK TO LOCAL STORAGE
        // ======================================================

        try {
          const savedUser =
            JSON.parse(
              localStorage.getItem(
                "user"
              ) || "{}"
            );

          if (
            savedUser.profileImage
          ) {
            const localImage =
              getImageUrl(
                savedUser.profileImage
              );

            console.log(
              "USING LOCAL STORAGE IMAGE:",
              localImage
            );

            setImagePreview(
              localImage
            );
          } else {
            setImagePreview("");
          }
        } catch {
          setImagePreview("");
        }
      }

      console.log(
        "================================"
      );

    } catch (error) {
      console.error(
        "PROFILE FETCH ERROR:",
        error.response?.data ||
          error
      );

      throw error;
    }
  };

  // ==========================================================
  // PROFILE COMPLETION
  // ==========================================================

  const fetchCompletion = async () => {
    try {
      const response =
        await api.get(
          "/users/profile-completion"
        );

      setCompletion(
        response.data?.percentage || 0
      );

    } catch (error) {
      console.error(
        "PROFILE COMPLETION ERROR:",
        error.response?.data ||
          error
      );

      setCompletion(0);
    }
  };

  // ==========================================================
  // INPUT CHANGE
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

    setError("");
    setSuccess("");
  };

  // ==========================================================
  // IMAGE CHANGE
  // ==========================================================

  const handleImageChange = (e) => {
    const file =
      e.target.files?.[0];

    if (!file) {
      return;
    }

    // ========================================================
    // FILE TYPE
    // ========================================================

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];

    if (
      !allowedTypes.includes(
        file.type
      )
    ) {
      setError(
        "Please select a JPG, PNG or WEBP image."
      );

      return;
    }

    // ========================================================
    // FILE SIZE
    // ========================================================

    if (
      file.size >
      5 * 1024 * 1024
    ) {
      setError(
        "Image must be less than 5MB."
      );

      return;
    }

    setError("");
    setSuccess("");
    setImageLoadError(false);

    setProfileImage(file);

    // ========================================================
    // LOCAL PREVIEW
    // ========================================================

    const preview =
      URL.createObjectURL(file);

    setImagePreview(preview);

    console.log(
      "NEW PROFILE IMAGE:",
      file.name
    );
  };

  // ==========================================================
  // SUBMIT PROFILE
  // ==========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // ========================================================
    // REQUIRED FIELD
    // ========================================================

    if (!formData.name.trim()) {
      setError(
        "Full name is required."
      );

      return;
    }

    try {
      setSaving(true);

      // ======================================================
      // FORM DATA
      // ======================================================

      const data =
        new FormData();

      data.append(
        "name",
        formData.name
      );

      data.append(
        "phone",
        formData.phone
      );

      data.append(
        "location",
        formData.location
      );

      data.append(
        "skills",
        formData.skills
      );

      data.append(
        "experience",
        formData.experience
      );

      data.append(
        "education",
        formData.education
      );

      data.append(
        "jobPreference",
        formData.jobPreference
      );

      data.append(
        "expectedSalary",
        formData.expectedSalary
      );

      data.append(
        "linkedin",
        formData.linkedin
      );

      data.append(
        "github",
        formData.github
      );

      data.append(
        "portfolio",
        formData.portfolio
      );

      // ======================================================
      // IMAGE
      // ======================================================

      if (profileImage) {
        data.append(
          "profileImage",
          profileImage
        );
      }

      console.log(
        "UPDATING PROFILE..."
      );

      // ======================================================
      // API
      // ======================================================

      const response =
        await api.put(
          "/users/profile",
          data
        );

      console.log(
        "PROFILE UPDATE RESPONSE:",
        response.data
      );

      // ======================================================
      // UPDATED USER
      // ======================================================

      const updatedUser =
        response.data?.user;

      if (updatedUser) {
        // ----------------------------------------------------
        // UPDATE LOCAL STORAGE
        // ----------------------------------------------------

        localStorage.setItem(
          "user",
          JSON.stringify(
            updatedUser
          )
        );

        // ----------------------------------------------------
        // UPDATE IMAGE
        // ----------------------------------------------------

        if (
          updatedUser.profileImage
        ) {
          const serverImage =
            getImageUrl(
              updatedUser.profileImage
            );

          console.log(
            "UPDATED IMAGE URL:",
            serverImage
          );

          setImageLoadError(false);

          setImagePreview(
            serverImage
          );
        }
      }

      // ======================================================
      // CLEAR SELECTED IMAGE
      // ======================================================

      setProfileImage(null);

      // ======================================================
      // SUCCESS
      // ======================================================

      setSuccess(
        "Profile updated successfully!"
      );

      // ======================================================
      // NOTIFY OTHER COMPONENTS
      // ======================================================

      window.dispatchEvent(
        new Event(
          "profileUpdated"
        )
      );

      // ======================================================
      // UPDATE COMPLETION
      // ======================================================

      await fetchCompletion();

    } catch (error) {
      console.error(
        "UPDATE PROFILE ERROR:",
        error.response?.data ||
          error
      );

      setError(
        error.response?.data?.message ||
          "Profile update failed. Please try again."
      );

    } finally {
      setSaving(false);
    }
  };

  // ==========================================================
  // IMAGE ERROR
  // ==========================================================

  const handleImageError = () => {
    console.error(
      "PROFILE IMAGE FAILED TO LOAD:",
      imagePreview
    );

    setImageLoadError(true);
  };

  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">

        <div className="text-center">

          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>

          <p className="text-gray-600 font-medium">
            Loading Profile...
          </p>

        </div>

      </div>
    );
  }

  // ==========================================================
  // PAGE
  // ==========================================================

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">

      <div className="max-w-5xl mx-auto">

        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="bg-white rounded-2xl shadow-sm border p-8 mb-6">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

            <div>

              <h1 className="text-3xl font-bold text-gray-900">
                My Profile
              </h1>

              <p className="text-gray-500 mt-2">
                Keep your profile updated to improve your job opportunities.
              </p>

            </div>

            <div className="text-right">

              <p className="text-sm text-gray-500">
                Profile Completion
              </p>

              <p className="text-3xl font-bold text-blue-600">
                {completion}%
              </p>

            </div>

          </div>

          {/* COMPLETION BAR */}

          <div className="mt-6">

            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">

              <div
                className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                style={{
                  width:
                    `${completion}%`,
                }}
              />

            </div>

          </div>

        </div>

        {/* ==================================================
            ERROR
        ================================================== */}

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-xl">
            {error}
          </div>
        )}

        {/* ==================================================
            SUCCESS
        ================================================== */}

        {success && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-5 py-4 rounded-xl">
            {success}
          </div>
        )}

        {/* ==================================================
            PROFILE CARD
        ================================================== */}

        <div className="bg-white rounded-2xl shadow-sm border p-8">

          {/* =================================================
              PROFILE IMAGE
          ================================================= */}

          <div className="flex flex-col items-center mb-10">

            <div className="relative">

              {imagePreview &&
              !imageLoadError ? (

                <img
                  key={imagePreview}
                  src={imagePreview}
                  alt="Profile"
                  className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-lg"
                  onError={
                    handleImageError
                  }
                />

              ) : (

                <div className="w-36 h-36 rounded-full bg-gray-100 border-4 border-white shadow-lg flex items-center justify-center">

                  <UserCircle
                    size={70}
                    className="text-gray-400"
                  />

                </div>

              )}

              {/* CAMERA BUTTON */}

              <label
                htmlFor="profileImage"
                className="absolute bottom-1 right-1 bg-blue-600 text-white p-3 rounded-full cursor-pointer shadow-lg hover:bg-blue-700 transition"
                title="Change profile picture"
              >

                <Camera size={20} />

                <input
                  id="profileImage"
                  type="file"
                  hidden
                  accept="image/jpeg,image/jpg,image/png,image/webp"
                  onChange={
                    handleImageChange
                  }
                />

              </label>

            </div>

            <p className="text-sm text-gray-500 mt-4">
              JPG, PNG or WEBP • Maximum 5MB
            </p>

            {profileImage && (
              <p className="text-sm text-green-600 mt-2 font-medium">
                New image selected:{" "}
                {profileImage.name}
              </p>
            )}

            {imageLoadError && (
              <p className="text-sm text-red-500 mt-2">
                Saved image could not be loaded.
              </p>
            )}

          </div>

          {/* =================================================
              FORM
          ================================================= */}

          <form
            onSubmit={handleSubmit}
            className="space-y-8"
          >

            {/* =================================================
                PERSONAL INFORMATION
            ================================================= */}

            <div>

              <h2 className="text-xl font-bold text-gray-900 mb-5">
                Personal Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* NAME */}

                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>

                  <div className="relative">

                    <UserCircle
                      size={19}
                      className="absolute left-3 top-3.5 text-gray-400"
                    />

                    <input
                      name="name"
                      value={
                        formData.name
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Full Name"
                      className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                  </div>

                </div>

                {/* EMAIL */}

                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>

                  <input
                    type="email"
                    value={
                      formData.email
                    }
                    disabled
                    className="w-full border border-gray-300 rounded-lg p-3 bg-gray-100 text-gray-500 cursor-not-allowed"
                  />

                  <p className="text-xs text-gray-400 mt-1">
                    Email cannot be changed here.
                  </p>

                </div>

                {/* PHONE */}

                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone
                  </label>

                  <div className="relative">

                    <Phone
                      size={19}
                      className="absolute left-3 top-3.5 text-gray-400"
                    />

                    <input
                      name="phone"
                      value={
                        formData.phone
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Phone Number"
                      className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                  </div>

                </div>

                {/* LOCATION */}

                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>

                  <div className="relative">

                    <MapPin
                      size={19}
                      className="absolute left-3 top-3.5 text-gray-400"
                    />

                    <input
                      name="location"
                      value={
                        formData.location
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Hyderabad, Telangana"
                      className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                  </div>

                </div>

              </div>

            </div>

            {/* =================================================
                PROFESSIONAL INFORMATION
            ================================================= */}

            <div className="border-t pt-8">

              <h2 className="text-xl font-bold text-gray-900 mb-5">
                Professional Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* SKILLS */}

                <div className="md:col-span-2">

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Skills
                  </label>

                  <div className="relative">

                    <Code2
                      size={19}
                      className="absolute left-3 top-3.5 text-gray-400"
                    />

                    <input
                      name="skills"
                      value={
                        formData.skills
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="React, JavaScript, SQL, Power BI"
                      className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                  </div>

                  <p className="text-xs text-gray-400 mt-1">
                    Separate skills with commas.
                  </p>

                </div>

                {/* EXPERIENCE */}

                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Experience
                  </label>

                  <div className="relative">

                    <Briefcase
                      size={19}
                      className="absolute left-3 top-3.5 text-gray-400"
                    />

                    <input
                      name="experience"
                      value={
                        formData.experience
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="Fresher / 1 Year / 2 Years"
                      className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                  </div>

                </div>

                {/* EDUCATION */}

                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Education
                  </label>

                  <div className="relative">

                    <GraduationCap
                      size={19}
                      className="absolute left-3 top-3.5 text-gray-400"
                    />

                    <input
                      name="education"
                      value={
                        formData.education
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="B.Tech / B.E / Degree"
                      className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                  </div>

                </div>

                {/* PREFERRED ROLE */}

                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Role
                  </label>

                  <input
                    name="jobPreference"
                    value={
                      formData.jobPreference
                    }
                    onChange={
                      handleChange
                    }
                    placeholder="Frontend Developer"
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                </div>

                {/* EXPECTED SALARY */}

                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expected Salary
                  </label>

                  <div className="relative">

                    <IndianRupee
                      size={18}
                      className="absolute left-3 top-3.5 text-gray-400"
                    />

                    <input
                      name="expectedSalary"
                      value={
                        formData.expectedSalary
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="4 LPA / ₹30,000 per month"
                      className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                  </div>

                </div>

              </div>

            </div>

            {/* =================================================
                SOCIAL LINKS
            ================================================= */}

            <div className="border-t pt-8">

              <h2 className="text-xl font-bold text-gray-900 mb-5">
                Professional Links
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* LINKEDIN */}

                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    LinkedIn
                  </label>

                  <div className="relative">

                    <Globe
                      size={19}
                      className="absolute left-3 top-3.5 text-gray-400"
                    />

                    <input
                      name="linkedin"
                      value={
                        formData.linkedin
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="https://linkedin.com/in/yourname"
                      className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                  </div>

                </div>

                {/* GITHUB */}

                <div>

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GitHub
                  </label>

                  <div className="relative">

                    <Globe
                      size={19}
                      className="absolute left-3 top-3.5 text-gray-400"
                    />

                    <input
                      name="github"
                      value={
                        formData.github
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="https://github.com/yourname"
                      className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                  </div>

                </div>

                {/* PORTFOLIO */}

                <div className="md:col-span-2">

                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Portfolio Website
                  </label>

                  <div className="relative">

                    <Globe
                      size={19}
                      className="absolute left-3 top-3.5 text-gray-400"
                    />

                    <input
                      name="portfolio"
                      value={
                        formData.portfolio
                      }
                      onChange={
                        handleChange
                      }
                      placeholder="https://yourportfolio.com"
                      className="w-full border border-gray-300 rounded-lg py-3 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                  </div>

                </div>

              </div>

            </div>

            {/* =================================================
                SAVE
            ================================================= */}

            <div className="border-t pt-8">

              <button
                type="submit"
                disabled={saving}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition"
              >

                <Save size={20} />

                {saving
                  ? "Saving Profile..."
                  : "Save Profile"}

              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
}

export default Profile;