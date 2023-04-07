const { Router } = require('express')
const {
    getAllForms,
    getFormById,
    newSpecialist,
    newOrganization,
    newAlliance,
    deleteFormById
} = require('../controller/form.controller')
const {
  validatorGetFormById,
  validatorNewSpecialist,
  validatorNewOrganization,
  validatorNewAlliance,
  validatorDeleteFormById  
} = require('../validators/formTest')
const routesForm = Router()

routesForm.get('/', getAllForms)
routesForm.get('/:id', validatorGetFormById, getFormById)

routesForm.post('/especialista', validatorNewSpecialist, newSpecialist)
routesForm.post('/organizaciones', validatorNewOrganization, newOrganization)
routesForm.post('/alianzas', validatorNewAlliance, newAlliance)

routesForm.delete('/:id', validatorDeleteFormById, deleteFormById)
module.exports = routesForm