const { matchedData } = require("express-validator");
const { permission } = require("../models");
const { handlerHttpError } = require("../utils/handlerHttpError");

/**
 * !TODO: obtener la lista de permisos
 */
const getAllItems = async (req, res) => {
  /*  try {
    const data = await permission.find({});

    !data.length
      ? handlerHttpError(res, "No hay permisos creados", 501)
      : res.send(data);
  } catch (error) {
    handlerHttpError(res, "ERROR al asignar permisos", 400);
  } */
  res.send({ data: "here" });
};

module.exports = getAllItems;
