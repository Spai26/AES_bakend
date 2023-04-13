const { check } = require("express-validator");
const validateResults = require("../utils/handlerValidator");

//create Customer
const validatorRegisterCustomer = [
  check("fullname").exists().notEmpty(),
  check("email").exists().notEmpty().isEmail(),
  check("events").exists().notEmpty().isMongoId(),
  check("origin").exists().notEmpty(),
  

  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

// Register especialista
const validatorRegisterSpecialist = [
  check("fullname").exists().notEmpty(),
  check("email").exists().notEmpty(),
  check("phone").exists().notEmpty(),
  check("country").exists().notEmpty(),
  check("area").exists().notEmpty(),
  check("filepath").exists().notEmpty(),

  (req, res, next) => {
    return validateResults(req, res, next);
  },
]

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
  validatorRegisterCustomer,
  validatorRegisterSpecialist,
  validateUpdateCustomer,
};
