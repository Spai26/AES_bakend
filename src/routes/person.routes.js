const { Router } = require("express");
const personsController = require("../controller/persons/persons.controller");
const {
    validatorRegisterPerson, 
    validatorDeletePersonById
} = require("../validators/Person")

const personRoute = Router(); 

personRoute.get("/", personsController.getAllPersons);
personRoute.post("/", validatorRegisterPerson, personsController.RegisterPerson );
personRoute.delete('/:id', validatorDeletePersonById, personsController.deletePersonById)

module.exports = personRoute;
