// Upload
const cloudinary = require("../config/cloudinary");

const uploadImage = async (imagePath, options = {}) => {
  try {
    const result = await cloudinary.uploader.upload(imagePath, options);
    console.log("origin", imagePath);
    return result.url;
  } catch (error) {
    if (error) {
      throw new Error("ERROR_CLOUDINARY: image no se cargo");
    }
  }
};

module.exports = uploadImage;
