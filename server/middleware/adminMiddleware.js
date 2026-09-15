// ============================================================
// ADMIN ONLY MIDDLEWARE
// ============================================================

export const adminOnly = (req, res, next) => {
  try {
    // --------------------------------------------------------
    // CHECK AUTHENTICATION
    // --------------------------------------------------------

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    // --------------------------------------------------------
    // CHECK ADMIN ROLE
    // --------------------------------------------------------

    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access required",
      });
    }

    // --------------------------------------------------------
    // ADMIN VERIFIED
    // --------------------------------------------------------

    next();

  } catch (error) {
    console.error(
      "ADMIN MIDDLEWARE ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Admin authorization failed",
    });
  }
};