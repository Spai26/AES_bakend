const { Router } = require('express')
const { validatorAddSuscription } = require("../validators/Suscription")

const suscriptionRoute = Router()
const suscriptionController = require("../controller/suscription/subscribers.controller")

suscriptionRoute.post("/", validatorAddSuscription, suscriptionController.addSuscription)
suscriptionRoute.get("/", suscriptionController.getAllSusribers)
suscriptionRoute.delete('/:id', suscriptionController.deleteSuscriptionById)

module.exports = suscriptionRoute