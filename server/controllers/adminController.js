import User from "../models/User.js";
import Job from "../models/Job.js";
import Application from "../models/Application.js";
import Notification from "../models/Notification.js";


// ============================================================
// HELPER
// ============================================================

const isValidObjectId = (id) => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};


// ============================================================
// ADMIN DASHBOARD
// GET /api/admin/dashboard
// ============================================================

export const getAdminDashboard = async (req, res) => {
  try {

    // --------------------------------------------------------
    // USERS
    // --------------------------------------------------------

    const totalUsers = await User.countDocuments({
      role: "candidate",
    });

    const totalRecruiters = await User.countDocuments({
      role: "recruiter",
    });

    const totalAdmins = await User.countDocuments({
      role: "admin",
    });

    const pendingUsers = await User.countDocuments({
      accountStatus: "pending",
    });

    const approvedUsers = await User.countDocuments({
      accountStatus: "approved",
    });

    const rejectedUsers = await User.countDocuments({
      accountStatus: "rejected",
    });


    // --------------------------------------------------------
    // JOBS
    // --------------------------------------------------------

    const totalJobs = await Job.countDocuments();

    const activeJobs = await Job.countDocuments({
      isActive: true,
    });

    const inactiveJobs = await Job.countDocuments({
      isActive: false,
    });


    // --------------------------------------------------------
    // APPLICATIONS
    // --------------------------------------------------------

    const totalApplications =
      await Application.countDocuments();


    const applicationStatus = {
      Applied:
        await Application.countDocuments({
          status: "Applied",
        }),

      Reviewed:
        await Application.countDocuments({
          status: "Reviewed",
        }),

      Shortlisted:
        await Application.countDocuments({
          status: "Shortlisted",
        }),

      Interview:
        await Application.countDocuments({
          status: "Interview",
        }),

      Selected:
        await Application.countDocuments({
          status: "Selected",
        }),

      Rejected:
        await Application.countDocuments({
          status: "Rejected",
        }),

      Hired:
        await Application.countDocuments({
          status: "Hired",
        }),
    };


    // --------------------------------------------------------
    // RECENT USERS
    // --------------------------------------------------------

    const recentUsers =
      await User.find()
        .select("-password")
        .sort({
          createdAt: -1,
        })
        .limit(5)
        .lean();


    // --------------------------------------------------------
    // RECENT JOBS
    // --------------------------------------------------------

    const recentJobs =
      await Job.find()
        .sort({
          createdAt: -1,
        })
        .limit(5)
        .lean();


    // --------------------------------------------------------
    // RECENT APPLICATIONS
    // --------------------------------------------------------

    const recentApplications =
      await Application.find()
        .sort({
          createdAt: -1,
        })
        .limit(5)
        .populate(
          "user",
          "name email"
        )
        .populate(
          "job",
          "title company"
        )
        .lean();


    // --------------------------------------------------------
    // JOB CATEGORIES
    // --------------------------------------------------------

    const categoryData =
      await Job.aggregate([
        {
          $group: {
            _id: "$category",
            value: {
              $sum: 1,
            },
          },
        },

        {
          $sort: {
            value: -1,
          },
        },

        {
          $limit: 10,
        },
      ]);


    const jobCategories =
      categoryData.map((item) => ({
        name:
          item._id ||
          "Other",

        value:
          item.value,
      }));


    // --------------------------------------------------------
    // JOB LOCATIONS
    // --------------------------------------------------------

    const locationData =
      await Job.aggregate([
        {
          $group: {
            _id: "$location",
            value: {
              $sum: 1,
            },
          },
        },

        {
          $sort: {
            value: -1,
          },
        },

        {
          $limit: 10,
        },
      ]);


    const jobLocations =
      locationData.map((item) => ({
        name:
          item._id ||
          "Unknown",

        value:
          item.value,
      }));


    // --------------------------------------------------------
    // RESPONSE
    // --------------------------------------------------------

    return res.status(200).json({

      success: true,

      dashboard: {

        totalUsers,

        totalRecruiters,

        totalAdmins,

        pendingUsers,

        approvedUsers,

        rejectedUsers,

        totalJobs,

        activeJobs,

        inactiveJobs,

        totalApplications,

        applicationStatus,

        jobCategories,

        jobLocations,

        recentUsers,

        recentJobs,

        recentApplications,

      },

    });

  } catch (error) {

    console.error(
      "ADMIN DASHBOARD ERROR:",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        error.message ||
        "Failed to load admin dashboard",

    });

  }
};


