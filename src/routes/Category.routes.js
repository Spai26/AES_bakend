const { Router } = require("express");
const categoryCtrl = require("../controller/category.controller");
const { validateItem, valideteNameItem } = require("../validators/general");
const categoryRoutes = Router();

categoryRoutes.get("/", categoryCtrl.getAllCategory);
categoryRoutes.post("/", valideteNameItem, categoryCtrl.newCategory);
categoryRoutes.put("/:id", validateItem, categoryCtrl.updateCategory);
categoryRoutes.delete("/:id", validateItem, categoryCtrl.deleteCategory);

module.exports = categoryRoutes;
