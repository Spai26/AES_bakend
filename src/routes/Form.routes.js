const { Router } = require('express')
const {
    getAll,
    getFormById,
    newEspecialista,
    newOrganizaciones,
    newAlianzas
} = require('../handlers/Forms/forms.handlers')
const routesForm = Router()

routesForm.get('/', getAll)
routesForm.get('/:id', getFormById)

routesForm.post('/especialista', newEspecialista)
routesForm.post('/organizaciones', newOrganizaciones)
routesForm.post('/alianzas', newAlianzas)

module.exports = routesForm