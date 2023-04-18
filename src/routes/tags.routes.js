const { Router } = require("express");
const tagController = require("../controller/tag/tag.controller");
const SearchOrAllTags = require("../controller/tag/tag.index");
const { validateItem, valideteNameItem } = require("../validators/general");
const tagRoute = Router();

tagRoute.get("/", SearchOrAllTags);
tagRoute.post(
  "/",
  isAuth,
  checkrol(["admin"]),
  valideteNameItem,
  tagController.newTag
);
tagRoute.put(
  "/:id",
  isAuth,
  checkrol(["admin"]),
  validateItem,
  tagController.updateTag
);
tagRoute.delete(
  "/:id",
  isAuth,
  checkrol(["admin"]),
  validateItem,
  tagController.deleteTag
);

module.exports = tagRoute;
