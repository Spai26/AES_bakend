// Upload
const cloudinary = require("../config/cloudinary");

const uploadImage = async (imagePath, options = {}) => {
  try {
    const result = await cloudinary.uploader.upload(imagePath, options);

    return result;
  } catch (error) {
    if (error) {
      throw new Error("la imagen no se cargo");
    }
  }
};

module.exports = uploadImage;