// ============================================================
// GET ALL USERS
// GET /api/admin/users
// ============================================================

export const getAllUsers = async (
  req,
  res
) => {

  try {

    const users =
      await User.find()
        .select("-password")
        .sort({
          createdAt: -1,
        })
        .lean();


    return res.status(200).json({

      success: true,

      users,

    });

  } catch (error) {

    console.error(
      "GET ADMIN USERS ERROR:",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        error.message ||
        "Failed to fetch users",

    });

  }

};


// ============================================================
// GET USER BY ID
// GET /api/admin/users/:id
// ============================================================

export const getUserById = async (
  req,
  res
) => {

  try {

    if (
      !isValidObjectId(
        req.params.id
      )
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Invalid user ID",

      });

    }


    const user =
      await User.findById(
        req.params.id
      )
        .select("-password")
        .lean();


    if (!user) {

      return res.status(404).json({

        success: false,

        message:
          "User not found",

      });

    }


    return res.status(200).json({

      success: true,

      user,

    });

  } catch (error) {

    console.error(
      "GET ADMIN USER ERROR:",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        error.message ||
        "Failed to fetch user",

    });

  }

};


// ============================================================
// UPDATE USER ROLE
// PUT /api/admin/users/:id
// ============================================================

export const updateUserRole = async (
  req,
  res
) => {

  try {

    if (
      !isValidObjectId(
        req.params.id
      )
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Invalid user ID",

      });

    }


    const {
      role,
    } = req.body;


    const allowedRoles = [
      "candidate",
      "recruiter",
      "admin",
    ];


    if (
      !allowedRoles.includes(role)
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Invalid role",

      });

    }


    const user =
      await User.findById(
        req.params.id
      );


    if (!user) {

      return res.status(404).json({

        success: false,

        message:
          "User not found",

      });

    }


    // Prevent removing own admin role.

    if (

      req.user &&

      String(user._id) ===
        String(req.user._id) &&

      role !== "admin"

    ) {

      return res.status(400).json({

        success: false,

        message:
          "You cannot remove your own admin role.",

      });

    }


    user.role = role;

    await user.save();


    return res.status(200).json({

      success: true,

      message:
        "User role updated successfully",

      user: {

        _id:
          user._id,

        name:
          user.name,

        email:
          user.email,

        role:
          user.role,

      },

    });

  } catch (error) {

    console.error(
      "UPDATE USER ROLE ERROR:",
      error
    );


    if (
      error.name ===
      "ValidationError"
    ) {

      return res.status(400).json({

        success: false,

        message:
          Object.values(
            error.errors || {}
          )
            .map(
              (item) =>
                item.message
            )
            .join(", ") ||
          "User validation failed",

      });

    }


    return res.status(500).json({

      success: false,

      message:
        error.message ||
        "Failed to update role",

    });

  }

};


// ============================================================
// UPDATE USER STATUS
// PUT /api/admin/users/:id/status
// ============================================================

