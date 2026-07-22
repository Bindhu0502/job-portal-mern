import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaBriefcase,
  FaTools,
  FaEdit,
  FaLock,
} from "react-icons/fa";

function ProfileInfo({
  user,
  onEdit,
  onPassword,
}) {
  return (
    <div className="profile-info-card">

      <div className="profile-info-header">
        <h2>Profile Information</h2>
      </div>

      <div className="profile-info-grid">

        <div className="profile-item">
          <FaUser className="profile-icon" />

          <div>
            <label>Name</label>
            <p>{user.name}</p>
          </div>
        </div>

        <div className="profile-item">
          <FaEnvelope className="profile-icon" />

          <div>
            <label>Email</label>
            <p>{user.email}</p>
          </div>
        </div>

        <div className="profile-item">
          <FaPhone className="profile-icon" />

          <div>
            <label>Phone</label>
            <p>{user.phone || "Not Added"}</p>
          </div>
        </div>

        <div className="profile-item">
          <FaBriefcase className="profile-icon" />

          <div>
            <label>Experience</label>
            <p>
              {user.experience || "Fresher"}
            </p>
          </div>
        </div>

        <div className="profile-item profile-full">
          <FaTools className="profile-icon" />

          <div>
            <label>Skills</label>

            <p>
              {user.skills
                ? user.skills
                : "No skills added"}
            </p>
          </div>
        </div>

      </div>

      <div className="profile-buttons">

        <button
          className="edit-profile-btn"
          onClick={onEdit}
        >
          <FaEdit />
          Edit Profile
        </button>

        <button
          className="change-password-btn"
          onClick={onPassword}
        >
          <FaLock />
          Change Password
        </button>

      </div>

    </div>
  );
}

export default ProfileInfo;