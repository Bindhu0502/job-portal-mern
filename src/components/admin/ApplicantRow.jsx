import { useState } from "react";
import { toast } from "react-toastify";

import api from "../../api/api";
import StatusBadge from "./StatusBadge";

function ApplicantRow({ application, updateStatus }) {
  const [status, setStatus] = useState(application.status);
  const [loading, setLoading] = useState(false);

  const handleStatusChange = async (e) => {
    const newStatus = e.target.value;

    if (newStatus === status) return;

    try {
      setLoading(true);

      const { data } = await api.put(
        `/applications/${application._id}/status`,
        {
          status: newStatus,
        }
      );

      setStatus(newStatus);

      updateStatus?.(application._id, newStatus);

      toast.success(data.message);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to update application status"
      );
    } finally {
      setLoading(false);
    }
  };

  const openResume = () => {
    if (!application.resume) {
      toast.info("Resume not available.");
      return;
    }

    window.open(application.resume, "_blank");
  };

  return (
    <tr>
      <td>{application.user?.name || "-"}</td>

      <td>{application.user?.email || "-"}</td>

      <td>
        {application.resume ? (
          <button
            className="resume-btn"
            onClick={openResume}
          >
            View Resume
          </button>
        ) : (
          <span>-</span>
        )}
      </td>

      <td>
        <StatusBadge status={status} />
      </td>

      <td>
        {new Date(
          application.createdAt
        ).toLocaleDateString()}
      </td>

      <td>
        <select
          className="status-select"
          value={status}
          onChange={handleStatusChange}
          disabled={loading}
        >
          <option value="Pending">
            Pending
          </option>

          <option value="Reviewed">
            Reviewed
          </option>

          <option value="Accepted">
            Accepted
          </option>

          <option value="Rejected">
            Rejected
          </option>
        </select>
      </td>
    </tr>
  );
}

export default ApplicantRow;