const SavedJob = require("../models/SavedJob");

// ============================
// Save Job
// ============================

const saveJob = async (req, res) => {
  try {
    const { userId, jobId } = req.body;

    console.log("Request Body:", req.body);

    if (!userId || !jobId) {
      return res.status(400).json({
        success: false,
        message: "User ID and Job ID are required",
      });
    }

    const alreadySaved = await SavedJob.findOne({
      userId,
      jobId,
    });

    if (alreadySaved) {
      return res.status(200).json({
        success: true,
        message: "Job already saved",
        savedJob: alreadySaved,
      });
    }

    const savedJob = await SavedJob.create({
      userId,
      jobId,
    });

    return res.status(201).json({
      success: true,
      message: "Job saved successfully",
      savedJob,
    });
  } catch (error) {
    console.error("Save Job Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================
// Get Saved Jobs
// ============================

const getSavedJobs = async (req, res) => {
  try {
    const jobs = await SavedJob.find({
      userId: req.params.userId,
    }).populate("jobId");

    return res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================
// Remove Saved Job
// ============================

const removeSavedJob = async (req, res) => {
  try {
    await SavedJob.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Saved job removed successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  saveJob,
  getSavedJobs,
  removeSavedJob,
};