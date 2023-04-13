const { Router } = require("express");
const {
  showAllItems,
  uploadItems,
} = require("../controller/Resources.controller");
const isAuth = require("../middleware/session");
const resourcesRoute = Router();

resourcesRoute.get("/gallery/show ", showAllItems);
resourcesRoute.post("/gallery/upload", uploadItems);

module.exports = resourcesRoute;
