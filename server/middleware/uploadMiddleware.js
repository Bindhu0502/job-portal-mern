import multer from "multer";

// ============================================================
// MEMORY STORAGE
// ============================================================
//
// Files stay in memory as req.file.buffer.
// Controllers will decide where to save them.
//

const storage = multer.memoryStorage();


// ============================================================
// PROFILE IMAGE FILTER
// ============================================================

const imageFileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type. Only JPG, PNG and WEBP images are allowed."
      ),
      false
    );
  }
};


// ============================================================
// RESUME FILE FILTER
// ============================================================

const resumeFileFilter = (req, file, cb) => {
  const allowedTypes = [
    // PDF
    "application/pdf",

    // Microsoft Word
    "application/msword",

    // Microsoft Word DOCX
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

    // Some browsers/systems may send these
    "application/octet-stream",
  ];

  const allowedExtensions = [
    ".pdf",
    ".doc",
    ".docx",
  ];

  const fileExtension = file.originalname
    ? file.originalname
        .substring(file.originalname.lastIndexOf("."))
        .toLowerCase()
    : "";

  // Check MIME OR extension
  if (
    allowedTypes.includes(file.mimetype) ||
    allowedExtensions.includes(fileExtension)
  ) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid resume file type. Only PDF, DOC and DOCX files are allowed."
      ),
      false
    );
  }
};


// ============================================================
// PROFILE IMAGE UPLOAD
// ============================================================
//
// Used by:
// PUT /api/users/profile
//
// Field:
// profileImage
//

const imageUpload = multer({
  storage,

  fileFilter: imageFileFilter,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});


// ============================================================
// RESUME UPLOAD
// ============================================================
//
// Used by:
// POST /api/applications
// PUT /api/users/resume
//
// Field:
// resume
//

const resumeUpload = multer({
  storage,

  fileFilter: resumeFileFilter,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});


// ============================================================
// EXPORT
// ============================================================

export {
  imageUpload,
  resumeUpload,
};


// Default export
// Keep this so existing imports don't break.
//
// Existing userRoutes.js uses:
// import upload from "../middleware/uploadMiddleware.js";
//
// Therefore default = imageUpload.
//

export default imageUpload;