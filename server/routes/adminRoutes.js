const express = require("express");
const router = express.Router();

const { getDashboard } = require("../controllers/adminController");

const {
  protect,
  admin,
} = require("../middleware/authMiddleware");

// ===============================
// Admin Dashboard
// ===============================

router.get(
  "/dashboard",
  protect,
  admin,
  getDashboard
);

module.exports = router;