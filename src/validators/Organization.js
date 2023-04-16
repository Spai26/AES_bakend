const { check } = require("express-validator");
const validateResults = require("../utils/handlerValidator");

const validatorCreateOrganization = [
  check("organizations").exists().notEmpty().isString(),
  check("work").exists().notEmpty().isString(),
  check("email").exists().notEmpty().isEmail(),
  check("fullname").exists().notEmpty().isString(),
  check("phone").exists().notEmpty().isMobilePhone(),
  check("post").exists().notEmpty(),
  check("assistants").exists().notEmpty().isNumeric(),
  check("social").exists().notEmpty().isString(),
  check("area").exists().notEmpty().isMongoId(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorGetOrganizationById = [
  check("id").exists().notEmpty().isMongoId(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorPutOrganization = [
  check("view").exists().notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = {
  validatorCreateOrganization,
  validatorPutOrganization,
  validatorGetOrganizationById,
};
