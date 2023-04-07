const { matchedData } = require("express-validator");
const { role } = require("../models");
const { handlerHttpError } = require("../utils/handlerHttpError");

/**
 * !TODO: obtener la lista de roles
 */
const getAllItems = async (req, res) => {
  try {
    const data = await role.find({});

    !data.length
      ? handlerHttpError(res, "No se encontro los permisos", 204)
      : res.send(data);
  } catch (error) {
    handlerHttpError(res, "ERROR al asignar permisos", 400);
  }
};

module.exports = getAllItems;