export const updateUserStatus = async (
  req,
  res
) => {

  try {

    if (
      !isValidObjectId(
        req.params.id
      )
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Invalid user ID",

      });

    }


    const {
      status,
    } = req.body;


    if (!status) {

      return res.status(400).json({

        success: false,

        message:
          "Status is required",

      });

    }


    const allowedStatuses = [
      "active",
      "blocked",
      "pending",
      "approved",
      "rejected",
    ];


    if (
      !allowedStatuses.includes(
        status
      )
    ) {

      return res.status(400).json({

        success: false,

        message:
          `Invalid status: ${status}`,

      });

    }


    const user =
      await User.findById(
        req.params.id
      );


    if (!user) {

      return res.status(404).json({

        success: false,

        message:
          "User not found",

      });

    }


    // Prevent admin from blocking themselves.

    if (

      req.user &&

      String(user._id) ===
        String(req.user._id) &&

      status === "blocked"

    ) {

      return res.status(400).json({

        success: false,

        message:
          "You cannot block your own admin account.",

      });

    }


    const hasStatusField =
      Boolean(
        User.schema.path(
          "status"
        )
      );


    const hasAccountStatusField =
      Boolean(
        User.schema.path(
          "accountStatus"
        )
      );


    if (
      !hasStatusField &&
      !hasAccountStatusField
    ) {

      return res.status(500).json({

        success: false,

        message:
          "User model does not contain status or accountStatus field.",

      });

    }


    // active / blocked

    if (
      status === "active" ||
      status === "blocked"
    ) {

      if (hasStatusField) {

        user.status =
          status;

      } else {

        user.accountStatus =
          status;

      }

    }


    // pending / approved / rejected

    if (
      status === "pending" ||
      status === "approved" ||
      status === "rejected"
    ) {

      if (
        hasAccountStatusField
      ) {

        user.accountStatus =
          status;

      } else {

        user.status =
          status;

      }

    }


    await user.save();


    return res.status(200).json({

      success: true,

      message:
        "User status updated successfully",

      user: {

        _id:
          user._id,

        name:
          user.name,

        email:
          user.email,

        role:
          user.role,

        status:
          user.status,

        accountStatus:
          user.accountStatus,

      },

    });

  } catch (error) {

    console.error(
      "UPDATE USER STATUS ERROR:",
      error
    );


    if (
      error.name ===
      "ValidationError"
    ) {

      return res.status(400).json({

        success: false,

        message:
          Object.values(
            error.errors || {}
          )
            .map(
              (item) =>
                item.message
            )
            .join(", ") ||
          "User validation failed",

      });

    }


    return res.status(500).json({

      success: false,

      message:
        error.message ||
        "Failed to update user status",

    });

  }

};


// ============================================================
// DELETE USER
// DELETE /api/admin/users/:id
// ============================================================

export const deleteUser = async (
  req,
  res
) => {

  try {

    if (
      !isValidObjectId(
        req.params.id
      )
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Invalid user ID",

      });

    }


    const user =
      await User.findById(
        req.params.id
      );


    if (!user) {

      return res.status(404).json({

        success: false,

        message:
          "User not found",

      });

    }


    if (

      req.user &&

      String(user._id) ===
        String(req.user._id)

    ) {

      return res.status(400).json({

        success: false,

        message:
          "You cannot delete your own admin account.",

      });

    }


    await User.findByIdAndDelete(
      req.params.id
    );


    return res.status(200).json({

      success: true,

      message:
        "User deleted successfully",

    });

  } catch (error) {

    console.error(
      "DELETE USER ERROR:",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        error.message ||
        "Failed to delete user",

    });

  }

};


// ============================================================
// GET ALL JOBS
// GET /api/admin/jobs
// ============================================================

export const getAllJobs = async (
  req,
  res
) => {

  try {

    const jobs =
      await Job.find()
        .sort({
          createdAt: -1,
        })
        .lean();


    return res.status(200).json({

      success: true,

      jobs,

    });

  } catch (error) {

    console.error(
      "GET ADMIN JOBS ERROR:",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        error.message ||
        "Failed to fetch jobs",

    });

  }

};


// ============================================================
// GET JOB BY ID
// GET /api/admin/jobs/:id
// ============================================================

export const getJobById = async (
  req,
  res
) => {

  try {

    if (
      !isValidObjectId(
        req.params.id
      )
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Invalid job ID",

      });

    }


    const job =
      await Job.findById(
        req.params.id
      ).lean();


    if (!job) {

      return res.status(404).json({

        success: false,

        message:
          "Job not found",

      });

    }


    return res.status(200).json({

      success: true,

      job,

    });

  } catch (error) {

    console.error(
      "GET ADMIN JOB ERROR:",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        error.message ||
        "Failed to fetch job",

    });

  }

};


// ============================================================
// UPDATE JOB STATUS
// PUT /api/admin/jobs/:id/status
// ============================================================

