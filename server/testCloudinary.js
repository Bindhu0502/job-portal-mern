import "dotenv/config";
import cloudinary from "./config/cloudinary.js";

console.log("================================");
console.log("CLOUDINARY TEST");
console.log("================================");

console.log(
  "Cloud Name:",
  process.env.CLOUDINARY_NAME
);

console.log(
  "API Key:",
  process.env.CLOUDINARY_API_KEY
    ? "Loaded ✅"
    : "Missing ❌"
);

console.log(
  "API Secret:",
  process.env.CLOUDINARY_API_SECRET
    ? "Loaded ✅"
    : "Missing ❌"
);

console.log("================================");

try {
  const result = await cloudinary.api.ping();

  console.log("Cloudinary connection successful ✅");
  console.log(result);

} catch (error) {

  console.log("Cloudinary connection failed ❌");

  console.log("Message:", error.message);
  console.log("HTTP Code:", error.http_code);
  console.log("Name:", error.name);
  console.log("Full Error:", error);
}