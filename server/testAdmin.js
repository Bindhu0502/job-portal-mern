import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/User.js";

dotenv.config();

async function testAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected ✅");

    const email = "bindhuvootkuri@gmail.com";
    const password = "123456";

    const user = await User.findOne({
      email: email.toLowerCase().trim(),
    });

    if (!user) {
      console.log("❌ Admin user NOT found");
      return;
    }

    console.log("Email:", user.email);
    console.log("Role:", user.role);
    console.log("Status:", user.accountStatus);
    console.log("Password hash exists:", !!user.password);

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    console.log(
      "Password 123456 matches:",
      passwordMatch
    );

    if (
      user.role === "admin" &&
      user.accountStatus === "approved" &&
      passwordMatch
    ) {
      console.log("");
      console.log("🎉 ADMIN ACCOUNT IS PERFECT!");
      console.log("Email:", email);
      console.log("Password:", password);
    } else {
      console.log("");
      console.log("❌ ADMIN ACCOUNT HAS A PROBLEM");
    }

  } catch (error) {
    console.error("ERROR:", error);
  } finally {
    await mongoose.disconnect();
  }
}

testAdmin();