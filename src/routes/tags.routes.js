const { Router } = require("express");
const tagController = require("../controller/Tag.controller");
const { validateItem, valideteNameItem } = require("../validators/general");
const tagRoute = Router();

tagRoute.get("/", tagController.getAllTags);
tagRoute.post("/", valideteNameItem, tagController.newTag);
tagRoute.put("/:id", validateItem, tagController.updateTag);
tagRoute.delete("/:id", validateItem, tagController.deleteTag);

module.exports = tagRoute;
