const { Router } = require('express')
const {
 getAllForms,
 getFormById,
 postNewEspecialista,
 postNewOrganizaciones,
 postNewAlianzas,
 deleteFormById
} = require('../handlers/Form/form.handler')
const routesForm = Router()

routesForm.get('/', getAllForms)
routesForm.get('/:id', getFormById)

routesForm.post('/especialista', postNewEspecialista)
routesForm.post('/organizaciones', postNewOrganizaciones)
routesForm.post('/alianzas', postNewAlianzas)

routesForm.delete('/:id', deleteFormById)

module.exports = routesForm