export const updateJobStatus = async (
  req,
  res
) => {

  try {

    if (
      !isValidObjectId(
        req.params.id
      )
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Invalid job ID",

      });

    }


    const job =
      await Job.findById(
        req.params.id
      );


    if (!job) {

      return res.status(404).json({

        success: false,

        message:
          "Job not found",

      });

    }


    const requestedStatus =
      req.body?.isActive;


    if (
      typeof requestedStatus ===
      "boolean"
    ) {

      job.isActive =
        requestedStatus;

    } else {

      job.isActive =
        !Boolean(
          job.isActive
        );

    }


    await job.save();


    return res.status(200).json({

      success: true,

      message:
        job.isActive
          ? "Job activated successfully"
          : "Job disabled successfully",

      job,

    });

  } catch (error) {

    console.error(
      "ADMIN UPDATE JOB STATUS ERROR:",
      error
    );


    if (
      error.name ===
      "ValidationError"
    ) {

      return res.status(400).json({

        success: false,

        message:
          Object.values(
            error.errors || {}
          )
            .map(
              (item) =>
                item.message
            )
            .join(", ") ||
          "Job validation failed",

      });

    }


    return res.status(500).json({

      success: false,

      message:
        error.message ||
        "Failed to update job status",

    });

  }

};


// ============================================================
// DELETE JOB
// DELETE /api/admin/jobs/:id
// ============================================================

export const deleteJob = async (
  req,
  res
) => {

  try {

    if (
      !isValidObjectId(
        req.params.id
      )
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Invalid job ID",

      });

    }


    const job =
      await Job.findById(
        req.params.id
      );


    if (!job) {

      return res.status(404).json({

        success: false,

        message:
          "Job not found",

      });

    }


    await Job.findByIdAndDelete(
      req.params.id
    );


    return res.status(200).json({

      success: true,

      message:
        "Job deleted successfully",

    });

  } catch (error) {

    console.error(
      "ADMIN DELETE JOB ERROR:",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        error.message ||
        "Failed to delete job",

    });

  }

};


// ============================================================
// GET ALL APPLICATIONS
// GET /api/admin/applications
// ============================================================

export const getAllApplications = async (
  req,
  res
) => {

  try {

    const applications =
      await Application.find()
        .sort({
          createdAt: -1,
        })
        .populate(
          "user",
          "name email role"
        )
        .populate(
          "job",
          "title company location"
        )
        .lean();


    return res.status(200).json({

      success: true,

      applications,

    });

  } catch (error) {

    console.error(
      "GET ADMIN APPLICATIONS ERROR:",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        error.message ||
        "Failed to fetch applications",

    });

  }

};


// ============================================================
// GET APPLICATION BY ID
// GET /api/admin/applications/:id
// ============================================================

export const getApplicationById = async (
  req,
  res
) => {

  try {

    if (
      !isValidObjectId(
        req.params.id
      )
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Invalid application ID",

      });

    }


    const application =
      await Application.findById(
        req.params.id
      )
        .populate(
          "user",
          "name email role"
        )
        .populate(
          "job",
          "title company location"
        )
        .lean();


    if (!application) {

      return res.status(404).json({

        success: false,

        message:
          "Application not found",

      });

    }


    return res.status(200).json({

      success: true,

      application,

    });

  } catch (error) {

    console.error(
      "GET ADMIN APPLICATION ERROR:",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        error.message ||
        "Failed to fetch application",

    });

  }

};


// ============================================================
// UPDATE APPLICATION STATUS
// PUT /api/admin/applications/:id/status
// ============================================================

export const updateApplicationStatus =
  async (
    req,
    res
  ) => {

    try {

      if (
        !isValidObjectId(
          req.params.id
        )
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Invalid application ID",

        });

      }


      const {
        status,
      } = req.body;


      const allowedStatuses = [
        "Applied",
        "Reviewed",
        "Shortlisted",
        "Interview",
        "Selected",
        "Rejected",
        "Hired",
      ];


      if (
        !allowedStatuses.includes(
          status
        )
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Invalid application status",

        });

      }


      const application =
        await Application.findById(
          req.params.id
        );


      if (!application) {

        return res.status(404).json({

          success: false,

          message:
            "Application not found",

        });

      }


      application.status =
        status;


      await application.save();


      const updatedApplication =
        await Application.findById(
          application._id
        )
          .populate(
            "user",
            "name email role"
          )
          .populate(
            "job",
            "title company location"
          )
          .lean();


      return res.status(200).json({

        success: true,

        message:
          "Application status updated successfully",

        application:
          updatedApplication,

      });

    } catch (error) {

      console.error(
        "UPDATE APPLICATION STATUS ERROR:",
        error
      );


      if (
        error.name ===
        "ValidationError"
      ) {

        return res.status(400).json({

          success: false,

          message:
            Object.values(
              error.errors || {}
            )
              .map(
                (item) =>
                  item.message
              )
              .join(", ") ||
            "Application validation failed",

        });

      }


      return res.status(500).json({

        success: false,

        message:
          error.message ||
          "Failed to update application status",

      });

    }

  };


