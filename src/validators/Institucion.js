const { check } = require("express-validator");
const validateResults = require("../utils/handlerValidator");

const validatorCreateInstitution = [
   check('organization').exists().notEmpty(),
   check('email').exists().notEmpty(),
   check('fullname').exists().notEmpty(),
   check('phone').exists().notEmpty(),
   check('post').exists().notEmpty(),
   check('city').exists().notEmpty(),
   check('areas').exists().notEmpty(),
   (req, res, next) => {
     return validateResults(req, res, next)
   } 
]

const validatorGetInstitutionById = [
  check('id').exists().notEmpty().isMongoId(),
  (req, res, next) => {
    return validateResults(req, res, next)
  }
]

const validatorPutInstitution = [
  check('id').exists().notEmpty().isMongoId(),
  check('view').exists().notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next)  
  }
]

module.exports = {
    validatorCreateInstitution,
    validatorGetInstitutionById,
    validatorPutInstitution
}