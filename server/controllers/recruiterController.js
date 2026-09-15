import Job from "../models/Job.js";
import Application from "../models/Application.js";
import User from "../models/User.js";


// ============================================================
// HELPER
// Normalize skills into the String format used by Job model
// ============================================================

const normalizeSkills = (skills) => {
  if (Array.isArray(skills)) {
    return skills
      .map((skill) => String(skill).trim())
      .filter(Boolean)
      .join(", ");
  }

  if (typeof skills === "string") {
    return skills
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean)
      .join(", ");
  }

  return "";
};


// ============================================================
// RECRUITER DASHBOARD
// GET /api/recruiter/dashboard
// ============================================================

export const getRecruiterDashboard = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const recruiterId = req.user._id;

    const totalJobs = await Job.countDocuments({
      postedBy: recruiterId,
    });

    const activeJobs = await Job.countDocuments({
      postedBy: recruiterId,
      isActive: true,
    });

    const recruiterJobs = await Job.find({
      postedBy: recruiterId,
    }).select("_id title company");

    const jobIds = recruiterJobs.map((job) => job._id);

    const totalApplications =
      jobIds.length > 0
        ? await Application.countDocuments({
            job: { $in: jobIds },
          })
        : 0;

    const statusResults =
      jobIds.length > 0
        ? await Application.aggregate([
            {
              $match: {
                job: { $in: jobIds },
              },
            },
            {
              $group: {
                _id: "$status",
                count: { $sum: 1 },
              },
            },
          ])
        : [];

    const statusCount = {
      Applied: 0,
      Reviewed: 0,
      Shortlisted: 0,
      Interview: 0,
      Selected: 0,
      Rejected: 0,
      Hired: 0,
    };

    statusResults.forEach((item) => {
      if (item._id) {
        statusCount[item._id] = item.count;
      }
    });

    const hiredCount =
      jobIds.length > 0
        ? await Application.countDocuments({
            job: { $in: jobIds },
            status: {
              $in: ["Selected", "Hired"],
            },
          })
        : 0;

    const hiringRate =
      totalApplications > 0
        ? Math.round(
            (hiredCount / totalApplications) * 100
          )
        : 0;

    const jobPerformanceData =
      jobIds.length > 0
        ? await Application.aggregate([
            {
              $match: {
                job: { $in: jobIds },
              },
            },
            {
              $group: {
                _id: "$job",
                applications: {
                  $sum: 1,
                },
              },
            },
            {
              $sort: {
                applications: -1,
              },
            },
            {
              $limit: 10,
            },
          ])
        : [];

    const jobPerformance = jobPerformanceData
      .map((item) => {
        const job = recruiterJobs.find(
          (jobItem) =>
            jobItem._id.toString() ===
            item._id.toString()
        );

        if (!job) {
          return null;
        }

        return {
          _id: job._id,
          title: job.title,
          applications: item.applications,
        };
      })
      .filter(Boolean);

    const recentApplications =
      jobIds.length > 0
        ? await Application.find({
            job: { $in: jobIds },
          })
            .populate("user", "name email")
            .populate(
              "job",
              "title company location"
            )
            .sort({
              createdAt: -1,
            })
            .limit(10)
        : [];

    return res.status(200).json({
      success: true,

      dashboard: {
        totalJobs,
        activeJobs,
        totalApplications,
        hiringRate,
        statusCount,
        jobPerformance,
        recentApplications,
      },
    });
  } catch (error) {
    console.error(
      "RECRUITER DASHBOARD ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Unable to load recruiter dashboard",
    });
  }
};


// ============================================================
// GET RECRUITER PROFILE
// GET /api/recruiter/profile
// ============================================================

export const getRecruiterProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const recruiter = await User.findById(
      req.user._id
    ).select("-password");

    if (!recruiter) {
      return res.status(404).json({
        success: false,
        message: "Recruiter not found",
      });
    }

    if (recruiter.role !== "recruiter") {
      return res.status(403).json({
        success: false,
        message: "Recruiter access required",
      });
    }

    return res.status(200).json({
      success: true,
      recruiter,
    });
  } catch (error) {
    console.error(
      "GET RECRUITER PROFILE ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Unable to load recruiter profile",
    });
  }
};


