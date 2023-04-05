const { check } = require("express-validator");
const validateResults = require("../utils/handlerValidator");

const validatorCreateBlog = [
  check("title").exists().notEmpty(),
  check("description").exists().notEmpty(),
  check("image").exists().notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = { validatorCreateBlog };
  