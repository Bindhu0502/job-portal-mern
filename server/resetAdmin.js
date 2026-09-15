import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const resetAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected ✅");

    const admin = await User.findOne({
      email: "bindhuvootkuri@gmail.com",
    });

    if (!admin) {
      console.log("❌ Admin account not found");
      return;
    }

    // IMPORTANT:
    // Set plain password.
    // User.js pre-save middleware will hash it.
    admin.password = "123456";

    admin.role = "admin";
    admin.accountStatus = "approved";

    await admin.save();

    console.log("");
    console.log("================================");
    console.log("ADMIN PASSWORD RESET SUCCESSFUL");
    console.log("================================");
    console.log("Email: bindhuvootkuri@gmail.com");
    console.log("Password: 123456");
    console.log("Role: admin");
    console.log("Status: approved");
    console.log("================================");

  } catch (error) {
    console.error("❌ RESET ERROR:", error);
  } finally {
    await mongoose.disconnect();
  }
};

resetAdmin();