const { check } = require("express-validator");
const validateResults = require("../utils/handlerValidator");

const validateResourceCreate = [
  check("origin").isIn(["videos", "images"]),
  check("url").isString().notEmpty(),
  check("status")
    .withMessage("status must be a boolean value")
    .isBoolean()
    .default(false),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = validateResourceCreate;
