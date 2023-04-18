const { Router } = require("express");
const categoryCtrl = require("../controller/category.controller");
const { validateItem, valideteNameItem } = require("../validators/general");
const isAuth = require("../middleware/sessionAuth");
const checkrol = require("../middleware/roleAuth");

const categoryRoutes = Router();

categoryRoutes.get("/", categoryCtrl.getAllCategory);
categoryRoutes.post(
  "/",
  isAuth,
  checkrol(["admin"]),
  valideteNameItem,
  categoryCtrl.newCategory
);
categoryRoutes.put(
  "/:id",
  isAuth,
  checkrol(["admin"]),
  validateItem,
  categoryCtrl.updateCategory
);
categoryRoutes.delete(
  "/:id",
  isAuth,
  checkrol(["admin"]),
  validateItem,
  categoryCtrl.deleteCategory
);

module.exports = categoryRoutes;
