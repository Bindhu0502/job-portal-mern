import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { createServer } from "http";
import { Server } from "socket.io";

// ============================================================
// ROUTES
// ============================================================

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import savedJobRoutes from "./routes/savedJobRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import recruiterRoutes from "./routes/recruiterRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

// ============================================================
// ENVIRONMENT
// ============================================================

dotenv.config();

// ============================================================
// EXPRESS APP
// ============================================================

const app = express();

// ============================================================
// HTTP SERVER
// ============================================================

const httpServer = createServer(app);

// ============================================================
// PATH SETUP
// ============================================================

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ============================================================
// PORT
// ============================================================

const PORT = process.env.PORT || 5000;

// ============================================================
// CORS HELPER
// ============================================================

const isAllowedOrigin = (origin) => {
  // Allow requests without an Origin header
  // such as Postman/server-side requests.
  if (!origin) {
    return true;
  }

  try {
    const url = new URL(origin);

    const isLocalhost =
      url.hostname === "localhost" ||
      url.hostname === "127.0.0.1";

    const isHttp =
      url.protocol === "http:";

    return isHttp && isLocalhost;
  } catch (error) {
    return false;
  }
};

// ============================================================
// EXPRESS CORS
// ============================================================

app.use(
  cors({
    origin: function (origin, callback) {
      if (isAllowedOrigin(origin)) {
        return callback(null, true);
      }

      console.log(
        "❌ CORS BLOCKED ORIGIN:",
        origin
      );

      return callback(
        new Error(
          `CORS not allowed for origin: ${origin}`
        )
      );
    },

    credentials: true,

    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
    ],

    exposedHeaders: [
      "Content-Length",
    ],

    optionsSuccessStatus: 204,
  })
);

// ============================================================
// BODY PARSERS
// ============================================================

app.use(
  express.json({
    limit: "10mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb",
  })
);

// ============================================================
// STATIC UPLOADS
// ============================================================

app.use(
  "/uploads",
  express.static(
    path.join(
      __dirname,
      "uploads"
    )
  )
);

// ============================================================
// SOCKET.IO
// ============================================================

const io = new Server(
  httpServer,
  {
    cors: {
      origin: function (origin, callback) {
        if (isAllowedOrigin(origin)) {
          return callback(null, true);
        }

        console.log(
          "❌ SOCKET CORS BLOCKED:",
          origin
        );

        return callback(
          new Error(
            `Socket CORS not allowed for origin: ${origin}`
          )
        );
      },

      methods: [
        "GET",
        "POST",
      ],

      credentials: true,
    },

    transports: [
      "websocket",
      "polling",
    ],
  }
);

// ============================================================
// SOCKET CONNECTION
// ============================================================

io.on(
  "connection",
  (socket) => {

    console.log(
      "🔌 Socket connected:",
      socket.id
    );

    // ========================================================
    // CANDIDATE / USER JOIN
    // ========================================================

    socket.on(
      "join",
      (userId) => {

        if (!userId) {
          return;
        }

        const room =
          `user_${userId}`;

        socket.join(room);

        console.log(
          `👤 User ${userId} joined room ${room}`
        );
      }
    );

    // ========================================================
    // RECRUITER JOIN
    // ========================================================

    socket.on(
      "joinRecruiter",
      (recruiterId) => {

        if (!recruiterId) {
          return;
        }

        const room =
          `recruiter_${recruiterId}`;

        socket.join(room);

        console.log(
          `👔 Recruiter ${recruiterId} joined room ${room}`
        );
      }
    );

    // ========================================================
    // ADMIN JOIN
    // ========================================================

    socket.on(
      "joinAdmin",
      (adminId) => {

        if (!adminId) {
          return;
        }

        const room =
          `admin_${adminId}`;

        socket.join(room);

        console.log(
          `🛡️ Admin ${adminId} joined room ${room}`
        );
      }
    );

    // ========================================================
    // DISCONNECT
    // ========================================================

    socket.on(
      "disconnect",
      (reason) => {

        console.log(
          "🔌 Socket disconnected:",
          socket.id,
          reason
        );
      }
    );
  }
);

