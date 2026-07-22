import { Link } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";

function ManageJobsHeader() {
  return (
    <div className="manage-header">

      <div>

        <h1>
          Manage Jobs
        </h1>

        <p>
          Manage all jobs posted on your platform.
        </p>

      </div>

      <Link
        to="/admin/add-job"
        className="add-job-btn"
      >
        <FaPlusCircle />

        <span>Add New Job</span>

      </Link>

    </div>
  );
}

export default ManageJobsHeader;