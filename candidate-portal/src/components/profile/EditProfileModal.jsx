import React, { useState, useEffect } from "react";

function EditProfileModal({ isOpen, onClose, user, onSave }) {
  const [formData, setFormData] = useState(user);

  useEffect(() => {
    setFormData(user);
  }, [user]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    localStorage.setItem(
      "loggedInUser",
      JSON.stringify(formData)
    );

    onSave(formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="profile-modal">

        <h2>Edit Profile</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name || ""}
          onChange={handleChange}
        />

        <input
          type="text"
          name="role"
          placeholder="Role"
          value={formData.role || ""}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email || ""}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone || ""}
          onChange={handleChange}
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location || ""}
          onChange={handleChange}
        />

        <div className="modal-buttons">

          <button
            className="cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="save-btn"
            onClick={handleSubmit}
          >
            Save
          </button>

        </div>

      </div>
    </div>
  );
}

export default EditProfileModal;