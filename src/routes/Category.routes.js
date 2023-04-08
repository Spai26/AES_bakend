const { Router } = require("express");
/* const getAllCategory = require('../handlers/CategoryBlogs/BlogCategory.handlers')
const newCategory = require('../handlers/CategoryBlogs/NewCategorie.handlers')
const modificCategory = require('../handlers/CategoryBlogs/modificCategoryInDb.handlers')
const deleteCategory = require('../handlers/CategoryBlogs/deleteCategory.handlers')  */
const categoryCtrl = require("../controller/category.controller");
const categoryRoutes = Router();

categoryRoutes.get("/", categoryCtrl.getAllCategory);
/*categoryRoutes.post('/', newCategory)
categoryRoutes.put('/', modificCategory)
categoryRoutes.delete('/:id', deleteCategory) */

module.exports = categoryRoutes;
