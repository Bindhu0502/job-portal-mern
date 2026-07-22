const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "job-portal/profile-pictures",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const resumeStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "job-portal/resumes",
    resource_type: "raw",
    allowed_formats: ["pdf", "doc", "docx"],
  },
});

const uploadProfilePicture = multer({
  storage: imageStorage,
});

const uploadResume = multer({
  storage: resumeStorage,
});

module.exports = {
  uploadProfilePicture,
  uploadResume,
};