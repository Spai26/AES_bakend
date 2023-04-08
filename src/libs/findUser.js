const { user } = require("../models");
const { role } = require("../models");

/**
 * !TODO: trae al usuario
 */
const isExistId = (id) => {
  const result = user.findOne({ _id: id });
  return result;
};

const isExist = async (email) => {
  const result = await user.findOne({ email: email });
  return result;
};

const findRoles = (role) => {
  const result = role.findOne({ name: role });
  return result;
};

module.exports = { isExist, isExistId };
