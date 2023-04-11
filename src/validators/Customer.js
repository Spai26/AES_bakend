const { check } = require("express-validator");
const validateResults = require("../utils/handlerValidator");

//create
const validatorCreateCustomer = [
  check("fullname").exists().notEmpty(),
  check("email").exists().notEmpty().isEmail(),


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
const validateUpdateCustomer = [
  check("fullname").exists().notEmpty(),
  check("email").exists().notEmpty().isEmail(),

  (req, res, next) => {
    return validateResults(req, res, next);
  },
];



module.exports = {
  validatorGetItems,
  validatorCreateCustomer,
  validateUpdateCustomer,
};
