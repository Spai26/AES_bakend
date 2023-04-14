const { Router } = require("express");
const Controller = require("../controller/specialist/Specialist.controller");
const { validatorRegisterSpecialist } = require("../validators/Specilist")

const specialistRouter = Router();

specialistRouter.get("/", Controller.addSpecialist );
specialistRouter.post("/", validatorRegisterSpecialist, Controller.registerSpecialist );
//specialistRouter.get("/:id", validateItem, eventController.detailEventForid);

//specialistRouter.delete("/:id", validateItem, eventController.deleteEventByid);

module.exports = specialistRouter;