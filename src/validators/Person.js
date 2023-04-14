const { check } = require("express-validator");
const validateResults = require("../utils/handlerValidator");

//create Person
const validatorRegisterPerson = [
  check("email").exists().notEmpty(),
  check("fullname").exists().notEmpty(),
  check('events').exists().notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorDeletePersonById = [
  check('id').exists().notEmpty().isMongoId(),
  (req, res, next) => {
    return validateResults(req, res, next)
  }
]

module.exports = {
  validatorRegisterPerson,
  validatorDeletePersonById
};
