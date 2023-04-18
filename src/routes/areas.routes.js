const { Router } = require("express");
const {
  validatorCreateArea,
  validatorDeleteAreaById,
} = require("../validators/Areas");
const {
  createNewArea,
  getAllAreas,
  deleteAreaById,
} = require("../controller/areas/areas.controller");

const areasRouter = Router();

areasRouter.get("/", getAllAreas);
areasRouter.post(
  "/",
  isAuth,
  checkrol(["admin"]),
  validatorCreateArea,
  createNewArea
);
areasRouter.delete(
  "/:id",
  isAuth,
  checkrol(["admin"]),
  validatorDeleteAreaById,
  deleteAreaById
);

module.exports = areasRouter;
