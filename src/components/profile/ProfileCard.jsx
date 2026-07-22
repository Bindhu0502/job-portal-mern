import {
  FaEnvelope,
  FaPhone,
  FaTools,
  FaBriefcase,
  FaFilePdf,
  FaCalendarAlt,
  FaUserTie,
} from "react-icons/fa";

function ProfileCard({ user }) {
  return (
    <div className="profile-card">

      <div className="profile-top">

        <div className="profile-avatar">
          {user?.profilePicture ? (
            <img
              src={user.profilePicture}
              alt={user.name}
            />
          ) : (
            <div className="avatar-placeholder">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        <h2>{user?.name}</h2>

        <span className="role-badge">
          {user?.role || "Candidate"}
        </span>

      </div>

      <div className="profile-info">

        <div className="info-item">

          <div className="info-icon">
            <FaEnvelope />
          </div>

          <div>
            <label>Email</label>
            <p>{user?.email}</p>
          </div>

        </div>

        <div className="info-item">

          <div className="info-icon">
            <FaPhone />
          </div>

          <div>
            <label>Phone</label>
            <p>{user?.phone || "Not Added"}</p>
          </div>

        </div>

        <div className="info-item">

          <div className="info-icon">
            <FaTools />
          </div>

          <div>
            <label>Skills</label>
            <p>{user?.skills || "Not Added"}</p>
          </div>

        </div>

        <div className="info-item">

          <div className="info-icon">
            <FaBriefcase />
          </div>

          <div>
            <label>Experience</label>
            <p>{user?.experience || "Not Added"}</p>
          </div>

        </div>

        <div className="info-item">

          <div className="info-icon">
            <FaFilePdf />
          </div>

          <div>

            <label>Resume</label>

            {user?.resume ? (
              <a
                href={user.resume}
                target="_blank"
                rel="noreferrer"
              >
                View Resume
              </a>
            ) : (
              <p>No Resume Uploaded</p>
            )}

          </div>

        </div>

        <div className="info-item">

          <div className="info-icon">
            <FaCalendarAlt />
          </div>

          <div>
            <label>Joined</label>

            <p>
              {new Date(
                user?.createdAt
              ).toLocaleDateString()}
            </p>

          </div>

        </div>

      </div>

      <div className="profile-footer">

        <FaUserTie />

        <span>
          Keep your profile updated to improve your
          chances of getting noticed by recruiters.
        </span>

      </div>

    </div>
  );
}

export default ProfileCard;