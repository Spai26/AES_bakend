const { check } = require("express-validator");
const validateResults = require("../utils/handlerValidator");

//create formulario especialista
const validatorRegisterSpecialist = [
  check("fullname").exists().notEmpty().isString(),
  check("email").exists().notEmpty().isEmail(),
  check("phone").exists().notEmpty(),
  check("area").exists().notEmpty(),
  check("country").exists().notEmpty(),
  check("filepath").exists().notEmpty(),
  
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorGetItems = [
  check("id").exists().notEmpty().isMongoId(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validateUpdate = [
  check("id").exists().notEmpty().isMongoId(),
  check("fullname").exists().notEmpty().isString(),
  check("email").exists().notEmpty().isEmail(),
  check("phone").exists().notEmpty(),
  check("area").exists().notEmpty(),
  check("country").exists().notEmpty(),
  check("filepath").exists().notEmpty(),
  check("view").exists().notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = {
    validatorRegisterSpecialist,
    validatorGetItems,
    validateUpdate
};