import express from "express";

import {
  createApplication,
  getMyApplications,
  getApplicationById,
  updateApplicationStatus,
} from "../controllers/applicationController.js";

import { protect } from "../middleware/authMiddleware.js";

import { resumeUpload } from "../middleware/uploadMiddleware.js";


const router = express.Router();


// ============================================================
// CREATE APPLICATION
// POST /api/applications
// ============================================================
//
// Resume field:
// resume
//
// Accepted:
// PDF / DOC / DOCX
//

router.post(
  "/",
  protect,
  resumeUpload.single("resume"),
  createApplication
);


// ============================================================
// GET USER APPLICATIONS
// GET /api/applications/my
// ============================================================

router.get(
  "/my",
  protect,
  getMyApplications
);


// ============================================================
// GET SINGLE APPLICATION
// GET /api/applications/:id
// ============================================================

router.get(
  "/:id",
  protect,
  getApplicationById
);


// ============================================================
// UPDATE APPLICATION STATUS
// PUT /api/applications/:id/status
// ============================================================

router.put(
  "/:id/status",
  protect,
  updateApplicationStatus
);


export default router;