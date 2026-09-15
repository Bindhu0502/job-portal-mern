import mongoose from "mongoose";
import dotenv from "dotenv";

import User from "./models/User.js";

dotenv.config();

const createAdmin = async () => {

  try {

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
    // ADMIN DETAILS
    // ========================================================

    const email =
      "bindhuvootkuri@gmail.com";

    const password =
      "123456";


    // ========================================================
    // FIND ADMIN
    // ========================================================

    let admin =
      await User.findOne({
        email: email.toLowerCase().trim(),
      });


    // ========================================================
    // CREATE ADMIN IF NOT EXISTS
    // ========================================================

    if (!admin) {

      admin = new User({

        name: "Bindhu",

        email:
          email.toLowerCase().trim(),

        // IMPORTANT:
        // Give the plain password here.
        // User model will hash it automatically.
        password: password,

        role: "admin",

        accountStatus: "approved",

      });


      await admin.save();


      console.log(
        "Admin created successfully ✅"
      );

    }

    // ========================================================
    // RESET EXISTING ADMIN
    // ========================================================

    else {

      admin.name = "Bindhu";

      admin.role = "admin";

      admin.accountStatus = "approved";

      // IMPORTANT:
      // DO NOT bcrypt.hash() here.
      //
      // User.js pre-save middleware will hash
      // this password automatically.

      admin.password = password;


      await admin.save();


      console.log(
        "Admin password reset successfully ✅"
      );

    }


    // ========================================================
    // LOGIN DETAILS
    // ========================================================

    console.log("");
    console.log(
      "======================================"
    );

    console.log(
      "CAREERHUB ADMIN LOGIN"
    );

    console.log(
      "======================================"
    );

    console.log(
      "Email:",
      email
    );

    console.log(
      "Password:",
      password
    );

    console.log(
      "Role:",
      admin.role
    );

    console.log(
      "Status:",
      admin.accountStatus
    );

    console.log(
      "======================================"
    );


    // ========================================================
    // DISCONNECT
    // ========================================================

    await mongoose.disconnect();

    console.log(
      "MongoDB disconnected."
    );

    process.exit(0);

  }

  catch (error) {

    console.error(
      "ADMIN SEED ERROR:",
      error
    );

    await mongoose.disconnect();

    process.exit(1);

  }

};


// ============================================================
// RUN
// ============================================================

createAdmin();