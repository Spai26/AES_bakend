const {Router} = require('express')
const {
    getAllSuscribers,
    postNewSuscribers,
    updateSuscribers,
    deleteSuscribers
} = require('../handlers/Suscribers/Suscribers.handlers')  
const suscribersRoutes = Router()

suscribersRoutes.get('/', getAllSuscribers)
suscribersRoutes.post('/', postNewSuscribers)
suscribersRoutes.put('/:id', updateSuscribers)
suscribersRoutes.delete('/:id', deleteSuscribers)


module.exports = suscribersRoutes