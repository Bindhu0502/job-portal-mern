const Job = require("../models/Job");

// ==========================
// Add New Job
// ==========================
const addJob = async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      salary,
      experience,
      type,
      description,
      skills,
      category,
      companyLogo,
    } = req.body;

    if (
      !title ||
      !company ||
      !location ||
      !salary ||
      !experience ||
      !type ||
      !description ||
      !skills
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const newJob = await Job.create({
      title,
      company,
      location,
      salary,
      experience,
      type,
      description,
      skills,
      category,
      companyLogo,
    });

    res.status(201).json({
      success: true,
      message: "Job Added Successfully",
      job: newJob,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Get All Jobs
// ==========================
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ==========================
// Get Single Job
// ==========================
const getJobById = async (req, res) => {
  try {

    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      job,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ==========================
// Update Job
// ==========================
const updateJob = async (req, res) => {
  try {

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!updatedJob) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Job Updated Successfully",
      job: updatedJob,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ==========================
// Delete Job
// ==========================
const deleteJob = async (req, res) => {
  try {

    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    await Job.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Job Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  addJob,
  getAllJobs,
  getJobById,
  updateJob,
  deleteJob,
};