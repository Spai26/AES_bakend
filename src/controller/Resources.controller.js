const { matchedData } = require("express-validator");
const { resources } = require("../models");
const handlerHttpError = require("../utils/handlerHttpError");
const { validResources } = require("../libs/validExtensionFiles");
const showAllItems = async (req, res) => {
  try {
    const result = await resources.find({});
    res.status(200).json(result);
  } catch (error) {
    handlerHttpError(res, "No se encontraron recursos!", 404);
  }
};

const uploadItems = async (req, res) => {
  try {
    const { title, subtitle, url, origin, status } = req.body;

    if (!["videos", "images", "slider"].includes(origin)) {
      return handlerHttpError(res, "Origen invalido", 404);
    }

    if (!validResources(url, origin)) {
      return handlerHttpError(
        res,
        `error con el formato de ${origin}, no valido`,
        404
      );
    }

    const data = new resources({
      title,
      subtitle,
      url,
      origin,
      status,
    });

    await data.save();
    res.send({ succes: true, data: "upload" });
  } catch (error) {
    console.error(error);
    handlerHttpError(res, "Archivo no subido", 500);
  }
};

const updateResourceStatus = async (req, res) => {
  const { id } = req.params;
  const { body } = req;

  await resources.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        status: body.status,
        origin: body.origin,
        url: body.url,
      },
    }
  );
};
module.exports = {
  showAllItems,
  uploadItems,
  updateResourceStatus,
};
