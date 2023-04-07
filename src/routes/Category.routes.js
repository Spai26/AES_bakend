const {Router} = require('express')
// const authmiddleware = require('../middleware/session')
const {
  newCategory,
  getAllCategory,
  updateCategory,
  deleteCategory 
} = require('../controller/category.controller')
const {
   validatorNewCategory,
   validatorUpdateCategory,
   validatorDeleteCategory 
} = require('../validators/categoryTest')

const categoryRoutes = Router()

//, authmiddleware agregar, si es necesario
categoryRoutes.get('/', getAllCategory)
categoryRoutes.post('/', validatorNewCategory, newCategory)

categoryRoutes.put('/:id', validatorUpdateCategory, updateCategory)
categoryRoutes.delete('/:id', validatorDeleteCategory, deleteCategory)

module.exports = categoryRoutes