// ============================================================
// MAKE SOCKET.IO AVAILABLE TO OTHER FILES
// ============================================================

app.set(
  "io",
  io
);

// ============================================================
// HEALTH CHECK
// ============================================================

app.get(
  "/",
  (req, res) => {

    res.status(200).json({
      success: true,

      message:
        "CareerHub API is running successfully 🚀",

      port: PORT,
    });
  }
);

// ============================================================
// API ROUTES
// ============================================================

// ------------------------------------------------------------
// AUTH
// ------------------------------------------------------------

app.use(
  "/api/auth",
  authRoutes
);

// ------------------------------------------------------------
// USERS
// ------------------------------------------------------------

app.use(
  "/api/users",
  userRoutes
);

// ------------------------------------------------------------
// JOBS
// ------------------------------------------------------------

app.use(
  "/api/jobs",
  jobRoutes
);

// ------------------------------------------------------------
// APPLICATIONS
// ------------------------------------------------------------

app.use(
  "/api/applications",
  applicationRoutes
);

// ------------------------------------------------------------
// SAVED JOBS
// ------------------------------------------------------------

app.use(
  "/api/saved-jobs",
  savedJobRoutes
);

// ------------------------------------------------------------
// DASHBOARD
// ------------------------------------------------------------

app.use(
  "/api/dashboard",
  dashboardRoutes
);

// ------------------------------------------------------------
// RECRUITER
// ------------------------------------------------------------
//
// This is IMPORTANT.
//
// recruiterRoutes contains:
//
// GET  /dashboard
// GET  /profile
// PUT  /profile
// GET  /jobs
// POST /jobs
// PUT  /jobs/:id
// DELETE /jobs/:id
// GET  /applications
// PUT  /applications/:id/status
//
// Therefore:
//
// /api/recruiter + /profile
//
// becomes:
//
// /api/recruiter/profile
// ------------------------------------------------------------

app.use(
  "/api/recruiter",
  recruiterRoutes
);

// ------------------------------------------------------------
// COMPANIES
// ------------------------------------------------------------

app.use(
  "/api/companies",
  companyRoutes
);

// ------------------------------------------------------------
// NOTIFICATIONS
// ------------------------------------------------------------

app.use(
  "/api/notifications",
  notificationRoutes
);

// ------------------------------------------------------------
// ADMIN
// ------------------------------------------------------------

app.use(
  "/api/admin",
  adminRoutes
);

// ============================================================
// SOCKET TEST
// ============================================================

app.get(
  "/api/socket-test",
  (req, res) => {

    res.status(200).json({
      success: true,

      message:
        "Socket.IO server is configured successfully 🚀",
    });
  }
);

// ============================================================
// ADMIN API TEST
// ============================================================

app.get(
  "/api/admin",
  (req, res) => {

    res.status(200).json({
      success: true,

      message:
        "CareerHub Admin API is running 🚀",

      endpoints: {
        users:
          "/api/admin/users",

        dashboard:
          "/api/admin/dashboard",
      },
    });
  }
);

// ============================================================
// 404 HANDLER
// ============================================================

app.use(
  (req, res) => {

    res.status(404).json({
      success: false,

      message:
        `Route not found: ${req.method} ${req.originalUrl}`,
    });
  }
);

// ============================================================
// GLOBAL ERROR HANDLER
// ============================================================

