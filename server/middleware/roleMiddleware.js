import asyncHandler from "../utils/asyncHandler.js";

// ==========================================
// Role Authorization Middleware
// Usage:
// authorizeRoles("admin")
// authorizeRoles("candidate", "recruiter")
// ==========================================

const authorizeRoles = (...roles) => {
  return asyncHandler(async (req, res, next) => {
    // Check authentication
    if (!req.user) {
      res.status(401);
      throw new Error("Not authorized");
    }

    // Check role
    if (!roles.includes(req.user.role)) {
      res.status(403);
      throw new Error(
        `Access denied. ${req.user.role} is not allowed to access this resource.`
      );
    }

    next();
  });
};

export default authorizeRoles;