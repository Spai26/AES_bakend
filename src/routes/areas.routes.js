const { Router } = require('express')
const {
    validatorCreateArea,
    validatorDeleteAreaById
} = require('../validators/Areas')
const {
    createNewArea,
    getAllAreas,
    deleteAreaById
} = require('../controller/areas/areas.controller')

const areasRouter = Router()

areasRouter.get('/', getAllAreas)
areasRouter.post('/', validatorCreateArea, createNewArea)
areasRouter.delete('/', validatorDeleteAreaById, deleteAreaById)

module.exports = areasRouter