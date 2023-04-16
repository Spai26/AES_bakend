const { Router } = require("express");
const {
  validatorCreateOrganization,
  validatorOrgById,
  validatorUpdateOrg,
} = require("../validators/Organization");
const {
  getAllOrganizationsForms,
  createOrganization,
  getOrganizationById,
  putOrganizationById,
} = require("../controller/organization/organization.controller");
const organizationRoutes = Router();

organizationRoutes.get("/", getAllOrganizationsForms);
organizationRoutes.post("/", validatorCreateOrganization, createOrganization);
organizationRoutes.get("/:id", validatorOrgById, getOrganizationById);
organizationRoutes.put(
  "/:id",
  validatorOrgById,
  validatorUpdateOrg,
  putOrganizationById
);

module.exports = organizationRoutes;
