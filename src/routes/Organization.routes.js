const { Router } = require('express')
const {
  validatorCreateOrganization,
  validatorGetOrganizationById,
  validatorPutOrganization  
} = require('../validators/Organization')
const {
    getAllOrganizationsForms,
    createOrganization,
    getOrganizationById,
    putOrganizationById
} = require('../controller/organization/organization.controller')
const organizationRoutes = Router()

organizationRoutes.get('/', getAllOrganizationsForms)
organizationRoutes.get('/:id', validatorGetOrganizationById, getOrganizationById)

organizationRoutes.put('/:id', validatorPutOrganization, putOrganizationById)
organizationRoutes.post('/', validatorCreateOrganization ,createOrganization)

module.exports = organizationRoutes