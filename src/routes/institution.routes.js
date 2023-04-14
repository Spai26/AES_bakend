const { Router } = require('express')
const {
  validatorCreateInstitution  
} = require('../validators/Institucion')
const {
    getAllInstitution,
    createInstitution
}= require('../controller/institution/institution.controller')

const institutionRoutes = Router()

institutionRoutes.get('/', getAllInstitution)
institutionRoutes.post('/', validatorCreateInstitution, createInstitution)

module.exports = institutionRoutes