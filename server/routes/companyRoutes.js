import express from "express";

import {
  createCompany,
  getCompanies,
  getCompanyById,
} from "../controllers/companyController.js";

import { protect } from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/roleMiddleware.js";

const router = express.Router();

/*
=====================================================
Public Routes
=====================================================
*/

// Get all companies
router.get("/", getCompanies);

// Get company by ID
router.get("/:id", getCompanyById);

/*
=====================================================
Recruiter / Admin Routes
=====================================================
*/

// Create company
router.post(
  "/",
  protect,
  authorizeRoles("recruiter", "admin"),
  createCompany
);

export default router;