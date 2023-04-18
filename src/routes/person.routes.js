const { Router } = require("express");
const personsController = require("../controller/persons/persons.controller");
const {
  validatorRegisterPerson,
  validatorDeletePersonById,
} = require("../validators/Person");

const personRoute = Router();

personRoute.get(
  "/",
  isAuth,
  checkrol(["admin"]),
  personsController.getAllPersons
);
personRoute.post(
  "/",
  validatorRegisterPerson,
  personsController.RegisterPerson
);
personRoute.delete(
  "/:id",
  isAuth,
  checkrol(["admin"]),
  validatorDeletePersonById,
  personsController.deletePersonById
);

module.exports = personRoute;
