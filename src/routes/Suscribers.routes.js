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
suscribersRoutes.delete('/delete/:id', deleteSuscribers)

suscribersRoutes.put('/:id/update', updateSuscribers)

module.exports = suscribersRoutes