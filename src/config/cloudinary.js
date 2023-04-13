const cloudinary = require("cloudinary").v2;
const {
  CLOUDINARY_NAME,
  CLOUDINARY_KEY,
  CLOUDINARY_PASS,
} = require("./variable.env");

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_PASS,
});

module.exports = cloudinary;
