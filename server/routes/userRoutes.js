const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getAllUsers,
  getMyProfile,
  updateMyProfile,
  changePassword,
  uploadProfilePicture,
  uploadResume,
} = require("../controllers/userController");

const { protect, admin } = require("../middleware/authMiddleware");

const {
  uploadProfilePicture: uploadProfile,
  uploadResume: uploadResumeFile,
} = require("../middleware/upload");

// =====================================
// Authentication
// =====================================

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// =====================================
// Profile
// =====================================

// Get Logged-in User Profile
router.get("/profile", protect, getMyProfile);

// Update Profile
router.put("/profile", protect, updateMyProfile);

// Change Password
router.put("/change-password", protect, changePassword);

// =====================================
// Uploads
// =====================================

// Upload Profile Picture
router.post(
  "/upload/profile-picture",
  protect,
  uploadProfile.single("profilePicture"),
  uploadProfilePicture
);

// Upload Resume
router.post(
  "/upload/resume",
  protect,
  uploadResumeFile.single("resume"),
  uploadResume
);

// =====================================
// Admin
// =====================================

// Get All Users
router.get("/", protect, admin, getAllUsers);

module.exports = router;