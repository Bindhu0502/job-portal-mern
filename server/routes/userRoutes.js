import express from "express";

import {
  getProfile,
  updateProfile,
  uploadResume,
  deleteResume,
  getProfileCompletion,
} from "../controllers/userController.js";

import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

// ============================================================
// GET PROFILE
// GET /api/users/profile
// ============================================================

router.get(
  "/profile",
  protect,
  getProfile
);

// ============================================================
// UPDATE PROFILE + PROFILE IMAGE
// PUT /api/users/profile
// ============================================================

router.put(
  "/profile",
  protect,
  upload.single("profileImage"),
  updateProfile
);

// ============================================================
// UPLOAD RESUME
// PUT /api/users/resume
// ============================================================

router.put(
  "/resume",
  protect,
  upload.single("resume"),
  uploadResume
);

// ============================================================
// DELETE RESUME
// DELETE /api/users/resume
// ============================================================

router.delete(
  "/resume",
  protect,
  deleteResume
);

// ============================================================
// PROFILE COMPLETION
// GET /api/users/profile-completion
// ============================================================

router.get(
  "/profile-completion",
  protect,
  getProfileCompletion
);

export default router;