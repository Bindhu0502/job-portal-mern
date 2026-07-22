const Job = require("../models/Job");
const User = require("../models/User");
const Application = require("../models/Application");

// ===============================
// Admin Dashboard Analytics
// ===============================
exports.getDashboard = async (req, res) => {
  try {
    // Total Counts
    const totalJobs = await Job.countDocuments();

    const totalUsers = await User.countDocuments({
      role: "user",
    });

    const totalApplications =
      await Application.countDocuments();

    const hiredCandidates =
      await Application.countDocuments({
        status: "Hired",
      });

    // Recent Jobs
    const recentJobs = await Job.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("title company location createdAt");

    // Recent Applications
    const recentApplications =
      await Application.find()
        .populate("job", "title company")
        .populate("user", "name")
        .sort({ createdAt: -1 })
        .limit(5);

    // Application Status Counts
    const applied = await Application.countDocuments({
      status: "Applied",
    });

    const reviewed = await Application.countDocuments({
      status: "Reviewed",
    });

    const shortlisted =
      await Application.countDocuments({
        status: "Shortlisted",
      });

    const rejected = await Application.countDocuments({
      status: "Rejected",
    });

    res.status(200).json({
      success: true,

      totalJobs,
      totalUsers,
      totalApplications,
      hiredCandidates,

      recentJobs,
      recentApplications,

      statusSummary: {
        applied,
        reviewed,
        shortlisted,
        rejected,
        hired: hiredCandidates,
      },
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });

  }
};