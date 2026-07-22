import { Link } from "react-router-dom";
import { FaFolderOpen, FaPlusCircle } from "react-icons/fa";

function EmptyState() {
  return (
    <div className="empty-state">

      <FaFolderOpen className="empty-icon" />

      <h2>No Jobs Found</h2>

      <p>
        No jobs match your search or no jobs have been
        posted yet.
      </p>

      <Link
        to="/admin/add-job"
        className="empty-btn"
      >
        <FaPlusCircle />
        Add First Job
      </Link>

    </div>
  );
}

export default EmptyState;