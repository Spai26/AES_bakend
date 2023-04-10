const { check } = require("express-validator");
const validateResults = require("../utils/handlerValidator");

//create
const validatorCreateUser = [
  check("firstname").exists().notEmpty(),
  check("lastname").exists().notEmpty(),
  check("email").exists().notEmpty().isEmail(),
  check("password").exists().notEmpty(),
  check("roles").exists().notEmpty().isMongoId(),

  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

//traer todos - eliminar
const validatorGetItems = [
  check("id").exists().notEmpty().isMongoId(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

//actualizar
const validateUpdate = [
  check("firstname").exists().notEmpty(),
  check("lastname").exists().notEmpty(),
  check("email").exists().notEmpty().isEmail(),
  check("password").exists().notEmpty(),
  check("status").exists().notEmpty(),  
  check("roles").exists().notEmpty().isMongoId(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorAuthLogin = [
  check("email").exists().notEmpty().isEmail(),
  check("password").exists().notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = {
  validatorGetItems,
  validatorCreateUser,
  validateUpdate,
};
