import { useState } from "react";
import { toast } from "react-toastify";
import api from "../../api/api";

function EditProfileModal({
  user,
  refreshProfile,
  closeModal,
}) {
  const [formData, setFormData] = useState({
    name: user.name || "",
    phone: user.phone || "",
    skills: user.skills || "",
    experience: user.experience || "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await api.put(
        "/users/profile",
        formData
      );

      toast.success(data.message);

      refreshProfile();

      closeModal();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to update profile"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">

      <div className="modal">

        <h2>Edit Profile</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
          />

          <input
            type="text"
            name="experience"
            placeholder="Experience"
            value={formData.experience}
            onChange={handleChange}
          />

          <textarea
            name="skills"
            placeholder="Skills"
            rows="4"
            value={formData.skills}
            onChange={handleChange}
          />

          <div className="modal-buttons">

            <button
              type="button"
              onClick={closeModal}
              className="cancel-btn"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-btn"
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : "Save Changes"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditProfileModal;