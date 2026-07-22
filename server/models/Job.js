const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
    },

    salary: {
      type: String,
      required: true,
    },

    experience: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    skills: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      default: "IT",
    },

    companyLogo: {
      type: String,
      default: "",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Job", jobSchema);