// ============================================================
// DELETE APPLICATION
// DELETE /api/admin/applications/:id
// ============================================================

export const deleteApplication =
  async (
    req,
    res
  ) => {

    try {

      if (
        !isValidObjectId(
          req.params.id
        )
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Invalid application ID",

        });

      }


      const application =
        await Application.findById(
          req.params.id
        );


      if (!application) {

        return res.status(404).json({

          success: false,

          message:
            "Application not found",

        });

      }


      await Application.findByIdAndDelete(
        req.params.id
      );


      return res.status(200).json({

        success: true,

        message:
          "Application deleted successfully",

      });

    } catch (error) {

      console.error(
        "DELETE APPLICATION ERROR:",
        error
      );

      return res.status(500).json({

        success: false,

        message:
          error.message ||
          "Failed to delete application",

      });

    }

  };


// ============================================================
// GET ALL COMPANIES
// GET /api/admin/companies
// ============================================================

export const getAllCompanies = async (
  req,
  res
) => {

  try {

    /*
      Your project may have a separate Company model.
      This controller safely checks whether it exists
      before trying to use it.
    */

    let Company;

    try {

      const companyModule =
        await import(
          "../models/Company.js"
        );

      Company =
        companyModule.default;

    } catch (modelError) {

      console.error(
        "COMPANY MODEL ERROR:",
        modelError.message
      );

      return res.status(500).json({

        success: false,

        message:
          "Company model could not be loaded.",

      });

    }


    const companies =
      await Company.find()
        .sort({
          createdAt: -1,
        })
        .lean();


    return res.status(200).json({

      success: true,

      companies,

    });

  } catch (error) {

    console.error(
      "GET ADMIN COMPANIES ERROR:",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        error.message ||
        "Failed to fetch companies",

    });

  }

};


// ============================================================
// GET COMPANY BY ID
// GET /api/admin/companies/:id
// ============================================================

export const getCompanyById = async (
  req,
  res
) => {

  try {

    if (
      !isValidObjectId(
        req.params.id
      )
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Invalid company ID",

      });

    }


    let Company;

    try {

      const companyModule =
        await import(
          "../models/Company.js"
        );

      Company =
        companyModule.default;

    } catch (modelError) {

      console.error(
        "COMPANY MODEL ERROR:",
        modelError.message
      );

      return res.status(500).json({

        success: false,

        message:
          "Company model could not be loaded.",

      });

    }


    const company =
      await Company.findById(
        req.params.id
      ).lean();


    if (!company) {

      return res.status(404).json({

        success: false,

        message:
          "Company not found",

      });

    }


    return res.status(200).json({

      success: true,

      company,

    });

  } catch (error) {

    console.error(
      "GET ADMIN COMPANY ERROR:",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        error.message ||
        "Failed to fetch company",

    });

  }

};


// ============================================================
// DELETE COMPANY
// DELETE /api/admin/companies/:id
// ============================================================

