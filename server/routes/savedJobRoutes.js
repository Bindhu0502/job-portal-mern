const express = require("express");

const router = express.Router();

const {
  saveJob,
  getSavedJobs,
  removeSavedJob,
} = require("../controllers/savedJobController");

// Save Job
router.post("/", saveJob);

// Get Saved Jobs of User
router.get("/:userId", getSavedJobs);

// Remove Saved Job
router.delete("/:id", removeSavedJob);

module.exports = router;