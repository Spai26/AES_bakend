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
  try {
    const { id } = req.params;
    req = matchedData(req);
    const body = req;

    const isExist = await resources.findOne({ _id: id });

    if (!isExist) {
      handlerHttpError(res, "Este recurso no existe");
    }

    if (!["videos", "images", "slider"].includes(body.origin)) {
      return handlerHttpError(res, "Origen invalido", 404);
    }

    if (!validResources(body.url, body.origin)) {
      return handlerHttpError(
        res,
        `error con el formato de ${body.origin}, no valido`,
        404
      );
    }
    await resources.findByIdAndUpdate(
      { _id: id },
      {
        $set: {
          title: body.title,
          subtitle: body.subtitle,
          status: body.status,
          origin: body.origin,
          url: body.url,
        },
      }
    );
    res.send({ data: "here" });
  } catch (error) {
    handlerHttpError(
      res,
      `No se pudo actualizar, valida el max. de characters: ${error}`,
      500
    );
  }
};

module.exports = {
  showAllItems,
  uploadItems,
  updateResourceStatus,
};
