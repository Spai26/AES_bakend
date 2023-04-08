const { check } = require("express-validator");
const validateResults = require("../utils/handlerValidator");

//create
const validateNewBlog = [
  check("title").exists().notEmpty(),
  check("description").exists().notEmpty(),
  check("status").exists().notEmpty().isBoolean(),
  check("image").exists().notEmpty(),
  check("categories").exists().notEmpty().isMongoId(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

//actualizar
const validateUpdate = [
  check("title").exists().notEmpty(),
  check("description").exists().notEmpty(),
  check("status").exists().notEmpty(),
  check("image").exists().notEmpty(),
  check("status").exists().notEmpty().isBoolean(),
  check("categories").exists().notEmpty().isMongoId(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = {
  validateNewBlog,
  validateUpdate,
};