// ============================================================
// UPDATE RECRUITER PROFILE
// PUT /api/recruiter/profile
// ============================================================

export const updateRecruiterProfile = async (
  req,
  res
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const recruiter = await User.findById(
      req.user._id
    );

    if (!recruiter) {
      return res.status(404).json({
        success: false,
        message: "Recruiter not found",
      });
    }

    if (recruiter.role !== "recruiter") {
      return res.status(403).json({
        success: false,
        message: "Recruiter access required",
      });
    }

    const {
      company,
      companyLogo,
      companyWebsite,
      companyLocation,
      companyDescription,
    } = req.body;

    if (company !== undefined) {
      recruiter.company =
        String(company).trim();
    }

    if (companyLogo !== undefined) {
      recruiter.companyLogo =
        String(companyLogo).trim();
    }

    if (companyWebsite !== undefined) {
      recruiter.companyWebsite =
        String(companyWebsite).trim();
    }

    if (companyLocation !== undefined) {
      recruiter.companyLocation =
        String(companyLocation).trim();
    }

    if (companyDescription !== undefined) {
      recruiter.companyDescription =
        String(companyDescription).trim();
    }

    await recruiter.save();

    return res.status(200).json({
      success: true,

      message:
        "Company profile updated successfully",

      recruiter: {
        _id: recruiter._id,
        name: recruiter.name,
        email: recruiter.email,
        role: recruiter.role,
        company: recruiter.company || "",
        companyLogo:
          recruiter.companyLogo || "",
        companyWebsite:
          recruiter.companyWebsite || "",
        companyLocation:
          recruiter.companyLocation || "",
        companyDescription:
          recruiter.companyDescription || "",
        profileImage:
          recruiter.profileImage || "",
      },
    });
  } catch (error) {
    console.error(
      "UPDATE RECRUITER PROFILE ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Unable to update recruiter profile",
    });
  }
};


// ============================================================
// GET ALL RECRUITER JOBS
// GET /api/recruiter/jobs
// ============================================================

export const getRecruiterJobs = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const jobs = await Job.find({
      postedBy: req.user._id,
    }).sort({
      createdAt: -1,
    });

    const jobsWithCounts = await Promise.all(
      jobs.map(async (job) => {
        const applicationCount =
          await Application.countDocuments({
            job: job._id,
          });

        return {
          ...job.toObject(),
          applicationCount,
        };
      })
    );

    return res.status(200).json({
      success: true,
      count: jobsWithCounts.length,
      jobs: jobsWithCounts,
    });
  } catch (error) {
    console.error(
      "GET RECRUITER JOBS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Unable to fetch recruiter jobs",
    });
  }
};


// ============================================================
// GET SINGLE RECRUITER JOB
// GET /api/recruiter/jobs/:id
// ============================================================

export const getRecruiterJobById = async (
  req,
  res
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const job = await Job.findOne({
      _id: req.params.id,
      postedBy: req.user._id,
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message:
          "Job not found or you are not authorized to access this job",
      });
    }

    const applicationCount =
      await Application.countDocuments({
        job: job._id,
      });

    return res.status(200).json({
      success: true,

      job: {
        ...job.toObject(),
        applicationCount,
      },
    });
  } catch (error) {
    console.error(
      "GET RECRUITER JOB ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Unable to fetch job",
    });
  }
};


// ============================================================
// CREATE RECRUITER JOB
// POST /api/recruiter/jobs
// ============================================================

export const createRecruiterJob = async (
  req,
  res
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const {
      title,
      company,
      location,
      salary,
      jobType,
      workMode,
      experience,
      description,
      requirements,
      skills,
      category,
      companyLogo,
      openings,
      deadline,
    } = req.body;

    if (
      !title?.trim() ||
      !company?.trim() ||
      !location?.trim() ||
      !description?.trim()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Title, company, location and description are required",
      });
    }

    const job = await Job.create({
      title: title.trim(),
      company: company.trim(),
      location: location.trim(),
      salary: salary || "",
      jobType: jobType || "Full Time",
      workMode: workMode || "On-site",
      experience: experience || "",
      description: description.trim(),
      requirements:
        requirements || "",
      skills: normalizeSkills(skills),
      category: category || "",
      companyLogo: companyLogo || "",
      openings: Number(openings) || 1,
      deadline: deadline || null,
      postedBy: req.user._id,
      isActive: true,
    });

    return res.status(201).json({
      success: true,
      message: "Job created successfully",
      job,
    });
  } catch (error) {
    console.error(
      "CREATE RECRUITER JOB ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Unable to create job",
    });
  }
};


