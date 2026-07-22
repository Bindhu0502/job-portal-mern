const Application = require("../models/Application");
const Job = require("../models/Job");

// ==========================================
// Apply For Job
// ==========================================
const applyJob = async (req, res) => {
  try {
    const { coverLetter } = req.body;

    const jobId = req.params.jobId;
    const userId = req.user._id;

    // Check if job exists
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    // Check duplicate application
    const alreadyApplied = await Application.findOne({
      job: jobId,
      user: userId,
    });

    if (alreadyApplied) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job.",
      });
    }

    // Resume validation
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload your resume.",
      });
    }

    // Cloudinary file URL
    const resume = req.file.path;

    // Create application
    const application = await Application.create({
      job: jobId,
      user: userId,
      resume,
      coverLetter,
    });

    res.status(201).json({
      success: true,
      message: "Application submitted successfully.",
      application,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Get My Applications
// ==========================================
const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      user: req.user._id,
    })
      .populate("job")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Get Applicants For a Job (Admin)
// ==========================================
const getApplicantsForJob = async (req, res) => {
  try {
    const applications = await Application.find({
      job: req.params.jobId,
    })
      .populate("user", "-password")
      .populate("job");

    res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Update Application Status
// ==========================================
const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    application.status = status;

    await application.save();

    res.status(200).json({
      success: true,
      message: "Application status updated successfully.",
      application,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Withdraw Application
// ==========================================
const withdrawApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    if (application.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await Application.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Application withdrawn successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Export
// ==========================================
module.exports = {
  applyJob,
  getMyApplications,
  getApplicantsForJob,
  updateApplicationStatus,
  withdrawApplication,
};