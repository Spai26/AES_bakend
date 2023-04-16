const { Router } = require('express')
const { validatorAddSuscription } = require("../validators/Suscription")

const suscriptionRoute = Router()
const suscriptionController = require("../controller/suscription/subscribers.controller")

suscriptionRoute.get("/", suscriptionController.getAllSusribers)

suscriptionRoute.post("/", validatorAddSuscription, suscriptionController.addSuscription)

suscriptionRoute.delete('/:id', suscriptionController.deleteSuscriptionById)

module.exports = suscriptionRoute