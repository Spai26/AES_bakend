const { matchedData } = require("express-validator");
const { role } = require("../models");
const { handlerHttpError } = require("../utils/handlerHttpError");

/**
 * !TODO: obtener la lista de roles
 */
const getAllItems = async (req, res) => {
  try {
    const result = await role.find({});

    if (!data.length) {
      handlerHttpError(res, "No hay roles creados", 501);
      return;
    }
    res.send(result);
  } catch (error) {
    handlerHttpError(res, "ERROR al asignar permisos", 400);
  }
};

module.exports = getAllItems;