// ============================================================
// UPDATE RECRUITER JOB
// PUT /api/recruiter/jobs/:id
// ============================================================

export const updateRecruiterJob = async (
  req,
  res
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const job = await Job.findOne({
      _id: req.params.id,
      postedBy: req.user._id,
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message:
          "Job not found or you are not authorized to update this job",
      });
    }

    const {
      title,
      company,
      location,
      salary,
      jobType,
      workMode,
      experience,
      description,
      requirements,
      skills,
      category,
      companyLogo,
      openings,
      deadline,
      isActive,
    } = req.body;

    if (title !== undefined) {
      if (!String(title).trim()) {
        return res.status(400).json({
          success: false,
          message: "Job title cannot be empty",
        });
      }

      job.title = String(title).trim();
    }

    if (company !== undefined) {
      if (!String(company).trim()) {
        return res.status(400).json({
          success: false,
          message: "Company cannot be empty",
        });
      }

      job.company = String(company).trim();
    }

    if (location !== undefined) {
      if (!String(location).trim()) {
        return res.status(400).json({
          success: false,
          message: "Location cannot be empty",
        });
      }

      job.location = String(location).trim();
    }

    if (salary !== undefined) {
      job.salary = salary;
    }

    if (jobType !== undefined) {
      job.jobType = jobType;
    }

    if (workMode !== undefined) {
      job.workMode = workMode;
    }

    if (experience !== undefined) {
      job.experience = experience;
    }

    if (description !== undefined) {
      if (!String(description).trim()) {
        return res.status(400).json({
          success: false,
          message:
            "Description cannot be empty",
        });
      }

      job.description =
        String(description).trim();
    }

    if (requirements !== undefined) {
      job.requirements =
        String(requirements).trim();
    }

    if (skills !== undefined) {
      job.skills = normalizeSkills(skills);
    }

    if (category !== undefined) {
      job.category = category;
    }

    if (companyLogo !== undefined) {
      job.companyLogo = companyLogo;
    }

    if (openings !== undefined) {
      job.openings =
        Number(openings) > 0
          ? Number(openings)
          : 1;
    }

    if (deadline !== undefined) {
      job.deadline = deadline || null;
    }

    if (isActive !== undefined) {
      job.isActive =
        isActive === true ||
        isActive === "true";
    }

    const updatedJob = await job.save();

    return res.status(200).json({
      success: true,
      message: "Job updated successfully",
      job: updatedJob,
    });
  } catch (error) {
    console.error(
      "UPDATE RECRUITER JOB ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Unable to update job",
    });
  }
};


// ============================================================
// DELETE RECRUITER JOB
// DELETE /api/recruiter/jobs/:id
// ============================================================

export const deleteRecruiterJob = async (
  req,
  res
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const job = await Job.findOne({
      _id: req.params.id,
      postedBy: req.user._id,
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message:
          "Job not found or you are not authorized to delete this job",
      });
    }

    await job.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    console.error(
      "DELETE RECRUITER JOB ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Unable to delete job",
    });
  }
};


// ============================================================
// TOGGLE JOB STATUS
// PUT /api/recruiter/jobs/:id/status
// ============================================================

export const toggleJobStatus = async (
  req,
  res
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const job = await Job.findOne({
      _id: req.params.id,
      postedBy: req.user._id,
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message:
          "Job not found or you are not authorized",
      });
    }

    job.isActive = !job.isActive;

    await job.save();

    return res.status(200).json({
      success: true,

      message: job.isActive
        ? "Job enabled successfully"
        : "Job disabled successfully",

      job,
    });
  } catch (error) {
    console.error(
      "TOGGLE JOB STATUS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Unable to update job status",
    });
  }
};


// ============================================================
// GET ALL RECRUITER APPLICATIONS
// GET /api/recruiter/applications
// ============================================================

