import User from "../models/User.js";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// ============================================================
// PATH SETUP
// ============================================================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// server/uploads
const uploadsPath = path.join(
  __dirname,
  "..",
  "uploads"
);

// ============================================================
// ENSURE UPLOAD FOLDERS
// ============================================================

const ensureUploadFolders = async () => {
  const profileImagesPath = path.join(
    uploadsPath,
    "profile-images"
  );

  const resumesPath = path.join(
    uploadsPath,
    "resumes"
  );

  // Create folders only if they don't exist.
  // recursive:true prevents EEXIST errors.
  await fs.mkdir(profileImagesPath, {
    recursive: true,
  });

  await fs.mkdir(resumesPath, {
    recursive: true,
  });

  return {
    profileImagesPath,
    resumesPath,
  };
};

// ============================================================
// GET PROFILE
// GET /api/users/profile
// ============================================================

export const getProfile = async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User authentication failed",
      });
    }

    const user = await User.findById(userId)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {
    console.error(
      "GET PROFILE ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to fetch profile",
    });
  }
};

// ============================================================
// UPDATE PROFILE
// PUT /api/users/profile
// ============================================================

export const updateProfile = async (req, res) => {
  try {
    console.log("");
    console.log("======================================");
    console.log("UPDATE PROFILE");
    console.log("======================================");

    // ========================================================
    // USER ID
    // ========================================================

    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User authentication failed",
      });
    }

    // ========================================================
    // FIND USER
    // ========================================================

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    console.log(
      "USER ID:",
      userId.toString()
    );

    console.log(
      "REQUEST BODY:",
      req.body
    );

    console.log(
      "REQUEST FILE:",
      req.file
        ? req.file.originalname
        : "No profile image"
    );

    // ========================================================
    // BASIC INFORMATION
    // ========================================================

    if (req.body.name !== undefined) {
      user.name = String(
        req.body.name
      ).trim();
    }

    if (req.body.phone !== undefined) {
      user.phone = String(
        req.body.phone
      ).trim();
    }

    if (req.body.location !== undefined) {
      user.location = String(
        req.body.location
      ).trim();
    }

    // ========================================================
    // PROFESSIONAL INFORMATION
    // ========================================================

    if (req.body.experience !== undefined) {
      user.experience = String(
        req.body.experience
      ).trim();
    }

    if (req.body.education !== undefined) {
      user.education = String(
        req.body.education
      ).trim();
    }

    if (req.body.jobPreference !== undefined) {
      user.jobPreference = String(
        req.body.jobPreference
      ).trim();
    }

    if (req.body.expectedSalary !== undefined) {
      user.expectedSalary = String(
        req.body.expectedSalary
      ).trim();
    }

    // ========================================================
    // SOCIAL LINKS
    // ========================================================

    if (req.body.linkedin !== undefined) {
      user.linkedin = String(
        req.body.linkedin
      ).trim();
    }

    if (req.body.github !== undefined) {
      user.github = String(
        req.body.github
      ).trim();
    }

    if (req.body.portfolio !== undefined) {
      user.portfolio = String(
        req.body.portfolio
      ).trim();
    }

    // ========================================================
    // SKILLS
    // ========================================================

    if (req.body.skills !== undefined) {
      if (Array.isArray(req.body.skills)) {
        user.skills = req.body.skills
          .map((skill) =>
            String(skill).trim()
          )
          .filter(Boolean);
      } else {
        user.skills = String(
          req.body.skills
        )
          .split(",")
          .map((skill) =>
            skill.trim()
          )
          .filter(Boolean);
      }
    }

    // ========================================================
    // PROFILE IMAGE
    // ========================================================

    if (req.file) {
      console.log("");
      console.log(
        "PROFILE IMAGE UPLOAD STARTED"
      );

      console.log(
        "Original file:",
        req.file.originalname
      );

      console.log(
        "MIME type:",
        req.file.mimetype
      );

      console.log(
        "File size:",
        req.file.size
      );

      // ------------------------------------------------------
      // CHECK BUFFER
      // ------------------------------------------------------

      if (!req.file.buffer) {
        console.error(
          "PROFILE IMAGE BUFFER IS MISSING"
        );

        return res.status(400).json({
          success: false,
          message:
            "Uploaded image could not be processed.",
        });
      }

      // ------------------------------------------------------
      // ENSURE FOLDERS
      // ------------------------------------------------------

      const {
        profileImagesPath,
      } = await ensureUploadFolders();

      console.log(
        "PROFILE IMAGE FOLDER:",
        profileImagesPath
      );

      // ------------------------------------------------------
      // GET EXTENSION
      // ------------------------------------------------------

      let extension = path
        .extname(
          req.file.originalname
        )
        .toLowerCase();

      if (!extension) {
        extension = ".jpg";
      }

      // ------------------------------------------------------
      // CREATE UNIQUE FILE NAME
      // ------------------------------------------------------

      const filename =
        `profile_${userId}_${Date.now()}${extension}`;

      const filePath = path.join(
        profileImagesPath,
        filename
      );

      console.log(
        "PROFILE IMAGE FILE PATH:",
        filePath
      );

      // ------------------------------------------------------
      // SAVE IMAGE
      // ------------------------------------------------------

      await fs.writeFile(
        filePath,
        req.file.buffer
      );

      console.log(
        "PROFILE IMAGE SAVED SUCCESSFULLY ✅"
      );

      // ------------------------------------------------------
      // DELETE OLD IMAGE
      // ------------------------------------------------------

      if (
        user.profileImage &&
        user.profileImage.startsWith(
          "/uploads/profile-images/"
        )
      ) {
        const oldFilename =
          path.basename(
            user.profileImage
          );

        const oldFilePath =
          path.join(
            profileImagesPath,
            oldFilename
          );

        try {
          await fs.unlink(
            oldFilePath
          );

          console.log(
            "OLD PROFILE IMAGE DELETED ✅"
          );

        } catch {
          console.log(
            "OLD PROFILE IMAGE NOT FOUND - CONTINUING"
          );
        }
      }

      // ------------------------------------------------------
      // SAVE IMAGE PATH IN DATABASE
      // ------------------------------------------------------

      user.profileImage =
        `/uploads/profile-images/${filename}`;

      console.log(
        "PROFILE IMAGE URL:",
        user.profileImage
      );
    }

    // ========================================================
    // SAVE USER
    // ========================================================

    await user.save();

    console.log(
      "USER SAVED SUCCESSFULLY ✅"
    );

    // ========================================================
    // GET UPDATED USER
    // ========================================================

    const updatedUser =
      await User.findById(userId)
        .select("-password");

    console.log(
      "UPDATED NAME:",
      updatedUser.name
    );

    console.log(
      "UPDATED LOCATION:",
      updatedUser.location
    );

    console.log(
      "UPDATED PROFILE IMAGE:",
      updatedUser.profileImage
    );

    console.log(
      "======================================"
    );

    // ========================================================
    // RESPONSE
    // ========================================================

    return res.status(200).json({
      success: true,
      message:
        "Profile updated successfully",
      user: updatedUser,
    });

  } catch (error) {
    console.error("");
    console.error(
      "======================================"
    );
    console.error(
      "UPDATE PROFILE ERROR ❌"
    );
    console.error(
      "======================================"
    );

    console.error(
      "Error name:",
      error.name
    );

    console.error(
      "Error message:",
      error.message
    );

    console.error(
      "Error stack:",
      error.stack
    );

    console.error(
      "======================================"
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Profile update failed",
    });
  }
};

