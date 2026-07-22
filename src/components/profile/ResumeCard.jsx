import { useRef, useState } from "react";
import { toast } from "react-toastify";
import {
  FaFilePdf,
  FaUpload,
  FaEye,
} from "react-icons/fa";

import api from "../../api/api";

function ResumeCard({
  user,
  refreshProfile,
}) {
  const fileInputRef = useRef(null);

  const [uploading, setUploading] =
    useState(false);

  const uploadResume = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Please upload a PDF file.");
      return;
    }

    const formData = new FormData();

    formData.append("resume", file);

    try {
      setUploading(true);

      const { data } = await api.post(
        "/users/upload/resume",
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
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Resume upload failed"
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="resume-card">

      <div className="resume-header">
        <h2>Resume</h2>
      </div>

      <div className="resume-body">

        <FaFilePdf className="resume-icon" />

        <div className="resume-details">

          <h3>
            {user.resume
              ? "Resume Uploaded"
              : "No Resume Uploaded"}
          </h3>

          <p>
            {user.resume
              ? "You can view or replace your resume."
              : "Upload your latest resume in PDF format."}
          </p>

        </div>

      </div>

      <div className="resume-actions">

        {user.resume && (
          <button
            className="view-resume-btn"
            onClick={() =>
              window.open(
                user.resume,
                "_blank"
              )
            }
          >
            <FaEye />
            View Resume
          </button>
        )}

        <button
          className="upload-resume-btn"
          onClick={() =>
            fileInputRef.current.click()
          }
          disabled={uploading}
        >
          <FaUpload />

          {uploading
            ? "Uploading..."
            : user.resume
            ? "Replace Resume"
            : "Upload Resume"}
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          hidden
          onChange={uploadResume}
        />

      </div>

    </div>
  );
}

export default ResumeCard;