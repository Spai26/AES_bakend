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
    const { origin, url, status } = req.body;
    /* console.log(origin, url);
    console.log(await validResources(url, origin)); */
    if (!["videos", "images", "slider"].includes(origin)) {
      return handlerHttpError(res, "Origen invalido", 404);
    }

    if (!validResources(url, origin)) {
      return handlerHttpError(res, `formato de ${origin} no valido`, 404);
    }
    //si es una url de video

    const data = new resources({
      url,
      origin,
      status,
    });

    await data.save();
    res.send({ succes: true, data: "upload" });
  } catch (error) {
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
