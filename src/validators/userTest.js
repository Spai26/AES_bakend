const { check } = require("express-validator");
const validateResults = require("../utils/handlerValidator");

const validatorCreateUser = [
  check("email").exists().notEmpty().isEmail(),
  check("password").notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];
module.exports = { validatorCreateUser };
