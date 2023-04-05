const { matchedData } = require("express-validator");
const { userModel } = require("../models");
const { handlerHttpError } = require("../utils/handlerHttpError");
/**
 * obtener la lista de usuarios
 * @param {*} req
 * @param {*} res
 */
const getAllorSearchUser = async (req, res) => {
  const data = await userModel.find({});
  res.send({ data });
};

const createUser = async (req, res) => {
  try {
    const body = matchedData(req);
    const data = await new userModel(body);

    res.send({ data });
  } catch (error) {
    handlerHttpError(res, "ERROR_FN_CREATEUSER", 500);
  }
};
module.exports = { getAllorSearchUser, createUser };
