import { Link } from "react-router-dom";
import {
  FaEdit,
  FaTrash,
  FaUsers,
  FaMapMarkerAlt,
  FaBriefcase,
} from "react-icons/fa";

function JobRow({ job, deleteJob }) {
  return (
    <tr>

      <td>
        <div className="job-title">
          <FaBriefcase className="table-icon" />
          <span>{job.title}</span>
        </div>
      </td>

      <td>{job.company}</td>

      <td>
        <div className="job-location">
          <FaMapMarkerAlt className="table-icon" />
          <span>{job.location}</span>
        </div>
      </td>

      <td>{job.salary}</td>

      <td>{job.experience}</td>

      <td>
        <span className="job-type-badge">
          {job.type}
        </span>
      </td>

      <td>

        <div className="action-buttons">

          <Link
            to={`/admin/edit-job/${job._id}`}
            className="btn edit-btn"
          >
            <FaEdit />
          </Link>

          <Link
            to={`/admin/applicants/${job._id}`}
            className="btn applicant-btn"
          >
            <FaUsers />
          </Link>

          <button
            className="btn delete-btn"
            onClick={() => deleteJob(job._id)}
          >
            <FaTrash />
          </button>

        </div>

      </td>

    </tr>
  );
}

export default JobRow;