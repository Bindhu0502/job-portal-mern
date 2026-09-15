import dotenv from "dotenv";
import mongoose from "mongoose";

import Notification from "./models/Notification.js";
import User from "./models/User.js";

dotenv.config();


// ============================================================
// CONNECT TO DATABASE
// ============================================================

const connectDB = async () => {

  try {

    await mongoose.connect(
      process.env.MONGO_URI
    );

    console.log(
      "MongoDB connected successfully"
    );

  } catch (error) {

    console.error(
      "MongoDB connection failed:",
      error.message
    );

    process.exit(1);

  }

};


// ============================================================
// SEED NOTIFICATIONS
// ============================================================

const seedNotifications = async () => {

  try {

    // --------------------------------------------------------
    // REMOVE OLD SEED NOTIFICATIONS
    // --------------------------------------------------------

    await Notification.deleteMany({
      title: {
        $in: [
          "New User Registered",
          "New Recruiter Registered",
          "New Job Posted",
          "New Application Received",
          "Company Registration Pending",
          "User Account Blocked",
          "System Maintenance",
          "Job Approval Required",
        ],
      },
    });


    // --------------------------------------------------------
    // GET USERS
    // --------------------------------------------------------

    const users =
      await User.find()
        .select("_id name email role")
        .limit(10)
        .lean();


    const candidate =
      users.find(
        (user) =>
          user.role === "candidate"
      );


    const recruiter =
      users.find(
        (user) =>
          user.role === "recruiter"
      );


    // --------------------------------------------------------
    // CREATE NOTIFICATIONS
    // --------------------------------------------------------

    const notifications = [

      {
        title:
          "New User Registered",

        message:
          candidate
            ? `${candidate.name} has registered as a new candidate.`
            : "A new candidate has registered on CareerHub.",

        type:
          "user",

        read:
          false,

        user:
          candidate?._id || null,
      },


      {
        title:
          "New Recruiter Registered",

        message:
          recruiter
            ? `${recruiter.name} has registered as a recruiter.`
            : "A new recruiter has registered on CareerHub.",

        type:
          "user",

        read:
          false,

        user:
          recruiter?._id || null,
      },


      {
        title:
          "New Job Posted",

        message:
          "A new job has been posted and is waiting for admin review.",

        type:
          "job",

        read:
          false,

        user:
          recruiter?._id || null,
      },


      {
        title:
          "New Application Received",

        message:
          "A candidate has submitted a new job application.",

        type:
          "application",

        read:
          false,

        user:
          candidate?._id || null,
      },


      {
        title:
          "Company Registration Pending",

        message:
          "A company registration is waiting for administrative review.",

        type:
          "company",

        read:
          false,

        user:
          recruiter?._id || null,
      },


      {
        title:
          "User Account Blocked",

        message:
          "A user account has been blocked by an administrator.",

        type:
          "user",

        read:
          true,

        user:
          candidate?._id || null,
      },


      {
        title:
          "System Maintenance",

        message:
          "CareerHub system maintenance has been scheduled.",

        type:
          "system",

        read:
          true,

        user:
          null,
      },


      {
        title:
          "Job Approval Required",

        message:
          "There are jobs waiting for administrator approval.",

        type:
          "job",

        read:
          false,

        user:
          recruiter?._id || null,
      },

    ];


    // --------------------------------------------------------
    // INSERT
    // --------------------------------------------------------

    const created =
      await Notification.insertMany(
        notifications
      );


    console.log(
      `${created.length} notifications inserted successfully.`
    );


  } catch (error) {

    console.error(
      "SEED NOTIFICATIONS ERROR:",
      error
    );

  }

};


// ============================================================
// RUN
// ============================================================

const run = async () => {

  await connectDB();

  await seedNotifications();

  await mongoose.connection.close();

  console.log(
    "MongoDB connection closed."
  );

};


run();