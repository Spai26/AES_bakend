const { Router } = require("express");
const {
  showAllItems,
  uploadItems,
  updateResourceStatus,
} = require("../controller/Resources.controller");
const isAuth = require("../middleware/session");
const resourcesRoute = Router();

resourcesRoute.get("/gallery/show", showAllItems);
resourcesRoute.post("/gallery/upload", uploadItems);
resourcesRoute.get("/gallery/:id", updateResourceStatus);

module.exports = resourcesRoute;
