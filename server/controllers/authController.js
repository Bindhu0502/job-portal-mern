import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


// ============================================================
// CREATE JWT TOKEN
// ============================================================

const generateToken = (user) => {

  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },

    process.env.JWT_SECRET,

    {
      expiresIn:
        process.env.JWT_EXPIRE || "7d",
    }
  );

};


// ============================================================
// REGISTER CANDIDATE
// POST /api/auth/register
// ============================================================

export const register = async (req, res) => {

  try {

    const {
      name,
      email,
      password,
    } = req.body;


    // --------------------------------------------------------
    // VALIDATION
    // --------------------------------------------------------

    if (!name || !email || !password) {

      return res.status(400).json({

        success: false,

        message: "All fields are required",

      });

    }


    if (password.length < 6) {

      return res.status(400).json({

        success: false,

        message:
          "Password must contain minimum 6 characters",

      });

    }


    // --------------------------------------------------------
    // NORMALIZE EMAIL
    // --------------------------------------------------------

    const normalizedEmail =
      email.toLowerCase().trim();


    // --------------------------------------------------------
    // CHECK EXISTING USER
    // --------------------------------------------------------

    const existingUser =
      await User.findOne({
        email: normalizedEmail,
      });


    if (existingUser) {

      return res.status(400).json({

        success: false,

        message: "User already exists",

      });

    }


    // --------------------------------------------------------
    // CREATE CANDIDATE
    // --------------------------------------------------------

    const user = await User.create({

      name: name.trim(),

      email: normalizedEmail,

      password,

      role: "candidate",

      accountStatus: "approved",

    });


    // --------------------------------------------------------
    // CREATE TOKEN
    // --------------------------------------------------------

    const token =
      generateToken(user);


    // --------------------------------------------------------
    // RESPONSE
    // --------------------------------------------------------

    return res.status(201).json({

      success: true,

      token,

      user: {

        _id: user._id,

        name: user.name,

        email: user.email,

        role: user.role,

      },

    });

  }

  catch (error) {

    console.log(
      "REGISTER ERROR:",
      error
    );


    return res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};


// ============================================================
// NORMAL USER / RECRUITER LOGIN
// POST /api/auth/login
//
// IMPORTANT:
// THIS FUNCTION IS LEFT AS YOUR EXISTING LOGIN.
// DO NOT USE THIS FOR ADMIN LOGIN.
// ============================================================

export const login = async (req, res) => {

  try {

    const {
      email,
      password,
    } = req.body;


    // --------------------------------------------------------
    // VALIDATION
    // --------------------------------------------------------

    if (!email || !password) {

      return res.status(400).json({

        success: false,

        message:
          "Email and password required",

      });

    }


    // --------------------------------------------------------
    // NORMALIZE EMAIL
    // --------------------------------------------------------

    const normalizedEmail =
      email.toLowerCase().trim();


    // --------------------------------------------------------
    // FIND USER
    // --------------------------------------------------------

    const user =
      await User.findOne({

        email: normalizedEmail,

      });


    if (!user) {

      return res.status(401).json({

        success: false,

        message:
          "Invalid email or password",

      });

    }


    // --------------------------------------------------------
    // CHECK PASSWORD
    // --------------------------------------------------------

    const passwordMatch =
      await bcrypt.compare(
        password,
        user.password
      );


    if (!passwordMatch) {

      return res.status(401).json({

        success: false,

        message:
          "Invalid email or password",

      });

    }


    // --------------------------------------------------------
    // RECRUITER APPROVAL
    // --------------------------------------------------------

    if (

      user.role === "recruiter" &&

      user.accountStatus !== "approved"

    ) {

      return res.status(403).json({

        success: false,

        message:
          "Recruiter account waiting for approval",

      });

    }


    // --------------------------------------------------------
    // CREATE TOKEN
    // --------------------------------------------------------

    const token =
      generateToken(user);


    // --------------------------------------------------------
    // RESPONSE
    // --------------------------------------------------------

    return res.status(200).json({

      success: true,

      token,

      user: {

        _id: user._id,

        name: user.name,

        email: user.email,

        role: user.role,

        company:
          user.company || "",

        companyLogo:
          user.companyLogo || "",

        companyWebsite:
          user.companyWebsite || "",

        companyLocation:
          user.companyLocation || "",

        companyDescription:
          user.companyDescription || "",

        profileImage:
          user.profileImage || "",

      },

    });

  }

  catch (error) {

    console.log(
      "LOGIN ERROR:",
      error
    );


    return res.status(500).json({

      success: false,

      message: "Server error",

    });

  }

};


// ============================================================
// ADMIN LOGIN
// POST /api/auth/admin-login
//
// IMPORTANT:
// THIS IS A NEW ADMIN-ONLY LOGIN.
// USER AND RECRUITER LOGIN ARE NOT CHANGED.
// ============================================================

export const adminLogin = async (req, res) => {

  try {

    const {
      email,
      password,
    } = req.body;


    // --------------------------------------------------------
    // VALIDATION
    // --------------------------------------------------------

    if (!email || !password) {

      return res.status(400).json({

        success: false,

        message:
          "Admin email and password are required",

      });

    }


    // --------------------------------------------------------
    // NORMALIZE EMAIL
    // --------------------------------------------------------

    const normalizedEmail =
      email.toLowerCase().trim();


    // --------------------------------------------------------
    // FIND USER
    // --------------------------------------------------------

    const user =
      await User.findOne({

        email: normalizedEmail,

      });


    // --------------------------------------------------------
    // USER NOT FOUND
    // --------------------------------------------------------

    if (!user) {

      return res.status(401).json({

        success: false,

        message:
          "Invalid admin email or password",

      });

    }


    // --------------------------------------------------------
    // ADMIN ROLE CHECK
    //
    // This is the most important protection.
    //
    // Candidate/recruiter accounts cannot use
    // /admin-login.
    // --------------------------------------------------------

    if (user.role !== "admin") {

      return res.status(403).json({

        success: false,

        message:
          "Access denied. Admin account required.",

      });

    }


    // --------------------------------------------------------
    // PASSWORD CHECK
    // --------------------------------------------------------

    const passwordMatch =
      await bcrypt.compare(
        password,
        user.password
      );


    if (!passwordMatch) {

      return res.status(401).json({

        success: false,

        message:
          "Invalid admin email or password",

      });

    }


    // --------------------------------------------------------
    // ADMIN ACCOUNT STATUS
    // --------------------------------------------------------

    if (
      user.accountStatus &&
      user.accountStatus !== "approved"
    ) {

      return res.status(403).json({

        success: false,

        message:
          "Admin account is not approved.",

      });

    }


    // --------------------------------------------------------
    // CREATE ADMIN TOKEN
    // --------------------------------------------------------

    const token =
      generateToken(user);


    // --------------------------------------------------------
    // ADMIN RESPONSE
    // --------------------------------------------------------

    return res.status(200).json({

      success: true,

      message:
        "Admin login successful",

      token,

      user: {

        _id: user._id,

        name: user.name,

        email: user.email,

        role: user.role,

      },

    });

  }

  catch (error) {

    console.log(
      "ADMIN LOGIN ERROR:",
      error
    );


    return res.status(500).json({

      success: false,

      message:
        "Server error during admin login",

    });

  }

};


// ============================================================
// GET CURRENT USER
// GET /api/auth/me
// ============================================================

export const getMe = async (req, res) => {

  try {

    const user =
      await User.findById(
        req.user.id
      ).select("-password");


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

  }

  catch (error) {

    console.log(
      "GET ME ERROR:",
      error
    );


    return res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};


// ============================================================
// RECRUITER REGISTER
// POST /api/auth/recruiter-register
// ============================================================

export const recruiterRegister = async (req, res) => {

  try {

    const {
      name,
      email,
      password,
      company,
    } = req.body;


    // --------------------------------------------------------
    // VALIDATION
    // --------------------------------------------------------

    if (!name || !email || !password) {

      return res.status(400).json({

        success: false,

        message:
          "Required fields missing",

      });

    }


    // --------------------------------------------------------
    // NORMALIZE EMAIL
    // --------------------------------------------------------

    const normalizedEmail =
      email.toLowerCase().trim();


    // --------------------------------------------------------
    // CHECK EXISTING USER
    // --------------------------------------------------------

    const existingUser =
      await User.findOne({

        email: normalizedEmail,

      });


    if (existingUser) {

      return res.status(400).json({

        success: false,

        message:
          "User already exists",

      });

    }


    // --------------------------------------------------------
    // CREATE RECRUITER
    // --------------------------------------------------------

    const recruiter =
      await User.create({

        name: name.trim(),

        email: normalizedEmail,

        password,

        role: "recruiter",

        accountStatus: "approved",

        company:
          company || "",

      });


    // --------------------------------------------------------
    // RESPONSE
    // --------------------------------------------------------

    return res.status(201).json({

      success: true,

      message:
        "Recruiter registered successfully",

      user: {

        _id: recruiter._id,

        email: recruiter.email,

      },

    });

  }

  catch (error) {

    console.log(
      "RECRUITER REGISTER ERROR:",
      error
    );


    return res.status(500).json({

      success: false,

      message: error.message,

    });

  }

};


// ============================================================
// GITHUB CALLBACK
// ============================================================

export const githubCallback = async (req, res) => {

  try {

    if (!req.user) {

      return res.redirect(
        "http://localhost:5175/login"
      );

    }


    const token =
      generateToken(req.user);


    const userData = {

      _id: req.user._id,

      name: req.user.name,

      email: req.user.email,

      role: req.user.role,

      profileImage:
        req.user.profileImage || "",

    };


    const encodedUser =
      encodeURIComponent(
        JSON.stringify(userData)
      );


    return res.redirect(

      `http://localhost:5175/github-success?token=${token}&user=${encodedUser}`

    );

  }

  catch (error) {

    console.log(
      "GITHUB CALLBACK ERROR:",
      error
    );


    return res.redirect(
      "http://localhost:5173/login"
    );

  }

};