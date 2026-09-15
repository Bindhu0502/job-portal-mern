import "dotenv/config";
import cloudinary from "./config/cloudinary.js";

const testData = Buffer.from(
  "CareerHub Cloudinary upload test"
);

console.log("================================");
console.log("CLOUDINARY UPLOAD TEST");
console.log("================================");

const uploadStream = cloudinary.uploader.upload_stream(
  {
    folder: "careerhub/test",
    resource_type: "raw",
    public_id: `test_${Date.now()}`
  },
  (error, result) => {

    if (error) {
      console.log("================================");
      console.log("❌ UPLOAD FAILED");
      console.log("================================");

      console.log("Message:", error.message);
      console.log("HTTP Code:", error.http_code);
      console.log("Name:", error.name);
      console.log("Full Error:", error);

      return;
    }

    console.log("================================");
    console.log("✅ UPLOAD SUCCESSFUL");
    console.log("================================");

    console.log("Public ID:", result.public_id);
    console.log("Resource Type:", result.resource_type);
    console.log("URL:", result.secure_url);
  }
);

uploadStream.end(testData);