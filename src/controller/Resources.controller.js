const { matchedData } = require("express-validator");
const { resources } = require("../models");
const handlerHttpError = require("../utils/handlerHttpError");
const {
  validExtensionImage,
  validExtensionFile,
} = require("../libs/validExtensionFiles");
const showAllItems = async (req, res) => {
  try {
    const result = await resources.find({});
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    handlerHttpError(res, "No se encontraron recursos!", 404);
  }
};

const uploadItems = async (req, res) => {
  try {
    const { origin, url } = req.body;

    if (!["videos", "images", "slider"].includes(origin)) {
      return handlerHttpError(res, "Origen invalido", 404);
    }

    //si es una url de video

    const data = new resources({
      url,
      origin,
    });

    await data.save();
    res.send({ succes: true, data: "upload" });
  } catch (error) {
    handlerHttpError(res, "Archivo no subido", 500);
  }
};

module.exports = {
  showAllItems,
  uploadItems,
};
