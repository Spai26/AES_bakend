const { check } = require("express-validator");
const validateResults = require("../utils/handlerValidator");

const validatorCreateBlog = [
  check("title").exists().notEmpty(),
  check("description").exists().notEmpty(),
  check("image").exists().notEmpty(),
  check('category').exists().notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next);
  }
]

const validatorGetBlogById = [
  check('id').exists().notEmpty().isMongoId(),
  (req, res, next) => {
    return validateResults(req, res, next)
  }
]

const validatorAddCategoryInBlog = [
  check('id').exists().notEmpty().isMongoId(),
  check('category').exists().notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next)
  }
]

const validatorDeleteCategoryInBlog = [
  check('id').exists().notEmpty().isMongoId(),
  check('category').exists().notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next)
  }
]

const validatorUpdateBlog = [
  check('id').exists().notEmpty().isMongoId(),
  check('title').exists().notEmpty(),
  check('description').exists().notEmpty(),
  check('image').exists().notEmpty(),
  check('status').exists().notEmpty(),
  check('category').exists().notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next)
  }
]

const validatorDeleteBlogById = [
  check('id').exists().notEmpty().isMongoId(),
  (req, res, next) => {
    return validateResults(req, res, next)
  }
]

module.exports = { 
  validatorCreateBlog,
  validatorGetBlogById,
  validatorAddCategoryInBlog,
  validatorDeleteCategoryInBlog,
  validatorUpdateBlog,
  validatorDeleteBlogById 
}