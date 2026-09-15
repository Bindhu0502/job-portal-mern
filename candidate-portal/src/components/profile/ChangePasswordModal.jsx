import { useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";

function ChangePasswordModal({
  closeModal,
}) {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
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
        "/users/change-password",
        formData
      );

      toast.success(data.message);

      closeModal();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to change password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">

      <div className="modal">

        <h2>Change Password</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="password"
            name="currentPassword"
            placeholder="Current Password"
            value={formData.currentPassword}
            onChange={handleChange}
          />

          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={formData.newPassword}
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
                ? "Updating..."
                : "Update Password"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default ChangePasswordModal;