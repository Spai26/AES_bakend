const { Router } = require("express");
const {
  showAllItems,
  uploadItems,
  updateResourceStatus,
  resourceById,
  deteleFormResource,
} = require("../controller/Resources.controller");
const {
  //validateResourceCreate,
  validateResourceUp,
} = require("../validators/Resources");
const { validateItem } = require("../validators/general");
const isAuth = require("../middleware/session");
const resourcesRoute = Router();

resourcesRoute.get("/gallery/show", showAllItems);
resourcesRoute.get("/gallery/:id", resourceById);
resourcesRoute.post("/gallery/upload", uploadItems);
resourcesRoute.put(
  "/gallery/:id",
  validateItem,
  validateResourceUp,
  updateResourceStatus
);

resourcesRoute.delete("/gallery/:id", validateItem, deteleFormResource);

module.exports = resourcesRoute;
