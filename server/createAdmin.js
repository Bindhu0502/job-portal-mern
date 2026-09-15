import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/User.js";

dotenv.config();

const createAdmin = async () => {

  try {

    await mongoose.connect(
      process.env.MONGO_URI
    );

    console.log(
      "MongoDB Connected Successfully ✅"
    );


    const email =
      "admin@careerhub.com";

    const password =
      "Admin@123";


    const existingUser =
      await User.findOne({
        email
      });


    if (existingUser) {

      existingUser.name =
        "CareerHub Admin";

      existingUser.password =
        password;

      existingUser.role =
        "admin";

      existingUser.accountStatus =
        "approved";


      await existingUser.save();


      console.log("");
      console.log(
        "===================================="
      );
      console.log(
        "ADMIN ACCOUNT UPDATED ✅"
      );
      console.log(
        "===================================="
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
        "Role: admin"
      );
      console.log(
        "===================================="
      );


    } else {


      const admin =
        await User.create({

          name:
            "CareerHub Admin",

          email,

          password,

          role:
            "admin",

          accountStatus:
            "approved"

        });


      console.log("");
      console.log(
        "===================================="
      );
      console.log(
        "ADMIN ACCOUNT CREATED ✅"
      );
      console.log(
        "===================================="
      );
      console.log(
        "Email:",
        admin.email
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
        "===================================="
      );

    }


    await mongoose.connection.close();

    process.exit(0);

  }

  catch (error) {

    console.error(
      "CREATE ADMIN ERROR:",
      error
    );

    process.exit(1);

  }

};


createAdmin();