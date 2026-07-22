const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();

const app = express();

// ================= Middleware =================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Serve uploaded resumes
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ================= Database =================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.error(err);
  });

// ================= Routes =================

const userRoutes = require("./routes/userRoutes");
const jobRoutes = require("./routes/jobRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const savedJobRoutes = require("./routes/savedJobRoutes");
const adminRoutes = require("./routes/adminRoutes"); // NEW

app.use("/api/users", userRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/saved-jobs", savedJobRoutes);
app.use("/api/admin", adminRoutes); // NEW

// ================= Home =================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Job Portal API Running...",
  });
});

// ================= 404 =================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// ================= Error Handler =================

app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ================= Server =================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server Running on Port ${PORT}`);
});