app.use(
  (error, req, res, next) => {

    console.error(
      "GLOBAL SERVER ERROR:",
      error
    );

    // --------------------------------------------------------
    // CORS ERROR
    // --------------------------------------------------------

    if (
      error.message &&
      error.message.startsWith(
        "CORS not allowed"
      )
    ) {

      return res.status(403).json({
        success: false,

        message:
          "CORS blocked this frontend origin.",
      });
    }

    // --------------------------------------------------------
    // SOCKET CORS ERROR
    // --------------------------------------------------------

    if (
      error.message &&
      error.message.startsWith(
        "Socket CORS not allowed"
      )
    ) {

      return res.status(403).json({
        success: false,

        message:
          "Socket CORS blocked this frontend origin.",
      });
    }

    // --------------------------------------------------------
    // MULTER ERROR
    // --------------------------------------------------------

    if (
      error.name === "MulterError"
    ) {

      return res.status(400).json({
        success: false,

        message:
          error.message ||
          "File upload error",
      });
    }

    // --------------------------------------------------------
    // MONGOOSE VALIDATION ERROR
    // --------------------------------------------------------

    if (
      error.name === "ValidationError"
    ) {

      return res.status(400).json({
        success: false,

        message:
          error.message ||
          "Validation error",
      });
    }

    // --------------------------------------------------------
    // GENERAL ERROR
    // --------------------------------------------------------

    return res.status(
      error.statusCode || 500
    ).json({
      success: false,

      message:
        error.message ||
        "Internal server error",
    });
  }
);

// ============================================================
// MONGODB + SERVER START
// ============================================================

const startServer = async () => {

  try {

    // ========================================================
    // CHECK MONGO URI
    // ========================================================

    if (!process.env.MONGO_URI) {

      console.error(
        "❌ MONGO_URI is missing in .env"
      );

      process.exit(1);
    }

    // ========================================================
    // CONNECT MONGODB
    // ========================================================

    await mongoose.connect(
      process.env.MONGO_URI
    );

    console.log(
      "MongoDB Connected Successfully ✅"
    );

    // ========================================================
    // START SERVER
    // ========================================================

    httpServer.listen(
      PORT,
      () => {

        console.log("");

        console.log(
          "======================================"
        );

        console.log(
          "CareerHub Backend Started 🚀"
        );

        console.log(
          `Server: http://localhost:${PORT}`
        );

        console.log(
          `API: http://localhost:${PORT}/api`
        );

        console.log(
          `Socket.IO: http://localhost:${PORT}/socket.io/`
        );

        console.log("");

        console.log(
          "CORS:"
        );

        console.log(
          "  ✓ Any http://localhost:<port>"
        );

        console.log(
          "  ✓ Any http://127.0.0.1:<port>"
        );

        console.log("");

        console.log(
          "Frontend Port Examples:"
        );

        console.log(
          "  ✓ Candidate: http://localhost:5173"
        );

        console.log(
          "  ✓ Recruiter: http://localhost:5174"
        );

        console.log(
          "  ✓ Admin:     http://localhost:5175"
        );

        console.log(
          "  ✓ Current:   http://localhost:5176"
        );

        console.log("");

        console.log(
          "Recruiter API:"
        );

        console.log(
          "  ✓ /api/recruiter/dashboard"
        );

        console.log(
          "  ✓ /api/recruiter/profile"
        );

        console.log(
          "  ✓ /api/recruiter/jobs"
        );

        console.log(
          "  ✓ /api/recruiter/applications"
        );

        console.log("");

        console.log(
          "Admin API:"
        );

        console.log(
          "  ✓ /api/admin"
        );

        console.log(
          "  ✓ /api/admin/users"
        );

        console.log(
          "  ✓ /api/admin/dashboard"
        );

        console.log("");

        console.log(
          "======================================"
        );
      }
    );

    // ========================================================
    // SERVER ERROR
    // ========================================================

    httpServer.on(
      "error",
      (error) => {

        if (
          error.code === "EADDRINUSE"
        ) {

          console.error("");

          console.error(
            `❌ Port ${PORT} is already in use.`
          );

          console.error(
            "Another CareerHub backend is already running."
          );

          console.error(
            "Stop the existing Node.js server before starting another one."
          );

          console.error("");

          process.exit(1);
        }

        console.error(
          "SERVER ERROR:",
          error
        );

        process.exit(1);
      }
    );

  } catch (error) {

    console.error("");

    console.error(
      "======================================"
    );

    console.error(
      "❌ SERVER STARTUP FAILED"
    );

    console.error(
      "======================================"
    );

    console.error(
      error.message
    );

    console.error("");

    process.exit(1);
  }
};

// ============================================================
// START SERVER
// ============================================================

startServer();