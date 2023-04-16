const { Router } = require("express");
const Controller = require("../controller/specialist/Specialist.controller");
const {
  validatorRegisterSpecialist,
  validatorGetItems,
  validateUpdate,
} = require("../validators/Specilist");

const specialistRouter = Router();

specialistRouter.get("/", Controller.addSpecialist);
specialistRouter.get(
  "/:id",
  validatorGetItems,
  Controller.detailSpecialistForid
);
specialistRouter.post(
  "/",
  validatorRegisterSpecialist,
  Controller.registerSpecialist
);
specialistRouter.put(
  "/:id",
  validatorGetItems,
  validateUpdate,
  Controller.specialistUpdate
);

module.exports = specialistRouter;
