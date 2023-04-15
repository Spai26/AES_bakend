const { check } = require('express-validator')
const validateResults = require('../utils/handlerValidator')

const validatorCreateOrganization = [
   check('organizations').exists().notEmpty(),
   check('work').exists().notEmpty(),
   check('email').exists().notEmpty(),
   check('fullname').exists().notEmpty(),
   check('phone').exists().notEmpty(),
   check('post').exists().notEmpty(),
   check('assistants').exists().notEmpty(),
   check('social').exists().notEmpty(),
   check('areas').exists().notEmpty(),
   (req, res, next) => {
     return validateResults(req, res, next)
   } 
]

const validatorGetOrganizationById = [
  check('id').exists().notEmpty().isMongoId(),
  (req, res, next) => {
    return validateResults(req, res, next)
  }
]

const validatorPutOrganization = [
  check('id').exists().notEmpty().isMongoId(),
  check('view').exists().notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next)  
  }
]

module.exports = {
    validatorCreateOrganization,
    validatorPutOrganization,
    validatorGetOrganizationById
}