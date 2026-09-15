import express from "express";

import {
  getRecruiterDashboard,

  getRecruiterProfile,
  updateRecruiterProfile,

  getRecruiterJobs,
  createRecruiterJob,
  getRecruiterJobById,
  updateRecruiterJob,
  deleteRecruiterJob,
  toggleJobStatus,

  getRecruiterApplications,
  getRecruiterApplicationById,
  updateRecruiterApplicationStatus,
} from "../controllers/recruiterController.js";

import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();


// ============================================================
// RECRUITER DASHBOARD
// ============================================================

// GET /api/recruiter/dashboard

router.get(
  "/dashboard",
  protect,
  getRecruiterDashboard
);


// ============================================================
// RECRUITER PROFILE
// ============================================================

// GET /api/recruiter/profile

router.get(
  "/profile",
  protect,
  getRecruiterProfile
);


// PUT /api/recruiter/profile

router.put(
  "/profile",
  protect,
  updateRecruiterProfile
);


// ============================================================
// RECRUITER JOBS
// ============================================================


// GET ALL JOBS
// GET /api/recruiter/jobs

router.get(
  "/jobs",
  protect,
  getRecruiterJobs
);


// GET SINGLE JOB
// GET /api/recruiter/jobs/:id

router.get(
  "/jobs/:id",
  protect,
  getRecruiterJobById
);


// CREATE JOB
// POST /api/recruiter/jobs

router.post(
  "/jobs",
  protect,
  createRecruiterJob
);


// UPDATE JOB
// PUT /api/recruiter/jobs/:id

router.put(
  "/jobs/:id",
  protect,
  updateRecruiterJob
);


// DELETE JOB
// DELETE /api/recruiter/jobs/:id

router.delete(
  "/jobs/:id",
  protect,
  deleteRecruiterJob
);


// TOGGLE JOB STATUS
// PUT /api/recruiter/jobs/:id/status

router.put(
  "/jobs/:id/status",
  protect,
  toggleJobStatus
);


// ============================================================
// RECRUITER APPLICATIONS
// ============================================================


// GET ALL APPLICATIONS
// GET /api/recruiter/applications

router.get(
  "/applications",
  protect,
  getRecruiterApplications
);


// GET SINGLE APPLICATION
// GET /api/recruiter/applications/:id

router.get(
  "/applications/:id",
  protect,
  getRecruiterApplicationById
);


// UPDATE APPLICATION STATUS
// PUT /api/recruiter/applications/:id/status

router.put(
  "/applications/:id/status",
  protect,
  updateRecruiterApplicationStatus
);


// ============================================================
// EXPORT
// ============================================================

export default router;