const express = require("express");
const router = express.Router();

const {
  applyJob,
  getMyApplications,
  getApplicantsForJob,
  updateApplicationStatus,
  withdrawApplication,
} = require("../controllers/applicationController");

const { protect, admin } = require("../middleware/authMiddleware");

const { uploadResume } = require("../middleware/upload");

/* ==========================================
   Apply for Job
========================================== */

router.post(
  "/apply/:jobId",
  protect,
  uploadResume.single("resume"),
  applyJob
);

/* ==========================================
   Logged In User Applications
========================================== */

router.get(
  "/my",
  protect,
  getMyApplications
);

/* ==========================================
   Admin - View Applicants
========================================== */

router.get(
  "/job/:jobId",
  protect,
  admin,
  getApplicantsForJob
);

/* ==========================================
   Admin - Update Status
========================================== */

router.put(
  "/:id/status",
  protect,
  admin,
  updateApplicationStatus
);

/* ==========================================
   Withdraw Application
========================================== */

router.delete(
  "/:id",
  protect,
  withdrawApplication
);

module.exports = router;