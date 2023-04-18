const { Router } = require("express");
const Controller = require("../controller/specialist/Specialist.controller");
const {
  validatorRegisterSpecialist,
  validatorGetItems,
  validateUpdate,
} = require("../validators/Specilist");
const isAuth = require("../middleware/sessionAuth");
const checkrol = require("../middleware/roleAuth");
const specialistRouter = Router();

specialistRouter.get(
  "/",
  isAuth,
  checkrol(["admin"]),
  Controller.addSpecialist
);
specialistRouter.get(
  "/:id",
  isAuth,
  checkrol(["admin"]),
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
  isAuth,
  checkrol(["admin"]),
  validatorGetItems,
  validateUpdate,
  Controller.specialistUpdate
);

module.exports = specialistRouter;
