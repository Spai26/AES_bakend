const { check } = require("express-validator");
const validateResults = require("../utils/handlerValidator");

const validatorGetFormById = [
    check('id').exists().notEmpty().isMongoId(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorNewSpecialist = [
    check('nombre').exists().notEmpty(),
    check('celular').exists().notEmpty(),
    check('pais').exists().notEmpty(),
    check('taller').exists().notEmpty(),
    check('correo').exists().notEmpty(),
    check('origen').exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorNewOrganization = [
    check('nombreEmpresa').exists().notEmpty(),
    check('correo').exists().notEmpty(),
    check('nombreInstructor').exists().notEmpty(),
    check('puesto').exists().notEmpty(),
    check('celular').exists().notEmpty(),
    check('ciudad').exists().notEmpty(),
    check('taller').exists().notEmpty(),
    check('origen').exists().notEmpty(),
    (req, res, next) => {
        return validateResults(req, res, next)
    }
]

const validatorNewAlliance = [
   check('nombreOrganizacion').exists().notEmpty(),
   check('mision').exists().notEmpty(),
   check('nombreInstructor').exists().notEmpty(),
   check('correo').exists().notEmpty(),
   check('celular').exists().notEmpty(),
   check('puesto').exists().notEmpty(),
   check('cantIntegrantes').exists().notEmpty(),
   check('ciudad').exists().notEmpty(),
   check('taller').exists().notEmpty(),
   check('redesSociales').exists().notEmpty(),
   check('origen').exists().notEmpty(),
   (req, res, next) => {
     return validateResults(req, res, next)
   } 
]

const validatorDeleteFormById = [
   check('id').exists().notEmpty().isMongoId(),
   (req, res, next) => {
    return validateResults(req, res, next)
   } 
]

module.exports = {
    validatorGetFormById,
    validatorNewSpecialist,
    validatorNewOrganization,
    validatorNewAlliance,
    validatorDeleteFormById
}