const { check } = require("express-validator");
const validateResults = require("../utils/handlerValidator");

//create
const validatorAddEvent = [
  check("title").exists().notEmpty().isString(),
  check("date").exists().notEmpty().isDate(),
  check("frontpage").exists().notEmpty(),
  check("location").exists().notEmpty().isString(),
  check("description").exists().notEmpty().isString(),
  check("categories").exists().notEmpty().isMongoId(),
  check("tags").exists().notEmpty().isMongoId(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = {
  validatorAddEvent,
};
