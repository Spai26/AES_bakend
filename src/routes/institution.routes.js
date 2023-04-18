const { Router } = require("express");
const {
  validatorCreateInstitution,
  validatorGetInstitutionById,
  validatorPutInstitution,
} = require("../validators/Institucion");
const {
  getAllInstitution,
  getInstitutionById,
  createInstitution,
  putInstitutionById,
} = require("../controller/institution/institution.controller");

const institutionRoutes = Router();

institutionRoutes.get("/", getAllInstitution);
institutionRoutes.get("/:id", validatorGetInstitutionById, getInstitutionById);
institutionRoutes.post("/", validatorCreateInstitution, createInstitution);
institutionRoutes.put(
  "/:id",
  isAuth,
  checkrol(["admin"]),
  validatorGetInstitutionById,
  validatorPutInstitution,
  putInstitutionById
);

module.exports = institutionRoutes;