export const deleteCompany = async (
  req,
  res
) => {

  try {

    if (
      !isValidObjectId(
        req.params.id
      )
    ) {

      return res.status(400).json({

        success: false,

        message:
          "Invalid company ID",

      });

    }


    let Company;

    try {

      const companyModule =
        await import(
          "../models/Company.js"
        );

      Company =
        companyModule.default;

    } catch (modelError) {

      console.error(
        "COMPANY MODEL ERROR:",
        modelError.message
      );

      return res.status(500).json({

        success: false,

        message:
          "Company model could not be loaded.",

      });

    }


    const company =
      await Company.findById(
        req.params.id
      );


    if (!company) {

      return res.status(404).json({

        success: false,

        message:
          "Company not found",

      });

    }


    await Company.findByIdAndDelete(
      req.params.id
    );


    return res.status(200).json({

      success: true,

      message:
        "Company deleted successfully",

    });

  } catch (error) {

    console.error(
      "DELETE COMPANY ERROR:",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        error.message ||
        "Failed to delete company",

    });

  }

};


// ============================================================
// GET ALL NOTIFICATIONS
// GET /api/admin/notifications
// ============================================================

export const getAllNotifications =
  async (
    req,
    res
  ) => {

    try {

      const notifications =
        await Notification.find()
          .populate(
            "user",
            "name email role"
          )
          .sort({
            createdAt: -1,
          })
          .limit(100)
          .lean();


      return res.status(200).json({

        success: true,

        notifications,

      });

    } catch (error) {

      console.error(
        "GET ADMIN NOTIFICATIONS ERROR:",
        error
      );

      return res.status(500).json({

        success: false,

        message:
          error.message ||
          "Failed to fetch notifications",

      });

    }

  };


// ============================================================
// GET NOTIFICATION BY ID
// GET /api/admin/notifications/:id
// ============================================================

export const getNotificationById =
  async (
    req,
    res
  ) => {

    try {

      if (
        !isValidObjectId(
          req.params.id
        )
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Invalid notification ID",

        });

      }


      const notification =
        await Notification.findById(
          req.params.id
        )
          .populate(
            "user",
            "name email role"
          )
          .lean();


      if (!notification) {

        return res.status(404).json({

          success: false,

          message:
            "Notification not found",

        });

      }


      return res.status(200).json({

        success: true,

        notification,

      });

    } catch (error) {

      console.error(
        "GET ADMIN NOTIFICATION ERROR:",
        error
      );

      return res.status(500).json({

        success: false,

        message:
          error.message ||
          "Failed to fetch notification",

      });

    }

  };


// ============================================================
// MARK NOTIFICATION AS READ
// PUT /api/admin/notifications/:id/read
// ============================================================

export const markNotificationAsRead =
  async (
    req,
    res
  ) => {

    try {

      if (
        !isValidObjectId(
          req.params.id
        )
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Invalid notification ID",

        });

      }


      const notification =
        await Notification.findById(
          req.params.id
        );


      if (!notification) {

        return res.status(404).json({

          success: false,

          message:
            "Notification not found",

        });

      }


      notification.read =
        true;


      await notification.save();


      return res.status(200).json({

        success: true,

        message:
          "Notification marked as read",

        notification,

      });

    } catch (error) {

      console.error(
        "MARK NOTIFICATION READ ERROR:",
        error
      );


      if (
        error.name ===
        "ValidationError"
      ) {

        return res.status(400).json({

          success: false,

          message:
            Object.values(
              error.errors || {}
            )
              .map(
                (item) =>
                  item.message
              )
              .join(", ") ||
            "Notification validation failed",

        });

      }


      return res.status(500).json({

        success: false,

        message:
          error.message ||
          "Failed to update notification",

      });

    }

  };


// ============================================================
// DELETE NOTIFICATION
// DELETE /api/admin/notifications/:id
// ============================================================

export const deleteNotification =
  async (
    req,
    res
  ) => {

    try {

      if (
        !isValidObjectId(
          req.params.id
        )
      ) {

        return res.status(400).json({

          success: false,

          message:
            "Invalid notification ID",

        });

      }


      const notification =
        await Notification.findById(
          req.params.id
        );


      if (!notification) {

        return res.status(404).json({

          success: false,

          message:
            "Notification not found",

        });

      }


      await Notification.findByIdAndDelete(
        req.params.id
      );


      return res.status(200).json({

        success: true,

        message:
          "Notification deleted successfully",

      });

    } catch (error) {

      console.error(
        "DELETE NOTIFICATION ERROR:",
        error
      );

      return res.status(500).json({

        success: false,

        message:
          error.message ||
          "Failed to delete notification",

      });

    }

  };