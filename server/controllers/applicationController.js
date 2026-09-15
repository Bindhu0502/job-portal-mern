import asyncHandler from "../utils/asyncHandler.js";

import Application from "../models/Application.js";
import Job from "../models/Job.js";
import Notification from "../models/Notification.js";

import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";


// ============================================================
// PATH SETUP
// ============================================================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// ============================================================
// RESUME UPLOAD DIRECTORY
// ============================================================

const resumesPath = path.join(
  __dirname,
  "..",
  "uploads",
  "resumes"
);


// ============================================================
// ENSURE RESUME DIRECTORY EXISTS
// ============================================================

const ensureResumeFolder = async () => {

  await fs.mkdir(
    resumesPath,
    {
      recursive: true,
    }
  );

};


// ============================================================
// CREATE APPLICATION
// POST /api/applications
// ============================================================

export const createApplication = asyncHandler(
  async (req, res) => {

    try {

      console.log("");
      console.log("======================================");
      console.log("APPLICATION DEBUG");
      console.log("======================================");

      console.log(
        "FILE RECEIVED:",
        req.file?.originalname || "NO FILE"
      );

      console.log(
        "FILE MIME TYPE:",
        req.file?.mimetype || "N/A"
      );

      console.log(
        "FILE SIZE:",
        req.file?.size || "N/A"
      );

      console.log(
        "BODY:",
        req.body
      );

      console.log(
        "USER ID:",
        req.user?._id
      );

      console.log("======================================");
      console.log("");


      // ======================================================
      // CHECK USER
      // ======================================================

      if (!req.user) {

        return res.status(401).json({

          success: false,

          message:
            "User authentication required",

        });

      }


      // ======================================================
      // GET FORM DATA
      // ======================================================

      const {
        job,
        fullName,
        email,
        phone,
        experience,
        skills,
        coverLetter,
      } = req.body;


      // ======================================================
      // CHECK JOB ID
      // ======================================================

      if (!job) {

        return res.status(400).json({

          success: false,

          message:
            "Job ID is required",

        });

      }


      // ======================================================
      // CHECK JOB
      // ======================================================

      const jobExists =
        await Job.findById(job);


      if (!jobExists) {

        return res.status(404).json({

          success: false,

          message:
            "Job not found",

        });

      }


      // ======================================================
      // CHECK DUPLICATE APPLICATION
      // ======================================================

      const existingApplication =
        await Application.findOne({

          user: req.user._id,

          job,

        });


      if (existingApplication) {

        return res.status(400).json({

          success: false,

          message:
            "You have already applied for this job",

        });

      }


      // ======================================================
      // CHECK RESUME
      // ======================================================

      if (!req.file) {

        return res.status(400).json({

          success: false,

          message:
            "Please upload your resume while applying",

        });

      }


      // ======================================================
      // ENSURE RESUME FOLDER
      // ======================================================

      await ensureResumeFolder();


      // ======================================================
      // GET FILE EXTENSION
      // ======================================================

      let extension =
        path.extname(
          req.file.originalname
        ).toLowerCase();


      // Safety fallback

      if (!extension) {

        extension = ".pdf";

      }


      // ======================================================
      // CREATE UNIQUE FILE NAME
      // ======================================================

      const filename =
        `resume_${req.user._id}_${Date.now()}${extension}`;


      const filePath =
        path.join(
          resumesPath,
          filename
        );


      console.log(
        "RESUME FILE PATH:",
        filePath
      );


      // ======================================================
      // SAVE RESUME TO SERVER
      // ======================================================

      await fs.writeFile(
        filePath,
        req.file.buffer
      );


      console.log(
        "RESUME SAVED SUCCESSFULLY ✅"
      );


      // ======================================================
      // CREATE RESUME URL
      // ======================================================

      const resumeUrl =
        `${req.protocol}://${req.get("host")}/uploads/resumes/${filename}`;


      console.log(
        "RESUME URL:",
        resumeUrl
      );


      // ======================================================
      // CREATE APPLICATION
      // ======================================================

      const application =
        await Application.create({

          user:
            req.user._id,

          job,

          fullName:
            fullName ||
            req.user.name ||
            "",

          email:
            email ||
            req.user.email ||
            "",

          phone:
            phone ||
            "",

          experience:
            experience ||
            "Fresher",

          skills:
            skills ||
            "",

          coverLetter:
            coverLetter ||
            "",

          resume:
            resumeUrl,

        });


      // ======================================================
      // CREATE NOTIFICATION
      // ======================================================

      try {

        await Notification.create({

          user:
            req.user._id,

          title:
            "Application Submitted",

          message:
            `Your application for ${jobExists.title} has been submitted successfully.`,

          type:
            "application",

        });

      } catch (notificationError) {

        console.log(
          "Notification creation failed:",
          notificationError.message
        );

      }


      // ======================================================
      // SUCCESS LOG
      // ======================================================

      console.log("");
      console.log("======================================");
      console.log(
        "APPLICATION CREATED SUCCESSFULLY ✅"
      );
      console.log("======================================");

      console.log(
        "Application ID:",
        application._id
      );

      console.log(
        "Resume:",
        resumeUrl
      );

      console.log("======================================");
      console.log("");


      // ======================================================
      // RESPONSE
      // ======================================================

      return res.status(201).json({

        success: true,

        message:
          "Application submitted successfully",

        application,

      });

    } catch (error) {

      console.log("");
      console.log("======================================");
      console.log(
        "CREATE APPLICATION ERROR ❌"
      );
      console.log("======================================");

      console.error(error);

      console.log("======================================");
      console.log("");


      return res.status(500).json({

        success: false,

        message:
          error.message ||
          "Failed to submit application",

      });

    }

  }
);


// ============================================================
// GET MY APPLICATIONS
// GET /api/applications/my
// ============================================================

export const getMyApplications = asyncHandler(
  async (req, res) => {

    const applications =
      await Application.find({

        user:
          req.user._id,

      })
      .populate({

        path: "job",

        select:
          "title company companyLogo location jobType salary experience workMode category skills",

      })
      .sort({

        createdAt: -1,

      });


    return res.status(200).json({

      success: true,

      applications,

    });

  }
);


// ============================================================
// GET SINGLE APPLICATION
// GET /api/applications/:id
// ============================================================

export const getApplicationById = asyncHandler(
  async (req, res) => {

    const application =
      await Application.findById(
        req.params.id
      )
      .populate("job")
      .populate(
        "user",
        "name email"
      );


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

  }
);


// ============================================================
// UPDATE APPLICATION STATUS
// PUT /api/applications/:id/status
// ============================================================

export const updateApplicationStatus =
  asyncHandler(
    async (req, res) => {

      const {
        status,
      } = req.body;


      const application =
        await Application.findById(
          req.params.id
        )
        .populate("job");


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


      // ======================================================
      // NOTIFICATION
      // ======================================================

      try {

        await Notification.create({

          user:
            application.user,

          title:
            "Application Status Updated",

          message:
            `Your application for ${application.job.title} is ${status}.`,

          type:
            "application",

        });

      } catch (notificationError) {

        console.log(
          "Notification creation failed:",
          notificationError.message
        );

      }


      return res.status(200).json({

        success: true,

        message:
          "Application status updated",

        application,

      });

    }
  );