import { useRef, useState } from "react";
import { toast } from "react-toastify";
import {
  FaCamera,
  FaUserCircle,
} from "react-icons/fa";

import api from "../../api/api";

function ProfileHeader({
  user,
  refreshProfile,
}) {
  const fileInputRef = useRef(null);

  const [uploading, setUploading] =
    useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();

    formData.append(
      "profilePicture",
      file
    );

    try {
      setUploading(true);

      const { data } = await api.post(
        "/users/upload/profile-picture",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      toast.success(data.message);

      refreshProfile();
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Unable to upload image"
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="profile-header">

      <div className="profile-image-section">

        <div
          className="profile-image-wrapper"
          onClick={() =>
            fileInputRef.current.click()
          }
        >
          {user.profilePicture ? (
            <img
              src={user.profilePicture}
              alt={user.name}
              className="profile-image"
            />
          ) : (
            <FaUserCircle className="default-profile-icon" />
          )}

          <div className="camera-overlay">
            <FaCamera />
          </div>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={handleImageUpload}
        />

      </div>

      <div className="profile-details">

        <h1>{user.name}</h1>

        <p>{user.email}</p>

        <span className="role-badge">
          {user.role === "admin"
            ? "Administrator"
            : "Job Seeker"}
        </span>

        {uploading && (
          <p className="upload-text">
            Uploading profile picture...
          </p>
        )}

      </div>

    </div>
  );
}

export default ProfileHeader;