export const getRecruiterApplications = async (
  req,
  res
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const recruiterJobs = await Job.find({
      postedBy: req.user._id,
    }).select("_id");

    const jobIds = recruiterJobs.map(
      (job) => job._id
    );

    if (jobIds.length === 0) {
      return res.status(200).json({
        success: true,
        count: 0,
        applications: [],
      });
    }

    const applications =
      await Application.find({
        job: { $in: jobIds },
      })
        .populate(
          "user",
          "name email phone resume skills experience"
        )
        .populate(
          "job",
          "title company location jobType"
        )
        .sort({
          createdAt: -1,
        });

    return res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    console.error(
      "GET RECRUITER APPLICATIONS ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Unable to fetch applications",
    });
  }
};


// ============================================================
// GET SINGLE RECRUITER APPLICATION
// GET /api/recruiter/applications/:id
// ============================================================

export const getRecruiterApplicationById = async (
  req,
  res
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const recruiterJobs = await Job.find({
      postedBy: req.user._id,
    }).select("_id");

    const jobIds = recruiterJobs.map(
      (job) => job._id
    );

    const application =
      await Application.findOne({
        _id: req.params.id,
        job: { $in: jobIds },
      })
        .populate(
          "user",
          "name email phone resume skills experience"
        )
        .populate(
          "job",
          "title company location jobType"
        );

    if (!application) {
      return res.status(404).json({
        success: false,
        message:
          "Application not found or you are not authorized",
      });
    }

    return res.status(200).json({
      success: true,
      application,
    });
  } catch (error) {
    console.error(
      "GET RECRUITER APPLICATION ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Unable to fetch application",
    });
  }
};


// ============================================================
// UPDATE RECRUITER APPLICATION STATUS
// PUT /api/recruiter/applications/:id/status
// ============================================================

export const updateRecruiterApplicationStatus = async (
  req,
  res
) => {
  try {
    // ========================================================
    // CHECK AUTHENTICATION
    // ========================================================

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    // ========================================================
    // GET STATUS
    // ========================================================

    const { status } = req.body;

    console.log(
      "===================================="
    );

    console.log(
      "UPDATE APPLICATION STATUS"
    );

    console.log(
      "Application ID:",
      req.params.id
    );

    console.log(
      "New Status:",
      status
    );

    console.log(
      "Recruiter ID:",
      req.user._id
    );

    console.log(
      "===================================="
    );

    // ========================================================
    // VALIDATE STATUS
    // ========================================================

    const allowedStatuses = [
      "Applied",
      "Reviewed",
      "Shortlisted",
      "Interview",
      "Selected",
      "Rejected",
      "Hired",
    ];

    if (!status) {
      return res.status(400).json({
        success: false,
        message:
          "Application status is required",
      });
    }

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message:
          `Invalid status. Allowed values: ${allowedStatuses.join(
            ", "
          )}`,
      });
    }

    // ========================================================
    // FIND RECRUITER JOBS
    // ========================================================

    const recruiterJobs = await Job.find({
      postedBy: req.user._id,
    }).select("_id");

    const jobIds = recruiterJobs.map(
      (job) => job._id
    );

    // ========================================================
    // FIND APPLICATION
    // ========================================================

    const application =
      await Application.findOne({
        _id: req.params.id,
        job: {
          $in: jobIds,
        },
      });

    if (!application) {
      return res.status(404).json({
        success: false,
        message:
          "Application not found or you are not authorized",
      });
    }

    // ========================================================
    // UPDATE STATUS
    // ========================================================

    application.status = status;

    await application.save();

    // ========================================================
    // POPULATE USER
    // ========================================================

    await application.populate(
      "user",
      "name email phone resume skills experience"
    );

    // ========================================================
    // POPULATE JOB
    // ========================================================

    await application.populate(
      "job",
      "title company location jobType"
    );

    // ========================================================
    // SUCCESS RESPONSE
    // ========================================================

    return res.status(200).json({
      success: true,

      message:
        "Application status updated successfully",

      application,
    });

  } catch (error) {

    // ========================================================
    // DETAILED ERROR
    // ========================================================

    console.error(
      "===================================="
    );

    console.error(
      "UPDATE RECRUITER APPLICATION STATUS ERROR"
    );

    console.error(
      "Error Name:",
      error.name
    );

    console.error(
      "Error Message:",
      error.message
    );

    console.error(
      "Full Error:",
      error
    );

    console.error(
      "===================================="
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Unable to update application status",
    });
  }
};