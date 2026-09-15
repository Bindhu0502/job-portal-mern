import express from "express";
import {
  createJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
} from "../controllers/jobController.js";

import { protect } from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

// =====================================
// Job Routes
// =====================================

// Create Job (Recruiter/Admin)
router.post(
  "/",
  protect,
  authorizeRoles("recruiter", "admin"),
  createJob
);

// Get All Jobs (Public)
router.get("/", getAllJobs);

// Get Job By ID (Public)
router.get("/:id", getJobById);

// Update Job (Recruiter/Admin)
router.put(
  "/:id",
  protect,
  authorizeRoles("recruiter", "admin"),
  updateJob
);

// Delete Job (Recruiter/Admin)
router.delete(
  "/:id",
  protect,
  authorizeRoles("recruiter", "admin"),
  deleteJob
);

export default router;