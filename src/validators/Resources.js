const { check } = require("express-validator");
const validateResults = require("../utils/handlerValidator");

const validateResourceCreate = [
  check("origin").isIn(["videos", "images", "slider"]).notEmpty().optional(),
  check("url").notEmpty().isString(),
  check("title")
    .optional()
    .isString()
    .exists()
    .isLength({ max: 40 })
    .notEmpty(),
  check("subtitle")
    .optional()
    .isString()
    .exists()
    .isLength({ min: 20, max: 120 })
    .notEmpty(),
  check("status").isBoolean().default(false),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = validateResourceCreate;
