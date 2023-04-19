const { Router } = require("express");
const personsController = require("../controller/persons/persons.controller");
const {
  validatorRegisterPerson,
  validatorDeletePersonById,
} = require("../validators/Person");

const isAuth = require("../middleware/sessionAuth");
const checkrol = require("../middleware/roleAuth");

const personRoute = Router();

personRoute.get(
  "/",

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
