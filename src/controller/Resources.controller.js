const { matchedData } = require("express-validator");
const { resources } = require("../models");
const handlerHttpError = require("../utils/handlerHttpError");

const showAllItems = (req, res) => {
  try {
    const result = resources.find({});

    res.status(200).json(result);
  } catch (error) {
    handlerHttpError(res, "No se encontraron recursos!", 404);
  }
};

const uploadItems = async (req, res) => {
  const { origin, url } = req.body;

  if (!["videos", "images"].includes(origin)) {
    return handlerHttpError(res, "Origen invalido", 404);
  }
  try {
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
