const { Router } = require('express')
const { validatorAddSuscription, validatorUnsuscribe } = require("../validators/Suscription")

const suscriptionRoute = Router()
const suscriptionController = require("../controller/suscription/subscribers.controller")

suscriptionRoute.get("/", suscriptionController.getAllSusribers)

suscriptionRoute.post("/", validatorAddSuscription, suscriptionController.addSuscription)

suscriptionRoute.delete('/',  suscriptionController.unsuscribeUser)
suscriptionRoute.delete('/:id', suscriptionController.deleteSuscriptionById)

module.exports = suscriptionRoute