// ============================================================
// UPLOAD RESUME
// PUT /api/users/resume
// ============================================================

export const uploadResume = async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message:
          "User authentication failed",
      });
    }

    const user =
      await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message:
          "User not found",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message:
          "Please select a resume",
      });
    }

    if (!req.file.buffer) {
      return res.status(400).json({
        success: false,
        message:
          "Resume could not be processed",
      });
    }

    const {
      resumesPath,
    } = await ensureUploadFolders();

    let extension = path
      .extname(
        req.file.originalname
      )
      .toLowerCase();

    if (!extension) {
      extension = ".pdf";
    }

    const filename =
      `resume_${userId}_${Date.now()}${extension}`;

    const filePath = path.join(
      resumesPath,
      filename
    );

    await fs.writeFile(
      filePath,
      req.file.buffer
    );

    console.log(
      "RESUME SAVED SUCCESSFULLY:",
      filePath
    );

    // ========================================================
    // DELETE OLD RESUME
    // ========================================================

    if (
      user.resume?.url &&
      user.resume.url.startsWith(
        "/uploads/resumes/"
      )
    ) {
      const oldFilename =
        path.basename(
          user.resume.url
        );

      const oldFilePath =
        path.join(
          resumesPath,
          oldFilename
        );

      try {
        await fs.unlink(
          oldFilePath
        );
      } catch {
        console.log(
          "OLD RESUME FILE NOT FOUND"
        );
      }
    }

    // ========================================================
    // SAVE RESUME
    // ========================================================

    user.resume = {
      url:
        `/uploads/resumes/${filename}`,
      publicId: "",
      uploadedAt:
        new Date(),
    };

    await user.save();

    const updatedUser =
      await User.findById(userId)
        .select("-password");

    return res.status(200).json({
      success: true,
      message:
        "Resume uploaded successfully",
      resume:
        updatedUser.resume,
      user: updatedUser,
    });

  } catch (error) {
    console.error(
      "UPLOAD RESUME ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Resume upload failed",
    });
  }
};

