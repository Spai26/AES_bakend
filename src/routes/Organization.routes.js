const { Router } = require('express')
const {
  validatorCreateOrganization  
} = require('../validators/Organization')
const {
    getAllOrganizationsForms,
    createOrganization
} = require('../controller/organization/organization.controller')
const organizationRoutes = Router()

organizationRoutes.get('/', getAllOrganizationsForms)
organizationRoutes.post('/', validatorCreateOrganization ,createOrganization)

module.exports = organizationRoutes