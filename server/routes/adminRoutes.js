import express from "express";

import {
  // Dashboard
  getAdminDashboard,

  // Users
  getAllUsers,
  getUserById,
  updateUserRole,
  updateUserStatus,
  deleteUser,

  // Jobs
  getAllJobs,
  getJobById,
  updateJobStatus,
  deleteJob,

  // Applications
  getAllApplications,
  getApplicationById,
  updateApplicationStatus,
  deleteApplication,

  // Companies
  getAllCompanies,
  getCompanyById,
  deleteCompany,

  // Notifications
  getAllNotifications,
  getNotificationById,
  markNotificationAsRead,
  deleteNotification,
} from "../controllers/adminController.js";

import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";

const router = express.Router();

// ============================================================
// ADMIN MIDDLEWARE
// ============================================================
//
// Every route below requires:
//
// 1. Valid JWT token
// 2. Admin user
//
// ============================================================

const adminAuth = [
  protect,
  adminOnly,
];

// ============================================================
// DASHBOARD
// GET /api/admin/dashboard
// ============================================================

router.get(
  "/dashboard",
  ...adminAuth,
  getAdminDashboard
);

// ============================================================
// USERS
// ============================================================

// GET ALL USERS
// GET /api/admin/users

router.get(
  "/users",
  ...adminAuth,
  getAllUsers
);


// GET USER BY ID
// GET /api/admin/users/:id

router.get(
  "/users/:id",
  ...adminAuth,
  getUserById
);


// UPDATE USER ROLE
// PUT /api/admin/users/:id

router.put(
  "/users/:id",
  ...adminAuth,
  updateUserRole
);


// UPDATE USER STATUS
// PUT /api/admin/users/:id/status

router.put(
  "/users/:id/status",
  ...adminAuth,
  updateUserStatus
);


// DELETE USER
// DELETE /api/admin/users/:id

router.delete(
  "/users/:id",
  ...adminAuth,
  deleteUser
);

// ============================================================
// JOBS
// ============================================================

// GET ALL JOBS
// GET /api/admin/jobs

router.get(
  "/jobs",
  ...adminAuth,
  getAllJobs
);


// GET JOB BY ID
// GET /api/admin/jobs/:id

router.get(
  "/jobs/:id",
  ...adminAuth,
  getJobById
);


// UPDATE JOB STATUS
// PUT /api/admin/jobs/:id/status

router.put(
  "/jobs/:id/status",
  ...adminAuth,
  updateJobStatus
);


// DELETE JOB
// DELETE /api/admin/jobs/:id

router.delete(
  "/jobs/:id",
  ...adminAuth,
  deleteJob
);

// ============================================================
// APPLICATIONS
// ============================================================

// GET ALL APPLICATIONS
// GET /api/admin/applications

router.get(
  "/applications",
  ...adminAuth,
  getAllApplications
);


// GET APPLICATION BY ID
// GET /api/admin/applications/:id

router.get(
  "/applications/:id",
  ...adminAuth,
  getApplicationById
);


// UPDATE APPLICATION STATUS
// PUT /api/admin/applications/:id/status

router.put(
  "/applications/:id/status",
  ...adminAuth,
  updateApplicationStatus
);


// DELETE APPLICATION
// DELETE /api/admin/applications/:id

router.delete(
  "/applications/:id",
  ...adminAuth,
  deleteApplication
);

// ============================================================
// COMPANIES
// ============================================================

// GET ALL COMPANIES
// GET /api/admin/companies

router.get(
  "/companies",
  ...adminAuth,
  getAllCompanies
);


// GET COMPANY BY ID
// GET /api/admin/companies/:id

router.get(
  "/companies/:id",
  ...adminAuth,
  getCompanyById
);


// DELETE COMPANY
// DELETE /api/admin/companies/:id

router.delete(
  "/companies/:id",
  ...adminAuth,
  deleteCompany
);

// ============================================================
// NOTIFICATIONS
// ============================================================

// GET ALL NOTIFICATIONS
// GET /api/admin/notifications

router.get(
  "/notifications",
  ...adminAuth,
  getAllNotifications
);


// GET NOTIFICATION BY ID
// GET /api/admin/notifications/:id

router.get(
  "/notifications/:id",
  ...adminAuth,
  getNotificationById
);


// MARK NOTIFICATION AS READ
// PUT /api/admin/notifications/:id/read

router.put(
  "/notifications/:id/read",
  ...adminAuth,
  markNotificationAsRead
);


// DELETE NOTIFICATION
// DELETE /api/admin/notifications/:id

router.delete(
  "/notifications/:id",
  ...adminAuth,
  deleteNotification
);

// ============================================================
// EXPORT
// ============================================================

export default router;