// ============================================================
// DELETE RESUME
// DELETE /api/users/resume
// ============================================================

export const deleteResume = async (
  req,
  res
) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message:
          "User authentication failed",
      });
    }

    const user =
      await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message:
          "User not found",
      });
    }

    // ========================================================
    // DELETE RESUME FILE
    // ========================================================

    if (
      user.resume?.url &&
      user.resume.url.startsWith(
        "/uploads/resumes/"
      )
    ) {
      const {
        resumesPath,
      } = await ensureUploadFolders();

      const filename =
        path.basename(
          user.resume.url
        );

      const filePath =
        path.join(
          resumesPath,
          filename
        );

      try {
        await fs.unlink(
          filePath
        );
      } catch {
        console.log(
          "RESUME FILE NOT FOUND - CONTINUING"
        );
      }
    }

    // ========================================================
    // CLEAR RESUME
    // ========================================================

    user.resume = {
      url: "",
      publicId: "",
      uploadedAt: null,
    };

    await user.save();

    return res.status(200).json({
      success: true,
      message:
        "Resume deleted successfully",
    });

  } catch (error) {
    console.error(
      "DELETE RESUME ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Resume deletion failed",
    });
  }
};

// ============================================================
// PROFILE COMPLETION
// GET /api/users/profile-completion
// ============================================================

export const getProfileCompletion = async (
  req,
  res
) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message:
          "User authentication failed",
      });
    }

    const user =
      await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message:
          "User not found",
      });
    }

    const fields = [
      user.name,
      user.email,
      user.phone,
      user.location,
      user.skills?.length > 0,
      user.experience,
      user.education,
      user.jobPreference,
      user.expectedSalary,
      user.profileImage,
      user.resume?.url,
      user.linkedin,
      user.github,
      user.portfolio,
    ];

    const completed =
      fields.filter(Boolean).length;

    const percentage =
      Math.round(
        (completed / fields.length) * 100
      );

    return res.status(200).json({
      success: true,
      percentage,
    });

  } catch (error) {
    console.error(
      "PROFILE COMPLETION ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Failed to calculate profile completion",
    });
  }
};