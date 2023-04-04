const cloudinary = require("cloudinary").v2;
const {
  CLOUDINARY_NAME,
  CLOUDINARY_KEY,
  CLOUDINARY_PASS,
} = require("./variable.env");

// Configuration
cloudinary.config({
  cloud_name: CLOUDINARY_NAME || process.env.CLOUDINARY_NAME,
  api_key: CLOUDINARY_KEY || process.env.CLOUDINARY_KEY,
  api_secret: CLOUDINARY_PASS || process.env.CLOUDINARY_PASS,
});

module.exports = cloudinary;
