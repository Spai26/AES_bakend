const { check } = require("express-validator");
const validateResults = require("../utils/handlerValidator");

//create
const validatorAddItem = [
  check("name").notEmpty(),
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
const ValidatorUpdateItem = [
  check("name").notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = {
  validatorAddItem,
  validatorGetItems,
  ValidatorUpdateItem,
};
