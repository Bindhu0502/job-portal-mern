import { useRef, useState } from "react";
import api from "../../services/api";

function ProfileCard({
  profile,
  setProfile,
  refreshUser,
}) {
  const imageRef = useRef(null);
  const resumeRef = useRef(null);

  const [uploadingImage, setUploadingImage] =
    useState(false);

  const [uploadingResume, setUploadingResume] =
    useState(false);

  // ===========================
  // Calculate Profile Completion
  // ===========================

  const getCompletion = () => {
    let total = 0;

    if (profile.name) total += 10;
    if (profile.phone) total += 10;
    if (profile.gender) total += 10;
    if (profile.dateOfBirth) total += 10;
    if (profile.headline) total += 10;
    if (profile.bio) total += 10;
    if (profile.skills?.length) total += 10;
    if (profile.education?.length) total += 10;
    if (profile.experience?.length) total += 10;
    if (profile.resume) total += 10;

    return total;
  };

  const completion = getCompletion();

  // ===========================
  // Upload Profile Image
  // ===========================

  const uploadImage = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploadingImage(true);

      const { data } = await api.post(
        "/users/profile/photo",
        formData
      );

      setProfile((prev) => ({
        ...prev,
        profileImage: data.profileImage,
      }));

      await refreshUser();

      alert("Profile photo updated.");
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Image upload failed."
      );
    } finally {
      setUploadingImage(false);
    }
  };

  // ===========================
  // Upload Resume
  // ===========================

  const uploadResume = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setUploadingResume(true);

      const { data } = await api.post(
        "/users/profile/resume",
        formData
      );

      setProfile((prev) => ({
        ...prev,
        resume: data.resume,
      }));

      await refreshUser();

      alert("Resume uploaded successfully.");
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Resume upload failed."
      );
    } finally {
      setUploadingResume(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8">

      <div className="flex flex-col items-center">

        {profile.profileImage ? (
          <img
            src={`http://localhost:5000${profile.profileImage}`}
            alt="Profile"
            className="w-44 h-44 rounded-full object-cover border-4 border-blue-600"
          />
        ) : (
          <div className="w-44 h-44 rounded-full bg-blue-600 text-white flex items-center justify-center text-6xl font-bold">
            {profile.name
              ? profile.name.charAt(0).toUpperCase()
              : "U"}
          </div>
        )}

        <input
          hidden
          ref={imageRef}
          type="file"
          accept="image/*"
          onChange={uploadImage}
        />

        <button
          onClick={() => imageRef.current.click()}
          disabled={uploadingImage}
          className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl"
        >
          {uploadingImage
            ? "Uploading..."
            : "Change Photo"}
        </button>

        <h2 className="text-2xl font-bold mt-6 dark:text-white">
          {profile.name}
        </h2>

        <p className="text-gray-500 mt-2 text-center">
          {profile.headline ||
            "Add your professional headline"}
        </p>

      </div>

      {/* Progress */}

      <div className="mt-10">

        <div className="flex justify-between mb-2">
          <span className="font-semibold dark:text-white">
            Profile Completion
          </span>

          <span className="font-bold text-blue-600">
            {completion}%
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3">

          <div
            className="bg-blue-600 h-3 rounded-full transition-all duration-500"
            style={{
              width: `${completion}%`,
            }}
          />

        </div>

      </div>

      {/* Resume */}

      <div className="mt-10">

        <input
          hidden
          ref={resumeRef}
          type="file"
          accept=".pdf"
          onChange={uploadResume}
        />

        <button
          onClick={() => resumeRef.current.click()}
          disabled={uploadingResume}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl"
        >
          {uploadingResume
            ? "Uploading..."
            : "Upload Resume"}
        </button>

        {profile.resume && (
          <a
            href={`http://localhost:5000${profile.resume}`}
            target="_blank"
            rel="noreferrer"
            className="block text-center mt-4 text-blue-600 hover:underline"
          >
            View Resume
          </a>
        )}

      </div>

      {/* Quick Stats */}

      <div className="mt-10 border-t pt-6 space-y-4">

        <div className="flex justify-between">
          <span className="text-gray-500">
            Skills
          </span>

          <span className="font-semibold dark:text-white">
            {profile.skills.length}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">
            Education
          </span>

          <span className="font-semibold dark:text-white">
            {profile.education.length}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">
            Experience
          </span>

          <span className="font-semibold dark:text-white">
            {profile.experience.length}
          </span>
        </div>

      </div>

    </div>
  );
}

export default ProfileCard;