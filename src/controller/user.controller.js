const { userModel } = require("../models");

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
  const { body } = req;

  const data = await userModel.create(req.body);
  console.log(body);
  res.send({ data });
};
module.exports = { getAllorSearchUser, createUser };
