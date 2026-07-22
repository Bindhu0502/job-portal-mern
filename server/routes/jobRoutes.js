const express = require("express");

const router = express.Router();

const {
  addJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");

// Add Job
router.post("/", addJob);

// Get All Jobs
router.get("/", getAllJobs);

// Get Single Job
router.get("/:id", getJobById);

// Update Job
router.put("/:id", updateJob);

// Delete Job
router.delete("/:id", deleteJob);

module.exports = router;