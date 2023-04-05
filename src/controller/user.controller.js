const { matchedData } = require("express-validator");
const UserTest = require("../models/UserTest");
const { handlerHttpError } = require("../utils/handlerHttpError");

/**
 * obtener la lista de usuarios
 * @param {*} req
 * @param {*} res
 */
const getAllorSearchUser = async (req, res) => {
  const data = await UserTest.find({});
  res.send({ data });
};

const createUser = async (req, res) => {
  try {
    const body = matchedData(req);
    console.log(body);
    const data = new UserTest({
      email: body.email,
      password: await UserTest.encryptPassword(body.password),
    });
    const result = await data.save();

    res.send(result);
  } catch (error) {
    handlerHttpError(res, "Error al crear o hay un duplicado", 500);
  }
};

const deleteUser = async (req, res) => {
  try {
    req = matchedData(req);
    console.log(req);
    const { id } = req;
    console.log(id);
    const data = await UserTest.delete({ _id: id });
    res.send({ data });
  } catch (error) {
    handlerHttpError(res, "Nada paso :) ? ");
  }
};

module.exports = { getAllorSearchUser, createUser, deleteUser };
