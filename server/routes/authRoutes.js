import express from "express";


// ============================================================
// CONTROLLERS
// ============================================================

import {

  register,

  login,

  adminLogin,

  getMe,

  recruiterRegister,

  githubCallback,

} from "../controllers/authController.js";


// ============================================================
// MIDDLEWARE
// ============================================================

import {
  protect,
} from "../middleware/authMiddleware.js";


// ============================================================
// PASSPORT
// ============================================================

import passport from "../config/passport.js";


// ============================================================
// ROUTER
// ============================================================

const router =
  express.Router();


// ============================================================
// CANDIDATE REGISTER
// POST /api/auth/register
// ============================================================

router.post(
  "/register",
  register
);


// ============================================================
// RECRUITER REGISTER
// POST /api/auth/recruiter-register
// ============================================================

router.post(
  "/recruiter-register",
  recruiterRegister
);


// ============================================================
// USER / RECRUITER LOGIN
// POST /api/auth/login
//
// IMPORTANT:
// EXISTING LOGIN REMAINS UNCHANGED.
// ============================================================

router.post(
  "/login",
  login
);


// ============================================================
// ADMIN LOGIN
// POST /api/auth/admin-login
//
// IMPORTANT:
// ADMIN USES A SEPARATE ENDPOINT.
// ============================================================

router.post(
  "/admin-login",
  adminLogin
);


// ============================================================
// CURRENT USER
// GET /api/auth/me
// ============================================================

router.get(
  "/me",
  protect,
  getMe
);


// ============================================================
// GITHUB LOGIN
// GET /api/auth/github
// ============================================================

router.get(

  "/github",

  passport.authenticate(

    "github",

    {
      scope: [
        "profile",
        "email",
      ],
    }

  )

);


// ============================================================
// GITHUB CALLBACK
// GET /api/auth/github/callback
// ============================================================

router.get(

  "/github/callback",

  passport.authenticate(

    "github",

    {

      failureRedirect:
        "http://localhost:5173/login",

    }

  ),

  githubCallback

);


// ============================================================
// EXPORT
// ============================================================

export default router;